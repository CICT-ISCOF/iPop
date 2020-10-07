<?php

namespace App\Http\Controllers\CMS;

use App\Models\CMS\Link;
use App\Http\Controllers\Controller;
use App\Http\Requests\CMS\CMSRequest;
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

class CMSController extends Controller
{
    public function create(CMSRequest $request)
    {
        return $request->all();
        $data = $request->validated();
        
        $link = Link::create($data);

        $articles = [];
        $cards = [];
        $grids = [];
        $lists = [];
        $medias = [];
        $sliders = [];
        $texts = [];

        if(!empty($data['articles'])) {
            foreach($data['articles'] as $articleData)
            {
                $file = File::process($articleData['file']);
                $file->save();
                $articleData['file_id'] = $file->id;
                $articleData['link_id'] = $link->id;
                $article = Article::create($articleData);
                $article->file = $file;
                $articles[] = $article;
            }
        }

        if(!empty($data['cards'])) {
            $cardList = CardList::create(['link_id' => $link->id]);
            foreach($data['cards'] as $cardData)
            {
                $file = File::process($cardData['file']);
                $file->save();
                $cardData['file_id'] = $file->id;
                $cardData['card_list_id'] = $cardList->id;
                $item = CardListItem::create($cardData);
                $item->file = $file;
                $cards[] = $item;
            }
        }

        if(!empty($data['grids'])) {
            $gridList = GridList::create(['link_id' => $link->id]);
            foreach($data['grids'] as $gridData) {
                $file = File::process($gridData['file']);
                $file->save();
                $gridData['file_id'] = $file->id;
                $gridData['grid_list_id'] = $gridList->id;
                $item = GridListItem::create($gridData);
                $item->file = $file;
                $grids[] = $item;
            }
        }

        if(!empty($data['lists'])) {
            $linkList = LinkList::create(['link_id' => $link->id]);
            foreach($data['lists'] as $listData) {
                $listData['link_list_id'] = $linkList->id;
                $lists[] = ListItem::create($listData);
            }
        }

        if(!empty($data['medias'])) {
            foreach($data['medias'] as $mediaData) {
                $file = File::process($mediaData['file']);
                $file->save();
                $mediaData['link_id'] = $link->id;
                $mediaData['file_id'] = $file->id;
                $media = Media::create($mediaData);
                $media->file = $file;
                $medias[] = $media;
            }
        }

        if(!empty($data['sliders'])) {
            $sliderList = SliderList::create(['link_id' => $link->id]);
            foreach($data['sliders'] as $sliderData) {
                $file = File::process($sliderData['file']);
                $file->save();
                $sliderData['slider_list_id'] = $sliderList->id;
                $sliderData['file_id'] = $file->id;
                $item = SliderListItem::create($sliderData);
                $item->file = $file;
                $sliders[] = $item;
            }
        }

        if(!empty($data['texts'])) {
            foreach($data['texts'] as $textData) {
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
}
