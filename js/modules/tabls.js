function tabs(){
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
}

module.exports = tabs;