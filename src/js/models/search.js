import * as itemsView from '../views/itemsView';
import { elements , boxes} from '../base';
import $ from 'jquery';


export default class Search {
    constructor(query) {
        this.items = [];
        this.itemsToFilter;
        this.checkBoxes;
        this.query = query;
    }
    
    initLists() {
        this.itemsToFilter = document.querySelectorAll("#middle .item-module");
        this.checkBoxes = document.querySelectorAll("#filterSection input");
    }
    getList() {
        return this.itemsToFilter;
    }
    addItem(key, gold, name, description, tags, hidden = false) {
        const item = {
            key,
            gold,
            name,
            description,
            tags,
            hidden
        }
        this.items.push(item);
    }

    searchHp(items) {
        const newItems = items.filter(el => el.tags.some(item => item === 'Health'));
        return newItems;
    }

    applyFilters(items) {
        const newItems = items;
        Object.values(boxes).forEach( el => {
            
            newItems = newItems.filter(el2 => el2.tags.some(item => item === el.value));
        })
    }



    
}