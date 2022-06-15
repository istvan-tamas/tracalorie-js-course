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
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        getSelectors: function(){
            return UISelectors;
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
    }

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


    return {
        init: function(){
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

