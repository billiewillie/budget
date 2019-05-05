var budgetController = (function () {

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

    }
  }

})();

var controller = (function (budgetctrl, uictrl) {

  function ctrlAddItem() {
    var input = uictrl.getInput();
    console.log(input);
  }

  DOMstrings.inputButton.addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 || e.which === 13) {
      ctrlAddItem();
    }
  })

})(budgetController, uiController);