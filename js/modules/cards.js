import { getResource } from "../services/services";
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

    getResource('http://localhost:3000/menu')
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

export default cards

// new MenuCard(
    //     "img/tabs/elite.jpg",
    //     'elite',
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     9,
    //     '.menu .container',
    //     //'menu__item',
    // ).render() 