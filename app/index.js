'use strict';

import config from './config';

var body = document.querySelector('body');
body.textContent = 'Config text: ' + config.text;