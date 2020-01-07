import Items from './models/Items';
import Search from './models/search';
import Sets from './models/Sets';

import { elements } from './base';
import $ from 'jquery';

import * as itemsView from './views/itemsView';
import * as searchView from './views/searchView';
import * as setView from './views/setView';
import Sortable from 'sortablejs/modular/sortable.complete.esm';


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

    } catch(error) {
        alert(error);
    }
};

const initSet = () => {
    state.sets = new Sets();
};

const controlSearch = (query) => {
    const items = document.querySelectorAll("#middle .item-module");
    const checkBoxes = document.querySelectorAll("#filterSection input");
    query = query.replace(/['\\]/g,"");
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

    /**
     We're defining the event on the `body` element, 
    because we know the `body` is not going away.
    Second argument makes sure the callback only fires when 
    the `click` event happens only on elements marked as `data-editable`
    */
    $('body').on('click', '.setTitle', function(){
    
        var $el = $(this)
        var $el2 = $el.children('.setTitleText');
        var $input = $('<input class="editTitle" type="text"/>').val( $el2.text() );
        $el2.replaceWith( $input );
        
        var save = function(){
        var $p = $('<p class="setTitleText"/>').text( $input.val() );
        $input.replaceWith( $p );
        };
        

        // blur when press enter
        $input.keyup(function (e) {
            if(e.which == 13) {
                $($input).blur();
            }
        });
        // revert textbar to <p> on blur
        $input.one('blur', save).focus();
        
    });

    $('body').on('click', '.tabBarTitle', function(){
    
        var $el = $(this)
        var $el2 = $el.children('.titleText');
        var $input = $('<input class="editTitle" type="text"/>').val( $el2.text() );
        $el2.replaceWith( $input );
        $input.click();
        $input.select();

        var save = function(){
        var $p = $('<p class="titleText"/>').text( $input.val() );
        $input.replaceWith( $p );
        };

        $input.keyup(function (e) {
            if(e.which == 13) {
                $($input).blur();
            }
        });

        $input.one('blur', save).focus();
        
    });

    // open map button
    $('#openMaps').on('click', e => {
        let el = e.currentTarget;

        setView.openDescription(el);
    });


    // Export Set Button
    $('#exportSet').click(function () {
        state.sets.exportSet();
    });

    // Export Set Button
    $('#stringSet').click(function () {
        state.sets.stringSet();
    });


     
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
            const searchTerm = $('input[id="searchbar"]').val();
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

    

    //// scroll window to top for single page layout when window is wide enough
    function myFunction(x) {
        if (x.matches) { // If media query matches
            window.scrollTo(0, 0);
        } else {
            
        }
    }

    var x = window.matchMedia("(max-width: 960px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction) // Attach listener function on state changes
    
}

const initPage = () => {
    controlItems();
    initSet();
    addListeners();
    setView.initSortables();
}

window.addEventListener('load', initPage);

//// MIDDLE SORTABLE 


