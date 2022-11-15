import { Container, Sprite } from "pixi.js";
import { getTexture } from "../../asset-loader";
import { gameConfig } from "../../config";
import { ticketModel } from "../../ticket-model";
import { asyncTween, delay } from "../../utils";
import { ColourWheel } from "./colour-wheel";
import { ColourSelector } from "./colour-selector";
import { TextFields } from "./text-fields";

export class Gameboard extends Container {
    private _backdrop: Sprite;
    private _colourSelector: ColourSelector;
    private _colourWheel: ColourWheel;
    private _textFields: TextFields;

    private _inPlay: boolean = false;
    private _score: number; 

    private size: {
        width: number,
        height: number
    };
    
    constructor(){
        super();
        this._backdrop = new Sprite(getTexture("gameboard"));
        this._backdrop.anchor.set(0.50);

        this._colourSelector = new ColourSelector();
        this._colourWheel = new ColourWheel();
        this._textFields = new TextFields();

        const { selectorPos, textPos, discPos, padding } = gameConfig.gameboard;
        this._colourSelector.position.set(selectorPos.x, selectorPos.y);
        this._colourWheel.position.set(discPos.x, discPos.y);
        this._textFields.position.set(textPos.x, textPos.y);

        this.addChild(this._backdrop, this._colourSelector, this._colourWheel, this._textFields);

        this.size = {
            width:  padding * this.width,
            height: padding * this.height
        }

        this.alpha = 0;
    }

    public async preconfigure(): Promise<void>{
        this._textFields.reset();
        this._score = 0;
    }

    public async setFade(isOn: boolean): Promise<void>{
        const newAlpha = isOn ? 1 : 0;
        return asyncTween(this, { duration: 1, alpha: newAlpha });
    }

    public async play(): Promise<number>{
        await this._colourSelector.awaitSelection();
        let selection = this._colourSelector.selection;
        let cycleColour = ticketModel.nextColour;
                
        this._inPlay = true;
        const timer = this.startTimer();
        this._textFields.countDown();

        while (this._inPlay){
            selection = this._colourSelector.selection;
            cycleColour = ticketModel.nextColour;
            await this._colourWheel.cycleTo(cycleColour);

            if ( cycleColour === selection ){ // update score if selection matches ticket value
                this._textFields.setScore(this._score += 1);
            }
 
            await Promise.race([this._colourSelector.awaitSelection(), timer]); // wait for selection or game end - whichever comes first 
        }

        return this._score;
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

    private async startTimer(): Promise<void>{
        await delay(20000);
        this._inPlay = false;
    }
}