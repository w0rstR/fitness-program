window.addEventListener('DOMContentLoaded',()=>{
    const tabs = document.querySelectorAll('.tabheader__item')
    const tubcontent=document.querySelectorAll('.tabcontent')
    const tubsParent = document.querySelectorAll('.tabheader__items')

    function hideAllTabContent(){
        tubcontent.forEach((item)=>{
            item.style.display='none';
        })

        tabs.forEach((tub)=>{
            tub.classList.remove('tabheader__item_active');
        })
    }

    function showTubContent(i){
        tubcontent[i].style.display='block';
        tubs[i].classList.classList.add('tabheader__item_active')

    }




































})