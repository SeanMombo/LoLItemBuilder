import { elements } from '../base';

export const addImage = (id, gold, title, description, tags, hidden) => {
    if (id == 3850) id = 3303;
    const url = `../../img/item/${id}.png`;
    const markup = `
        <div class="item-module" data-tags='${tags}'>
            <div>
                <img class="item-img" src="${url}">
                <p>${gold}</p>
            </div>
            <span class="item-description">
                    <img src="${url}">
                    <div class="info">
                        <div class="name">${title}</div>
                        <div class="gold">${gold}</div>
                    </div>
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
        var item2 = item.parentNode.nextSibling.nextSibling;
        var t = $(item);
        var tooltip = $(item2);
        var offset = getOffset(t);
        var height = getHeight(tooltip);
       // var width  = getWidth(tooltip);

        window.mytimeout = setTimeout(function(){
        item2.style.visibility = 'visible';
        item2.style.opacity = 1;
        tooltip.toggleClass('bottom', (offset.top - $(window).scrollTop()) - height < 0);
        
       // tooltip.toggleClass('right', (offset.left) - width < 0);

        
    }, 300);
}