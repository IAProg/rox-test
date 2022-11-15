import gsap from "gsap";

export async function asyncTween (targets: gsap.TweenTarget, vars: gsap.TweenVars): Promise<void>{
    return new Promise(resolve => {
        vars.onComplete = () => {
            vars.onComplete && (() => vars.onComplete());
            resolve();
        }
        gsap.to(targets, vars)
    });
}

export const delay = (ms: number) => new Promise<void>(
    (resolve) => setTimeout(resolve, ms)
);

export function randomFloat(min: number, max: number): number {
    return (Math.random() * (max - min)) + min;
}

export function randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}