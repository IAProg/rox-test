import { IApplicationOptions, TextStyle } from "pixi.js";

export const gameConfig = {
    canvas:{
        width: 700,
        height: 1000,
        antialiasing: true,
        autoDensity: true,
        resolution: 2

    } as IApplicationOptions,
    colours: [
        0xff0000,
        0x0000ff,
        0x00ff00,
        0xffff00,
        0xffa500
    ],
    gameboard:{
        padding: 1.25,
        textPos:     { x: 0.00, y: -475.00 },
        discPos:     { x: 0.00, y:   25.00 },
        selectorPos: { x: 0.00, y:  300.00 }
    },
    selector: {
        buttonSize: 100,
        buttonPadding: 5
    },
    disc: {
        size: 500
    },
    textFields: {
        padding: 0.1,
        style: {
            fill: 0xffffff,
            fontSize: 100,
            align: "center"
        } as TextStyle
    }
}