import { elements } from '../base';



export default class Items {
    constructor () {
        this.keyList = [];
    }


    async getDragon() {
        const url = "http://ddragon.leagueoflegends.com/cdn/9.24.2/data/en_US/item.json";
        try {
            const res = await fetch(url);    
            const myJson = await res.json();
            const itemList = myJson.data;
            for (var key in itemList) {
                if (itemList.hasOwnProperty(key)) {
                    this.keyList.push(key);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    addImage(id) {
        const url = `../../img/item/${id}.png`;
        const markup = `
            <div class="item-module">
                <img src="${url}">
            </div>
        `;
        elements.itemImages.insertAdjacentHTML('beforeend', markup);
    }
    
    addAllImages() {
        this.keyList.map( el => this.addImage(el));
    }
    
    /*const array = getDragon();
    console.log(array);
    add1000Images(array);*/
}
