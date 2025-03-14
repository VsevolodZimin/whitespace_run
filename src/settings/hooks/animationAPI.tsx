export type AnimationTiming = {
    duration: number,
    delay?: number,
    easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out',
    iterations?: number,
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse',
    fill?: 'none' | 'forwards' | 'backwards' | 'both'
}

async function AnimationAPI(){
    const animationSetings = [
        { transform: "", color: "" },
        { color: "", offset: 0.3 },
        { transform: "", color: "" }
    ]
    
    const animationTiming: {duration: number, iteration: number, fill: FillMode, easing: string} = {
        duration: 3000,
        iteration: Infinity, 
        fill: "forwards",
        easing: "linear"
    }
    const animation = document.body.animate(animationSetings, animationTiming);
    
    animation.play();
    animation.pause();
    animation.finish();
    animation.cancel();
    animation.reverse(); // sets the animation's playback rate (Animation.playbackRate) to a negative valkue so it runs backwards
    animation.finished;
    animation.playbackRate = -1 //will run backwards at the x1 speed
    animation.updatePlaybackRate(-1) //will run backwards at the x1 speed (but smoother)
    animation.currentTime // write/read property

    await animation.finished;
    animation.commitStyles();
    animation.cancel();

    document.body.getAnimations()

    animation.effect?.getTiming().duration
    animation.effect?.getComputedTiming().duration
}
