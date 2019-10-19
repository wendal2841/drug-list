'use strict';

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';
process.env.API_URL = 'API_URL';
process.env.WS_URL = 'WS_URL';
process.env.DOMAIN = 'DOMAIN';

require('../config/env');

const jest = require('jest');
let argv = process.argv.slice(2);

jest.run(argv);
