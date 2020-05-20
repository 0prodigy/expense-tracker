let incomeModel = document.getElementById("incomeModel");
let expenseModel = document.getElementById("expenseModel");
let addExpense = document.getElementById("addExpense");
let addIncome = document.getElementById("addIncome");

incomeModel.addEventListener("click", function () {
  let formContainer = document.querySelector(".form-container");
  formContainer.classList.add("show");
  addExpense.style.display = "none";
});

expenseModel.addEventListener("click", function () {
  let formContainer = document.querySelector(".form-container");
  formContainer.classList.add("show");
  addIncome.style.display = "none";
});
