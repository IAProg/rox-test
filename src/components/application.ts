import { Application } from "pixi.js";
import { gameConfig } from "../config";
import { requestData } from "../requests";
import { ticketModel } from "../ticket-model";
import { delay } from "../utils";
import { Background } from "./background";
import { Gameboard } from "./game-board";
import { ResultBoard } from "./result-board";

/**
 * The core of the application. 
 * The application is responsible for managing sub components of the game and conducting high level game flow
 */
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

    /**
     * While not demonstrated in this demo the components are constructed to support multiple aspect ratios
    */
    public scaleContent(width: number, height: number): void{
        this._gameboard.resize(width, height);
        this._background.resize(width, height);
        this._resultBoard.resize(width, height);
    }

    // the main gameloop
    private async play(): Promise<void>{
        while( this._inPlay ){
            //setup
            ticketModel.setData(await requestData()); // request and store a new set of ticket data
            this._gameboard.preconfigure();

            //play
            await this._gameboard.setFade(true);
            const score = await this._gameboard.play();
            this._resultBoard.updateValue(score)

            // wait a moment before showing the score
            await delay(2000); 

            // bring the results into view
            await Promise.all([ 
                this._gameboard.setFade(false),
                this._resultBoard.setFade(true)
            ]);

            // wait for the user to request replay before hiding the result board
            await this._resultBoard.awaitPress();
            await this._resultBoard.setFade(false);
        }
    }
}