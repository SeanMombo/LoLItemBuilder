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
    const items = document.querySelectorAll("#middle .item-module");
    const checkBoxes = document.querySelectorAll("#filterSection input");

    state.search = new Search(query);
    
    try {
        searchView.runFilters(items, checkBoxes, query);

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

    // Dropdown menu filters
    document.querySelector('.custom-select-wrapper').addEventListener('click', function() {
        this.querySelector('.custom-select').classList.toggle('open');
    })

    for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;

                const item = state.items.sortBy(this.textContent);
                itemsView.sortAllImages(state.items.items);
            }
        })
    }
    window.addEventListener('click', function(e) {
        const select = document.querySelector('.custom-select')
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    });

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
    sort: false,
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
        
        if (evt.to !== evt.from)
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

// I need to use the set and setview classes to properly do MVC for the item set component.
// having full control over the id's and shit will make it much easier to create and exporter.
function makeSortable(evt) {
    const el = document.createElement('DIV');
    el.classList.add('itemTab');
    document.querySelector('#sideRScroll').appendChild(el);

    const el2 = document.createElement('DIV');
    el2.classList.add('itemTabBar');


    el.appendChild(el2);


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


