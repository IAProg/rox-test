export async function getColours(colourCount: number): Promise<Array<number>>{
    const response = await fetch(`http://www.randomnumberapi.com/api/v1.0/random?min=0&max=4&count=${colourCount}`);
    const data = await response.json();
    if ( response.status === 200 ){
        return data as Array<number>;
    }
    throw data;
}