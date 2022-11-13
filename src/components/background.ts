import { Container, Loader, Sprite } from "pixi.js";
import { getTexture } from "../asset-loader";

export class Background extends Container {
    private _sprite: Sprite;

    private size: {
        width: number,
        height: number
    };
    
    constructor(){
        super();

        this._sprite = new Sprite(getTexture("background"))
        this._sprite.anchor.set(0.50);
        this.addChild(this._sprite);

        this.size = {
            width: this.width,
            height: this.height
        }
    }

    public resize(width: number, height: number): void{
        this.scale.set(Math.min(
            width  / this.size.width,
            height / this.size.height
        ));

        this.position.set(
            width * 0.50,
            height * 0.50
        );
    }
}