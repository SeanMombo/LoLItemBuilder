import { elements } from '../base';
import $ from 'jquery';
import * as itemsView from '../views/itemsView'

export default class Items {
    constructor () {
        this.keyList = [];
        this.itemData = [];
        this.items = [];
        this.domList = [];
    }

    addItem(key, gold, name, description, tags, hidden = false) {
        const item = {
            key,
            gold,
            name,
            description,
            tags,
            hidden,

        }
        this.items.push(item);
    }

    sortBy(type) {
        type = type.replace(/\s/g, '');
        if (type == 'Gold▲') {this.items.sort(sortByGoldAsc);}; 
        if (type == 'Gold▼') this.items.sort(sortByGoldDesc); 
        if (type == 'Name▲') this.items.sort(sortByNameAsc); 
        if (type == 'Name▼') this.items.sort(sortByNameDesc); 
    }

    async getDragon() {
        const url = "https://ddragon.leagueoflegends.com/cdn/9.24.2/data/en_US/item.json";
        try {
            const res = await fetch(url);    
            const myJson = await res.json();
            this.itemData = myJson.data;
            const itemList = myJson.data;

            for( let prop in itemList ){
                let item = itemList[prop];
                //filter out items so that only basic items you can buy on 5v5 appear. 
                    if (item['gold']['purchasable'] /*&& !item['requiredAlly']*/ && item['maps']['11'] ) {
                        this.addItem(prop, item['gold']['total'], item['name'], item['description'], item['tags']);
                    }
            }
            this.items.sort(sortByGoldAsc);

        } catch (error) {
            console.log(error);
        }
    }

    
    addListeners() {
        [...document.querySelectorAll('.item-module')].forEach(function(item) {
            item.addEventListener('mouseout', function() {
                clearTimeout(window.mytimeout);
                let item2 = item.children[1];//.parentNode.nextSibling.nextSibling;
                //if (item.parentNode.parentNode.parentNode.id === 'middle')
                {
                    item2.style.visibility = 'hidden';
                    item2.style.opacity = 0;
                }
            });
        });
    }


    getItems() {
        return this.items;
    }
}

function sortByGoldAsc( a, b ) {
    if ( a['gold'] < b['gold'] ){
        return -1;
    }
    if ( a['gold'] > b['gold'] ){
        return 1;
    }
    return 0;
}

function sortByGoldDesc( a, b ) {
    if ( a['gold'] > b['gold'] ){
        return -1;
    }
    if ( a['gold'] < b['gold'] ){
        return 1;
    }
    return 0;
}

function sortByNameAsc( a, b ) {
    if ( a['name'] < b['name'] ){
        return -1;
    }
    if ( a['name'] > b['name'] ){
        return 1;
    }
    return 0;
}

function sortByNameDesc( a, b ) {
    if ( a['name'] > b['name'] ){
        return -1;
    }
    if ( a['name'] < b['name'] ){
        return 1;
    }
    return 0;
}