import { loadAssets } from "./asset-loader";
import { RoxApp } from "./components/application";

// a very simple loading process - the assets are loaded before the game 
loadAssets().then(() => {
    const app = new RoxApp();
    document.body.appendChild(app.view);
});
