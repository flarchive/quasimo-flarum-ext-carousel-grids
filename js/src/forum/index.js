import app from 'flarum/common/app';
import { extend, override } from 'flarum/common/extend';
import IndexPage from 'flarum/common/components/IndexPage';
import DiscussionPage from 'flarum/common/components/DiscussionPage';
import CarouselGrids from './components/CarouselGrids';

app.initializers.add('quasimo-carousel-grids', () => {
  override(IndexPage.prototype, 'hero', function(original) {
    const items = app.forum.attribute('carouselGrids.items');
    const position = app.forum.attribute('carouselGrids.position') || 'after_hero';

    if (position === 'after_hero' && items && items.length > 0) {
      return [
        original(),
        m('.container', m(CarouselGrids))
      ];
    }
    return original();
  });

  extend(IndexPage.prototype, 'view', function(vnode) {
    const items = app.forum.attribute('carouselGrids.items');
    if (!items || items.length === 0) return;

    const position = app.forum.attribute('carouselGrids.position') || 'after_hero';

    if (position === 'before_footer') {
      const carousel = m('.container', m(CarouselGrids));
      vnode.children.push(carousel);
    }
  });

  extend(DiscussionPage.prototype, 'view', function(vnode) {
    const scope = app.forum.attribute('carouselGrids.scope');
    if (scope !== 'all') return;

    const items = app.forum.attribute('carouselGrids.items');
    if (!items || items.length === 0) return;

    const carousel = m('.container', m(CarouselGrids));
    vnode.children.unshift(carousel);
  });
});
