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
    var result = compoundExtended(parseInt($( "#principal" ).val()), 
                                  parseInt($( "#contribution" ).val()), 
                                  parseInt($( "#interest" ).val()), 
                                  parseInt($( "#compound" ).val()), 
                                  parseInt($( "#time" ).val()));

    $( "#compounded" ).text("You will have saved up $" +
    result[0].toFixed(2).toString() + ". $" + result[1].toFixed(2).toString() + " will be generated from interest alone.");
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

var myLineChart2 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Mar ", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"],
      datasets: [{
        label: "Sessions",
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
        data: [10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
      }],
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