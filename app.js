// Storage controller
const StorageCtrl = (function(){
    return {
        storeItem: function(item){
            let items;

            if(localStorage.getItem("items") === null){
                items = [];
                items.push(item);
                localStorage.setItem("items", JSON.stringify(items));
            }else{
                items = JSON.parse(localStorage.getItem("items"));

                items.push(item);
                localStorage.setItem("items", JSON.stringify(items));
            }
        },

        getItemsFromStorage: function() {
            let items;
             if(localStorage.getItem("items") === null){
                items = []
             }else{
                items = JSON.parse(localStorage.getItem("items"));

             }
             return items;
        }


    }

})();

// Item controlller
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    };
    // Data structure
    const data = {


        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems: function(){
            return data.items;
        },
        addItem: function(name,calories){
            let ID;
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            }else{
                ID = 0;
            }
            const cal = parseInt(calories);

            // new item

            newItem = new Item(ID,name,cal);
            data.items.push(newItem);
            return newItem;
        },
        getItemByID: function(id){
            let found = null;
            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }
            });
            return found;
            
        },
        deleteItem: function(id){
            ids = data.items.map(function(item){
                return item.id;
            });

            const index = ids.indexOf(id);

            data.items.splice(index, 1);

        },
        updateItem: function(name, calories){
            calories = parseInt(calories);

            let found = null;
            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            })
            return found;
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        getTotalCalories: function(){
            let total = 0;

            data.items.forEach(function(item){
               total += item.calories; 
            });
            data.totalCalories = total;


            return data.totalCalories;
        },
        clearAll: function(){
            data.items = [];
        },
        logData: function(){
            return data;
        }
    }

})();

// UI controller
const UICtrl = (function(){

    const UISelectors = {
        itemList: "#item-list",
        itemNameInput: "#item-name",
        itemCaloriesInput: "#item-calories",
        addBtn: ".add-btn",
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
        backBtn: ".back-btn",
        totalCalories: ".total-calories",
        listItems: '#item-list li',
        clearAll: '.clear-btn'
    };

    return {
        populateItemList: function(items){
            let html = "";
            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name} </strong> <em>${item.calories} kcal</em> <a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a></li>`;
            });
            // Insert into HTML

            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        addEventListeners: function(){
            document.querySelector(EventListeners.add).addEventListener("click",UICtrl.addItem);
        },
        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item){
            const li = document.createElement("li");
            li.className = "collection-item";
            li.id = `item-${item.id}`;

            li.innerHTML = `<strong>${item.name} </strong> <em>${item.calories} kcal</em> <a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
            document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);

            document.querySelector(UISelectors.itemList).style.display = "block";

        },
        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn Node List into array

            listItems = Array.from(listItems);

            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute("id");
                
                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML =`<strong>${item.name} </strong> <em>${item.calories} kcal</em> <a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
                }
            });
        },
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();

        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = "";
            document.querySelector(UISelectors.itemCaloriesInput).value = "";
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        getSelectors: function(){
            return UISelectors;
        },
        clearEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = "none";
            document.querySelector(UISelectors.deleteBtn).style.display = "none";
            document.querySelector(UISelectors.backBtn).style.display = "none";
            document.querySelector(UISelectors.addBtn).style.display = "inline";
            UICtrl.clearInput();
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = "inline";
            document.querySelector(UISelectors.deleteBtn).style.display = "inline";
            document.querySelector(UISelectors.backBtn).style.display = "inline";
            document.querySelector(UISelectors.addBtn).style.display = "none";
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = "none";
        },
        removeItems: function(){
            let listItems = document.querySelectorAll(UISelectors.listItems);
            listItems = Array.from(listItems);

            listItems.forEach(function(item){
                item.remove;
            });
        }

    };
})();

// App controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors();

        document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);

        document.addEventListener("keypress", function(e){
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }
        });

        document.querySelector(UISelectors.itemList).addEventListener("click",itemEditClick);

        document.querySelector(UISelectors.updateBtn).addEventListener("click",itemUpdateSubmit);     
        
        document.querySelector(UISelectors.deleteBtn).addEventListener("click",itemDeleteSubmit);  

        document.querySelector(UISelectors.backBtn).addEventListener("click", back);

        document.querySelector(UISelectors.clearAll).addEventListener("click", clearAllItemsClick);  
    
    }

    const itemAddSubmit = function(e){
        e.preventDefault();
        const input = UICtrl.getItemInput();

        if(input.name !== '' && input.calories !== ''){
            const newItem = ItemCtrl.addItem(input.name,input.calories);

            UICtrl.addListItem(newItem);

            const totalCalories = ItemCtrl.getTotalCalories();

            UICtrl.showTotalCalories(totalCalories);

            StorageCtrl.storeItem(newItem);

            UICtrl.clearInput();
        }    
    }

    const back = function(e){
        e.preventDefault();
        UICtrl.clearInput();
        UICtrl.clearEditState();

    }

    const itemEditClick = function(e){
        e.preventDefault();
        if(e.target.classList.contains('edit-item')){
            const listID = e.target.parentNode.parentNode.id;
            
            const listIDArr = listID.split("-");
            
            const id = parseInt(listIDArr[1]);

            const itemToEdit = ItemCtrl.getItemByID(id);
            
            ItemCtrl.setCurrentItem(itemToEdit);

            UICtrl.addItemToForm();

        }      
    }

    const itemUpdateSubmit = function(e){

        e.preventDefault();

        const input = UICtrl.getItemInput();

        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        UICtrl.updateListItem(updatedItem);

        const totalCalories = ItemCtrl.getTotalCalories();

        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();

       
    }

    const clearAllItemsClick = function(e){

        e.preventDefault();

        ItemCtrl.clearAll();

        const totalCalories = ItemCtrl.getTotalCalories();

        UICtrl.showTotalCalories(totalCalories);

        UICtrl.removeItems();

        UICtrl.hideList();

    }

    const itemDeleteSubmit = function(e){
        e.preventDefault();
        const currentItem = ItemCtrl.getCurrentItem();

        ItemCtrl.deleteItem(currentItem.id);

        UICtrl.deleteListItem(currentItem.id);

        const totalCalories = ItemCtrl.getTotalCalories();

        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();
        
    }

    return {
        init: function(){

            UICtrl.clearEditState();

            const items = ItemCtrl.getItems();

            if(items.lenght === 0){
                UICtrl.hideList();
            }else{
                UICtrl.populateItemList(items);
            }

            
            const totalCalories = ItemCtrl.getTotalCalories();

            UICtrl.showTotalCalories(totalCalories);


            loadEventListeners();
        }
    }


})(ItemCtrl, StorageCtrl, UICtrl);

App.init();