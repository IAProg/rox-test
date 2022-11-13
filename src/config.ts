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
        padding: 1.50,
        textPos:     { x: 0.00, y:   0.00 },
        discPos:     { x: 0.00, y:  75.00 },
        selectorPos: { x: 0.00, y: 190.00 }
    },
    selector: {
        buttonSize: 25,
        buttonPadding: 5
    },
    disc: {
        size: 100
    },
    textFields: {
        padding: 0.1,
        style: {
            fill: 0xffffff,
            align: "center"
        } as TextStyle
    }
}