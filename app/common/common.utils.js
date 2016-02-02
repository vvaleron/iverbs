import gameAria from './../components/area/game.area';
import $ from 'jquery';

class CommonUtils {
    constructor (irregularVerbs) {
        this.gameAria = new gameAria(irregularVerbs);
    }

    initGame () {
        const el = document.body;
        this.gameAria.renderTo(el);
    }
}

export default CommonUtils;