import Particle from './particle';

export default class Particles {
    particles = [];
    currentPick = [];
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
        // this.animateParticles();
    }


    pickRandom() {
        let count = 5;
        while(count) {
            this.currentPick.push(Math.round(Math.random() * this.totalCount))
            count -= 1;
        }
    }

    moveParticles() {
        clearTimeout(this.stopTimeoutId);

        this.particles.forEach(p => p.move());
        this.animateParticles();
    }

    stopParticles() {
        clearTimeout(this.circleAnimationTimeoutId);
        this.stopTimeoutId = setTimeout(() => {
            this.particles.forEach(p => p.stop());
        }, this.pickRandomInterval + this.particleAnimationDuration)
    }

    animateParticles() {
        this.currentPick = [];
        this.pickRandom();
        this.currentPick.forEach(id => {
            const particle = this.particles.find(p => p.id === id);

            if (particle && !particle.isAnimated) {
                particle.animateParticle();
            }
        })

        this.circleAnimationTimeoutId = setTimeout(() => {
            this.circleAnimationRaf = window.requestAnimationFrame(this.animateParticles.bind(this))
        }, this.pickRandomInterval)
    }

    createParticles() {
        let count = this.totalCount;
        while(count) {
            this.particles.push(
                new Particle({
                    id: count,
                    $path: this.$path,
                    totalLen: this.totalLen,
                    speed: Math.random(),
                    currentPoint: Math.random() * this.totalLen,
                    particleTransform: this.opts.particleTransform,
                    animationDuration: this.particleAnimationDuration,
                }),
            );
            count -= 1;
        }
    }
}
