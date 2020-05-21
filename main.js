let incomeModel = document.getElementById("incomeModel");
let expenseModel = document.getElementById("expenseModel");
let addExpense = document.getElementById("addExpense");
let addIncome = document.getElementById("addIncome");

//open form for add Income
incomeModel.addEventListener("click", function () {
  let formContainer = document.querySelector(".form-container");
  formContainer.classList.add("show");
  addExpense.style.display = "none";
  addIncome.style.display = "block";
});

//open form for add expense
expenseModel.addEventListener("click", function () {
  let formContainer = document.querySelector(".form-container");
  formContainer.classList.add("show");
  addIncome.style.display = "none";
  addExpense.style.display = "block";
});

let amountSummary = [];
let currentBalance = 0;
addIncome.addEventListener("click", income);
addExpense.addEventListener("click", expense);

//display data in card
function renderData(array) {
  let row = document.querySelector("#row");
  row.textContent = "";
  for (let i = 0; i < array.length; i++) {
    let col = document.createElement("div");
    col.setAttribute("class", "col-md-2");
    let box = document.createElement("div");
    if (array[i].type == "Income") {
      box.setAttribute("class", "box income");
    } else {
      box.setAttribute("class", "box expense");
    }
    let renderSource = document.createElement("h1");
    renderSource.setAttribute("class", "source");
    renderSource.textContent = array[i].source;
    let renderAmount = document.createElement("h4");
    renderAmount.setAttribute("class", "amount");
    let span = document.createElement("span");
    span.textContent = "Amount : ";
    renderAmount.append(span, array[i].amount);
    let p = document.createElement("p");
    p.textContent = "Note :";
    let renderNote = document.createElement("div");
    renderNote.setAttribute("class", "note");
    renderNote.textContent = array[i].note;
    let badge = document.createElement("p");
    badge.setAttribute("class", "badge");
    badge.textContent = array[i].type;
    box.append(renderSource, renderAmount, p, renderNote, badge);
    col.append(box);
    row.append(col);
  }

  closeModel();

  //display total income at top container
  let income = amountSummary
    .filter(function (a) {
      return a.type == "Income";
    })
    .reduce(function (a, b) {
      return a + b.amount;
    }, 0);

  let dailyIncome = document.getElementById("daily-income");
  dailyIncome.textContent = income;

  //display total expense at top container
  let expense = amountSummary
    .filter(function (a) {
      return a.type == "Expense";
    })
    .reduce(function (a, b) {
      return a + b.amount;
    }, 0);
  let dailyExpesne = document.getElementById("daily-expense");
  dailyExpesne.textContent = expense;

  //display saving amount at top container
  let balance = document.getElementById("total-balance");
  balance.textContent = income - expense;
  currentBalance = income - expense;
}

//add income in array
function income() {
  let source = document.getElementById("source").value;
  let amount = document.getElementById("amount").value;
  let note = document.getElementById("note").value;
  amountSummary.push({
    source: source,
    amount: parseInt(amount),
    note: note,
    type: "Income",
  });
  source.value = "";
  amount.value = "";
  note.value = "";
  renderData(amountSummary);
}

// add expense in array
function expense() {
  let source = document.getElementById("source").value;
  let amount = document.getElementById("amount").value;
  let note = document.getElementById("note").value;
  if (amount > currentBalance) {
    let alert = document.createElement("p");
    alert.setAttribute("class", "alert");
    alert.textContent =
      "You do not any enough saving for this expense. Earn It!!";
    let formContainer = document.querySelector(".form-container");
    let close = document.getElementById("close");
    formContainer.insertBefore(alert, close);
    console.log(alert);
  } else {
    amountSummary.push({
      source: source,
      amount: parseInt(amount),
      note: note,
      type: "Expense",
    });
    source.value = "";
    amount.value = "";
    note.value = "";
    renderData(amountSummary);
  }
}

//Close the modal box
let close = document.getElementById("close");
close.textContent = "X";
close.addEventListener("click", closeModel);
function closeModel() {
  let formContainer = document.querySelector(".form-container");
  formContainer.setAttribute("class", "container form-container");
}

//sort array in acending order
let sortByAcending = document.getElementById("byAcending");
sortByAcending.addEventListener("click", acending);
function acending() {
  let sortedArray = amountSummary.sort(function (a, b) {
    return a.amount - b.amount;
  });
  renderData(sortedArray);
}

//sort array in decending order
let sortByDcending = document.getElementById("byDcending");
sortByDcending.addEventListener("click", decending);
function decending() {
  let sortedArray = amountSummary.sort(function (a, b) {
    return b.amount - a.amount;
  });
  renderData(sortedArray);
}
