import template from './card.html';

export default class Card {
    constructor (config) {
        this.time = config.time;
        this.word = config.word;
        this.groupId = config.groupId;
        this.isShown = false;
        this.isCompleted = false;

        this.el = $.parseHTML(template)[0];
        this.children = $(this.el).children();
        this.template = template;

        this.setWord(this.word);
        this.attachEvents();
    }

    get isActive () {
        return this.isCompleted ? false : !this.isShown;
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
        if (this.isActive) {
            this.toggle();
            $(this.el.parentElement).trigger('click', this);
        }
    }

    toggle () {
        $(this.el).toggleClass('flipped');
        this.isShown = !this.isShown;
    }

    setWord (word) {
        if (document.location.search.indexOf('debug') !== -1) {
            $(this.el).find('.front').children('.text').text(word);
        }
        $(this.el).find('.back').children('.text').text(word);
    }
};