import { elements } from '../base';


function sortByGold( a, b ) {
    if ( a['gold']['base'] < b['gold']['base'] ){
      return -1;
    }
    if ( a['gold']['base'] > b['gold']['base'] ){
      return 1;
    }
    return 0;
    //
  }
  

export default class Items {
    constructor () {
        this.keyList = [];
        this.itemData = [];
        this.itemList = [];
    }

    addItem(key, gold) {
        const item = {
            key,
            gold
        }
        this.itemList.push(item);
    }

    async getDragon() {
        const url = "http://ddragon.leagueoflegends.com/cdn/9.24.2/data/en_US/item.json";
        try {
            const res = await fetch(url);    
            const myJson = await res.json();
            this.itemData = myJson.data;
            const itemList = myJson.data;
            const keys = Object.keys(itemList);
            
            for( let prop in itemList ){
                let item = itemList[prop];
                    if (item['gold']['purchasable']) {
                        this.addItem(prop, item['gold']);
                    }
            }
            this.itemList.sort(sortByGold);
            console.log(this.itemList)
        } catch (error) {
            console.log(error);
        }
    }
    
    getGold() {
        //this.itemData.Array.map( el => console.log(el.gold));
    }

    addImage(id, gold) {
        const url = `../../img/item/${id}.png`;
        const markup = `
            <div class="item-module">
                <div>
                    <img src="${url}">
                    <p>${gold}</p>
                </div>
            </div>
        `;
        elements.itemImages.insertAdjacentHTML('beforeend', markup);
    }
    
    addAllImages() {
        this.itemList.forEach( el => this.addImage(el.key, el.gold.base));
    }
    
    /*const array = getDragon();
    console.log(array);
    add1000Images(array);*/
}
