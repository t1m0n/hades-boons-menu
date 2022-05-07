import Particle from './particle';
import {BORDER_COLORS} from "./consts";

const particleColors = [...BORDER_COLORS.top.map(({color}) => color), '#fff'];

export default class Particles {
    particles = [];
    currentIdPick = [];
    totalCount = 20;
    pickRandomInterval = 1000;
    particleAnimationDuration = 1500;


    constructor($path, opts) {
        this.$path = $path;
        this.totalLen = this.$path.getTotalLength();
        this.opts = {...opts};

        this.init();
    }

    init(){
        this.createParticles();
    }

    pickRandom() {
        let count = 5;
        while(count) {
            this.currentIdPick.push(Math.round(Math.random() * this.totalCount))
            count -= 1;
        }
    }

    startAnimation = () => {
        clearTimeout(this.stopTimeoutId);

        this.particles.forEach(p => p.move());
        this.animateParticles();
    }

    stopAnimation = () => {
        clearTimeout(this.circleAnimationTimeoutId);
        clearTimeout(this.stopTimeoutId);

        // Stop animation with delay. Allow particles to disappear
        this.stopTimeoutId = setTimeout(() => {
            this.particles.forEach(p => p.stop());
        }, this.pickRandomInterval + this.particleAnimationDuration)
    }

    animateParticles() {
        this.currentIdPick = [];
        this.pickRandom();

        this.currentIdPick.forEach(id => {
            const particle = this.particles.find(p => p.id === id);

            if (particle && !particle.isAnimated) {
                particle.animateParticle();
            }
        })

        this.circleAnimationTimeoutId = setTimeout(() => {
            window.requestAnimationFrame(this.animateParticles.bind(this))
        }, this.pickRandomInterval)
    }

    createParticles() {
        let count = this.totalCount;
        while(count) {
            const randomColorIndex = Math.floor(Math.random() * particleColors.length);
            const shouldBeColored = Math.random() < .4;
            this.particles.push(
                new Particle({
                    id: count,
                    $path: this.$path,
                    color: particleColors[randomColorIndex],
                    totalLen: this.totalLen,
                    currentPoint: Math.random() * this.totalLen,
                    particleTransform: this.opts.particleTransform,
                    animationDuration: this.particleAnimationDuration,
                }),
            );
            count -= 1;
        }
    }
}
