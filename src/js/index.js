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


const controlItems = async () => {

    state.items = new Items();
    
    try {
        await state.items.getDragon();
        console.log(state.items.itemData);
        
        itemsView.addAllImages(state.items.getItems());
        state.items.addListeners();
        // Open item description on mouseover
        [...document.querySelectorAll('.item-img')].forEach(function(item) {
            item.addEventListener('mouseover', el => {
                itemsView.openDescription(item);
            });
        });
        
        // const itemsToFilter = document.querySelectorAll("#middle .item-module");
        // // hide description box on click
        // for (var i = 0; i < itemsToFilter.length; i++) {
        //     itemsToFilter[i].addEventListener("click", e => {
        //         let item = e.target;
                
        //         let item2 = item.parentNode.nextSibling.nextSibling;
                
        //         clearTimeout(window.mytimeout);
        //         item2.style.visibility = 'hidden';
        //         item2.style.opacity = 0;
        //     });
        // }


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



//// ADD EVENT LISTENERS
const addListeners = () => {
    const searchTerm = $('input[id="searchbar"]').val();
    const checkBoxes = document.querySelectorAll("#filterSection input");
    const itemsToFilter = document.querySelectorAll("#middle .item-module");

    // clear filters button
    document.querySelector('#clearFilters').addEventListener('click', searchView.clearFilters, false);

    // search bar 
    $('input[id="searchbar"]').keyup(function () {
        const searchTerm = $(this).val();
        controlSearch(searchTerm);
    });

    // Checkboxes 
    for (var i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].addEventListener("click", e => {
            controlSearch(searchTerm);
        });
    }

}

const initPage = () => {
    controlItems();
    addListeners();
}

window.addEventListener('load', initPage);

//// MIDDLE SORTABLE 

const middleSortable = new Sortable(middle, {
    group: {
        name: 'shared',
        pull: 'clone',
        put:false,
    },
    animation: 0,
    forceFallback: true, 
    filter: '.dontdrag',
    
    onChoose: function (evt) { $("#myTaskList").css('cursor', 'grabbing'); },
    onStart: function (evt) { 
        $("#myTaskList").css('cursor', 'grabbing'); 

    }, 
    onEnd: function (evt) { 
        $("#myTaskList").css('cursor', 'grab'); 
        $("#createTabDiv").removeClass('itemhover');
        $(".itemTab").removeClass('itemhover');

        //remove description once we move to the item set lists
        if (evt.to !== evt.from)
            evt.item.children[1].remove();
    }, 

    // change createtab style while hovering an element over it
    onMove: function (evt) {
        $("#createTabDiv").removeClass('itemhover');
        $(evt.to).closest("#createTabDiv").addClass('itemhover');

        $(".itemTab").removeClass('itemhover');
        $(evt.to).closest(".itemTab").addClass('itemhover');

        //prevent decription from appearing while dragging
        var item = evt.dragged;
    
        let desc = item.children[1];
        desc.style.visibility='hidden';
        desc.style.opacity=0;
      },

    onClone: function (evt) {
        var item = evt.item;
        var clone = evt.clone;
        
        item.classList.add('dontFilter');
        let item2 = clone.children[0].children[0];

        itemsView.addCloneListener(item2);
        searchView.addSingleSearch(clone);

        //// hide description
        let desc = clone.children[1];
        desc.style.visibility='hidden';
        desc.style.opacity=0;

        desc = item.children[1];

        desc.style.visibility='hidden';
        desc.style.opacity=0;
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

            $(".itemTab").removeClass('itemhover');
            $(evt.to).closest(".itemTab").addClass('itemhover');
        }, 
        onEnd: function (evt) { 
            $("#myTaskList").css('cursor', 'grab'); 
            const numKids = evt.from.childElementCount;

            if (numKids == 0) evt.from.remove();

            // remove hovering elements
            $(".itemTab").removeClass('itemhover');
            $("#createTabDiv").removeClass('itemhover');
        }, 

        // change createtab style while hovering an element over it
        onMove: function (evt) {
            $(".itemTab").removeClass('itemhover');
            $(evt.to).closest(".itemTab").addClass('itemhover');
            
            $("#createTabDiv").removeClass('itemhover');
            $(evt.to).closest("#createTabDiv").addClass('itemhover');
        },
        filter: '.dontdrag',
    });

    return s;
}

