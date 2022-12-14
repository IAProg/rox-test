import { IApplicationOptions, TextStyle } from "pixi.js";

/**
 * A game config allows for components of the game to be fine tuned from a single location with no changes need in the code structure
 * An attempt has been made throughout the code to emulate how I think components are positioned at Roxor.
 */
export const gameConfig = {
    request: {
        colourCount: 100
    },
    canvas:{
        width: 700,
        height: 1000,
        antialiasing: true,
        autoDensity: true,
        resolution: 2

    } as IApplicationOptions,
    colours: [
        0xe43b44,
        0x0099db,
        0x63c74d,
        0xfee761,
        0xf77622
    ],
    gameboard:{
        padding: 1.25,
        textPos:     { x: 0.00, y: -475.00 },
        discPos:     { x: 0.00, y:   25.00 },
        selectorPos: { x: 0.00, y:  300.00 }
    },
    results:{
        padding: 1.25,
        fadeDuration: 1,
        amountPos:  { x: 0.00, y:  -80.00 },
        messagePos: { x: 0.00, y: -180.00 },
        replayPos:  { x: 0.00, y:   80.00 },
        scoreStyle: {
            fill: 0xffffff,
            fontSize: 80,
            align: "center"
        } as TextStyle,
        replayStyle: {
            fill: 0xffffff,
            fontSize: 40,
            align: "center"
        } as TextStyle
    },
    selector: {
        buttonSize: 100,
        buttonPadding: 5
    },
    disc: {
        radius: 250,
        spinnerDiameter: 500,
        spinsMin: 4,
        spinsMax: 8,
        missMin: 0.20,
        missMax: 0.45,
    },
    textFields: {
        padding: 0.1,
        labelStyle: {
            fill: 0xffffff,
            fontSize: 40,
            align: "center"
        } as TextStyle,
        style: {
            fill: 0xffffff,
            fontSize: 100,
            align: "center"
        } as TextStyle,
        scoreTextPos:  { x: 0.00, y: 150.00 },
        scoreLabelPos: { x: 0.00, y: 130.00 },
        timeTextPos:   { x: 0.00, y:  30.00 },
        timeLabelPos:  { x: 0.00, y:   0.00 },
    }
}

/**
 * The strings config allows text in the game to be easily updated - this is especially useful when deploying a game in multiple languages
 */
export const strings = {
    results: {
        message: "YOUR SCORE:",
        replay: "PLAY AGAIN"
    }
}