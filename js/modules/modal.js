function modal(){
    const modalTrigger=document.querySelectorAll('[data-modal]')
    const modalWindow=document.querySelector('.modal')
    //const modalCloseBtn=document.querySelector('[data-close]')

    const modalTimerId=setTimeout(showModalWindow, 600000);

    function closeModalWindow(){
        modalWindow.classList.add('hide')
        modalWindow.classList.remove('show')
        document.body.style.overflow=''
        clearInterval(modalTimerId)
    }

    function showModalWindow(){
        modalWindow.classList.add('show')
        modalWindow.classList.remove('hide')
        document.body.style.overflow=''
    }

    modalTrigger.forEach(btn=>{
        btn.addEventListener('click',showModalWindow)
    })

    //modalCloseBtn.addEventListener('click',closeModalWindow)

    modalWindow.addEventListener('click',(event)=>{
        if(event.target === modalWindow && event.target.getAttribute('data-close')==''){
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

}

module.exports = modal