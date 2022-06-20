// Storage controller


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
        items: [
         //   {id:0, name: "Steak dinner", calories: 1200},
         //   {id:1, name: "Cookies", calories: 300},
         //   {id:2, name: "Eggs", calories: 200}
        ],
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
        totalCalories: ".total-calories"
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
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = "none";
            document.querySelector(UISelectors.deleteBtn).style.display = "none";
            document.querySelector(UISelectors.backBtn).style.display = "none";
            document.querySelector(UISelectors.addBtn).style.display = "inline";
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = "inline";
            document.querySelector(UISelectors.deleteBtn).style.display = "inline";
            document.querySelector(UISelectors.backBtn).style.display = "inline";
            document.querySelector(UISelectors.addBtn).style.display = "none";
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = "none";
        }

    };
})();

// App controller
const App = (function(ItemCtrl, UI,Ctrl){
    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors();

        document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);

        document.querySelector(UISelectors.itemList).addEventListener("click",itemUpdateSubmit);    }



    const itemAddSubmit = function(e){
        e.preventDefault();
        const input = UICtrl.getItemInput();

        if(input.name !== '' && input.calories !== ''){
            const newItem = ItemCtrl.addItem(input.name,input.calories);

            UICtrl.addListItem(newItem);

            const totalCalories = ItemCtrl.getTotalCalories();

            UICtrl.showTotalCalories(totalCalories);


            UICtrl.clearInput();
        }    
    }

    const itemUpdateSubmit = function(e){
        if(e.target.classList.contains('edit-item')){
            const listID = e.target.parentNode.parentNode.id;
            
            const listIDArr = listID.split("-");
            
            const id = parseInt(listIDArr[1]);


            const itemToEdit = ItemCtrl.getItemByID(id);
            
            ItemCtrl.setCurrentItem(itemToEdit);


            UICtrl.addItemToForm();

        }
        e.preventDefault();
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


})(ItemCtrl, UICtrl);


//

App.init();

