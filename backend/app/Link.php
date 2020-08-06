<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    protected $fillable = ['title', 'subcategory', 'slug'];

    public static function searchChildren($data, Link $link)
    {
        $output = [];

        $childKeys = [
            'card' => 'Card',
            'grid' => 'Grid',
            'media' => 'SingleMedia',
            'slider' => 'Slider',
            'text' => 'Text',
            'mediafile' => 'SingleMedia',
            'sliderfile' => 'Slider',
        ];

        foreach ($childKeys as $key => $class) {
            if (
                in_array($key, ['mediafile', 'sliderfile']) &&
                isset($data[$key])
            ) {
                $child = self::_instantiate($data[$key], $class);
                $child->link_id = $link->id;
                $file = File::process($data[$key]);
                $child->file_id = $file->id;
                $child->save();
                $child->file = $file;
                $output[$key] = $child;
            } elseif (isset($data[$key])) {
                $child = self::_instantiate($data[$key], $class);
                $child->link_id = $link->id;
                if (isset($data[$key . 'file'])) {
                    $file = File::process($data[$key . 'file']);
                    $child->file_id = $file->id;
                    $child->save();
                    $child->file = $file;
                } else {
                    $child->save();
                }
                $output[$key] = $child;
            }
        }

        return $output;
    }

    private static function _instantiate($data, $class)
    {
        switch ($class) {
            case 'Card':
                return new Card($data);
                break;
            case 'Grid':
                return new Grid($data);
                break;
            case 'SingleMedia':
                return new SingleMedia($data);
                break;
            case 'Slider':
                return new Slider($data);
                break;
            case 'Text':
                return new Text($data);
                break;
        }
    }
}
