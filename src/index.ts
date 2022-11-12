import { Application } from "pixi.js-legacy"

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 1000;

const app = new Application({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT} );
document.body.appendChild(app.view);
