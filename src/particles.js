import Particle from './particle';

export default class Particles {
    particles = [];
    totalCount = 20;
    currentPick = [];

    constructor() {
        this.init();
    }

    init(){
        this.defineDOM();
        this.createParticles();
        this.animateParticles();
    }

    defineDOM() {
        this.$el = document.querySelector('.svg');
        this.$path = this.$el.querySelector('path');
        this.totalLen = this.$path.getTotalLength();
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
        }, 3000)
    }

    createParticles() {
        let count = this.totalCount;
        while(count) {
            this.particles.push(
                new Particle({
                    id: count,
                    $path: this.$path,
                    $svg: this.$el,
                    totalLen: this.totalLen,
                    speed: Math.random(),
                    currentPoint: Math.random() * this.totalLen
                }),
            );
            count -= 1;
        }
    }
}
