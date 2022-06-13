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
        logData: function(){
            return data;
        }
    }

})();

// UI controller
const UICtrl = (function(){
    return {

    };
})();

// App controller
const App = (function(ItemCtrl, UI,Ctrl){
    return {
        init: function(){
            console.log("Initilizing app");
        }
    }


})(ItemCtrl, UICtrl);


//

App.init();

