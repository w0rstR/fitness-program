function form(){
    const forms= document.querySelectorAll('form')


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

           
            postData('http://localhost:3000/requests',json)
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

        showModalWindow();

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
            closeModalWindow()
        }, 4000);
    }
}

module.exports = form