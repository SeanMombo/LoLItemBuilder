import Items from './models/Items';
import Search from './models/search';

import { elements } from './base';
import $ from 'jquery';

import * as itemsView from './views/itemsView';
import * as searchView from './views/searchView';
import Sortable from 'sortablejs';

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
                    }) 
                } else {
                    itemsToFilter.forEach(el => el.classList.remove('hideItem'));
                    itemsToFilter.forEach(el => el.classList.add('showItem'));
                }
            })
        }   

        const allitems = document.querySelectorAll('.item-module');

        Object.values(allitems).forEach(el => {
            el.addEventListener('ondragstart', startDrag);
        })
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


new Sortable(middle, {
    group: {
        name: 'shared',
      //  pull: 'clone' // To clone: set pull to 'clone'
    },
    animation: 50,
    forceFallback: true,
    onChoose: function (evt) { $("#myTaskList").css('cursor', 'grabbing'); }, // Run when you click
    onStart: function (evt) { $("#myTaskList").css('cursor', 'grabbing'); }, // Dragging started
    onEnd: function (evt) { $("#myTaskList").css('cursor', 'grab'); }, // Dragging ended

    filter: '.dontdrag',
});


new Sortable(createTabDiv, {
    group: {
        name: 'shared',
    //    pull: 'clone' // To clone: set pull to 'clone'
    },
    animation: 50,
    forceFallback: true,
    removeCloneOnHide: true,
    ghostClass: 'invisibleGhost',
    sort: false,
    filter: ".item-module, P",
    
    onAdd: evt => {
        const el = document.createElement('DIV');
        el.classList.add('itemTab');
        document.querySelector('#sideRScroll').appendChild(el);
        
        makeSortableTab(el);
        
        const itemEl = evt.item;
        el.appendChild(itemEl);
    },

});


new Sortable(createtabp, {
    group: {
        name: 'shared',

    },
    animation: 50,
    forceFallback: true,
    removeCloneOnHide: true,
    ghostClass: 'invisibleGhost',
    sort: false,
    
    
    onAdd: evt => {
        const el = document.createElement('DIV');
        el.classList.add('itemTab');
        document.querySelector('#sideRScroll').appendChild(el);
        
        makeSortableTab(el);
        
        const itemEl = evt.item;
        el.appendChild(itemEl);
    },

});


function startDrag(event) {
    event.dataTransfer.setData("Text", event.target.id);
    console.log('hi')
};

function createItemTab(event) {
    console.log('test')
    event.preventDefault();
    const el = document.createElement('DIV');
    el.classList.add('itemTab');
    document.querySelector('#sideR').appendChild(el);

    var data = event.dataTransfer.getData("Text");
    el.appendChild(document.getElementById(data));
}



function makeSortableTab(sort) {
    
    const s = new Sortable(sort, {
        group: {
            name: 'shared',
        //    pull: 'clone' // To clone: set pull to 'clone'
        },
        
        animation: 50,
        forceFallback: true,
        onChoose: function (evt) { $("#myTaskList").css('cursor', 'grabbing'); }, // Run when you click
        onStart: function (evt) { $("#myTaskList").css('cursor', 'grabbing'); }, // Dragging started
        onEnd: function (evt) { 
            $("#myTaskList").css('cursor', 'grab'); 
            const numKids = evt.from.childElementCount;

            if (numKids == 0) evt.from.remove();
        }, // Dragging ended
        filter: '.dontdrag',
    });

    return s;
}
// // Element dragging ended
// onEnd: function (evt) {
//     var itemEl = evt.item;  // dragged HTMLElement
//     evt.to;    // target list
//     evt.from;  // previous list
//     evt.oldIndex;  // element's old index within old parent
//     evt.newIndex;  // element's new index within new parent
//     evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
//     evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
//     evt.clone // the clone element
//     evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
// },