<?php

namespace Quasimo\CarouselGrids;

use Flarum\Extend;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Settings())
        ->serializeToForum('carouselGrids.items', 'carousel_grids_items', function ($value) {
            return json_decode($value, true) ?: [];
        })
        ->serializeToForum('carouselGrids.columns', 'carousel_grids_columns', function ($value) {
            return (int) ($value ?: 3);
        })
        ->serializeToForum('carouselGrids.position', 'carousel_grids_position')
        ->serializeToForum('carouselGrids.scope', 'carousel_grids_scope'),
];
