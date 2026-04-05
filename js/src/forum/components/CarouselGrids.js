import Component from 'flarum/common/Component';
import app from 'flarum/common/app';

export default class CarouselGrids extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.items = app.forum.attribute('carouselGrids.items') || [];
    this.columns = app.forum.attribute('carouselGrids.columns') || 3;
    this.currentIndex = 0;
    this.interval = null;
    this.updateVisibleColumns();
    window.addEventListener('resize', () => this.updateVisibleColumns());
  }

  updateVisibleColumns() {
    const width = window.innerWidth;
    if (width <= 768) {
      this.visibleColumns = 1;
    } else if (width <= 1024) {
      this.visibleColumns = 2;
    } else {
      this.visibleColumns = this.columns;
    }
  }

  oncreate(vnode) {
    super.oncreate(vnode);
    if (this.items.length > this.visibleColumns) {
      this.startAutoScroll();
    }
  }

  onremove(vnode) {
    super.onremove(vnode);
    if (this.interval) clearInterval(this.interval);
  }

  startAutoScroll() {
    this.interval = setInterval(() => {
      this.isTransitioning = true;
      m.redraw();

      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.isTransitioning = false;
        m.redraw();
      }, 500);
    }, 5000);
  }

  pauseAutoScroll() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  resumeAutoScroll() {
    if (!this.interval && this.items.length > this.visibleColumns) {
      this.startAutoScroll();
    }
  }

  view() {
    if (!this.items.length) return null;

    const visibleItems = [];
    for (let i = 0; i < this.visibleColumns; i++) {
      const index = (this.currentIndex + i) % this.items.length;
      visibleItems.push(this.items[index]);
    }

    return (
      <div className="CarouselGrids" onmouseenter={() => this.pauseAutoScroll()} onmouseleave={() => this.resumeAutoScroll()}>
        <div className={`CarouselGrids-container ${this.isTransitioning ? 'is-transitioning' : ''}`} style={`grid-template-columns: repeat(${this.visibleColumns}, 1fr)`}>
          {visibleItems.map(item => this.renderItem(item))}
        </div>
      </div>
    );
  }

  renderItem(item) {
    const content = (
      <div
        className={`CarouselGrids-item CarouselGrids-item--${item.imagePosition || 'top'}`}
        style={item.backgroundImage ? `background-image: url(${item.backgroundImage})` : ''}
      >
        {item.logo && (
          <div className="CarouselGrids-logo">
            <img src={item.logo} alt={item.title} />
          </div>
        )}
        <div className="CarouselGrids-content">
          <h3 className="CarouselGrids-title">{item.title}</h3>
          <p className="CarouselGrids-description">{item.description}</p>
        </div>
      </div>
    );

    return item.link ? (
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : content;
  }
}
