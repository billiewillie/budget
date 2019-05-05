var budgetController = (function () {

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  }

  return {
    addItem: function (type, des, val) {
      var newItem, ID;
      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      if (newItem === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (newItem === 'inc') {
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);
      return newItem;
    }
  }

})();

var uiController = (function () {
  var DOMstrings = {
    inputType: document.querySelector('.add__type'),
    inputDescription: document.querySelector('.add__description'),
    inputValue: document.querySelector('.add__value'),
    inputButton: document.querySelector('.add__btn'),
  }

  return {
    getInput: function () {
      return {
        type: DOMstrings.inputType.value,
        description: DOMstrings.inputDescription.value,
        value: DOMstrings.inputValue.value,
      }
    },
    getDOMstrings: function () {
      return DOMstrings;
    }
  }

})();

var controller = (function (budgetctrl, UIctrl) {

  var setupEventListener = function () {

    var DOM = UIctrl.getDOMstrings();

    DOM.inputButton.addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });

  }

  function ctrlAddItem() {
    var input = UIctrl.getInput();
    console.log(input);
  }

  return {
    init: function () {
      setupEventListener();
    }
  }

})(budgetController, uiController);

controller.init();