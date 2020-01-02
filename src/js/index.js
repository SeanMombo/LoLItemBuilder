import Items from './models/Items';
import Search from './models/search';

import { elements } from './base';
import $ from 'jquery';

import * as itemsView from './views/itemsView';
import * as searchView from './views/searchView';
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';


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
        state.search.getSearch();
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

function findPrevious(elm) {
    do {
        elm = elm.previousSibling;
    } while (elm && elm.nodeType != 1);
    return elm;
 }
 function swapDiv(elm) {
    var previous = findPrevious(elm);
    if (previous) {
        elm.parentNode.insertBefore(elm, previous);
    }
}

const middleSortable = new Sortable(middle, {
    group: {
        name: 'shared',
        pull: 'clone',
        put:false,
    },
    animation: 0,
    
    forceFallback: true, 
    filter: '.dontdrag',

    scroll: true, // Enable the plugin. Can be HTMLElement.
	
	scrollSensitivity: 100, 
	scrollSpeed: 10, 


    onChoose: function (evt) { $("#myTaskList").css('cursor', 'grabbing'); }, // Run when you click
    onStart: function (evt) { 
        $("#myTaskList").css('cursor', 'grabbing'); 
    }, 
    onEnd: function (evt) { $("#myTaskList").css('cursor', 'grab'); }, // Dragging ended

    onClone: function (evt) {
        var item = evt.item;
        var clone = evt.clone;
        
        item.classList.add('dontFilter');
        
      
        let item2 = clone.children[0].children[0];
        const desc = clone.children[1];
        desc.style.visibility='hidden';
        desc.style.opacity=0;
        state.items.addCloneListener(item2);
        state.search.addSingleSearch(clone);


    },

});


new Sortable(createTabDiv, {
    group: {
        name: 'shared',
    },
    animation: 50,
    forceFallback: true,
    removeCloneOnHide: true,
    ghostClass: 'invisibleGhost',
    sort: false,
    filter: ".item-module, P",
    
    onAdd: evt => {
        makeSortable(evt);
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
        makeSortable(evt);
    },

});

function makeSortable(evt) {
    const el = document.createElement('DIV');
    el.classList.add('itemTab');
    document.querySelector('#sideRScroll').appendChild(el);
    
    makeSortableTab(el);
    
    const itemEl = evt.item;
    el.appendChild(itemEl);
}

function makeSortableTab(sort) {
    
    const s = new Sortable(sort, {

        group: {
            name: 'shared',
        //    pull: 'clone' // To clone: set pull to 'clone'
        },
        removeOnSpill: true,
        animation: 50,
        forceFallback: true,
        onChoose: function (evt) { $("#myTaskList").css('cursor', 'grabbing'); },
        onStart: function (evt) { 
            $("#myTaskList").css('cursor', 'grabbing'); 
        }, 
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