import app from 'flarum/common/app';
import CarouselGridsPage from './components/CarouselGridsPage';

app.initializers.add('quasimo-carousel-grids', () => {
  app.routes['carousel-grids'] = { path: '/carousel-grids', component: CarouselGridsPage };

  app.extensionData
    .for('quasimo-carousel-grids')
    .registerPage(CarouselGridsPage);
});
