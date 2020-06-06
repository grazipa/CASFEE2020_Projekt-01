'use strict';

import {Storage} from './dl/storage.js';
import {Service} from './bl/service.js';
import {Controller} from './ui/controller.js';

class Bootstrapper {
    static start() {

        // Data logic [dl]
        const storage = new Storage();

        // Business logic [bl]
        const service = new Service(storage);

        // Controller [ui]
        new Controller(service).startApplication();
    }
}

// wait until scripts have been loaded
document.addEventListener('DOMContentLoaded', Bootstrapper.start);