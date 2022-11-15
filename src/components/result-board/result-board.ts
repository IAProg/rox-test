import { Container, Sprite, Text } from "pixi.js";
import { getTexture } from "../../asset-loader";
import { gameConfig, strings } from "../../config";
import { asyncTween } from "../../utils";

export class ResultBoard extends Container {
    private _backdrop: Sprite;
    private _message: Text;
    private _amount: Text;

    private _replayButton: Sprite;
    private _replayText: Text;

    private size: {
        width: number,
        height: number
    };
    
    constructor(){
        super();
        const { padding, replayStyle, scoreStyle, amountPos, messagePos, replayPos } = gameConfig.results;

        this._backdrop = new Sprite(getTexture("resultboard"));
        this._backdrop.anchor.set(0.50);

        this._replayText = new Text(strings.results.replay, replayStyle);
        this._replayText.anchor.set(0.50);
        this._replayText.position.set(replayPos.x, replayPos.y);

        this._replayButton = new Sprite(getTexture("btnReplay"));
        this._replayButton.anchor.set(0.50);
        this._replayButton.position.set(replayPos.x, replayPos.y);
        

        this._message = new Text(strings.results.message, scoreStyle);
        this._message.anchor.set(0.5, 0.00);
        this._message.position.set(messagePos.x, messagePos.y);
        
        this._amount = new Text("PLACEHOLDER", scoreStyle);
        this._amount.anchor.set(0.5, 0.00);
        this._amount.position.set(amountPos.x, amountPos.y);

        this.addChild(this._backdrop, this._message, this._amount, this._replayButton, this._replayText);

        this.size = {
            width:  padding * this.width,
            height: padding * this.height
        }

        this.alpha = 0;
    }

    public updateValue(scoreValue: number): void{
        this._amount.text = String(scoreValue);
    }

    public async setFade(isOn: boolean): Promise<void>{
        const newAlpha = isOn ? 1 : 0;
        return asyncTween(this, { duration: 1, alpha: newAlpha });
    }

    public async awaitPress(): Promise<void>{
        this._replayButton.interactive = true;
        await new Promise((resolve) => this._replayButton.once("pointerdown", resolve))
        this._replayButton.interactive = false;
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