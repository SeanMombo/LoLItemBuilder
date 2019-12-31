import * as itemsView from '../views/itemsView';
import { elements , boxes} from '../base';



export default class Search {
    constructor() {
        this.items = [];
        this.itemsToFilter;
        this.checkBoxes;
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

    /*
    addListeners(items){
        const checkbox = document.querySelector("input[name=hp]");
        const c = this;
        checkbox.addEventListener( 'change', function() {
            if(this.checked) {
                c.applyFilters2(items);
            } else {
                // Checkbox is not checked..
            }
        });
    }*/
 
    applyFilters2(items) {
        for (var i = 0; i < this.checkBoxes.length; i++) {
            this.checkBoxes[i].addEventListener("click", function() {

                items.forEach(el => el.classList.add('hideItem'));

                items.forEach(el => {
                    const itemType = el.getAttribute('data-type');
                    var storedArray = JSON.parse($("#storageElement").data("storeIt"));
                    console.log(storedArray)
                    checkBoxes.forEach(el2 => {
                        JSON.stringify(itemType)
                        if (typeof(itemType) !== 'object') {
                            if (el2.checked && el2.value == itemType) {
                                el.classList.remove('hideItem');
                                el.classList.add('showItem');
                            }
                        } else {
                            for(let i = 0; i < itemType.length; i++) {
                                console.log(itemType[i])
                                if (el2.checked && el2.value == itemType[i]) {
                                    el.classList.remove('hideItem');
                                    el.classList.add('showItem');
                                }
                            }
                        }
                    });
                }) 

            });
        }
    }
}