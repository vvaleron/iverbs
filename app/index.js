'use strict';

import './styles';
import config from './configs/app.config';

var body = document.querySelector('body');
body.textContent = 'Config text: ' + config.text;