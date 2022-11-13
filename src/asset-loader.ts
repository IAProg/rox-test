import { Loader } from "pixi.js";
import { ITextureAsset } from "./types";

const textureList = [
    { name: "background", url: "background.png"}
] as Array<ITextureAsset>

export function loadAssets(): Promise<void>{
    const loader = Loader.shared;
    loader.baseUrl = "assets/";

    for ( const texture of textureList ){
        loader.add(texture.name, texture.url);
    }

    return new Promise(resolve => {
        loader.load(() => resolve());
    });
}