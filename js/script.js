const pizzaType = document.querySelector('.pizzaType');
const pizzaSize = document.querySelector('.pizzaSize');
const addIngr = document.querySelector('.additional');
const button = document.querySelector('.button');
const totalPrice = document.querySelector('.totalPrice');

const checkboxes = addIngr.querySelectorAll('input[type="checkbox"]');

let selectedPizzaType = 0;
let selectedPizzaSize = 0;
let selectedIngredients = 0;

pizzaType.addEventListener('change', function () {
	selectedPizzaType = parseFloat(pizzaType.value);
});

pizzaSize.addEventListener('change', function () {
	selectedPizzaSize = parseFloat(pizzaSize.value);
});

addIngr.addEventListener('change', function () {
	let totalIngredients = 0;

	checkboxes.forEach(checkbox => {
		if (checkbox.checked) {
			totalIngredients += parseFloat(checkbox.value);
		}
	});

	selectedIngredients = totalIngredients;
});

button.addEventListener('click', function () {
	const totalCost = selectedPizzaType + selectedPizzaSize + selectedIngredients;

	totalPrice.textContent = 'Total: $' + totalCost;
});