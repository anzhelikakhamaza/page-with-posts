const pizzaPhoto = document.querySelectorAll(".pizza_option");
const pizzaType = document.querySelector(".pizza_type");
const pizzaSize = document.querySelector(".pizza_size");
const extraIngredients = document.querySelector(".add_extras");
const orderButton = document.querySelector(".order_button");
const displayTotalPrice = document.querySelector(".total_price");

const myForm = document.getElementById("myForm");
const mySelect = document.getElementById("mySelect");

const checkboxes = extraIngredients.querySelectorAll('input[type="checkbox"]');

pizzaType.addEventListener("change", updatePizzaType);
pizzaSize.addEventListener("change", updatePizzaSize);
extraIngredients.addEventListener("change", addExtras);
orderButton.addEventListener("click", makeOrder);

let selectedPizzaType = 0;
let selectedPizzaSize = 0;
let selectedIngredients = 0;

function updatePizzaType() {
  selectedPizzaType = parseFloat(pizzaType.value);
}
function updatePizzaSize() {
  selectedPizzaSize = parseFloat(pizzaSize.value);
}

function addExtras() {
  let totalIngredients = 0;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      totalIngredients += parseFloat(checkbox.value);
    }
  });

  selectedIngredients = totalIngredients;
}

function makeOrder() {
  const calculateTotalCost =
    selectedPizzaType + selectedPizzaSize + selectedIngredients;

  displayTotalPrice.textContent = "Total: $" + calculateTotalCost;
}

pizzaPhoto.forEach((button) => {
  button.addEventListener("click", imgClick);
});

function imgClick() {
  const pizzaTypeValue = this.value;

  if (pizzaTypeValue === "margarita") {
    selectedPizzaType = parseFloat(mySelect.options[1].value);
    mySelect.value = "20";
  } else if (pizzaTypeValue === "pepperoni") {
    selectedPizzaType = parseFloat(mySelect.options[2].value);
    mySelect.value = "23";
  } else if (pizzaTypeValue === "hawaiian") {
    selectedPizzaType = parseFloat(mySelect.options[3].value);
    mySelect.value = "18";
  }

  updatePizzaType();
}
