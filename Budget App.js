let budgetAmountEl = document.getElementById("budgetAmount");
let totalExpensesAmountEl = document.getElementById("totalExpensesAmount");
let balanceAmountEl = document.getElementById("balanceAmount");
let budgetInputEl = document.getElementById("budgetInput");
let budgetInputErrMsgEl = document.getElementById("budgetInputErrMsg");
let setBudgetBtnEl = document.getElementById("setBudgetBtn");
let expenseTitleInputEl = document.getElementById("expenseTitleInput");
let expenseTitleInputErrMsgEl = document.getElementById("expenseTitleInputErrMsg");
let expenseAmountInputEl = document.getElementById("expenseAmountInput");
let expenseAmountInputErrMsgEl = document.getElementById("expenseAmountInputErrMsg");
let addExpenseBtnEl = document.getElementById("addExpenseBtn");
let expensesHistoryEl = document.getElementById("expensesHistory");

budgetInputEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        budgetInputErrMsgEl.textContent = "Required*";
    } else {
        budgetInputErrMsgEl.textContent = "";
    }
});
expenseTitleInputEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        expenseTitleInputErrMsgEl.textContent = "Required*";
    } else {
        expenseTitleInputErrMsgEl.textContent = "";
    }
});
expenseAmountInputEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        expenseAmountInputErrMsgEl.textContent = "Required*";
    } else {
        expenseAmountInputErrMsgEl.textContent = "";

    }
});


let deletId = 0;
let budget_amount = 0;
let expenses_amount = 0;
let balance_amount = 0;

function updateBudget() {
    if (budgetInputEl.value === "") {
        budgetInputErrMsgEl.textContent = "Required*";
    } else {
        let user_entered_amount = parseInt(budgetInputEl.value);
        if ((user_entered_amount > 0) | (user_entered_amount < 0)) {
            budgetAmountEl.textContent = budget_amount + user_entered_amount;
            balanceAmountEl.textContent = balance_amount + user_entered_amount;
            budget_amount += user_entered_amount;
            balance_amount += user_entered_amount;
        }
        budgetInputEl.value = "";
    }
}

function createAndAppendList() {
    let expenceId = "expense<expenseCount>" + deletId;

    if (expenseTitleInputEl.value === "") {
        expenseTitleInputErrMsgEl.textContent = "Required*";
    } else if (expenseAmountInputEl.value === "") {
        expenseAmountInputErrMsgEl.textContent = "Required*";
    } else {
        expenseTitleInputErrMsgEl.textContent = "";
        expenseAmountInputErrMsgEl.textContent = "";

        let textEl = document.createElement("li");
        textEl.id = expenceId;
        textEl.classList.add("d-flex", "flex-row", "mr-4");
        expensesHistoryEl.appendChild(textEl);

        let LableText = document.createElement("p");
        LableText.classList.add("col-6");
        LableText.textContent = expenseTitleInputEl.value;
        textEl.appendChild(LableText);

        let priceEl = document.createElement("p");
        priceEl.classList.add("red-color", "col-3");
        priceEl.textContent = expenseAmountInputEl.value;
        textEl.appendChild(priceEl);

        let deleteItemContainer = document.createElement("div");
        deleteItemContainer.classList.add("d-flex", "col-2", "justify-content-end");
        textEl.appendChild(deleteItemContainer);

        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
        deleteItemContainer.appendChild(deleteIcon);


        deleteIcon.onclick = function() {
            expensesHistoryEl.removeChild(textEl);
            let value = priceEl.textContent;
            balance_amount += parseInt(value);
            expenses_amount -= parseInt(value);

            totalExpensesAmountEl.textContent = expenses_amount;
            balanceAmountEl.textContent = balance_amount;
            console.log(textEl)
        };
        let user_entered_expence_amount = parseInt(expenseAmountInputEl.value);
        if ((user_entered_expence_amount > 0) | (user_entered_expence_amount < 0)) {
            balance_amount -= user_entered_expence_amount;
            expenses_amount += user_entered_expence_amount;

        }


        totalExpensesAmountEl.textContent = expenses_amount;
        balanceAmountEl.textContent = balance_amount;

        expenseTitleInputEl.value = "";
        expenseAmountInputEl.value = "";

        deletId += 1;

    }
}


setBudgetBtnEl.addEventListener("click", function(event) {
    updateBudget();
});

addExpenseBtnEl.addEventListener("click", function(event) {
    createAndAppendList();

});