import { Container, Text } from "pixi.js";
import { gameConfig } from "../../config";

export class TextFields extends Container {
    private _timeText: Text;
    private _scoreText: Text;
    
    constructor(){
        super();
        const { style, padding } = gameConfig.textFields;
        this._timeText  = new Text("placeholder", style);
        this._timeText.anchor.set(0.5, 0.00);

        this._scoreText = new Text("placeholder", style);
        this._scoreText.anchor.set(0.5, 0.00);
        this._scoreText.y = this._timeText.getBounds().bottom +  this._timeText.height * padding;

        this.addChild(this._timeText, this._scoreText);
    }

    public async moveTo(): Promise<void>{
        //
    }
}