import { IResponseData } from "./types";

class TicketModel{
    private _colours: Array<number>;
    private _colourIndex: number;

    public get nextColour(): number{
        const colour = this._colours[this._colourIndex];
        this._colourIndex++;
        return colour;
    }

    public setData(responseData: IResponseData): void{
        this._colours = responseData.colours;
        this._colourIndex = 0;
    }
}

export const ticketModel = new TicketModel();