import Items from './models/Items';
import Search from './models/search';

import { elements } from './base';
import $ from 'jquery';

import * as itemsView from './views/itemsView';
import * as searchView from './views/searchView';


const state = {};



const controlItems = async () => {

    state.items = new Items();
    
    try {
        await state.items.getDragon();
        console.log(state.items.itemData);
        
        itemsView.addAllImages(state.items.getItems());
        state.items.addListeners();
        
        [...document.querySelectorAll('.item-img')].forEach(function(item) {
            item.addEventListener('mouseover', el => {
                itemsView.openDescription(item);
            });

        });
        controlSearch();

    } catch(error) {
        alert(error);
    }
};


const controlSearch = () => {
    state.search = new Search();
    
    try {

        const itemsToFilter = document.querySelectorAll("#middle .item-module");
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

                        /*checkBoxes.forEach(el2 => {
                            
                            for(let i = 0; i < typeArray.length; i++) {
                                if (el2.checked && el2.value == typeArray[i]) {
                                    el.classList.remove('hideItem');
                                    el.classList.add('showItem');
                                } else if (!el2.checked && el2.value == typeArray[i]) {
                 
                                }
                            }
                        });*/
                    }) 
                } else {
                    itemsToFilter.forEach(el => el.classList.remove('hideItem'));
                    itemsToFilter.forEach(el => el.classList.add('showItem'));
                }
            })
        }

    } catch(error) {
        alert(error);
    }
};


//['hashchange', 'load'].forEach(event => window.addEventListener(event, controlItems));

window.addEventListener('load', controlItems);

$(function() {

    var $body = $(document);
    $body.bind('scroll', function() {
        // "Disable" the horizontal scroll.
        if ($body.scrollLeft() !== 0) {
            $body.scrollLeft(0);
        }
    });

}); 