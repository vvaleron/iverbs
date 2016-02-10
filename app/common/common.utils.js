import gameAria from './../components/area/game.area';
import $ from 'jquery';

class CommonUtils {
    constructor (irregularVerbs) {
        this.gameAria = new gameAria(irregularVerbs);
    }

    initGame () {
        this.gameAria.renderTo(document.body);
    }
}

export default CommonUtils;