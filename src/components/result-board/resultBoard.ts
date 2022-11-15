import { Container, Sprite, Text } from "pixi.js";
import { getTexture } from "../../asset-loader";
import { gameConfig, strings } from "../../config";
import { asyncTween } from "../../utils";

export class ResultBoard extends Container {
    private _backdrop: Sprite;

    private _message: Text;
    private _amount: Text;

    private size: {
        width: number,
        height: number
    };
    
    constructor(){
        super();
        this._backdrop = new Sprite(getTexture("resultboard"));
        this._backdrop.anchor.set(0.50);
        
        const { padding, style, amountPos, messagePos } = gameConfig.results;

        this._message = new Text(strings.results.message, style);
        this._message.anchor.set(0.5, 0.00);
        this._message.position.set(messagePos.x, messagePos.y);
        
        this._amount = new Text("PLACEHOLDER", style);
        this._amount.anchor.set(0.5, 0.00);
        this._amount.position.set(amountPos.x, amountPos.y);

        this.addChild(this._backdrop, this._message, this._amount);

        this.size = {
            width:  padding * this.width,
            height: padding * this.height
        }

        this.alpha = 0;
    }

    public async show(score: number): Promise<void>{
        this._amount.text = String(score);
        const { fadeDuration } = gameConfig.results;
        this.interactive = true;
        await asyncTween(this, { duration: fadeDuration, alpha: 1 });
        await this.awaitPress();
        await asyncTween(this, { duration: fadeDuration, alpha: 0 });
        this.interactive = false;
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

    private awaitPress(): Promise<void>{
        return new Promise((resolve) => this.on("pointerdown", resolve))
    }
}