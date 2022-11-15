import { Container, Sprite, Texture } from "pixi.js";
import { gameConfig } from "../../config";

export class ColourDisc extends Container {
    private _disc: Sprite;
    
    constructor(){
        super();
        this._disc = new Sprite(Texture.WHITE);
        this._disc.anchor.set(0.50);
        
        const discSize = gameConfig.disc.size;
        this._disc.scale.set(discSize / this._disc.width);
        this._disc.tint = gameConfig.colours[0];
        this.addChild(this._disc);
    }

    public async checkWin(colour: number): Promise<boolean>{
        this._disc.tint = gameConfig.colours[colour];

        return false;
    }
}