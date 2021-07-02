const form = require('./modules/form')

window.addEventListener('DOMContentLoaded',()=>{
   
    const tabs = require('./modules/tabls')
    const modal = require('./modules/modal')
    const timer = require('./modules/timer')
    const cards = require('./modules/cards')
    const calc = require('./modules/calculator')
    const slider = require('./modules/slider')
    const forms=require('./modules/form')

    tabs()
    modal()
    timer()
    cards()
    calc()
    forms()
    slider()

})