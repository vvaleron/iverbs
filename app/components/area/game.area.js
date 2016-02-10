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
        this.completedCards = [];
        this.completedGroups = [];
    }

    get isLevelCompleted () {
        return !this.cards.filter((item) => item.isCompleted !== true).length;
    }

    get isSuccess () {
        return this.activeCards.filter((item) => item.isCompleted !== true).length === 3
    }

    renderTo (el) {
        el.innerHTML = template;

        if (this.el === null) {
            this.el = $(el).children()[0];
            this.rows = $(this.el).children('.section');
        }
        this.attachEvents();
        this.generateCards();
    }

    attachEvents () {
        $(this.el).on({
            click: (event, card) => this.onClick(event, card)
        });
    }

    onClick (event, card) {
        const activeCard = this.activeCards.filter((item) => item.isCompleted !== true)[0];
        const isEmpty = !this.activeCards.length;
        const isEquals = activeCard && card
            ? activeCard.groupId === card.groupId
            : false;

        if (!card || card && card.isCompleted) {
            return;
        }

        if (isEmpty || isEquals) {
            this.addToActive(card);
        }

        if (!isEmpty && !isEquals && !this.isSuccess) {
            this.resetActive();
            this.addToActive(card);
        }

        if (this.isSuccess) {
            this.successWord(card.groupId);
        }
    }

    generateCards (groupsCount = 4) {
        let rowIndex = 0;
        this.rows.children().remove('*');

        while (--groupsCount) {
            const group = this.verbsList[this.groupIterration];

            if (group.isCompleted) {
                groupsCount += 1;
                this.groupIterration += 1;
                break;
            }

            this.createGroup(group);
            this.groupIterration += 1;
        }

        this.cards = this.shuffle(this.cards);
        this.cards.forEach((item, index) => {

            if (index % 3 === 0) {
                rowIndex = index / 3;
            }

            $(this.rows[rowIndex]).append(item.el);
        });
    }

    createGroup (group) {
        this.createCard({time: this.times.pf, word: group.pf, groupId: group.id});
        this.createCard({time: this.times.word, word: group.word, groupId: group.id});
        this.createCard({time: this.times.ppf, word: group.ppf, groupId: group.id});
    }

    createCard (cardConfig) {
        const card = new Card(cardConfig);
        this.cards.push(card);
        return card;
    }

    addToActive (card) {
        this.activeCards.push(card);
    }

    resetActive () {
        this.hideAllCards();
        this.activeCards = this.activeCards.filter((item) => item.isCompleted === true);
    }

    hideAllCards () {
        this.activeCards.forEach((card) => {
            if (!card.isCompleted) {
                card.toggle();
            }
        });
    }

    successWord (groupId) {
        this.verbsList.forEach((item) => {
            if (item.id === this) {
                item.isCompleted = true;
            }
        }, groupId);

        this.activeCards.forEach((item) => {
            item.isCompleted = true;
            this.completedCards.push(item);
        });

        if (this.isLevelCompleted) {
            alert(`You finished ${this.groupIterration} irregular verbs`);
            this.refreshCards();
        }
    }

    refreshCards () {
        this.cards = [];
        this.activeCards = [];
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