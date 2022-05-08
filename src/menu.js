import './base.scss';
import './menu.scss';

import MenuItem from './menuItem';
import {BOONS} from "./consts";
import anime from "animejs";

class BoonsMenu {
    items = [];

    constructor($el) {
        this.$el = $el;

        this.init();
    }

    init() {
        this.addItems();
        this.activateDemoItem();

        setTimeout(this.animate, 200);

        this.$el.addEventListener('mouseenter', this.deactivateDemoItem)
    }

    animate = () => {
        anime({
            targets: [this.items.map(item => item.$el)],
            opacity: [0, 1],
            scale: [.98, 1],
            easing: 'easeInOutCubic',
            delay: anime.stagger(100, {from: 'center'}),
        })
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


