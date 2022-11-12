import { Container } from "pixi.js";
import { gameConfig } from "../../config";
import { ColourDisc } from "./colour-disc";
import { ColourSelector } from "./colour-selector";
import { TextFields } from "./text-fields";

export class Gameboard extends Container {
    private _colourSelector: ColourSelector;
    private _colourDisc: ColourDisc;
    private _textFields: TextFields;

    private size: {
        width: number,
        height: number
    };
    
    constructor(){
        super();
        this._colourSelector = new ColourSelector();
        this._colourDisc = new ColourDisc();
        this._textFields = new TextFields();

        const { selectorPadding, textFieldPadding, padding } = gameConfig.gameboard;
        this._colourDisc.y     = this._textFields.getBounds().bottom + (this._textFields.height * textFieldPadding);
        this._colourSelector.y = this._colourDisc.getBounds().bottom + (this._colourDisc.height * selectorPadding);

        this.addChild(this._colourSelector, this._colourDisc, this._textFields);

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

        this.position.x = width * 0.50;
    }
}