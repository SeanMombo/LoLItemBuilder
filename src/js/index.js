import Items from './models/Items';
import Search from './models/search';

import { elements } from './base';
import $ from 'jquery';

import * as itemsView from './views/itemsView';
import * as searchView from './views/searchView';
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';

/*
$(function() {

    var $body = $(document);
    $body.bind('scroll', function() {
        // "Disable" the horizontal scroll.
        if ($body.scrollLeft() !== 0) {
            $body.scrollLeft(0);
        }
    });
}); */

const state = {};


const initPage = () => {
    controlItems();
    addListeners();
}


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
    } catch(error) {
        alert(error);
    }
};


const controlSearch = (query) => {
    const itemsToFilter = document.querySelectorAll("#middle .item-module");
    const checkBoxes = document.querySelectorAll("#filterSection input");

    state.search = new Search(query);
    
    try {
        searchView.runFilters(itemsToFilter, checkBoxes, query);
    } catch(error) {
        alert(error);
    }
};

window.addEventListener('load', initPage);

//// ADD EVENT LISTENERS
const addListeners = () => {

    // clear filters button
    document.querySelector('#clearFilters').addEventListener('click', searchView.clearFilters);

    // search bar 
    $('input[id="searchbar"]').keyup(function () {
        const searchTerm = $(this).val();
        controlSearch(searchTerm);
    });

    // Checkboxes 
    const checkBoxes = document.querySelectorAll("#filterSection input");
    const searchTerm = $('input[id="searchbar"]').val();
    

    for (var i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].addEventListener("click", e => {
            controlSearch(searchTerm);
        });
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

