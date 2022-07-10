const userInput = document.querySelector("#inputTable");
const results = document.querySelector("#resultTable");
const addButton = document.querySelector("#expenseButton");
const expenseInput = document.querySelector("#typeOfExpense");
const date = document.querySelector("#datePicker");
const amount = document.querySelector("#amount");
const tempRow = document.querySelector("#tempTr");
const adjStartpoint = document.querySelector("#start");





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
    
}


function deleteData() {
    localStorage.clear();
    dataArray = [];
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

function insertEmptyRow() {
    if (results.rows.length < 2) {
        let row = results.insertRow();
        let cell = row.insertCell();
        cell.innerHTML = "No expenses added yet...";
    }
}

// Add all data to the result table
addButton.addEventListener("click", function () {
    addData();
});


//Listen if the Remove button is clicked and if so remove the <tr> line in the result table.
document.addEventListener("click", removeButtonListener);

let tempArray = [];
function removeButtonListener(e) {
    let element = e.target;
    if (element.classList.contains("removeButton")) {

        //iterate through table and grep values to compare to localstorage and dataArray 
        for (let i = 1, row; row = results.rows[i]; i++) {

            for (let j = 0, col; col = row.cells[j]; j++) {

                if (element.parentNode.parentNode == row) {
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

        for (let i = 0, item; item = dataArray[i]; i++) {

            // removes the object from dataArray that matches tempObj
            if (item.expenseInput === tempObj.expenseInput &&
                item.date === tempObj.date &&
                item.amount === tempObj.amount) {
                dataArray.splice(i, 1);
                tempArray = [];
            }
        }
        element.parentNode.parentNode.remove();
        localStorage.setItem("localData", JSON.stringify(dataArray));
    }

    // Add no expenses row when table is empty
    if (element.classList.contains("removeButton") && results.rows.length < 2) {
        insertEmptyRow();
    }
}


window.onload = function () {
    getData();
    showData();
    insertEmptyRow();
}

