import template from './card.html';

export default class Card {
    constructor (config) {
        this.time = config.time;
        this.word = config.word;
        this.groupId = config.groupId;
        this.isShown = false;
        this.completed = false;

        this.el = $.parseHTML(template)[0];
        this.children = $(this.el).children();
        this.template = template;

        this.setWord(this.word);
        this.attachEvents();
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
        this.open();
        event.stopPropagation();
        if (!this.completed) {
            $(this.el.parentElement).triggerHandler('click', this);
        }
    }

    open () {
        this.change();
    }

    change () {
        $(this.activeEl).hide();
        $(this.inactiveEl).show();
        this.isShown = !this.isShown;
    }

    setWord (word) {
        $(this.children[0]).find('.body').text(word);
    }
};