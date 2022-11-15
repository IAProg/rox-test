import { IApplicationOptions, TextStyle } from "pixi.js";

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
        amountPos:  { x: 0.00, y: -300.00 },
        messagePos: { x: 0.00, y: -475.00 },
        style: {
            fill: 0xffffff,
            fontSize: 80,
            align: "center"
        } as TextStyle
    },
    selector: {
        buttonSize: 100,
        buttonPadding: 5
    },
    disc: {
        spinnerDiameter: 500,
        spinsMin: 2,
        spinsMax: 3,
        missMin: 0.10,
        missMax: 0.10,
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

export const strings = {
    results: {
        message: "YOU WON:"
    }
}