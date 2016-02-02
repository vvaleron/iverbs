import template from './templates/game.area.html';
import Card from '../card/card';

export default class GameAria {
    constructor (verbsList) {
        this.el = null;
        this.groupIterration = 1;
        this.verbsList = verbsList;
        this.times = this.verbsList[0];
        this.cards = [];
        this.activeCards = [];
    }

    get isCompleted () {
        return !this.cards.filter((item) => item.completed !== true).length;
    }

    renderTo (el) {
        el.innerHTML = template;

        if (this.el === null) {
            this.el = $(el).children()[0];
        }
        this.attachEvents();
        this.calculateSize(el);
        this.generateCards();
    }

    attachEvents () {
        $(this.el).on({
            click: (event, card) => this.onClick(event, card)
        });
    }

    onClick (event, card) {
        const activeCard = this.activeCards[0];
        const isEmpty = !this.activeCards.length;
        const isEquals = activeCard ? activeCard.groupId === card.groupId : false;

        if (isEmpty || isEquals) {
            this.addToActive(card);
        }

        if (!isEmpty && !isEquals) {
            this.clearActive();
            this.addToActive(card);
        }

        if (this.activeCards.length === 3) {
            this.successGroup();
        }
    }

    generateCards (groupsCount = 4) {
        while (groupsCount--) {
            const group = this.verbsList[this.groupIterration];

            if (group.completed) {
                groupsCount +=1;
            } else {
                this.parseGroup(group);
                this.groupIterration += 1;
            }
        }

        this.cards = this.shuffle(this.cards);

        this.cards.forEach((item) => $(this.el).append(item.el));
    }

    calculateSize (parentEl) {
        console.log('calculateSize() parentEl =>', parentEl);
    };

    parseGroup (group) {
        this.createCard({time: this.times.pf, word: group.pf, groupId: group.id});
        this.createCard({time: this.times.word, word: group.word, groupId: group.id});
        this.createCard({time: this.times.ppf, word: group.ppf, groupId: group.id});
    }

    createCard (cardConfig) {
        const card = new Card(cardConfig);
        this.cards.push(card);
    }

    addToActive (card) {
        this.activeCards.push(card);
    }

    clearActive () {
        this.hideAllCards();
        this.activeCards = [];
    }

    hideAllCards () {
        this.activeCards.forEach((card) => {
            card.change();
        })
    }

    successGroup (groupId) {

        this.verbsList.forEach((item) => {
            if (item.id === this) {
                item.completed = true;
            }
        }, groupId);

        this.activeCards.forEach((item) => {
            item.completed = true;
            $(item.el).hide();
        });

        if (this.isCompleted) {
            alert('Congrats!');
            this.refreshCards();
        }
    }

    refreshCards () {
        this.cards = [];
        this.generateCards();
    };

    shuffle (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
};