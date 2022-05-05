//alert("Hey connected!")

window.onload = pageReady;

function pageReady() {
  /* Variables declared to access DOM elements */

  var formData = document.forms.pill_form;
  var btn = document.getElementById("btn");
  var table = document.getElementById("med-table");
  var currTime = document.getElementsByClassName("currtime");
  var dueDate = document.getElementsByClassName("duedate");
  var totalmed = document.getElementsByClassName("totalmed");
  var perdaymed = document.getElementsByClassName("perdaymed");

  /* Assign current date to the all the medicines that are added to the table */

  for (var i = 0; i < currTime.length; i++) {
    currTime[i].innerHTML = new Date().toDateString();
  }

  /* Loop to calculate the due date based on the total number of pills and number of pills per day */

  for (var i = 0; i < dueDate.length; i++) {
    var dueDateResult = calculateDueDate(
      Number(totalmed[i].innerText),
      Number(perdaymed[i].innerText)
    );

    dueDate[i].innerHTML = dueDateResult;
  }

  /* Function to find out the due date */

  function calculateDueDate(totalMed, perDayMed) {
    var result = totalMed / perDayMed;
    var today = new Date();
    var duedate = new Date();
    duedate.setDate(today.getDate() + Number(result));
    if (duedate.toDateString() === new Date().toDateString()) {
      return "Quick!! Get the medicine right away!!";
    } else return duedate.toDateString();
  }

  /* Form Validation */

  function validateForm() {
    var medName = formData.med_name.value;
    var totalMed = formData.total_med.value;
    var perDayMed = formData.per_day_med.value;

    if (medName === "") {
      formData.med_name.style.backgroundColor = "red";
      formData.med_name.focus();
      return false;
    }

    if (totalMed === "" || totalMed === "0") {
      formData.total_med.style.backgroundColor = "red";
      formData.total_med.focus();
      return false;
    }

    if (perDayMed === "" || perDayMed === "0") {
      formData.per_day_med.style.backgroundColor = "red";
      formData.per_day_med.focus();
      return false;
    }
    
    /* Adding new row after form validation is successful */
    
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = medName;
    cell2.innerHTML = totalMed;
    cell3.innerHTML = perDayMed;
    cell4.innerHTML = new Date().toDateString();
    cell5.innerHTML = calculateDueDate(totalMed, perDayMed);

    return false;
  }

  /* Event listener */

  btn.onclick = validateForm;
}
