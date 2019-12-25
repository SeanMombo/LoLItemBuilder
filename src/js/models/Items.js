import { elements } from '../base';


function sortByGold( a, b ) {
    if ( a['gold'] < b['gold'] ){
      return -1;
    }
    if ( a['gold'] > b['gold'] ){
      return 1;
    }
    return 0;
    //
  }
  

export default class Items {
    constructor () {
        this.keyList = [];
        this.itemData = [];
        this.items = [];
    }

    addItem(key, gold, name, description) {
        const item = {
            key,
            gold,
            name,
            description
        }
        this.items.push(item);
    }

    async getDragon() {
        const url = "http://ddragon.leagueoflegends.com/cdn/9.24.2/data/en_US/item.json";
        try {
            const res = await fetch(url);    
            const myJson = await res.json();
            this.itemData = myJson.data;
            const itemList = myJson.data;

            
            for( let prop in itemList ){
                let item = itemList[prop];
                //filter out items so that only basic items you can buy on 5v5 appear. 
                    if (item['gold']['purchasable'] && !item['requiredAlly'] && item['maps']['11'] ) {
                        this.addItem(prop, item['gold']['base'], item['name'], item['description']);
                    }
            }
            this.items.sort(sortByGold);

        } catch (error) {
            console.log(error);
        }
    }
    
    getGold() {
        //this.itemData.Array.map( el => console.log(el.gold));
    }

    addImage(id, gold, title, description) {
        if (id == 3850) id = 3303;
        const url = `../../img/item/${id}.png`;
        const markup = `
            <div class="item-module">
                <div>
                    <img src="${url}">
                    <p>${gold}</p>
                </div>
                <span class="item-description">


                        <img src="${url}">
                        <div class="info">
                            <div class="name">${title}</div>
                            <div class="gold">${gold}</div>
                        </div>
                        <div class="desc">${description}</div>

                <span>
            </div>
        `;
        elements.itemImages.insertAdjacentHTML('beforeend', markup);
    }
    
    addAllImages() {
        this.items.forEach( el => this.addImage(el.key, el.gold, el.name, el.description));
    }
    
    /*const array = getDragon();
    console.log(array);
    add1000Images(array);*/
}
