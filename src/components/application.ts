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

        this.onBegin();
    }

    public async onBegin(): Promise<void>{
        //

        await delay(1000);
        this._resultBoard.show(10);
    }

    public async onEnd(): Promise<void>{
        //
    }

    public scaleContent(width: number, height: number): void{
        this._gameboard.resize(width, height);
        this._background.resize(width, height);
        this._resultBoard.resize(width, height);
    }
}