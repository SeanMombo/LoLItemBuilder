import Items from './models/Items';
import { elements } from './base';





const state = {};



const controlItems = async () => {

    state.items = new Items();

    try {
        await state.items.getDragon();
        console.log(state.items.itemData);
        
        state.items.addAllImages();
        state.items.getGold();
        state.items.addListeners();
        
        [...document.querySelectorAll('.item-img')].forEach(function(item) {
            item.addEventListener('mouseover', el => {
                state.items.openDescription(item);
            });

        });

    } catch(error) {
        alert(error);
    }
};

//['hashchange', 'load'].forEach(event => window.addEventListener(event, controlItems));

window.addEventListener('load', controlItems);
