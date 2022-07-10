const userInput = document.querySelector("#inputTable");
const results = document.querySelector("#resultTable");
const addButton = document.querySelector("#expenseButton");
const expenseInput = document.querySelector("#typeOfExpense");
const date = document.querySelector("#datePicker");
const amount = document.querySelector("#amount");
const tempRow = document.querySelector("#tempTr");
const adjStartpoint = document.querySelector("#start");
const checkLocalStorage = document.querySelector("#locals");
const delData = document.querySelector("#delete");
const tempRowButton = document.querySelector("#omega");


let dataArray = new Array();

function addData() {
    dataArray.push({
        expenseInput: expenseInput.value,
        date: date.value,
        amount: amount.value
    })

    localStorage.setItem("localData", JSON.stringify(dataArray));
    getData();
    showData();
}


function getData() {
    let str = localStorage.getItem("localData");
    if (str != null)
        dataArray = JSON.parse(str);
    //console.log(str)
}


function deleteData() {
    localStorage.clear();
    console.log("localstorage cleared");
    dataArray = [];
    console.log("dataAray also cleared");
}


function showData() {
    let x = results.rows.length;
    while (--x) {
        results.deleteRow(x);
    }

    for (i = 0; i < dataArray.length; i++) {
        let expenseData = dataArray[i].expenseInput;
        let dateData = dataArray[i].date;
        let amountData = dataArray[i].amount;
        let data = `<tr><td>${expenseData}</td>
            <td>${dateData}</td>
            <td>${amountData}</td><td><input type="button" value="X" class="removeButton"> </td></tr>`
        adjStartpoint.insertAdjacentHTML("afterend", data)
    }
}


// Add all data to the result table
addButton.addEventListener("click", function () {
    addData();
    //console.log(dataArray);
    //console.log(results.rows.length);
});


//Listen if the Remove button is clicked and if so remove the <tr> line in the result table.
document.addEventListener("click", removeButtonListener);

let tempArray =[];
function removeButtonListener(e) {
    let element = e.target;
    if (element.classList.contains("removeButton")) {
       
        //iterate through table and grep values to compare to localstorage and dataArray 
        for (let i = 1, row; row = results.rows[i]; i++){
            
            for (let j =0, col; col= row.cells[j]; j++){
            
                if (element.parentNode.parentNode == row){
                     tempArray.push(col.innerHTML);
                 }
            }
        }

  //removes the last array item(4, removebutton)     
 tempArray.pop();
    
const tempObj = {
    expenseInput: tempArray[0],
    date: tempArray[1],
    amount: tempArray[2]
};

console.log(tempObj);
     
        for (let i = 0, item; item = dataArray[i]; i++){
           // console.log(item);
            // removes the object from dataArray that matches tempObj
            if(item.expenseInput === tempObj.expenseInput && 
                item.date === tempObj.date &&
                item.amount === tempObj.amount){
                console.log("woppiii a match")
                dataArray.splice(i, 1);
                console.log(dataArray);
               console.log(item);
               tempArray = [];
            }
                else {console.log("error")}
            
        }
        element.parentNode.parentNode.remove();
        console.log("removed");
        
    }

// Add no expenses row when table is empty
    if (element.classList.contains("removeButton") && results.rows.length < 2) {
        let row = results.insertRow();
        let cell = row.insertCell();
        cell.innerHTML = "No expenses added yet...";
    }
}
//! testknapp kolla localStorage
checkLocalStorage.addEventListener("click", function () {
    let str = localStorage.getItem("localData");
    if (str != null)
        dataArray = JSON.parse(str);
    console.log(str);
})

delData.addEventListener("click", deleteData);

//! testknapp för tinkering med få tillbaka no exp.. texten.
tempRowButton.addEventListener("click", function () {
    let row = results.insertRow();
    let cell = row.insertCell();
    cell.innerHTML = "No expenses added yet...";
    console.log("clicked");
})

//TODO när klick på removebutton måste den försvinna ur localstorage också.
//TODO ta bort samma dataArray item som tempObj
//TODO Ta bort testknappar