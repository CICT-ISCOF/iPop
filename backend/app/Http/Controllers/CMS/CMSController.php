<?php

namespace App\Http\Controllers\CMS;

use App\Models\CMS\Link;
use App\Models\CMS\LinkCategory;
use App\Models\CMS\Article;
use App\Models\CMS\CardList;
use App\Models\CMS\CardListItem;
use App\Models\CMS\GridList;
use App\Models\CMS\GridListItem;
use App\Models\CMS\LinkList;
use App\Models\CMS\ListItem;
use App\Models\CMS\Media;
use App\Models\CMS\SliderList;
use App\Models\CMS\SliderListItem;
use App\Models\CMS\Text;
use App\Models\File;
use App\Http\Controllers\Controller;
use App\Http\Requests\CMS\CMSRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CMSController extends Controller
{
    protected $rules = [
        'link' => [
            'title' => ['required', 'string', 'max:255'],
        ],
        'sub_category' => [
            'sub_categories' => ['nullable', 'array'],
            'sub_categories.*.title' => ['required', 'string', 'max:255'],
        ],
        'article' => [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'file' => ['required', 'base64'],
        ],
        'card' => [
            'items' => ['required', 'array'],
            'items.*.title' => ['required', 'string', 'max:255'],
            'items.*.description' => ['required', 'string'],
            'items.*.file' => ['required', 'base64'],
        ],
        'grid' => [
            'items' => ['required', 'array'],
            'items.*.title' => ['required', 'string', 'max:255'],
            'items.*.file' => ['required', 'base64'],
        ],
        'list' => [
            'title' => ['required', 'string'],
            'items' => ['required', 'array'],
        ],
        'media' => [
            'file' => ['required', 'base64'],
        ],
        'slider' => [
            'items' => ['required', 'array'],
            'items.*.file' => ['required', 'base64'],
        ],
        'text' => [
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
        ],
    ];

    public function array(Request $request)
    {
        $hasLink = false;
        $linkIndex = -1;

        $data = [
            'link' => [],
            'articles' => [],
            'cards' => null,
            'grids' => null,
            'lists' => [],
            'medias' => [],
            'sliders' => null,
            'texts' => [],
        ];

        $json = $request->all();
        $invalid = [];

        // Make sure that all elements have types.
        foreach ($json as $index => $object) {
            if (!isset($object['type'])) {
                $invalid[] = [
                    'payload' => $object,
                    'messages' => [
                        'type' => ['Data does not have a type assigned.'],
                    ],
                ];
                unset($json[$index]);
            }
        }

        // Check if link object exists
        foreach ($json as $index => $object) {
            if ($object['type'] === 'link') {
                $hasLink = true;
                $linkIndex = $index;
            }
        }

        if (!$hasLink) {
            return response(
                [
                    'errors' => [
                        'link' => ['A link is required.'],
                    ],
                ],
                422
            );
        }

        $validator = $this->makeValidator($json[$linkIndex], $this->rules['link']);

        if ($validator->fails()) {
            return response($validator->messages()->all(), 422);
        }

        $json = $this->cleanArray($json);

        $invalid_indexes = [];
        foreach ($json as $index => $object) {
            $type = $object['type'];
            if (!in_array($type, array_keys($this->rules))) {
                $invalid_indexes[] = $index;
                continue;
            }
            $validator = $this->makeValidator($object, $this->rules[$type]);
            if ($validator->fails()) {
                $invalid[] = [
                    'payload' => $object,
                    'messages' => $validator->messages()->all(),
                ];
                $invalid_indexes[] = $index;
                continue;
            }
        }

        $json = $this->cleanArray($json);

        foreach ($invalid_indexes as $index) {
            unset($json[$index]);
        }

        $json = $this->cleanArray($json);

        $data['link'] = Link::create($json[$linkIndex]);
        $link = $data['link'];
        unset($json[$linkIndex]);

        $json = $this->cleanArray($json);

        // Check individual possible listings
        foreach ($json as $object) {
            $type = $object['type'];
            if ($type === 'card' && !$data['cards']) {
                $data['cards'] = CardList::create(['link_id' => $link->id]);
            }
            if ($type === 'grid' && !$data['grids']) {
                $data['grids'] = GridList::create(['link_id' => $link->id]);
            }
            if ($type === 'slider' && !$data['sliders']) {
                $data['sliders'] = SliderList::create(['link_id' => $link->id]);
            }
        }

        foreach ($json as $object) {
            $type = $object['type'];
            switch ($type) {
                case 'article':
                    $file = File::process($object['file']);
                    $file->public = true;
                    $file->save();
                    $object['file_id'] = $file->id;
                    $object['link_id'] = $link->id;
                    $article = Article::create($object);
                    $article->file = $file;
                    $data['articles'][] = $article;
                    break;
                case 'card':
                    foreach ($object['items'] as $cardData) {
                        $file = File::process($cardData['file']);
                        $file->public = true;
                        $file->save();
                        $cardData['file_id'] = $file->id;
                        $data['cards']->items()->save(new CardListItem($cardData));
                    }
                    break;
                case 'grid':
                    foreach ($object['items'] as $gridData) {
                        $file = File::process($gridData['file']);
                        $file->public = true;
                        $file->save();
                        $gridData['file_id'] = $file->id;
                        $data['grids']->items()->save(new GridListItem($gridData));
                    }
                    break;
                case 'list':
                    $object['link_id'] = $link->id;
                    $list = LinkList::create($object);
                    foreach ($object['items'] as $listData) {
                        if (is_string($listData)) {
                            $list->items()->save(new ListItem([
                                'body' => $listData
                            ]));
                        } else if (isset($listData['body'])) {
                            $list->items()->save(new ListItem($listData));
                        }
                    }

                    $list->load('items');

                    $data['lists'][] = $list;
                    break;
                case 'media':
                    $file = File::process($object['file']);
                    $file->public = true;
                    $file->save();
                    $mediaData['link_id'] = $link->id;
                    $mediaData['file_id'] = $file->id;
                    $media = Media::create($mediaData);
                    $data['medias'][] = $media;
                    break;
                case 'slider':
                    foreach ($object['items'] as $sliderData) {
                        $file = File::process($sliderData['file']);
                        $file->public = true;
                        $file->save();
                        $sliderData['file_id'] = $file->id;
                        $data['sliders']
                            ->items()
                            ->save(new SliderListItem($sliderData));
                    }
                    break;
                case 'text':
                    $object['link_id'] = $link->id;
                    $data['texts'][] = Text::create($object);
                    break;
            }
        }

        $listingKeys = [
            'cards',
            'grids',
            'sliders'
        ];

        foreach ($listingKeys as $key) {
            if (isset($data[$key]) && $data[$key] instanceof Model) {
                $data[$key] = $data[$key]->items;
            }
        }

        return [
            'data' => $data,
            'invalid' => $invalid,
        ];
    }

    public function object(CMSRequest $request)
    {
        $data = $request->validated();

        $link = Link::create($data);

        $articles = [];
        $cards = [];
        $grids = [];
        $lists = [];
        $medias = [];
        $sliders = [];
        $texts = [];

        if (!empty($data['articles'])) {
            foreach ($data['articles'] as $articleData) {
                $file = File::process($articleData['file']);
                $file->save();
                $articleData['file_id'] = $file->id;
                $articleData['link_id'] = $link->id;
                $article = Article::create($articleData);
                $article->file = $file;
                $articles[] = $article;
            }
        }

        if (!empty($data['cards'])) {
            $cardList = CardList::create(['link_id' => $link->id]);
            foreach ($data['cards'] as $cardData) {
                $file = File::process($cardData['file']);
                $file->save();
                $cardData['file_id'] = $file->id;
                $cardData['card_list_id'] = $cardList->id;
                $item = CardListItem::create($cardData);
                $item->file = $file;
                $cards[] = $item;
            }
        }

        if (!empty($data['grids'])) {
            $gridList = GridList::create(['link_id' => $link->id]);
            foreach ($data['grids'] as $gridData) {
                $file = File::process($gridData['file']);
                $file->save();
                $gridData['file_id'] = $file->id;
                $gridData['grid_list_id'] = $gridList->id;
                $item = GridListItem::create($gridData);
                $item->file = $file;
                $grids[] = $item;
            }
        }

        if (!empty($data['lists'])) {
            $linkList = LinkList::create(['link_id' => $link->id]);
            foreach ($data['lists'] as $listData) {
                $listData['link_list_id'] = $linkList->id;
                $lists[] = ListItem::create($listData);
            }
        }

        if (!empty($data['medias'])) {
            foreach ($data['medias'] as $mediaData) {
                $file = File::process($mediaData['file']);
                $file->save();
                $mediaData['link_id'] = $link->id;
                $mediaData['file_id'] = $file->id;
                $media = Media::create($mediaData);
                $media->file = $file;
                $medias[] = $media;
            }
        }

        if (!empty($data['sliders'])) {
            $sliderList = SliderList::create(['link_id' => $link->id]);
            foreach ($data['sliders'] as $sliderData) {
                $file = File::process($sliderData['file']);
                $file->save();
                $sliderData['slider_list_id'] = $sliderList->id;
                $sliderData['file_id'] = $file->id;
                $item = SliderListItem::create($sliderData);
                $item->file = $file;
                $sliders[] = $item;
            }
        }

        if (!empty($data['texts'])) {
            foreach ($data['texts'] as $textData) {
                $textData['link_id'] = $link->id;
                $texts[] = Text::create($textData);
            }
        }

        return [
            'link' => $link,
            'aricles' => $articles,
            'cards' => $cards,
            'grids' => $grids,
            'lists' => $lists,
            'medias' => $medias,
            'sliders' => $sliders,
            'texts' => $texts,
        ];
    }

    /**
     * Create a validator for the given data.
     *
     * @param mixed $data
     * @param array $rules
     *
     * @return \Illuminate\Validation\Validator
     */
    protected function makeValidator($data, $rules)
    {
        return Validator::make($data, $rules);
    }

    protected function cleanArray($iterable)
    {
        $clean = [];
        foreach ($iterable as $element) {
            $clean[] = $element;
        }
        return $clean;
    }
}
