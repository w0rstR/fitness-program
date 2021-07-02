function closeModalWindow(modalSelector){
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

export default  modal
export {closeModalWindow}
export{showModalWindow}