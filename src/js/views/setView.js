import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import * as itemsView from './itemsView';
import * as searchView from './searchView';



// I need to use the set and setview classes to properly do MVC for the item set component.
// Having full control over the id's and shit will make it much easier to create and exporter.

export const initSortables = () => {
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
            // if (evt.to !== evt.from)
            //     evt.item.children[1].remove();
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

     
    // new Sortable(sideRScroll, {
    //     pull: false,
    //     animation: 50,
    //     forceFallback: true,
    //     sort: true,
    // });

}

function makeSortable(evt) {
    const el = document.createElement('DIV');
    el.classList.add('itemTab');
    document.querySelector('#sideRScroll').appendChild(el);

    makeTabBar(el);
    
    makeSortableTab(el);
    const itemEl = evt.item;
    el.appendChild(itemEl);

}

const makeTabBar = (itemTabEl) => {
    const itemTabBar = document.createElement('DIV');
    itemTabBar.classList.add('itemTabBar');
    addTitleBar(itemTabBar);
    itemTabEl.appendChild(itemTabBar);

    
    $('.tabBarButtons .moveUp').click(function (e) {
        const $el = $(this);

        const par = $el.parents('.itemTab');
        const i = par.index();
        if (i > 0)
            $( ".itemTab" ).eq(i-1).before($(par));
    });

    $('.tabBarButtons .moveDown').click(function (e) {
        const $el = $(this);

        const par = $el.parents('.itemTab');
        const i = par.index();
        if (i < par.length)
            $( ".itemTab" ).eq(i+1).after($(par));
    });

    $('.tabBarButtons .deleteTab').click(function (e) {
        const $el = $(this);

        const par = $el.parents('.itemTab');
        par.remove();
    });
}

const addTitleBar = (tab) => {
    const markup = `
        <div class='tabBarTitle'>
           <img 
           src="/img/edit.svg" 
           alt="edit title button"/>
           <p class='titleText'>New Block</p>
        </div>
        <div class='tabBarButtons'>
            <div class='moveUp'>▲</div>
            <div class='moveDown'>▼</div>
            <div class='deleteTab'>✖</div>
        </div>
        
    `;
    tab.insertAdjacentHTML('beforeend', markup);
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

            console.log(evt.dragged);
        }, 
        onEnd: function (evt) { 
            $("#myTaskList").css('cursor', 'grab'); 
            const numKids = evt.from.childElementCount;

            if (numKids == 1) evt.from.remove();

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
        filter: '.dontdrag, .itemTabBar',
    });

    return s;
}


