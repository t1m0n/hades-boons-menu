import './base.scss';
import './menu.scss';

import MenuItem from './menuItem';
import {BOONS} from "./consts";

class BoonsMenu {
    items = [];

    constructor($el) {
        this.$el = $el;

        this.init();
    }

    init() {
        this.addItems();
        this.activateDemoItem();

        this.$el.addEventListener('mouseenter', this.deactivateDemoItem)
    }

    addItems() {
        BOONS.forEach(content => {
            const $el = document.createElement('div');

            this.$el.appendChild($el);

            this.items.push(new MenuItem($el, {content}));
        })
    }

    activateDemoItem = () => {
        this.items[1].activate();
    }
    deactivateDemoItem = () => {
        this.items[1].deactivate();
    }

}

new BoonsMenu(document.querySelector('#menu'))


