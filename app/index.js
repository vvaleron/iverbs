'use strict';
import './styles';
import common from './common';
import configs from './configs';

var body = document.querySelector('body');
body.textContent = 'app.config text: ' + configs.app.text;

console.log('common.utils', common.utils);
