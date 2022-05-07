import Particles from './particles';
import {BORDER_COLORS, NS} from "./consts";

const defaults = {
    lineWidth: 3,
    borderBlurSize: 1,
    borderRadius: 20,
    borderOffset: 2,
    particlesMaxRadius: 10,
    particlesAnimationStartDelay: 100,
    content: {}
}

class MenuItem {
    constructor(el, opts) {
        this.$el = document.querySelector(el);
        this.opts = {...defaults, ...opts};
        this.borderTransform = this.opts.borderBlurSize * 2 + this.opts.particlesMaxRadius / 2;

        this.init();
    }

    init() {
        this.computeDims();
        this.createCanvas();
        this.addFilter();
        this.makeBorderGradient();
        this.drawBorder();
        this.render();

        this.particles = new Particles(this.$particlesPath, {
            particleTransform: this.borderTransform
        })

        this.$el.addEventListener('mouseenter', this.onMouseEnter)
        this.$el.addEventListener('mouseleave', this.onMouseLeave)
    }

    createCanvas() {
        const $svg = document.createElementNS(NS, 'svg');
        const $particlesPath = document.createElementNS(NS, 'path');
        const $gradientDefs = document.createElementNS(NS, 'defs');
        const $innerBorder = document.createElement('div');
        const $content = document.createElement('div');
        const $shine = document.createElement('div');
        const $bg = document.createElement('div');
        const $glare = document.createElement('div');
        const {lineWidth, borderBlurSize, particlesMaxRadius, borderOffset} = this.opts;
        const blurSizeTwice = borderBlurSize * 2 * 2;

        $svg.classList.add('menu-item--border');
        $svg.style.setProperty('--line-width', `${lineWidth}px`);
        $svg.style.setProperty('--blur-size', `${borderBlurSize}px`);
        $svg.style.setProperty('--border-offset', `${borderOffset}px`);
        $svg.style.setProperty('--particles-max-radius', `${particlesMaxRadius}px`);
        $svg.setAttribute('width', this.width + blurSizeTwice + particlesMaxRadius);
        $svg.setAttribute('height', this.height + blurSizeTwice + particlesMaxRadius);

        $innerBorder.classList.add('menu-item--inner-border');
        $content.classList.add('menu-item--content');
        $bg.classList.add('menu-item--bg');
        $shine.classList.add('menu-item--shine');
        $glare.classList.add('menu-item--glare');
        $particlesPath.classList.add('menu-item--border-particles-path');

        this.$el.appendChild($svg);
        this.$el.appendChild($innerBorder);
        this.$el.appendChild($bg);
        this.$el.appendChild($content);
        this.$el.appendChild($shine);
        this.$el.appendChild($glare);

        $svg.appendChild($gradientDefs);

        this.$svg = $svg;
        this.$content = $content;
        this.gradientDefs = $gradientDefs;
        this.$particlesPath = $particlesPath;
    }

    computeDims() {
        const {width, height} = this.$el.getBoundingClientRect();
        const {borderOffset, lineWidth} = this.opts;

        this.width = width + lineWidth * 2 + borderOffset * 2;
        this.height = height + lineWidth * 2 + borderOffset * 2;
    }

    drawBorder() {
        const {width, height} = this;
        const {lineWidth, borderBlurSize, borderRadius, particlesMaxRadius} = this.opts;

        const $topBorder = document.createElementNS(NS, 'path');
        const $rightBorder = document.createElementNS(NS, 'path');
        const $bottomBorder = document.createElementNS(NS, 'path');
        const $leftBorder = document.createElementNS(NS, 'path');
        const {$particlesPath} = this;

        const borders = [$topBorder, $rightBorder, $bottomBorder, $leftBorder, $particlesPath];

        const y1 = lineWidth / 2;
        const y2 = height - lineWidth / 2;
        const x1 = lineWidth / 2;
        const x2 = width - lineWidth / 2;
        const offset = borderRadius;
        const offsetX2 = width - offset;
        const offsetY2 = height - offset;

        this.$svg.appendChild($topBorder);
        this.$svg.appendChild($rightBorder);
        this.$svg.appendChild($bottomBorder);
        this.$svg.appendChild($leftBorder);
        this.$svg.appendChild($particlesPath);

        // Top border
        $topBorder.setAttribute('d', `
            M ${offset},${y1}
            L ${offsetX2},${y1}
        `)
        $topBorder.setAttribute('stroke', 'url(#borderTopGradient)')

        // Right border
        $rightBorder.setAttribute('d', `
            M ${offsetX2}, ${y1}
            Q ${x2} ${y1} ${x2} ${offset} L ${x2},${offsetY2} Q ${x2} ${y2} ${offsetX2} ${y2}
        `)
        $rightBorder.setAttribute('stroke', 'url(#borderRightGradient)')

        // Left border
        $leftBorder.setAttribute('d', `
            M ${offset}, ${y1}
            Q ${x1} ${y1} ${x1} ${offset} L ${x1},${offsetY2} Q ${x1} ${y2} ${offset} ${y2}
        `)
        $leftBorder.setAttribute('stroke', 'url(#borderLeftGradient)')

        // Bottom border
        $bottomBorder.setAttribute('d', `
            M ${offset},${y2}
            L ${offsetX2},${y2}
        `)
        $bottomBorder.setAttribute('stroke', 'url(#borderBottomGradient)')

        borders.forEach($border => {
            $border.setAttribute('filter', 'url(#border-blur)')
            $border.classList.add('menu-item--border-path')
            $border.setAttribute('transform', `translate(${this.borderTransform}, ${this.borderTransform})`)
        })

        $particlesPath.setAttribute('d', `
            M ${offset},${y1} L ${offsetX2},${y1}
            Q ${x2} ${y1} ${x2} ${offset} L ${x2},${offsetY2} Q ${x2} ${y2} ${offsetX2} ${y2}
            L ${offset},${y2}
            Q ${x1} ${y2} ${x1} ${offsetY2} L ${x1} ${offset} Q ${y1} ${x1} ${offset} ${y1}
        `)
    }

    makeBorderGradient() {
        this.gradientDefs.appendChild(this.createGradient({
            colors: BORDER_COLORS.top,
            id :'borderTopGradient'
        }));
        this.gradientDefs.appendChild(this.createGradient({
            colors: BORDER_COLORS.right,
            id:'borderRightGradient',
            isVertical: true
        }));
        this.gradientDefs.appendChild(this.createGradient({
            colors: BORDER_COLORS.bottom,
            id :'borderBottomGradient'
        }));
        this.gradientDefs.appendChild(this.createGradient({
            colors: BORDER_COLORS.left,
            id:'borderLeftGradient',
            isVertical: true
        }));
    }

    createGradient({colors, id, isVertical} = {}) {
        const gradient = document.createElementNS(NS, "linearGradient");

        gradient.setAttribute('id', id)
        gradient.setAttribute('gradientUnits', 'userSpaceOnUse')

        if (isVertical) {
            gradient.setAttribute('x1', '0')
            gradient.setAttribute('x2', '0')
            gradient.setAttribute('y1', '0')
            gradient.setAttribute('y2', '100%')
        }

        colors.forEach(({start, color}, i) => {
            const prevPart = colors[i - 1];
            const stop = document.createElementNS(NS, 'stop');
            const stop2 = document.createElementNS(NS, 'stop');

            if (prevPart) {
                stop2.setAttribute('offset', `${start * 100 - 1}%`)
                stop2.setAttribute('stop-color', prevPart.color)
                gradient.appendChild(stop2)
            }

            stop.setAttribute('offset', `${start * 100}%`)
            stop.setAttribute('stop-color', color)
            gradient.appendChild(stop)
        })

        return gradient;
    }

    addFilter() {
        const {borderBlurSize} = this.opts;
        const filter = document.createElementNS(NS, 'filter');

        filter.id = 'border-blur';
        filter.setAttribute('filterUnits', 'userSpaceOnUse');

        filter.innerHTML = `
            <feOffset in="SourceGraphic" />
            <feGaussianBlur stdDeviation="${borderBlurSize}" result="BLUR"/>
            <feMerge>
                <feMergeNode in="BLUR" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        `
        this.$svg.appendChild(filter);
    }

    render() {
        const {content: {title, img, bonus, bonusAmount, description}} = this.opts;

        this.$content.innerHTML = `
            <div class="menu-item--img">
                <img src="${img}" alt="">
            </div>
            <div class="menu-item--main">
                <header class="menu-item--header">
                    <h2 class="menu-item--title">${title}</h2>
                </header>
                <div class="menu-item--description">
                    ${description}
                </div>
                <div class="menu-item--bonus">
                    <span class="menu-item--bonus-name">${bonus}:</span>
                    <span class="menu-item--bonus-amount">${bonusAmount}</span>
                </div>
            </div>
        `
    }

    onMouseEnter = () => {
        // Start animation with delay, to not spawn particles immediately on every hover
        this.startAnimationTimeout = setTimeout(
            this.particles.startAnimation,
            this.opts.particlesAnimationStartDelay
        )
    }

    onMouseLeave = () => {
        clearTimeout(this.startAnimationTimeout);
        this.particles.stopAnimation();
    }
}

export default MenuItem;
