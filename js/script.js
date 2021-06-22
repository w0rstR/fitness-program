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

    const modalTrigger=document.querySelector('[data-modal]')
    const modalWindow=document.querySelector('.modal')
    const modalCloseBtn=document.querySelector('[data-close]')

    modalTrigger.addEventListener('click',()=>{
        // modalWindow.classList.add('show')
        // modalWindow.classList.remove('hide')
        modalWindow.classList.toggle('show')
        document.body.style.overflow='hidden'
    })
   
    modalCloseBtn.addEventListener('click',()=>{
        // modalWindow.classList.add('hide')
        // modalWindow.classList.remove('show')
        modalWindow.classList.toggle('show')
    })
})