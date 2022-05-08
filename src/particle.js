import anime from 'animejs';
import {NS} from "./consts";

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

        const {totalLen} = this.opts;

        this.animationMovement = anime({
            targets: this.animationTarget,
            pointAtLen: totalLen,
            loop: true,
            duration: 120000,
            easing: 'linear',
            update: () => {
                const point = (this.opts.currentPoint + this.animationTarget.pointAtLen) % totalLen;
                this.setPosition(this.getPosition(point))
            }
        })
    }

    stop() {
        // Because we start animation with delay, animation may not be inited, but can be stopped manually;
        if (!this.animationMovement) return;

        this.animationMovement.pause();
    }

    animateParticle() {
        this.isAnimated = true;

        anime({
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
                this.$group.setAttribute('opacity', this.animationTarget.opacity)
                this.$circle1.setAttribute('transform', `scale(${this.animationTarget.scale})`);
                this.$circle2.setAttribute('transform', `scale(${this.animationTarget.scale})`);
            }
        })
    }

    createElement(){
        this.$group = document.createElementNS(NS, 'g');
        this.$circle1 = document.createElementNS(NS, 'circle');
        this.$circle2 = document.createElementNS(NS, 'circle');

        this.$circle1.setAttribute('r', '3px');
        this.$circle1.setAttribute('fill', '#fff');

        this.$circle2.setAttribute('r', '8px');
        this.$circle2.setAttribute('fill', this.opts.color);
        this.$circle2.setAttribute('opacity', .3);

        this.$group.appendChild(this.$circle2);
        this.$group.appendChild(this.$circle1);
        this.$group.setAttribute('opacity', 0);
        this.$svg.appendChild(this.$group);
    }
}
