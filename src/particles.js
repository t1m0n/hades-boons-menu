import Particle from './particle';

export default class Particles {
    particles = [];
    totalCount = 30;
    currentPick = [];

    constructor($path, opts) {
        this.$path = $path;
        this.totalLen = this.$path.getTotalLength();
        this.opts = {...opts};

        this.init();
    }

    init(){
        this.createParticles();
        this.animateParticles();
    }


    pickRandom() {
        let count = 5;
        while(count) {
            this.currentPick.push(Math.round(Math.random() * this.totalCount))
            count -= 1;
        }
    }

    animateParticles() {
        this.pickRandom();
        this.currentPick.forEach(id => {
            const particle = this.particles.find(p => p.id === id);

            if (particle && !particle.isAnimated) {
                particle.animateParticle();
            }
        })

        setTimeout(() => {
            window.requestAnimationFrame(this.animateParticles.bind(this))
        }, 1500)
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
                    particleTransform: this.opts.particleTransform
                }),
            );
            count -= 1;
        }
    }
}
