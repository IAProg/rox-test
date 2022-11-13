import { Back } from "gsap";
import { Application } from "pixi.js";
import { gameConfig } from "../config";
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

        this.stage.addChild(this._background, this._gameboard);

        this.scaleContent(gameConfig.canvas.width, gameConfig.canvas.height);
    }

    public async onBegin(): Promise<void>{
        //
    }

    public async onEnd(): Promise<void>{
        //
    }

    public scaleContent(width: number, height: number): void{
        this._gameboard.resize(width, height);
        this._background.resize(width, height);
    }
}