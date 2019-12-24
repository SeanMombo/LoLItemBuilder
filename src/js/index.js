import Items from './models/Items';



const state = {};

const controlItems = async () => {

    state.items = new Items();

    try {
        await state.items.getDragon();
        console.log(state.items.keyList);
        
        state.items.addAllImages();
    } catch(error) {
        alert(error);
    }
};

//['hashchange', 'load'].forEach(event => window.addEventListener(event, controlItems));

window.addEventListener('load', controlItems);