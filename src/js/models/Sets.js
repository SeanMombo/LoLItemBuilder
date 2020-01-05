import jszip from 'jszip'

export default class Sets {
    constructor () {
        this.blocks = [];
        this.exportObj = {
            title: '',
            associatedMaps: [],
            associatedChampions: [],
            blocks: [],
        };
    }

    getSets() {
        this.blocks = [];
        [...document.querySelectorAll('.itemTab')].forEach(el => {
            this.blocks.push(el);
        })
    }

    download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
      }

    exportSet() {
        this.getSets();
        this.addAllBlocks();

        const json = JSON.stringify(this.exportObj);	
        this.download('testfile.json', json);
    }

    addAllBlocks() {
        // For each item tab
        this.blocks.forEach( el => {

            // Find all the items in each tab
            const items = [...el.children].filter(item => item.classList.contains('item-module'));
            const title = el.children[0].children[0].children[1].textContent;

            let block = this.newBlock(title);

            // Store each item in a new item object, and store that new obj into the block obj
            items.forEach(item => {
                const i = this.newItem(item.id, 1);
                block.items.push(i);
            })
            this.exportObj.blocks.push(block);
            const t = document.querySelector('.setTitleText').textContent;
            this.exportObj.title = t;
        });
    }
    
    newBlock(title) {
        const block = {
            items: [],
            type: title
        }
        return block;
    }

    newItem(id, count = 1) {
        const item = {
            id: id,
            count: count
        }
        return item;
    }
}

// {
//     "title": "New Item Set",
//     "associatedMaps": [
//       12
//     ],
//     "associatedChampions": [
//       1
//     ],
//     "blocks": [
//       {
//         "items": [
//           {
//             "id": "3599",
//             "count": 1
//           },
//           {
//             "id": "3078",
//             "count": 1
//           }
//         ],
//         "type": "set1"
//       },
//       {
//         "items": [
//           {
//             "id": "3089",
//             "count": 1
//           },
//           {
//             "id": "3508",
//             "count": 1
//           }
//         ],
//         "type": "set2"
//       },
//       {
//         "items": [
//           {
//             "id": "3003",
//             "count": 1
//           },
//           {
//             "id": "3156",
//             "count": 1
//           },
//           {
//             "id": "2003",
//             "count": 3
//           }
//         ],
//         "type": "set3"
//       }
//     ]
//   }