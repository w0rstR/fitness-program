window.addEventListener('DOMContentLoaded',()=>{
   
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item')
    const tubcontent=document.querySelectorAll('.tabcontent')
    const tubsParent = document.querySelector('.tabheader__items')

    function hideAllTabContent(){
        tubcontent.forEach((item)=>{
            item.classList.add('hide')
            item.classList.remove('show','fade')
        })

        tabs.forEach((tub)=>{
            tub.classList.remove('tabheader__item_active');
        })
    }

    function showTubContent(i){
        tubcontent[i].classList.add('show','fade');
        tubcontent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')

    }
    hideAllTabContent()
    showTubContent(0)

   tubsParent.addEventListener('click',(event)=>{
        const target=event.target
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((tab,i)=>{
                if(tab==target){
                    hideAllTabContent()
                    showTubContent(i)
                }
            })
        }
   })

   // Timer

   const deadline='2021-07-01'

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

    setClock('.timer',deadline)

    // Modal window

    const modalTrigger=document.querySelectorAll('[data-modal]')
    const modalWindow=document.querySelector('.modal')
    const modalCloseBtn=document.querySelector('[data-close]')

    const modalTimerId=setTimeout(showModalWindow, 2000);

    function closeModalWindow(){
        modalWindow.classList.toggle('show')
        document.body.style.overflow=''
        clearInterval(modalTimerId)
    }

    function showModalWindow(){
        modalWindow.classList.toggle('show')
        document.body.style.overflow=''
    }

    modalTrigger.forEach(btn=>{
        btn.addEventListener('click',showModalWindow)
    })

    modalCloseBtn.addEventListener('click',closeModalWindow)

    modalWindow.addEventListener('click',(event)=>{
        if(event.target === modalWindow){
            closeModalWindow()
        }
    })

    document.addEventListener('keydown',(event)=>{
        if(event.code === "Escape" && modalWindow.classList.contains('show')){
            closeModalWindow()
        }
    })

    function showModayWindowByScroll(){
        if(window.pageYOffset+document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModalWindow()
            window.removeEventListener('scroll',showModayWindowByScroll)
        }
    }

    window.addEventListener('scroll',showModayWindowByScroll)

    // Using class for Cards

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
    new MenuCard(
        "img/tabs/elite.jpg",
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        9,
        '.menu .container',
        //'menu__item',
    ).render() 


    // Form

    const forms= document.querySelectorAll('form')


    const message={
        loading:'Загрузка',
        success:'Спасибо! Скоро мы свами свяжемся',
        failuere: 'Что--то пошло не так...'
    }

    forms.forEach(item=>{
        postData(item);
    })

    function postData(form){
        form.addEventListener('submit',(event)=>{
            event.preventDefault();

            const statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            statusMessage.textContent=message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();

            request.open('POST','../server.php')
            //request.setRequestHeader('Content-type','multipart//form-data')
            const formData = new FormData(form)
        
            request.send(formData)
            request.addEventListener('load',()=>{
                if(request.status === 200){
                    console.log(request.response)
                    statusMessage.textContent=message.success;
                }else{
                    statusMessage.textContent=message.failuere
                }
            })
        
        })
    }















})