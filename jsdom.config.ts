import { JSDOM } from 'jsdom';

const { window } = new JSDOM(
  '<!DOCTYPE html><html><head></head><body><div class="app" id="app"></div></body></html>',
  {
    url: 'http://localhost',
  },
);

global.document = window.document;
global.window = global.document.defaultView!;
global.XMLHttpRequest = window.XMLHttpRequest;
global.localStorage = window.localStorage;
