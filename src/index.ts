import { loadAssets } from "./asset-loader";
import { RoxApp } from "./components/application";

loadAssets().then(() => {
    const app = new RoxApp();
    document.body.appendChild(app.view);
});
