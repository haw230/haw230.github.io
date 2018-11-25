var slider = document.getElementById("time");
var output = document.getElementById("time-display");
output.innerHTML = slider.value; // Display the default slider value

var rates = {"Monthly" : 12, "Quarterly" : 4, "Semi-Annually" : 2, "Annually" : 1}
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
}

// principal, contribution, interest, compound, time

$( "#calculate-compound" ).click(function() {
    var principal = parseInt($( "#principal" ).val());
    var contribution = parseInt($( "#contribution" ).val());
    var interest = parseInt($( "#interest" ).val());
    var compoundRate = parseInt($( "#compound" ).val()); 
    var time = parseInt($( "#time" ).val());
    var result = compoundExtended(principal, contribution, interest, compoundRate, time);

    $( "#compounded" ).html("You will have saved up $" +
    result[0].toFixed(2).toString() + ", this will be generated from interest alone.");
    updateScales(compoundChart);
    var savings = [principal];
    var savingsFromInterest = [0];
    var savingsFromContribution = [principal];
    var years = [0];
    for(var i = 1; i < time; i++){
        var temp = compoundExtended(principal, contribution, interest, compoundRate, i);
        savings[i] = temp[0].toFixed(2);
        savingsFromInterest[i] = temp[1].toFixed(2);
        savingsFromContribution[i] = principal + contribution * i;
        years[i] = i
    }
    compoundChart.data.labels = years;
    compoundChart.data.datasets[0].data = savings;
    compoundChart.data.datasets[1].data = savingsFromInterest;
    compoundChart.data.datasets[2].data = savingsFromContribution;
    //compoundChart.data.datasets[1].data =temp;
    updateScales(compoundChart)
    compoundChart.update();
})

function compoundExtended(principal, contribution, interestRate, compoundRate, time){
    var total = 0;
    for(var i = 0; i < time; i++) {
        total += contribution * Math.pow((1 + (interestRate / 100) / compoundRate), i * compoundRate);
    }
    total += principal * Math.pow(1 + (interestRate / 100) / compoundRate, compoundRate * time);
    return [total, total - (principal + contribution * time)];
}

var ctx = $("#compound-chart");

var compoundChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: "Savings",
        lineTension: 0.3,
        backgroundColor: "rgba(255, 2, 95,0.1)",
        borderColor: "rgba(255, 2, 95,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(255, 2, 95,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(255, 2, 95,0.8)",
        pointHitRadius: 50,
        pointBorderWidth: 2,
        data: [],
      }, 
      {
        label: "Interest",
        lineTension: 0.3,
        backgroundColor: "rgba(0, 237, 122,0.2)",
        borderColor: "rgba(0, 237, 122,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(0, 237, 122,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(0, 237, 122,1)",
        pointHitRadius: 50,
        pointBorderWidth: 2,
        data: [],
      },
      {
        label: "Contributions",
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
      }
    ],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'Years'
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
            max: 100,
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
