import tabs  from './modules/tabls'
import modal, { showModalWindow }  from './modules/modal'
import timer  from './modules/timer'
import cards  from './modules/cards'
import calc from './modules/calculator'
import slider  from './modules/slider'
import forms from './modules/form'


window.addEventListener('DOMContentLoaded',()=>{
    const modalTimerId = setTimeout(()=>showModalWindow('.modal',modalTimerId), 600000);

    // const tabs = require('./modules/tabls')
    // const modal = require('./modules/modal')
    // const timer = require('./modules/timer')
    // const cards = require('./modules/cards')
    // const calc = require('./modules/calculator')
    // const slider = require('./modules/slider')
    // const forms=require('./modules/form')


    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active')
    modal('[data-modal]','.modal',modalTimerId)
    timer('.timer','2021-08-11')
    cards()
    calc()
    forms('form',modalTimerId)
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    })

})