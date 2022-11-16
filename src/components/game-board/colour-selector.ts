import { Container, Sprite } from "pixi.js";
import { getTexture } from "../../asset-loader";
import { gameConfig } from "../../config";

/**
 * The colour selector presents a number of colour buttons. awaitSelection allows the gameboard to pause while the player makes their choice.
 */
export class ColourSelector extends Container {
    public selection: number;

    private _selectionContainer: Container;
    private _colourOptions: Sprite[];
    
    constructor(){
        super();

        const { buttonPadding, buttonSize } = gameConfig.selector;

        this._selectionContainer = new Container();
        this._colourOptions = gameConfig.colours.map((colour, index) =>{
            const button = new Sprite(getTexture(`btn${index}`));
            button.width = button.height = buttonSize;
            button.x = (buttonSize + buttonPadding) * index
            button.tint = colour;

            button.on("pointerdown", () => this.onSelect(index), this);
            return button;
        });

        // use child container to offset contents
        this._selectionContainer.addChild(...this._colourOptions);
        this._selectionContainer.x = -this._selectionContainer.width * 0.50;

        this.addChild(this._selectionContainer);
    }

    public async awaitSelection(): Promise<number>{
        this.setEnabled(true);
        return new Promise<number>((resolve) => 
            this.on("selectionMade", (selction) => resolve(selction))
        );
    }

    private onSelect(index: number): void{
        this.setEnabled(false);
        this.selection = index;
        this.emit("selectionMade", index);
    }

    private setEnabled(enabled: boolean): void{
        const alpha = enabled ? 1.00 : 0.50;
        this._colourOptions.forEach(option => {
            option.interactive = option.buttonMode = enabled;
            option.alpha = alpha;
        });

    }
}