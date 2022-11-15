import { Application } from "pixi.js";
import { gameConfig } from "../config";
import { requestData } from "../requests";
import { ticketModel } from "../ticketModel";
import { delay } from "../utils";
import { Background } from "./background";
import { Gameboard } from "./game-board";
import { ResultBoard } from "./result-board";

export class RoxApp extends Application {
    private _background: Background;
    private _gameboard: Gameboard;
    private _resultBoard: ResultBoard;
    private _inPlay: boolean = true;

    constructor(){
        super(gameConfig.canvas)
        this._background = new Background();
        this._gameboard = new Gameboard();
        this._resultBoard = new ResultBoard();

        this.stage.addChild(this._background, this._gameboard, this._resultBoard);

        this.scaleContent(gameConfig.canvas.width, gameConfig.canvas.height);

        this.play();
    }

    public scaleContent(width: number, height: number): void{
        this._gameboard.resize(width, height);
        this._background.resize(width, height);
        this._resultBoard.resize(width, height);
    }

    // the main gameloop
    private async play(): Promise<void>{
        while( this._inPlay ){
            //setup
            ticketModel.setData(await requestData());
            this._gameboard.preconfigure();

            //play
            await this._gameboard.setFade(true);
            const score = await this._gameboard.play();
            this._resultBoard.updateValue(score)

            await delay(2000); // wait a moment before showing the score

            await Promise.all([ // bring the results into view
                this._gameboard.setFade(false),
                this._resultBoard.setFade(true)
            ]);

            await this._resultBoard.awaitPress();
            await this._resultBoard.setFade(false);
        }
    }
}