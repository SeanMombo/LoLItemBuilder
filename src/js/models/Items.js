import { elements } from '../base';
import $ from 'jquery';


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
            <div class="item-module" id="mydiv">
                <div>
                    <img class="item-img" src="${url}" id="mydivheader">
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
    
    getOffset(t) {
        return t.offset();
    }

    getHeight(t) {
        return t.height();
    }

    openDescription(item) {
            var item2 = item.parentNode.nextSibling.nextSibling;
            var t = $(item);
            var tooltip = $(item2);
            var offset = this.getOffset(t);
            var height = this.getHeight(tooltip);

            window.mytimeout = setTimeout(function(){
            item2.style.visibility = 'visible';
            item2.style.opacity = 1;
            tooltip.toggleClass('bottom', (offset.top - $(window).scrollTop()) - height < 0);

            
        }, 300);
    }



    addListeners() {

        [...document.querySelectorAll('.item-img')].forEach(function(item) {
            item.addEventListener('mouseout', function() {
                clearTimeout(window.mytimeout);
                let item2 = item.parentNode.nextSibling.nextSibling;
                item2.style.visibility = 'hidden';
                item2.style.opacity = 0;
            });
        });



        /*
        $('item-img').hover(function(){
            window.mytimeout = setTimeout(function(){
                $("item-img").closest.animate({"left": "125px"}, 1200);
            }, 2000);
        }, function(){
            clearTimeout(window.mytimeout);    
        });*/
    }
}
