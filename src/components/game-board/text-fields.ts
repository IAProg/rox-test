import { Container, Text } from "pixi.js";
import { gameConfig } from "../../config";

export class TextFields extends Container {
    private _timeText: Text;
    private _scoreText: Text;
    
    constructor(){
        super();
        const style = gameConfig.textFields.style;
        this._timeText  = new Text("placeholder", style);
        this._timeText.anchor.set(0.5, 0.00);

        this._scoreText = new Text("placeholder", style);
        this._scoreText.anchor.set(0.5, 0.00);
        this._scoreText.y = this._timeText.height;

        this.addChild(this._timeText, this._scoreText);
    }

    public async moveTo(): Promise<void>{
        //
    }
}