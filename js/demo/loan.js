// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
lamount =0;
lapr =0;
lyears = 0;

// Area Chart Example

  var ctx = document.getElementById("myAreaChart");
  var loanChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: "Payment for month",
        lineTension: 0.3,
        backgroundColor: "rgba(2,117,216,0.2)",
        borderColor: "rgba(2,117,216,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(2,117,216,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(2,117,216,1)",
        pointHitRadius: 50,
        pointBorderWidth: 2,
        data: [],
      }, {
      label: "Without loan",
      lineTension: 0.3,
      backgroundColor: "rgba(102, 153, 102,0.2)",
      borderColor: "rgba(102, 153, 102,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(102, 153, 102,1)",
      pointBorderColor: "rgba(102, 153, 102,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(102, 153, 102,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: []}
       ,
      
    ],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 40000,
            maxTicksLimit: 5
          },
          gridLines: {
            color: "rgba(0, 0, 0, .125)",
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });

function updateScales(chart) {
  xScale = chart.scales['x-axis-0'];
  yScale = chart.scales['y-axis-0'];
  chart.options.scales = {
      xAxes: [{
          id: 'newId',
          display: true
      }],
      yAxes: [{
          display: true,
          type: 'linear'
      }]
  }
  chart.update();
  // need to update the reference
  yScale = chart.scales['y-axis-0'];
}

function calculate() {
 
  var amount = document.getElementById("amount");
  var apr = document.getElementById("apr");
  var years = document.getElementById("years");
  var zipcode = document.getElementById("zipcode");
  var payment = document.getElementById("payment");
  var total = document.getElementById("total");
  var totalinterest = document.getElementById("totalinterest");
  var principal = parseFloat(amount.value);
  var interest = parseFloat(apr.value) / 100 / 12 ;
  var payments = parseFloat(years.value) * 12;
  var x = Math.pow(1 + interest, payments);
  var monthly = (principal * x * interest) / (x - 1);
  temp = []
  num = []
  dates = []
  
  //if(amount.value != lamount || apr.value!=lapr || years.value!=lyears){
    for(i = 0; i<payments+1; i++){
   // addData(loanChart, i,(monthly*i).toFixed(2));
    num[i] = ((monthly*i).toFixed(2));
    dates[i] = i;
    }
 // }
  
 

  for(i = 0; i<payments+1; i++){
    temp[i] = amount.value;
  }

  lamount = amount.value;
  lapr = apr.value;
  lyears = years.value;
 // console.log(num);
  loanChart.data.labels = dates;
  loanChart.data.datasets[0].data = num;
  loanChart.data.datasets[1].data =temp;
  updateScales(loanChart)
  loanChart.update();
 


if (isFinite(monthly)) {
  payment.innerHTML = monthly.toFixed(2);
  total.innerHTML = (monthly * payments).toFixed(2);
  totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);
  save(amount.value, apr.value, years.value, zipcode.value);
  try {
      getLenders(amount.value, apr.value, years.value, zipcode.value);
  } 
  catch (e) { /* And ignore those errors */ }
  chart(principal, interest, monthly, payments);
} 
else {
  payment.innerHTML = "";
  total.innerHTML = "";
  totalinterest.innerHTML = "";
  chart();
}


}
function save(amount, apr, years, zipcode) {
  if (window.localStorage) {
      localStorage.loan_amount = amount;
      localStorage.loan_apr = apr;
      localStorage.loan_years = years;
      localStorage.loan_zipcode = zipcode;
  }
}
window.onload = function () {
  if (window.localStorage && localStorage.loan_amount) {
      document.getElementById("amount").value = localStorage.loan_amount;
      document.getElementById("apr").value = localStorage.loan.apr;
      document.getElementById("years").value = localStorage.loan_years;
      document.getElementById("zipcode").value = localStorage.loan_zipcode;
  }
};

function getLenders(amount, apr, years, zipcode) {
  if (!window.XMLHttpRequest) return;
  var ad = document.getElementById("lenders");
  if (!ad) return;
  var url = "getLenders.php" +
      "?amt=" + encodeURIComponent(amount) + 
      "&apr=" + encodeURIComponent(apr) +
      "&yrs=" + encodeURIComponent(years) +
      "&zip=" + encodeURIComponent(zipcode);
  var req = new XMLHttpRequest();
  req.open("GET", url);
  req.send(null);
  req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
          var response = req.responseText;
          var lenders = JSON.parse(response);
          var list = "";
          for (var i = 0; i < lenders.length; i++) {
              list += "<li><a href='" + lenders[i].url + "'>" + lenders[i].name + "</a>";
          }
          ad.innerHTML = "<ul>" + list + "</ul>";
      }
  }
}
