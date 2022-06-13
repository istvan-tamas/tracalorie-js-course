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
            {id:0, name: "Steak dinner", calories: 1200},
            {id:1, name: "Cookies", calories: 300},
            {id:2, name: "Eggs", calories: 200}
        ],
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems: function(){
            return data.items;
        },
        setItem: function(food,calorie){
            data.items.push({id: 3, name: food, calories: calorie});
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
        addFood: "#item-name",
        addCalories: "#item-calories"
    };

    const EventListeners = {
        add: ".add-btn"
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
        addItem: function(e){
            e.preventDefault();
            let itemName = document.querySelector(UISelectors.addFood).value;
            let itemCalories = document.querySelector(UISelectors.addCalories).value;
            ItemCtrl.setItem(itemName, itemCalories);
            console.log(ItemCtrl.getItems());
            App.refresh();
        }

    };
})();

// App controller
const App = (function(ItemCtrl, UI,Ctrl){
    return {
        init: function(){
            const items = ItemCtrl.getItems();
            UICtrl.populateItemList(items);
            UICtrl.addEventListeners();
        },
        refresh: function() {
            items = ItemCtrl.getItems();
            UICtrl.populateItemList(items);
        }
    }


})(ItemCtrl, UICtrl);


//

App.init();

