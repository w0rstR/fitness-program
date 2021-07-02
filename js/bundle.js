/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
﻿function calculator(){

    // Calculator

    const result = document.querySelector('.calculating__result span')
    
    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')){
        sex=localStorage.getItem('sex')
    }else{
        sex='female'
        localStorage.setItem('sex','female')
    }

    if(localStorage.getItem('ratio')){
        ratio=localStorage.getItem('ratio')
    }else{
        ratio=1.375
        localStorage.setItem('ratio',1.375)
    }
    
    function calculateTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent="________"
            return;
        }

        if(sex==='female'){
            result.textContent=Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age))*ratio)
        }else{
            result.textContent=Math.round((88.36 + (13.4*weight) + (4.8 * height) - (5.7 *age))*ratio)
        }
    }
    calculateTotal()

    function initLocalSettings(selector,activeClass){
        const elements = document.querySelectorAll(selector)

        elements.forEach(element=>{
            element.classList.remove(activeClass)
            if(element.getAttribute('id') === localStorage.getItem('sex')){
                element.classList.add(activeClass)
            }

            if(element.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                element.classList.add(activeClass)
            }
        })
        
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
    
    

    function getStaticInformation(selector,activeClass){
        
        const elements = document.querySelectorAll(selector);

        elements.forEach(element=>{
            element.addEventListener('click',(event)=>{
                if(event.target.getAttribute('data-ratio')){
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'))
                }else{
                    sex=event.target.getAttribute('id')
                    localStorage.setItem('sex',event.target.getAttribute('id'))
                }

                elements.forEach(elem=>{
                    elem.classList.remove(activeClass)
                })

                event.target.classList.add(activeClass)

                calculateTotal();
            })
        })
      

        // other option with BUG
        // document.querySelector(parentSelector).addEventListener('click',(event)=>{
        //     if(event.target.getAttribute('data-ratio')){
        //         ratio= +event.target.getAttribute('data-ratio')
        //     }else{
        //         sex = event.target.getAttribute('id')
        //     }

        //     console.log(ratio)
        //     console.log(sex)3
            
        //     elements.forEach(elem=>{
        //         elem.classList.remove(activeClass)
        //     })
        //     event.target.classList.add(activeClass)
            
        //     calculateTotal()
        // })
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    function getDynamicInformation(selector){
        const input = document.querySelector(selector)

        input.addEventListener('input',()=>{

            if(input.value.match(/\D/g)){//не число
                input.style.border='1px solid red'
            }else{
                input.style.border='none'
            }
            switch(input.getAttribute('id')){
                case 'height':
                    height=+input.value
                    break;
                case 'weight':
                    weight=+input.value
                    break
                case 'age':
                    age=+input.value
                    break
            }
            calculateTotal()
        })
        
    }

    getDynamicInformation('#height')
    getDynamicInformation('#weight')
    getDynamicInformation('#age')
}

// module.exports = calculator

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
﻿
function cards(){
    class MenuCard{
        constructor(src,alt,title,descr,price,perentSelector,...classes) {
            this.src=src;
            this.alt=alt;
            this.title=title;
            this.descr=descr;
            this.price=price;
            this.classes=classes
            this.parent=document.querySelector(perentSelector)
            this.transfer=27;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');
            if(this.classes.length ===0){
                this.element='menu__item'
                element.classList.add(this.element)
            }else{
                this.classes.forEach(className=>{
                    element.classList.add(className)
                })
            }
            
            element.innerHTML=`
            
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element)
        }
    }

    // перенис в папку services
    // const getResource = async (url)=>{
    //     const result = await fetch(url)

    //     if(!result.ok){
    //         throw new Error(`Could not fetch ${url}, status:${result.status}`)
    //     }
    //     return await result.json()
    // }

    ////////
    // getResource('http://localhost:3000/menu')
    // .then(data=>{
    //     data.forEach(({img,altimg,title,descr,price})=>{
    //         new MenuCard(img,altimg,title,descr,price, '.menu .container').render()
    //     })
    // })
    ///////////

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data=>createCard(data))

    // axios.get('http://localhost:3000/menu')
    // .then(data=>console.log(data))
    
    // axios.get('http://localhost:3000/menu')
    //     .then(data=>{
    //         data.data.forEach(({img,altimg,title,descr,price})=>{
    //             new MenuCard(img,altimg,title,descr,price,'.menu .container').render();
    //         })
    //     })

    function createCard(data){
        data.forEach(({img,altimg,title,descr,price})=>{
            const element = document.createElement('div')
            element.classList.add('menu__item')

            element.innerHTML=`
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `
            document.querySelector('.menu .container').append(element)
        })

        
    }
}

// module.exports = cards;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

// new MenuCard(
    //     "img/tabs/elite.jpg",
    //     'elite',
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     9,
    //     '.menu .container',
    //     //'menu__item',
    // ).render() 

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
﻿

function form(formSelector,modalTimerId){
    const forms= document.querySelectorAll(formSelector)


    const message={
        loading:'../img/form/spinner.svg',
        success:'Спасибо! Скоро мы свами свяжемся',
        failuere: 'Что--то пошло не так...'
    }

    forms.forEach(item=>{
        bindPostData(item);
    })

    // function postData(form){
    //     form.addEventListener('submit',(event)=>{
    //         event.preventDefault();

    //         const statusMessage = document.createElement('img')
    //         statusMessage.src = message.loading
    //         statusMessage.style.cssText= "display:block; margin:0 auto;"
    //         //form.append(statusMessage);
    //         form.insertAdjacentElement('afterend',statusMessage)


    //         ///////////////////////////////////////////////////
    //         // const request = new XMLHttpRequest();
    //         // request.open('POST','../server.php')
    //         // //request.setRequestHeader('Content-type','multipart//form-data')
    //         // const formData = new FormData(form)

    //         // FOR JSON 
    //         const request = new XMLHttpRequest();

    //         request.open('POST','../server.php')
    //         request.setRequestHeader('Content-type','application/json')
    //         const formData= new FormData(form);
            
    //         const object={}
    //         formData.forEach(function(value,key){
    //             object[key]=value
    //         })
    //         const json = JSON.stringify(object)

    //         request.send(json)
    //         request.addEventListener('load',()=>{
    //             if(request.status === 200){
    //                 console.log(request.response)
    //                 showThanksModal(message.success)
    //                 form.reset();
    //                 statusMessage.remove(); 
    //             }else{
    //                 showThanksModal(message.failuere)
    //             }
    //         })
        
    //     })
    // }

    // переніс в папаку services
    // const postData = async(url, data)=>{
    //     const result = await fetch(url,{
    //         method:'POST',
    //         headers:{
    //             'Content-type': 'application/json'
    //         },
    //         body:data
    //     })

    //     return  await result.json()
    // }


    function bindPostData(form){
        // USING FETCH
        // 2 There are two options for sending data
        // 1 - formdata
        // 2 - json
        form.addEventListener('submit',(event)=>{
            event.preventDefault();

            const statusMessage = document.createElement('img')
            statusMessage.src = message.loading
            statusMessage.style.cssText= "display:block; margin:0 auto;"
            
            form.insertAdjacentElement('afterend',statusMessage)
            const formData=new FormData(form);

            // Convert FormData to JSON
            // const object={}
            // formData.forEach(function(value,key){
            //     object[key]=value
            // })

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

           
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests',json)
            .then(data=>{
                console.log(data)
                showThanksModal(message.success)
                statusMessage.remove()
            }).catch(()=>{
                showThanksModal(message.failuere)
            }).finally(()=>{
                form.reset()
            })
        })
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog')
        prevModalDialog.classList.add('hide');

        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModalWindow)('.modal',modalTimerId);

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `

        document.querySelector('.modal').append(thanksModal)
        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.classList.add('show')
            prevModalDialog.classList.remove('hide')
            ;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModalWindow)('.modal')
        }, 4000);
    }
}

// module.exports = form

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModalWindow": () => (/* binding */ closeModalWindow),
/* harmony export */   "showModalWindow": () => (/* binding */ showModalWindow)
/* harmony export */ });
﻿function closeModalWindow(modalSelector){
    const modalWindow=document.querySelector(modalSelector)
    modalWindow.classList.add('hide')
    modalWindow.classList.remove('show')
    document.body.style.overflow=''

}

function showModalWindow(modalSelector,modalTimerId){
    const modalWindow = document.querySelector(modalSelector)
    modalWindow.classList.add('show')
    modalWindow.classList.remove('hide')
    document.body.style.overflow='hidden'

    console.log(modalTimerId)
    if(modalTimerId){
        clearInterval(modalTimerId)
    }
    //clearInterval(modalTimerId)
}

function modal(triggerSelector,modalSelector,modalTimerId){
    const modalTrigger=document.querySelectorAll(triggerSelector)
    const modalWindow=document.querySelector(modalSelector)
    //const modalCloseBtn=document.querySelector('[data-close]')

    // const modalTimerId=setTimeout(showModalWindow, 600000);

    // function closeModalWindow(){
    //     modalWindow.classList.add('hide')
    //     modalWindow.classList.remove('show')
    //     document.body.style.overflow=''
    //     clearInterval(modalTimerId)
    // }

    // function showModalWindow(){
    //     modalWindow.classList.add('show')
    //     modalWindow.classList.remove('hide')
    //     document.body.style.overflow=''
    // }

    modalTrigger.forEach(btn=>{
        btn.addEventListener('click',()=>showModalWindow(modalSelector,modalTimerId))
    })

    //modalCloseBtn.addEventListener('click',closeModalWindow)

    modalWindow.addEventListener('click',(event)=>{
        if(event.target === modalWindow && event.target.getAttribute('data-close')==''){
            closeModalWindow(modalSelector)
        }
    })

    document.addEventListener('keydown',(event)=>{
        if(event.code === "Escape" && modalWindow.classList.contains('show')){
            closeModalWindow(modalSelector)
        }
    })

    function showModayWindowByScroll(){
        if(window.pageYOffset+document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModalWindow(modalSelector,modalTimerId)
            window.removeEventListener('scroll',showModayWindowByScroll)
        }
    }

    window.addEventListener('scroll',showModayWindowByScroll)

}

// module.exports = modal

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
﻿function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field}){
    const slides=document.querySelectorAll(slide)
    const btnNext=document.querySelector(nextArrow)
    const btnPrev=document.querySelector(prevArrow)
    let slideIndex=1
    const total = document.querySelector(totalCounter)
    const current=document.querySelector(currentCounter)
    const slidesWrapper = document.querySelector(wrapper)
    const slidesField=document.querySelector(field)
    const width=window.getComputedStyle(slidesWrapper).width
    let offset=0
    const slider=document.querySelector(container)
    //THE SECOND OPTION
    
    // showSlides()
    // if(slides.length<10){
    //     total.textContent=`0${slides.length}`
    // }else{
    //     total.textContent=`${slides.length}`
    // }
    // function showSlides(index){
    //     if(index>slides.length){
    //         slideIndex=1
    //     }

    //     if(index<1){
    //         slideIndex=slides.length
    //     }

    //     slides.forEach(slide=>{
    //         slide.classList.add('hide')
    //     })

    //     slides[slideIndex-1].classList.remove('hide')

    //     if(slides.length<10){
    //         current.textContent=`0${slideIndex}`
    //     }else{
    //         current.textContent=slideIndex
    //     }
    // }

    // function plusSlide(n){
    //     showSlides(slideIndex+=n)
    // }

    // btnNext.addEventListener('click',()=>{
    //     plusSlide(1)
    // })
    // btnPrev.addEventListener('click',()=>{
    //     plusSlide(-1)
    // })

    //////////////////////////////////////////////////
    // THE FIRST OPTION
    // slides.forEach(slide=>{
    //     console.log(slide)
    // })

    // slides.forEach(slide=>{
    //     slide.classList.add('hide')
    // })
    // slides[0].classList.remove('hide')

    

    // btnNext.addEventListener('click',()=>{
    //     slideIndex++
    //     if(slideIndex>2){
    //         slideIndex=0
    //     }
    //     slides.forEach(slide=>{
    //         slide.classList.add('hide')
    //     })
    //     slides[slideIndex].classList.remove('hide')
    // })

    // btnPrev.addEventListener('click',()=>{
    //     slideIndex--
    //     if(slideIndex<0){
    //         slideIndex=2
    //     }
    //     slides.forEach(slide=>{
    //         slide.classList.add('hide')
    //     })
    //     slides[slideIndex].classList.remove('hide')
    // })
    ////

    // The OTHER OPTION

    function deleteNotDigits(str){
        return +str.replace(/\D/g,'')
    }

    if(slides.length<10){
        total.textContent=`0${slides.length}`
        current.textContent=`0${slideIndex}`
    }else{
        total.textContent=sldes.length
        current.textContent=slideIndex
    }

    slidesField.style.width= 100 * slides.length + '%'
    slidesField.style.display='flex'
    slidesField.style.transition='0.5s all'

    slidesWrapper.style.overflow='hidden'

    slides.forEach(slide=>{
        slide.style.width=width
    })

    slider.style.position='relative'

    const indicators = document.createElement('ol')
    const dots =[]
    indicators.classList.add('carousel-indicators')
    indicators.style.cssText =`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `
    slider.append(indicators)
    for(let i=0;i<slides.length;i++){
        const dot = document.createElement('li')
        dot.setAttribute('data-slide-to',i+1)
        dot.style.cssText=`
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `
        if(i==0){
            dot.style.opacity=1;
        }
        indicators.append(dot)
        dots.push(dot)
    }


    btnNext.addEventListener('click',()=>{
        if(offset == deleteNotDigits(width) *  (slides.length-1)){
            offset=0
        }else{
            offset += deleteNotDigits(width)
        }
        slidesField.style.transform=`translateX(-${offset}px)`

        if(slideIndex == slides.length){
            slideIndex=1;
        }else{
            slideIndex++
        }

        if(slides.length<10){
            current.textContent=`0${slideIndex}`
        }else{
            current.textContent=slideIndex
        }

        dots.forEach(dot=>{
            dot.style.opacity=`.5`
        })
        dots[slideIndex-1].style.opacity=1;
    })

    btnPrev.addEventListener('click',()=>{
        if(offset==0){
            offset =deleteNotDigits(width)*(slides.length-1)
        }else{
            offset -= deleteNotDigits(width)
        }
        slidesField.style.transform=`translateX(-${offset}px)`

        if(slideIndex == 1){
            slideIndex=slides.length
        }else{
            slideIndex--
        }

        if(slides.length<10){
            current.textContent=`0${slideIndex}`
        }else{
            current.textContent=slideIndex
        }

        dots.forEach(dot=>{
            dot.style.opacity='0.5'
        })
        dots[slideIndex].style.opacity=1
    })

    dots.forEach(dot=>{
        dot.addEventListener('click',(event)=>{
            const slideTo=event.target.getAttribute('data-slide-to')

            slideIndex=slideTo
            offset = deleteNotDigits(width)*(slideTo-1);
            slidesField.style.transform=`translateX(-${offset}px)`



            dots.forEach(dot=>{
                dot.style.opacity='.5'  
            })
            dots[slideIndex-1].style.opacity=1
        })
    })
}

// module.exports = slider
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabls.js":
/*!*****************************!*\
  !*** ./js/modules/tabls.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
﻿function tabs(tabsSelector,tabsContentSelector,tabsParentSelector,activeClass){
    const tabs = document.querySelectorAll(tabsSelector)
    const tubcontent=document.querySelectorAll(tabsContentSelector)
    const tubsParent = document.querySelector(tabsParentSelector)

    function hideAllTabContent(){
        tubcontent.forEach((item)=>{
            item.classList.add('hide')
            item.classList.remove('show','fade')
        })

        tabs.forEach((tub)=>{
            tub.classList.remove(activeClass);
        })
    }

    function showTubContent(i){
        tubcontent[i].classList.add('show','fade');
        tubcontent[i].classList.remove('hide')
        tabs[i].classList.add(activeClass)

    }
    hideAllTabContent()
    showTubContent(0)

   tubsParent.addEventListener('click',(event)=>{
        const target=event.target
        if(target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((tab,i)=>{
                if(tab==target){
                    hideAllTabContent()
                    showTubContent(i)
                }
            })
        }
   })
}

// module.exports = tabs;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
﻿function timer(id,deadline){
    
   function getTimerRemaining(endtime){
       const time = Date.parse(endtime)  - Date.parse(new Date())// к-сть мил. секунд - текущую дату в мил. секундах

       const days=Math.floor(time/(1000 * 60 * 60 * 24 ))
       const hours=Math.floor((time / 1000 * 60 * 60) % 24)
       const minutes = Math.floor((time / 1000 / 60) % 60)
       const seconds=Math.floor((time / 1000) % 60)

       return{
           'total':time,
           'days':days,
           'hours':hours,
           'minutes':minutes,
           'seconds':seconds
       }
    }

    function getZero(num){
        if(num>=0 && num <10){
            return `0${num}`
        }else{
            return num
        }
    }

    function setClock(selector,endtime){
        const timer=document.querySelector(selector)
        const days=timer.querySelector('#days')
        const hours=timer.querySelector('#hours')
        const minutes=timer.querySelector('#minutes')
        const seconds=timer.querySelector('#seconds')

        const timeInterval=setInterval(updateClock,1000)
        function updateClock(){
            const time = getTimerRemaining(endtime)

            days.innerHTML =getZero(time.days);
            hours.innerHTML=getZero(time.hours);
            minutes.innerHTML=getZero(time.minutes);
            seconds.innerHTML=getZero(time.seconds);

            if(time.total <=0){
                clearInterval(timeInterval)
            }
        }

    }

    setClock(id,deadline)
}

// module.exports = timer

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabls */ "./js/modules/tabls.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
﻿








window.addEventListener('DOMContentLoaded',()=>{
    const modalTimerId = setTimeout(()=>(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showModalWindow)('.modal',modalTimerId), 600000);

    // const tabs = require('./modules/tabls')
    // const modal = require('./modules/modal')
    // const timer = require('./modules/timer')
    // const cards = require('./modules/cards')
    // const calc = require('./modules/calculator')
    // const slider = require('./modules/slider')
    // const forms=require('./modules/form')


    (0,_modules_tabls__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active')
    ;(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]','.modal',modalTimerId)
    ;(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.timer','2021-08-11')
    ;(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)()
    ;(0,_modules_calculator__WEBPACK_IMPORTED_MODULE_4__.default)()
    ;(0,_modules_form__WEBPACK_IMPORTED_MODULE_6__.default)('form',modalTimerId)
    ;(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)({
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

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });


const postData = async(url, data)=>{
    const result = await fetch(url,{
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body:data
    })

    return  await result.json()
}
const getResource = async (url)=>{
    const result = await fetch(url)

    if(!result.ok){
        throw new Error(`Could not fetch ${url}, status:${result.status}`)
    }
    return await result.json()
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map