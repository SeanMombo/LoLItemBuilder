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

    addSingleSearch(item) {

        const itemsToFilter = [item];
        const checkBoxes = document.querySelectorAll("#filterSection input");

        for (var i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].addEventListener("click", e => {

                if (Object.values(checkBoxes).some(el => el.checked)) {
                    // hide all items
                    itemsToFilter.forEach(el => el.classList.add('hideItem'));
                    
                    // find all items with a matching tag to the checkboxes. 
                    // Reveal them if one of their tags is checked
                    itemsToFilter.forEach(el => {
                        let itemType = $(el).data('tags');
                        let typeArray = itemType.split(",");
                        let checkedBoxes = Object.values(checkBoxes).filter(check => check.checked);
                        
                        let hasAllFilters;
                        
                        
                        hasAllFilters = checkedBoxes.every(el2 => typeArray.find(el3 => el3 == el2.value));

                        //console.log(hasAllFilters)
                        if (hasAllFilters) {
                            el.classList.remove('hideItem');
                            el.classList.add('showItem');
                        } else {
                            el.classList.remove('showItem');
                            el.classList.add('hideItem');
                        }
                    }) 
                } else {
                    itemsToFilter.forEach(el => el.classList.remove('hideItem'));
                    itemsToFilter.forEach(el => el.classList.add('showItem'));
                }
            })
        }
    }

    getSearch () {
        let itemsToFilter = document.querySelectorAll("#middle .item-module");
        const checkBoxes = document.querySelectorAll("#filterSection input");
        

        for (var i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].addEventListener("click", e => {

                itemsToFilter = Object.values(itemsToFilter).filter(fil => !fil.classList.contains('dontFilter'));

                if (Object.values(checkBoxes).some(el => el.checked)) {
                    // hide all items
                    itemsToFilter.forEach(el => el.classList.add('hideItem'));
                    
                    // find all items with a matching tag to the checkboxes. 
                    // Reveal them if one of their tags is checked
                    itemsToFilter.forEach(el => {
                        let itemType = $(el).data('tags');
                        let typeArray = itemType.split(",");
                        let checkedBoxes = Object.values(checkBoxes).filter(check => check.checked);
                        
                        let hasAllFilters;
                        
                        
                        hasAllFilters = checkedBoxes.every(el2 => typeArray.find(el3 => el3 == el2.value));

                        //console.log(hasAllFilters)
                        if (hasAllFilters) {
                            el.classList.remove('hideItem');
                            el.classList.add('showItem');
                        } else {
                            el.classList.remove('showItem');
                            el.classList.add('hideItem');
                        }
                    }) 
                } else {
                    itemsToFilter.forEach(el => el.classList.remove('hideItem'));
                    itemsToFilter.forEach(el => el.classList.add('showItem'));
                }
            })
        }   
    }
}