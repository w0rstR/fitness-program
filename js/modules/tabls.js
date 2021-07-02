function tabs(tabsSelector,tabsContentSelector,tabsParentSelector,activeClass){
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
export default tabs;