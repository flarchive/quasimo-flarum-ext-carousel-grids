import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Button from 'flarum/common/components/Button';
import CarouselGridEditModal from './CarouselGridEditModal';

export default class CarouselGridsPage extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);
    this.items = this.getItems();
    this.columns = app.data.settings.carousel_grids_columns || '3';
    this.position = app.data.settings.carousel_grids_position || 'after_hero';
    this.scope = app.data.settings.carousel_grids_scope || 'homepage';
  }

  getItems() {
    const raw = app.data.settings.carousel_grids_items || '[]';
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  saveItems() {
    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/settings',
      body: { carousel_grids_items: JSON.stringify(this.items) },
    }).then(() => {
      app.alerts.show({ type: 'success' }, app.translator.trans('carousel-grids.admin.saved_message'));
    });
  }

  saveColumns() {
    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/settings',
      body: { carousel_grids_columns: this.columns },
    });
  }

  saveSettings() {
    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/settings',
      body: {
        carousel_grids_columns: this.columns,
        carousel_grids_position: this.position,
        carousel_grids_scope: this.scope,
      },
    }).then(() => {
      app.alerts.show({ type: 'success' }, app.translator.trans('carousel-grids.admin.saved_message'));
    });
  }

  saveSetting(key, value) {
    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/settings',
      body: { [key]: value },
    });
  }

  content() {
    return (
      <div className="CarouselGridsPage">
        <div className="container">
          <div className="Form">
            <div className="Form-group">
              <label>{app.translator.trans('carousel-grids.admin.items_label')}</label>
              <Button className="Button Button--primary" onclick={() => this.addItem()}>
                {app.translator.trans('carousel-grids.admin.add_item')}
              </Button>
            </div>

            <div className="CarouselGridsPage-items">
              {this.items.map((item, index) => this.renderItem(item, index))}
            </div>

            <div className="Form-group">
              <label>{app.translator.trans('carousel-grids.admin.columns_label')}</label>
              <input
                className="FormControl"
                type="number"
                min="1"
                max="6"
                value={this.columns}
                onchange={(e) => {
                  this.columns = e.target.value;
                }}
              />
            </div>

            <div className="Form-group">
              <label>{app.translator.trans('carousel-grids.admin.position_label')}</label>
              <select className="FormControl" value={this.position} onchange={(e) => { this.position = e.target.value; }}>
                <option value="after_hero">{app.translator.trans('carousel-grids.admin.position_after_hero')}</option>
                <option value="before_footer">{app.translator.trans('carousel-grids.admin.position_before_footer')}</option>
              </select>
            </div>

            <div className="Form-group">
              <label>{app.translator.trans('carousel-grids.admin.scope_label')}</label>
              <select className="FormControl" value={this.scope} onchange={(e) => { this.scope = e.target.value; }}>
                <option value="homepage">{app.translator.trans('carousel-grids.admin.scope_homepage')}</option>
                <option value="all">{app.translator.trans('carousel-grids.admin.scope_all')}</option>
              </select>
            </div>

            <div className="Form-group">
              <Button className="Button Button--primary" onclick={() => this.saveSettings()}>
                {app.translator.trans('carousel-grids.admin.save_settings')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderItem(item, index) {
    return (
      <div className="CarouselGridsPage-item" draggable="true" ondragstart={(e) => this.dragStart(e, index)} ondragover={(e) => this.dragOver(e, index)} ondrop={(e) => this.drop(e, index)}>
        <div className="CarouselGridsPage-item-handle">☰</div>
        <div className="CarouselGridsPage-item-content">
          <strong>{item.title}</strong>
          <p>{item.description}</p>
        </div>
        <div className="CarouselGridsPage-item-actions">
          <Button className="Button Button--icon" icon="fas fa-pencil-alt" onclick={() => this.editItem(index)} />
          <Button className="Button Button--icon" icon="fas fa-times" onclick={() => this.deleteItem(index)} />
        </div>
      </div>
    );
  }

  addItem() {
    app.modal.show(CarouselGridEditModal, {
      onsubmit: (item) => {
        this.items.push(item);
        this.saveItems();
      },
    });
  }

  editItem(index) {
    app.modal.show(CarouselGridEditModal, {
      item: this.items[index],
      onsubmit: (item) => {
        this.items[index] = item;
        this.saveItems();
      },
    });
  }

  deleteItem(index) {
    if (confirm(app.translator.trans('carousel-grids.admin.delete_confirmation'))) {
      this.items.splice(index, 1);
      this.saveItems();
    }
  }

  dragStart(e, index) {
    this.draggedIndex = index;
  }

  dragOver(e, index) {
    e.preventDefault();
  }

  drop(e, index) {
    e.preventDefault();
    if (this.draggedIndex !== index) {
      const item = this.items.splice(this.draggedIndex, 1)[0];
      this.items.splice(index, 0, item);
      this.saveItems();
    }
  }
}
