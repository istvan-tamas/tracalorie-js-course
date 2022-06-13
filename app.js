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
        logData: function(){
            return data;
        }
    }

})();

// UI controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: "#item-list"
    };

    return {
        populateItemList: function(items){
            let html = "";
            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name} </strong> <em>${item.calories} kcal</em> <a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a></li>`;
            });
            // Insert into HTML

            document.querySelector(UISelectors.itemList).innerHTML = html;
        }
    };
})();

// App controller
const App = (function(ItemCtrl, UI,Ctrl){
    return {
        init: function(){
            const items = ItemCtrl.getItems();
            UICtrl.populateItemList(items);
        }
    }


})(ItemCtrl, UICtrl);


//

App.init();

