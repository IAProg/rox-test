import { Container, Graphics } from "pixi.js";
import { gameConfig } from "../../config";

export class ColourSelector extends Container {
    private _selectionPromise: Promise<void>;
    private _selectionContainer: Container;
    private _colourOptions: Graphics[];
    
    constructor(){
        super();

        const { buttonRadius, buttonPadding } = gameConfig.selectorConfig;
        const padding = (buttonRadius * 2) + buttonPadding;

        this._selectionContainer = new Container();
        this._colourOptions = gameConfig.colours.map((colour, index) =>{
            const button = new Graphics() 
                .beginFill(colour)
                .drawCircle(buttonRadius + (padding * index), 0, buttonRadius);

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