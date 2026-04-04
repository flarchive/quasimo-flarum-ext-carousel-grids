import app from 'flarum/admin/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';

export default class CarouselGridEditModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    const item = this.attrs.item || {};
    this.itemTitle = item.title || '';
    this.itemDescription = item.description || '';
    this.backgroundImage = item.backgroundImage || '';
    this.logo = item.logo || '';
    this.link = item.link || '';
    this.imagePosition = item.imagePosition || 'top';
  }

  className() {
    return 'CarouselGridEditModal Modal--small';
  }

  title() {
    return app.translator.trans(this.attrs.item ? 'carousel-grids.admin.edit_item' : 'carousel-grids.admin.add_item');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('carousel-grids.admin.title')} *</label>
            <input className="FormControl" value={this.itemTitle} oninput={(e) => (this.itemTitle = e.target.value)} />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('carousel-grids.admin.description')}</label>
            <textarea className="FormControl" value={this.itemDescription} oninput={(e) => (this.itemDescription = e.target.value)} />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('carousel-grids.admin.link')}</label>
            <input className="FormControl" value={this.link} oninput={(e) => (this.link = e.target.value)} />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('carousel-grids.admin.background_image')}</label>
            <input className="FormControl" value={this.backgroundImage} oninput={(e) => (this.backgroundImage = e.target.value)} />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('carousel-grids.admin.logo')}</label>
            <input className="FormControl" value={this.logo} oninput={(e) => (this.logo = e.target.value)} />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('carousel-grids.admin.image_position')}</label>
            <select className="FormControl" value={this.imagePosition} onchange={(e) => (this.imagePosition = e.target.value)}>
              <option value="top">{app.translator.trans('carousel-grids.admin.position_top')}</option>
              <option value="left">{app.translator.trans('carousel-grids.admin.position_left')}</option>
            </select>
          </div>

          <div className="Form-group">
            <Button className="Button Button--primary" type="submit">
              {app.translator.trans('carousel-grids.admin.save_button')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();
    this.attrs.onsubmit({
      title: this.itemTitle,
      description: this.itemDescription,
      backgroundImage: this.backgroundImage,
      logo: this.logo,
      link: this.link,
      imagePosition: this.imagePosition,
    });
    app.modal.close();
  }
}
