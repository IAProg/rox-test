import { loadAssets } from "./asset-loader";
import { RoxApp } from "./components/application";
import PixiPlugin from 'gsap/PixiPlugin';
import * as PIXI from 'pixi.js-legacy';
import gsap from 'gsap';

// https://greensock.com/docs/v3/Plugins/PixiPlugin
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

loadAssets().then(() => {
    const app = new RoxApp();
    document.body.appendChild(app.view);
})
