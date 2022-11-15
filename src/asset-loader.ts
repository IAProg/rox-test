import { Loader, Texture } from "pixi.js";
import { ITextureAsset } from "./types";

const textureList = [
    { name: "background", url: "background.png"},
    { name: "pointer", url: "pointer.png"},
    { name: "btn0", url: "btn0.png"},
    { name: "btn1", url: "btn1.png"},
    { name: "btn2", url: "btn2.png"},
    { name: "btn3", url: "btn3.png"},
    { name: "btn4", url: "btn4.png"},
    { name: "btnReplay", url: "btnReplay.png"},
    { name: "gameboard", url: "gameboard.png"},
    { name: "resultboard", url: "resultsboard.png"}
] as Array<ITextureAsset>

export function loadAssets(): Promise<void>{
    const loader = Loader.shared;
    loader.baseUrl = "assets/";

    return new Promise((resolve) => {
        loader.add(textureList);
        loader.load(() => resolve());
    });
}

export function getTexture(textureName: string): Texture{
    const texture = Loader.shared.resources[textureName]?.texture;
    if (texture){
        return texture;
    }
    throw `could not find texture ${textureName}`
}