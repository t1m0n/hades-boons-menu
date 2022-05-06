import './base.scss';
import MenuItem from './menuItem';
import flourish from './img/divine-flourish.png';

new MenuItem('.menu-item', {
    content: {
        title: 'Divine Flourish',
        img: flourish,
        description: 'Your <strong>Special</strong> is stronger, and can <strong>Deflect</strong>',
        bonus: 'Special Damage',
        bonusAmount: '+60%'
    }
})

