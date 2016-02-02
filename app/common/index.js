import CommonUtils from './common.utils';
import irregularVerbs from './iverbs.js';

const common = {
    utils: new CommonUtils(irregularVerbs),
    list: irregularVerbs
};

export default common;