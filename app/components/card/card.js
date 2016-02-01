import template from './card.html';

let index = 0;

export default class Card {
    constructor () {
        this.id = `card-id-${index}`;
        this.el = $.parseHTML(template)[0];
        this.children = $(this.el).children();
        this.template = template;
        this.isShown = false;

        this.attachEvents();
        index += 1;
    }

    get activeEl () {
        return this.children[this.isShown ? 0 : 1];
    }

    get inactiveEl () {
        return this.children[this.isShown ? 1 : 0];
    }

    attachEvents () {
        $(this.el).on({
            click: (e) => this.onClick(e)
        });
    }

    onClick (event) {
        console.log('card =>', this);
        this.open();
    }

    open () {
        this.change();
    }

    change () {
        $(this.activeEl).hide();
        $(this.inactiveEl).show();
        this.isShown = !this.isShown;
    }
};