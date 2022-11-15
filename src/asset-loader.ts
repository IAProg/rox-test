import { ILoaderResource, Loader, Texture } from "pixi.js";
import { ITextureAsset } from "./types";

const textureList = [
    { name: "background", url: "background.png"},
    { name: "pointer", url: "pointer.png"},
    { name: "gameboard", url: "gameboard.png"}
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
    const texture = Loader.shared.resources[textureName].texture;
    if (texture){
        return texture;
    }
    throw `could not find texture ${textureName}`
}