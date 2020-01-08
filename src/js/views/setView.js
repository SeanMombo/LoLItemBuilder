import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import * as itemsView from './itemsView';
import * as searchView from './searchView';
import $ from 'jquery';


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

            let item2 = clone;//.children[0].children[0];
            console.log(item2);
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

    $('.tabBarButtons .moveUp').unbind();
    $('.tabBarButtons .moveDown').unbind();
    $('.tabBarButtons .deleteTab').unbind();

    $('.tabBarButtons .moveUp').on('click', function (e) {
        //console.log(e)
        const $el = $(this);

        const par = $el.parents('.itemTab');
        const i = par.index();
        let prev;

        if (i-1 >= 0)
        {
            prev = $( ".itemTab" ).eq(i-1);
            if (i > 0) {
                prev.before($(par));
            }
        }
    });

    $('.tabBarButtons .moveDown').click(function (e) {
        const $el = $(this);

        const par = $el.parents('.itemTab');
        const i = par.index();

        const len = par.parent()[0].children.length;

        if (i < len)
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
           src="img/edit.svg" 
           alt="edit title button"/>
           <p class='titleText'>New Block</p>
        </div>
        <div class='tabBarButtons'>
            <div class='moveUp'charset='utf-8'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(205,189,148)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up-circle"><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line></svg> </div>
            <div class='moveDown'charset='utf-8'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(205,189,148)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-down-circle"><circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line></svg> </div>
            <div class='deleteTab'charset='utf-8'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(205,189,148)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            </div>
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

            //console.log(evt.dragged);
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

export const getOffset = (t) => {
    return t.offset();
}

export const getHeight = (t) => {
    return t.height();
}
export const getWidth = (t) => {
    return t.width();
}

export const openDescription = (item, timer = 0) => {
    
    //if (item.parentNode.parentNode.parentNode.id === 'middle') 
    { 
        var item2 = item.children[1];

        var t = $(item);
        var tooltip = $(item2);
    
        var offset = getOffset(t);

        var height = getHeight(tooltip);
        const ypos = offset.top - $(window).scrollTop() - height - 24 - 28;
        const xpos = offset.left - tooltip.width()/2 ;

        
        item2.style.visibility = 'visible';
        item2.style.opacity = 1;

        if (timer != 0) {
            clearTimeout(window.mytimeout);
            tooltip.fadeIn(1);
        }
        // tooltip.toggleClass('bottom', (ypos < 0));
        tooltip.css({'top': ypos, 'left': xpos});

        if(ypos < 0) {
            tooltip.css("top", ypos + height + 64 + 24 + 30);
        }
        
        // // push tooltip left if it exceeds right boundary
        // let m = $('#middle');
        // let mright = m.offset().left + m.width() - 16;
        // let moff = (xpos + tooltip.width())

        // if(moff > mright) {
        //     tooltip.css("left", xpos + (mright-moff));
        // }

        // push tooltip right if it exceeds left boundary
        if(xpos < 0) {
            tooltip.css("left", 16);
         }

        if (timer != 0){
            clearTimeout(window.mytimeout);
            window.mytimeout = setTimeout(function(){
                tooltip.fadeOut(timer/4);
            }, timer);
        }
    }

    
}





