import anime from 'animejs';

const ns = 'http://www.w3.org/2000/svg';

export default class Particle {
    animationTarget = {
        pointAtLen: 0,
        opacity: 0,
        scale: 0
    }
    id;

    constructor(opts) {
        this.$svg = opts.$path.closest('svg');
        this.opts = {...opts};
        this.id = opts.id;
        this.init();
    }

    init() {
        this.createElement();
        this.setPosition(this.getPosition(this.opts.currentPoint));
        // this.move();
    }

    getPosition(point){
        const {x, y} = this.opts.$path.getPointAtLength(point ?? this.animationTarget.pointAtLen);

        return {x, y}
    }

    setPosition({x, y}){
        const {particleTransform} = this.opts;
        this.$group.setAttribute('transform', `translate(${x + particleTransform} ${y + particleTransform})`)
    }

    move(){
        if (this.animationMovement) {
            this.animationMovement.play();
            return;
        }
        this.animationMovement = anime({
            targets: this.animationTarget,
            pointAtLen: this.opts.totalLen,
            loop: true,
            duration: 120000,
            easing: 'linear',
            update: () => {
                const point = (this.opts.currentPoint + this.animationTarget.pointAtLen) % this.opts.totalLen;
                this.setPosition(this.getPosition(point))
                this.$group.setAttribute('opacity', this.animationTarget.opacity)
                this.$circle1.setAttribute('transform', `scale(${this.animationTarget.scale})`);
                this.$circle2.setAttribute('transform', `scale(${this.animationTarget.scale})`);
            }
        })
    }

    stop() {
        this.animationMovement.pause();
    }

    animateParticle() {
        console.log('animate');
        this.isAnimated = true;
        this.animationVisual = anime({
            targets: this.animationTarget,
            duration: this.opts.animationDuration,
            easing: 'easeInOutCubic',
            opacity: 1,
            scale: 1,
            direction: 'alternate',
            complete: () => {
                this.isAnimated = false;
            },
            update: () => {

            }
        })
    }

    createElement(){
        this.$group = document.createElementNS(ns, 'g');
        this.$circle1 = document.createElementNS(ns, 'circle');
        this.$circle2 = document.createElementNS(ns, 'circle');
        this.$group.classList.add('menu-item--circle-group');

        this.$circle1.setAttribute('r', '3px');
        this.$circle1.setAttribute('fill', `rgba(255, 255, 255, .4)`);
        this.$circle2.setAttribute('r', '6px');
        this.$circle2.setAttribute('fill', `rgba(255, 255, 255, .4)`);

        this.$group.appendChild(this.$circle1);
        this.$group.appendChild(this.$circle2);
        this.$group.setAttribute('opacity', 0);
        this.$svg.appendChild(this.$group);
    }
}
