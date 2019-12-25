import Items from './models/Items';



const state = {};

const controlItems = async () => {

    state.items = new Items();

    try {
        await state.items.getDragon();
        console.log(state.items.itemData);
        
        state.items.addAllImages();

        state.items.getGold();
    } catch(error) {
        alert(error);
    }
};

//['hashchange', 'load'].forEach(event => window.addEventListener(event, controlItems));

window.addEventListener('load', controlItems);