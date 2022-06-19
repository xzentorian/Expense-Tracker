const userInput = document.querySelector("#inputTable");
const results = document.querySelector("#resultTable");
const addButton = document.querySelector("#expenseButton");
const expenseInput = document.querySelector("#typeOfExpense");
const date = document.querySelector("#datePicker");
const amount = document.querySelector("#amount");
const tempRow = document.querySelector("#tempTr");
const adjStartpoint= document.querySelector("#start");



let dataArray = new Array();

function addData(){
getData();
dataArray.push({
  expenseInput: expenseInput.value,
  date:date.value,
  amount:amount.value
})

localStorage.setItem("localData", JSON.stringify(dataArray));
}


function getData(){
let str = localStorage.getItem("localData");
if (str != null)
dataArray = JSON.parse(str);
}


function deleteData(){
localStorage.clear();
}

function showData(){
    getData();
    let expenseData = expenseInput.value;
   let dateData = date.value;
   let amountData = amount.value;

   for (i=0; i < dataArray.length; i++){

    let data = `<tr><td>${expenseData}</td>
    <td>${dateData}</td>
    <td>${amountData}</td><td><input type="button" value="X" class="removeButton"> </td></tr>`
     adjStartpoint.insertAdjacentHTML("afterend", data)

     // When data is added to the table, temprow.     
    if(results.rows.length > 2){
        tempRow.classList.add("hide");
    }
    addData();
    
}

}

// Add all data to the result table
addButton.addEventListener("click", function(){

    let expenseData = expenseInput.value;
   let dateData = date.value;
   let amountData = amount.value;

    let data = `<tr><td>${expenseData}</td>
    <td>${dateData}</td>
    <td>${amountData}</td><td><input type="button" value="X" class="removeButton"> </td></tr>`
     adjStartpoint.insertAdjacentHTML("afterend", data)

     // When data is added to the table, temprow.     
    if(results.rows.length > 2){
        tempRow.classList.add("hide");
    }
    addData();
    console.log(dataArray);
     
});

//Listen if the Remove button is clicked and if so remove the <tr> line in the result table.
document.addEventListener("click", removeButtonListener);

function removeButtonListener(e){
let element = e.target;
if(element.classList.contains("removeButton")){
    element.parentNode.parentNode.remove();
}

// if all data from the table is removed then show temprow again!
if(results.rows.length < 3){
    tempRow.classList.remove("hide");
}
}
