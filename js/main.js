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

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);
      return newItem;
    },
    testing: function () {
      console.log(data);
    }
  }

})();

var UIController = (function () {
  var DOMstrings = {
    inputType: document.querySelector('.add__type'),
    inputDescription: document.querySelector('.add__description'),
    inputValue: document.querySelector('.add__value'),
    inputButton: document.querySelector('.add__btn'),
    incomeContainer: document.querySelector('.income__list'),
    expensesContainer: document.querySelector('.expenses__list'),
  }

  return {
    getInput: function () {
      return {
        type: DOMstrings.inputType.value,
        description: DOMstrings.inputDescription.value,
        value: +DOMstrings.inputValue.value,
      }
    },

    addListItem: function (obj, type) {

      var html, newHTML, element;

      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = "<div class='item clearfix' id='income-%id%'><div class='item__description'>%description%</div><div class='right clearfix'><div class='item__value'>%value%</div><div class='item__delete'><button class='item__delete--btn'><i class='ion-ios-close-outline'></i></button></div></div></div>";
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = "<div class='item clearfix' id='expense-%id%'><div class='item__description'>%description%</div><div class = 'right clearfix'><div class='item__value'>%value%</div><div class = 'item__percentage'>21%</div><div class = 'item__delete'><button class='item__delete--btn'><i class='ion-ios-close-outline'></i></button></div></div></div>";
      }

      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML = newHTML.replace('%value%', obj.value);

      element.insertAdjacentHTML('beforeend', newHTML);
    },

    clearFields: function () {
      Array.from(document.querySelectorAll('.add__description, .add__value')).forEach(function (item) {
        item.value = '';
      });
      DOMstrings.inputDescription.focus();
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
    var input, newItem;
    input = UIctrl.getInput();
    newItem = budgetctrl.addItem(input.type, input.description, input.value);
    console.log(newItem, input.type);
    UIctrl.addListItem(newItem, input.type);
    UIctrl.clearFields();
  }

  return {
    init: function () {
      console.log('App has started!')
      setupEventListener();
    }
  }

})(budgetController, UIController);

controller.init();