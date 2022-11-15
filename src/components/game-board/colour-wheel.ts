import gsap from "gsap";
import { Container, Graphics, Sprite } from "pixi.js";
import { getTexture } from "../../asset-loader";
import { gameConfig } from "../../config";
import { randomFloat, randomInt } from "../../utils";

const TAU = Math.PI * 2;

export class ColourWheel extends Container {

    private _cycleTL: gsap.core.Timeline;
    private _spinner: Graphics;
    private _frame: Sprite;

    private _rotationStep: number;
    
    constructor(){
        super();
        const { radius } = gameConfig.disc;

        this._spinner = new Graphics();

        const colourCount = gameConfig.colours.length;
        this._rotationStep = TAU / colourCount;
        const halfStep = this._rotationStep / 2;

        // construct a graphic representing the spinner disc
        let index = 0;
        for ( let i = 0; i < TAU; i+=this._rotationStep ){
            this._spinner.beginFill(gameConfig.colours[index])
            .drawPolygon([
                { x: 0, y: 0 },
                { x: Math.sin(i + halfStep) * radius, y: Math.cos(i + halfStep) * radius },
                { x: Math.sin(i           ) * radius, y: Math.cos(i           ) * radius },
                { x: Math.sin(i - halfStep) * radius, y: Math.cos(i - halfStep) * radius },
            ]);
            index++;
        }
        this._spinner.beginFill(0xcccccc).drawCircle(0,0,50);

        this._frame = new Sprite(getTexture("pointer"));
        this._frame.anchor.set(0.50, 0.00);

        this.addChild(this._spinner, this._frame);
    }

    public async cycleTo(targetIndex: number): Promise<void>{
        const { spinsMin, spinsMax, missMin, missMax } = gameConfig.disc;

        // calculate how far the selected index is from the top
        const currentIndex = (this._spinner.rotation / this._rotationStep);
        const gap = TAU - ((currentIndex * this._rotationStep) % TAU);

        // get end rotation
        const endRotation = 
            this._spinner.rotation + gap + // correct for the last spin
            (targetIndex * this._rotationStep) + // add rotation to the target
            (randomInt(spinsMin, spinsMax) * TAU); // add full spins
            
        // get first stop position, we miss on purpose
        const sign = Math.random() < 0.5 ? -1 : 1;
        const missRotation = (this._rotationStep * randomFloat(missMin, missMax));
        const firstRotation = endRotation + missRotation * sign;


        // these values should be propotional to rotation but have been capped at 2 seconds to meet spec
        const spinDuration = 1.50; 
        const correctionDuration = 0.50; 
 
        await new Promise<void>((resolve) => {
            this._cycleTL?.progress(1); // skip the last cycle if there is one somehow playing
            this._cycleTL = gsap.timeline({ onComplete: resolve })
                .to(this._spinner, { duration: spinDuration, rotation: firstRotation })
                .to(this._spinner, { duration: correctionDuration, rotation: endRotation, ease: "elastic.out(1, 0.5)" });
        });
   }

}