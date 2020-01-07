import { elements } from '../base';
import * as itemsView from '../views/itemsView';
import $ from 'jquery';

export const addImage = (id, gold, title, description, tags, hidden) => {
    if (id == 3850) id = 3303;
    const url = `img/item/${id}.png`;
    if (gold == 0) gold = 'Free';

    if(!tags) tags = '';

    title = title.replace(/[']/g,"");
    if (title == 'Spellthiefs Edge') id = 3850;
    const markup = `
        <div class='item-module noSelect' data-tags='${tags}' data-name='${title}' id='${id}'>
            <div>
                <img class="item-img" src="${url}">
                <p>${gold}</p>
            </div>
            <span class="item-description">
                <div class="topSection">

                    <div class="image"><img src="${url}"></div>
            
                    <div class="info">
                        <div class="descname">${title}</div>
                        <div class="descgold"><img src='img/coin.png'><p>${gold}</p></div>
                    </div>
                </div>
                <br>
                <div class="desc">${description}</div>
            <span>
        </div>
    `;
    elements.itemImages.insertAdjacentHTML('beforeend', markup);
}

export const addAllImages = (items) => {
    items.forEach( el => addImage(el.key, el.gold, el.name, el.description, el.tags, false));
}
export const hideAllImages = (items) => {
    const modules = document.querySelectorAll('.item-module');
    const par = document.querySelector('#hidden-items');

    modules.forEach( el => {
        par.appendChild(el);        
    });
}

export const sortAllImages = (items) => {
    const m = document.querySelector('#middle');
    items.forEach( el => {
        const mod = document.getElementById(el.key);
        m.appendChild(mod)
    });
}

export const addCloneListener = (item) => {
        
    let item2 = item.parentNode.nextSibling.nextSibling;
    item.addEventListener('mouseout', function() {
        clearTimeout(window.mytimeout);
        item2.style.visibility = 'hidden';
        item2.style.opacity = 0;
    });

    item.addEventListener('mouseover', el => {
        itemsView.openDescription(item);
    });

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

export const openDescription = (item) => {
    
    if (item.parentNode.parentNode.parentNode.id === 'middle') 
    { 
        var item2 = item.parentNode.nextSibling.nextSibling;
        var t = $(item);
        var tooltip = $(item2);
    
        var offset = getOffset(t);

        var height = getHeight(tooltip);
        const ypos = offset.top - $(window).scrollTop() - height - 24 - 28;
        const xpos = offset.left - tooltip.width()/2 ;
        tooltip.css('z-index', 999);
        
        window.mytimeout = setTimeout(function(){
            item2.style.visibility = 'visible';
            item2.style.opacity = 1;
            // tooltip.toggleClass('bottom', (ypos < 0));
            tooltip.css({'top': ypos, 'left': xpos});

            if(ypos < 0) {
                tooltip.css("top", ypos + height + 64 + 24 + 30);
            }
            
            // push tooltip left if it exceeds right boundary
            let m = $('#middle');
            let mright = m.offset().left + m.width() - 16;
            let moff = (xpos + tooltip.width())

            if(moff > mright) {
                tooltip.css("left", xpos + (mright-moff));
            }

            // push tooltip right if it exceeds left boundary
            if(xpos < 0) {
                tooltip.css("left", 16);
            }
        }, 240);
    }
}