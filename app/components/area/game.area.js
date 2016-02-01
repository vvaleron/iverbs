import template from './templates/game.area.html';
import Card from '../card/card';

export default class GameAria {
    constructor () {
        this.el = null;
        this.cards = [];
        this.card = new Card();
    }

    renderTo (el) {
        el.innerHTML = template;

        if (this.el === null) {
            this.el = $(el).children()[0];
        }
        this.calculateSize(el);
        this.generateCards();
    }

    generateCards (cardsCount = 12) {
        while (cardsCount--) {
            const card = new Card();
            this.cards.push(card);
            $(this.el).append(card.el);
        }
    }

    calculateSize (parentEl) {
        console.log('calculateSize() parentEl =>', parentEl);
    };
};