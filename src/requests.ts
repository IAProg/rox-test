import { gameConfig } from "./config";
import { IResponseData } from "./types";

export async function requestData(): Promise<IResponseData>{
    const colourCount = gameConfig.request.colourCount;
    const response = await fetch(`http://www.randomnumberapi.com/api/v1.0/random?min=0&max=4&count=${colourCount}`);
    const data = await response.json();
    if ( response.status === 200 ){
        return {
            colours: data as Array<number>
        } as IResponseData;
    }
    throw data;
}