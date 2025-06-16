/*
File: main.js
GUI Assignment: HW 3 Creating an Interactive Dynamic Table
Senny Lu, UMass Lowell Computer Science, senny_lu@student.uml.edu 
Copyright (c) 2025 by Senny. All rights reserved.  May be freely copied or 
excerpted for educational purposes with credit to the author. 
updated by SL on June 16th, 2025 at 2:30 PM
*/

const form = document.getElementById("info");

// prevents refreshing of table on form submit
// calls createTable function to generate table or clears table based on button pressed
form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (event.submitter.id === "Generate") {
        createTable();
    } else if (event.submitter.id === "Clear") {
        const container = document.getElementById("tableContainer");
        container.innerHTML = "";
    }
});

function createTable() {
    // Get Table dimensions from form in html
    const minCol = parseInt(document.getElementById("minimumColumn").value);
    const maxCol = parseInt(document.getElementById("maximumColumn").value);
    const minRow = parseInt(document.getElementById("minimumRow").value);
    const maxRow = parseInt(document.getElementById("maximumRow").value);

    // Error Checking / clearing error text
    let Error = document.getElementById("Error");
    Error.innerText = "";

    // Error: Not a Number
    if (isNaN(minCol)) {
        Error.innerText = "Error: Minimum Column is Not a Number";
        return;
    }
    if (isNaN(maxCol)) {
        Error.innerText = "Error: Maximum Column is Not a Number";
        return;
    }
    if (isNaN(minRow)) {
        Error.innerText = "Error: Minimum Row is Not a Number";
        return;
    }
    if (isNaN(maxRow)) {
        Error.innerText = "Error: Maximum Row is Not a Number";
        return;
    }

    // Error: Out of Bounds
    if (minCol < -50 || minCol > 50) {
        Error.innerText = "Error: Minimum Column is Out of Bounds";
        return;
    }
    if (maxCol < -50 || maxCol > 50) {
        Error.innerText = "Error: Maximum Column is Out of Bounds";
        return;
    }
    if (minRow < -50 || minRow > 50) {
        Error.innerText = "Error: Minimum Row is Out of Bounds";
        return;
    }
    if (maxRow < -50 || maxRow > 50) {
        Error.innerText = "Error: Maximum Row is Out of Bounds";
        return;
    }

    // Error: Maximum Smaller than Minimum
    if (maxCol < minCol) {
        Error.innerText = "Error: Maximum Column is Smaller than Minimum Column";
        return;
    }
    if (maxRow < minRow) {
        Error.innerText = "Error: Maximum Row is Smaller than Minimum Row";
        return;
    }

    // debugging console logging
    console.log("minCol:", minCol, "maxCol:", maxCol, "minRow:", minRow, "maxRow:", maxRow); 

    // container is location to put table in html
    const container = document.getElementById("tableContainer");   
    const table = document.createElement("table");
    let tableRow = document.createElement("tr");
    let tableData = document.createElement("td");

    // empty box in top left corner
    tableRow.appendChild(tableData);

    // add row of multipliers on top of table
    for (let g = minCol; g <= maxCol; g++) {
        tableData = document.createElement("td");
        tableData.innerText = g;
        tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);

    // double for loop to create each row with i*j in each box
    for (let i = minRow; i <= maxRow; i++) {
        tableRow = document.createElement("tr");

        // add multiplicand first on left side of each row
        tableData = document.createElement("td");
        tableData.innerText = i;
        tableRow.appendChild(tableData);

        // calculate and add each box to row
        for (let j = minCol; j <= maxCol; j++) {
            tableData = document.createElement("td");
            tableData.innerText = i * j;
            tableRow.appendChild(tableData);
        }

        // append row to table
        table.appendChild(tableRow);
    }

    // clears container then generates the table
    container.innerHTML = "";
    container.appendChild(table);
}
