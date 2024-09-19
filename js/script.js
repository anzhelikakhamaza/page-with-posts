const pizzaType = document.querySelector('.pizzaType');
const pizzaSize = document.querySelector('.pizzaSize');
const extraIngredients = document.querySelector('.add_extras');
const orderButton = document.querySelector('.order_button');
const displayTotalPrice = document.querySelector('.totalPrice');
const checkboxes = extraIngredients.querySelectorAll('input[type="checkbox"]');

let selectedPizzaType = 0;
let selectedPizzaSize = 0;
let selectedIngredients = 0;

function updatePizzaType() {
	selectedPizzaType = parseFloat(pizzaType.value);
}
function updatePizzaSize() {
	selectedPizzaSize = parseFloat(pizzaSize.value);
}

pizzaType.addEventListener('change', updatePizzaType);
pizzaSize.addEventListener('change', updatePizzaSize);

extraIngredients.addEventListener('change', function () {
	let totalIngredients = 0;

	checkboxes.forEach(checkbox => {
		if (checkbox.checked) {
			totalIngredients += parseFloat(checkbox.value);
		}
	});

	selectedIngredients = totalIngredients;
});

orderButton.addEventListener('click', function () {
	const calculateTotalCost = selectedPizzaType + selectedPizzaSize + selectedIngredients;

	displayTotalPrice.textContent = 'Total: $' + calculateTotalCost;
});