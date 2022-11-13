import { Container, Sprite } from "pixi.js";
import { getTexture } from "../../asset-loader";
import { gameConfig } from "../../config";
import { ColourDisc } from "./colour-disc";
import { ColourSelector } from "./colour-selector";
import { TextFields } from "./text-fields";

export class Gameboard extends Container {

    private _backdrop: Sprite;
    private _colourSelector: ColourSelector;
    private _colourDisc: ColourDisc;
    private _textFields: TextFields;

    private size: {
        width: number,
        height: number
    };
    
    constructor(){
        super();
        this._backdrop = new Sprite(getTexture("gameboard"));
        this._backdrop.anchor.set(0.50);

        this._colourSelector = new ColourSelector();
        this._colourDisc = new ColourDisc();
        this._textFields = new TextFields();

        const { selectorPos, textPos, discPos, padding } = gameConfig.gameboard;
        this._colourSelector.position.set(selectorPos.x, selectorPos.y);
        this._colourDisc.position.set(discPos.x, discPos.y);
        this._textFields.position.set(textPos.x, textPos.y);

        this.addChild(this._backdrop, this._colourSelector, this._colourDisc, this._textFields);

        this.size = {
            width:  padding * this.width,
            height: padding * this.height
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
        )
    }
}