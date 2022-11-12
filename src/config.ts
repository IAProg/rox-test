import { IApplicationOptions, TextStyle } from "pixi.js";

export const gameConfig = {
    canvas:{
        width: 700,
        height: 1000
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
        textFieldPadding: 0.1,
        selectorPadding: 0.05
    },
    selector: {
        buttonSize: 30,
        buttonPadding: 5
    },
    disc: {
        size: 150
    },
    textFields: {
        padding: 0.1,
        style: {
            fill: 0xffffff,
            align: "center"
        } as TextStyle
    }
}