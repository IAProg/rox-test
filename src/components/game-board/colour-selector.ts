import { Container, Sprite, Texture } from "pixi.js";
import { gameConfig } from "../../config";

export class ColourSelector extends Container {
    private _selectionContainer: Container;
    private _colourOptions: Sprite[];
    
    constructor(){
        super();

        const { buttonPadding, buttonSize } = gameConfig.selectorConfig;

        this._selectionContainer = new Container();
        this._colourOptions = gameConfig.colours.map((colour, index) =>{
            const button = new Sprite(Texture.WHITE);
            button.width = button.height = buttonSize;
            button.x = (buttonSize + buttonPadding) * index
            button.anchor.set(0.00, 0.50);
            button.tint = colour;

            button.on("pointerdown", () => this.onSelect(index), this);
            button.interactive = true;
            return button;
        });

        // use child container to offset contents
        this._selectionContainer.addChild(...this._colourOptions);
        this._selectionContainer.x = -this._selectionContainer.width * 0.50;

        this.addChild(this._selectionContainer);
    }

    public async awaitSelection(): Promise<number>{
        return new Promise<number>((resolve) => 
            this.on("selectionMade", (selction) => resolve(selction))
        );
    }

    private onSelect(index: number): void{
        this.emit("selectionMade", index);
    }
}