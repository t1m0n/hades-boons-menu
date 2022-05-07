import dash from "./img/divine-dash.png";
import flourish from "./img/divine-flourish.png";
import athenasAid from "./img/athenas-aid.png";

export const NS = 'http://www.w3.org/2000/svg';

export const BORDER_COLORS = {
    top: [
        {color: '#B8F1AF', start: 0},
        {color: '#84EC1F', start: .09},
        {color: '#2CDEDE', start: .18},
        {color: '#AFD5EF', start: .3},
        {color: '#D7A3DD', start: .36},
        {color: '#84EC1F', start: .51},
        {color: '#9FBFD4', start: .57},
        {color: '#22E3DD', start: .6},
        {color: '#CFD556', start: .64},
        {color: '#F5ED8A', start: .71},
    ],
    right: [
        {color: '#F5ED8A', start: 0},
        {color: '#BCE3B1', start: .94},
    ],
    bottom: [
        {color: '#89F226', start: 0},
        {color: '#FBF48A', start: .05},
        {color: '#F3F36F', start: .17},
        {color: '#B5F0AF', start: .29},
        {color: '#F0B3F7', start: .38},
        {color: '#E4E57C', start: .5},
        {color: '#D7A2DD', start: .69},
        {color: '#BCE3B1', start: .94},
    ],
    left: [
        {color: '#B8F1AF', start: 0},
        {color: '#ECEA7D', start: .25},
        {color: '#7ADF13', start: .62},
        {color: '#FBF48A', start: .82},
        {color: '#89F226', start: .95},
    ]
}

export const BOONS = [
    {
        title: 'Divine Dash',
        img: dash,
        description: 'Your <strong>Dash</strong>  deals damage and can <strong>Deflect</strong>.',
        bonus: 'Dash Damage',
        bonusAmount: '10'
    },
    {
        title: 'Divine Flourish',
        img: flourish,
        description: 'Your <strong>Special</strong> is stronger, and can <strong>Deflect</strong>.',
        bonus: 'Special Damage',
        bonusAmount: '+60%'
    },
    {
        title: 'Athena\'s Aid',
        img: athenasAid,
        description: 'Your <strong>Call</strong> briefly makes you  <strong>Invulnerable</strong> and  <strong>Deflect</strong> all attacks.',
        bonus: 'Special Damage',
        bonusAmount: '+60%'
    }
]
