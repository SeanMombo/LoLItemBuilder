import { elements } from '../base';
import $ from 'jquery';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
};

export const clearResults = () => {
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
}

export const runFilters = (itemsToFilter, checkBoxes, query) => {
        
    itemsToFilter = [...itemsToFilter].filter(fil => !fil.classList.contains('dontFilter'));
    // Filter using the checkboxes first
    if (Object.values(checkBoxes).some(c1 => c1.checked)) {
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

            if (hasAllFilters) {
                el.classList.remove('hideItem');
                el.classList.add('showItem');
            } else {
                el.classList.remove('showItem');
                el.classList.add('hideItem');
            }
        }) 
    } 
    else {
        itemsToFilter.forEach(el => el.classList.remove('hideItem'));
        itemsToFilter.forEach(el => el.classList.add('showItem'));
    }

    // Now we sort by item name

    
    let str;
    if (query !== '') str = query.toLowerCase();
    else str = '';

    itemsToFilter.forEach(el => {
        let itemName = $(el).data('name');
        itemName = itemName.toLowerCase();

        const n = itemName.search(str);

        if (n === -1) {
            el.classList.remove('showItem');
            el.classList.add('hideItem');
        }
    })
}

export const clearFilters = () => {
    
    const searchbar = document.getElementById("searchbar");
    const itemsToFilter = document.querySelectorAll("#middle .item-module");
    const checkBoxes = document.querySelectorAll("#filterSection input");

    itemsToFilter.forEach(el => el.classList.add('showItem'));
    itemsToFilter.forEach(el => el.classList.remove('hideItem'));

    searchbar.value='';

    for (var i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].checked=false;
    }
}

export const resortItems = (sortBy, sortable) => {
    //'Gold ▲' 'Gold ▼'
    
    var order = middleSortable.toArray();
    middleSortable.sort(order.reverse()); // apply
}

export const addSingleSearch = (item) => {

    let itemsToFilter = [item];
    const checkBoxes = document.querySelectorAll("#filterSection input");

    
    itemsToFilter = itemsToFilter.filter(fil => !fil.classList.contains('dontFilter'));

    itemsToFilter = itemsToFilter.filter(fil => fil.parentNode);

    
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

