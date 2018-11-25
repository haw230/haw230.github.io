billSum = 0;
totalSum = 0;
foodSum = 0;
entertainmentSum = 0;
miscellaneousSum = 0;
//for (i = 0; i < infoArray.length; i++) {

//  sum = sum + infoArray[i].date.value;
//}
function addRow() {
  var name = document.getElementById('theName').value;
  var type = $("#list").val()
  var amount = document.getElementById('amount').value;
  var theDate = document.getElementById('date').value;

  var table = document.getElementsByTagName('table')[0];

  var newRow = table.insertRow(table.rows.length)

  var cel1 = newRow.insertCell(0);
  var cel2 = newRow.insertCell(1);
  var cel3 = newRow.insertCell(2);
  var cel4 = newRow.insertCell(3);

  cel1.innerHTML = name;
  cel2.innerHTML = type;
  cel3.innerHTML = amount;
  cel4.innerHTML = theDate

  totalSum = totalSum + parseInt(amount);

  if (type == "Bills") {
    billSum = billSum + parseInt(amount);
  } else if (type == "Food") {
    foodSum = foodSum + parseInt(amount);
  } else if ($("#list").val() == "Entertainment") {
    entertainmentSum = entertainmentSum + parseInt(amount);
  } else if($("#list").val() == "Miscellaneous"){
    miscellaneousSum = miscellaneousSum + parseInt(amount);
  }
  Data1 = ((billSum / totalSum) * 100).toFixed(2);
  Data2 = ((entertainmentSum / totalSum) * 100).toFixed(2);
  Data3 = ((foodSum / totalSum) * 100).toFixed(2);
  Data4 = ((miscellaneousSum / totalSum) * 100).toFixed(2);

  
    //get the pie chart canvas
    var ctx1 = $("#pie-chartcanvas-1");

    //pie chart data
    var data1 = {
        labels: ["Bills", "Entertainment", "Food", "Miscellaneous"],
        datasets: [
            {
                label: "TeamA Score",
                data: [Data1, Data2, Data3, Data4],
                backgroundColor: [
                    "#4ECDC4",
                    "#1a535c",
                    "#ff6b6b",
                    "#ffe66d"
                ],
                borderColor: [
                    "#ffffff",
                    "#ffffff",
                    "#ffffff",
                    "#ffffff"
                ],
                borderWidth: [3, 3, 3, 3, 3]
            }
        ]
    };

    //pie chart data
    

    //options
    var options = {
        responsive: true,
        title: {
            display: true,
            position: "top",
            text: "Expenses:",
            fontSize: 30,
            fontColor: "#111"
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 16
            }
        }
    };

    //create Chart class object
    var chart1 = new Chart(ctx1, {
        type: "doughnut",
        data: data1,
        options: options
    });

    //create Chart class object
}