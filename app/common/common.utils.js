import gameAria from './../components/area/game.area';
import $ from 'jquery';

class CommonUtils {
    constructor () {
        this.gameAria = new gameAria();
    }

    initGame () {
        const el = document.body;
        this.gameAria.renderTo(el);
    }

    getClass (el) {
        console.log('CommonUtils.getClass(el) el = ', el);
    }

    toogleClass (el, cls) {
        console.log('CommonUtils.toogleClass(el, cls) el, cls = ', el, cls);
    }
}

export default CommonUtils;