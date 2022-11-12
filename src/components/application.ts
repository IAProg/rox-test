import { Application } from "pixi.js";
import { Gameboard } from "./game-board";
import { ResultBoard } from "./result-board";

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 1000;

export class RoxApp extends Application {
    private _gameboard: Gameboard;
    private _resultBoard: ResultBoard;

    constructor(){
        super({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT })
        // init components
    }

    public async onBegin(): Promise<void>{
        //
    }

    public async onEnd(): Promise<void>{
        //
    }

    public resize(): void{
        //
    }
}