import { Container, Text } from "pixi.js";
import { gameConfig } from "../../config";
import { delay } from "../../utils";

export class TextFields extends Container {
    private _timeLabel: Text;
    private _timeText: Text;
    private _scoreLabel: Text;
    private _scoreText: Text;
    private _timeNum: number;
    
    constructor(){
        super();
        const { style, labelStyle, padding,  scoreTextPos, scoreLabelPos, timeTextPos, timeLabelPos } = gameConfig.textFields;

        this._timeLabel = new Text("TIME", labelStyle);
        this._timeLabel.anchor.set(0.5, 0.00);
        this._timeLabel.position.set(timeLabelPos.x, timeLabelPos.y);

        this._timeText  = new Text("0", style);
        this._timeText.anchor.set(0.5, 0.00);
        this._timeText.position.set(timeTextPos.x, timeTextPos.y);

        this._scoreText = new Text("0", style);
        this._scoreText.anchor.set(0.5, 0.00);
        this._scoreText.position.set(scoreTextPos.x, scoreTextPos.y);

        this._scoreLabel  = new Text("SCORE", labelStyle);
        this._scoreLabel.anchor.set(0.5, 0.00);
        this._scoreLabel.position.set(scoreLabelPos.x, scoreLabelPos.y);

        this.addChild(this._timeText, this._timeLabel, this._scoreText, this._scoreLabel);
    }

    public reset(): void{
        this._timeNum = 20;
        this._timeText.text  = "20";
        this._scoreText.text = "0"
    }

    public setScore(score: number): void{
        this._scoreText.text = String(score);
    }

    public async countDown(): Promise<void>{
        await delay(1000);
        this._timeNum--
        this._timeText.text = String(this._timeNum);
        if ( this._timeNum > 0 ){
            this.countDown();
        }
    }
}