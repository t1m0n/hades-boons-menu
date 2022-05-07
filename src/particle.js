import anime from 'animejs';

const ns = 'http://www.w3.org/2000/svg';

const random255 = () => {
    return Math.round(Math.random() * 255);
}

export default class Particle {
    animationTarget = {
        pointAtLen: 0,
        opacity: 0,
        scale: 0.5
    }
    id;

    constructor(opts) {
        this.$svg = opts.$svg;
        this.opts = {...opts};
        this.id = opts.id;
        this.init();
    }

    init() {
        this.createElement();
        this.setPosition(this.getPosition(this.opts.currentPoint));
        this.move();
    }

    getPosition(point){
        const {x, y} = this.opts.$path.getPointAtLength(point ?? this.animationTarget.pointAtLen);

        return {x, y}
    }

    setPosition({x, y}){
        this.$group.setAttribute('transform', `translate(${x} ${y})`)
    }

    move(){
        this.animationMovement = anime({
            targets: this.animationTarget,
            pointAtLen: this.opts.totalLen,
            loop: true,
            duration: 40000,
            easing: 'linear',
            update: () => {
                const point = (this.opts.currentPoint + this.animationTarget.pointAtLen) % this.opts.totalLen;
                this.setPosition(this.getPosition(point))
                this.$group.setAttribute('opacity', this.animationTarget.opacity)
                this.$circle1.setAttribute('transform', `scale(${this.animationTarget.scale})`);
            }
        })
    }

    animateParticle() {
        this.isAnimated = true;
        this.animationVisual = anime({
            targets: this.animationTarget,
            duration: 4000,
            easing: 'easeInOutCubic',
            opacity: 1,
            scale: 1,
            direction: 'alternate',
            complete: () => {
                this.isAnimated = false;
            }
        })
    }

    createElement(){
        this.$group = document.createElementNS(ns, 'g');
        this.$circle1 = document.createElementNS(ns, 'circle');

        this.$circle1.setAttribute('r', '8px');
        this.$circle1.setAttribute('fill', `rgb(${random255()}, ${random255()}, ${random255()})`);

        this.$group.appendChild(this.$circle1);
        this.$svg.appendChild(this.$group);
    }
}
