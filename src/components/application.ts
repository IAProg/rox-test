import { Application } from "pixi.js";
import { gameConfig } from "../config";
import { delay } from "../utils";
import { Background } from "./background";
import { Gameboard } from "./game-board";
import { ResultBoard } from "./result-board";

export class RoxApp extends Application {
    private _background: Background;
    private _gameboard: Gameboard;
    private _resultBoard: ResultBoard;

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

    private async play(): Promise<void>{
        this._gameboard.preconfigure();
        const score = await this._gameboard.play();
        await delay(2000); // wait a moment before showing the score
        await this._resultBoard.show(score);

        this.play();
    }
}