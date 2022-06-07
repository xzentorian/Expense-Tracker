const userInput = document.querySelector("#inputTable");
const results = document.querySelector("#resultTable");
const addButton = document.querySelector("#expenseButton");
const expenseInput = document.querySelector("#typeOfExpense");
const date = document.querySelector("#datePicker");
const amount = document.querySelector("#amount");







addButton.addEventListener("click", function(){
    // add a counter
    if (results.rows.length == 2){
        results.deleteRow(1);
    };
   
    let expenseData = expenseInput.value;
   let dateData = date.value;
   let amountData = amount.value;

    let data = `<tr><td>${expenseData}</td>
    <td>${dateData}</td>
    <td>${amountData}</td><td></td>`
     results.insertAdjacentHTML("beforeend", data) 
     
});