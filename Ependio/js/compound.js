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
