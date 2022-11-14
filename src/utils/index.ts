

export async function asyncTween (targets: gsap.TweenTarget, vars: gsap.TweenVars): Promise<void>{
    return new Promise(resolve => {
        vars.onComplete = () => {
            vars.onComplete && vars.onComplete();
            resolve();
        }
        gsap.to(targets, vars)
    });
}