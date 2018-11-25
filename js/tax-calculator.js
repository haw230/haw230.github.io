$( "#calculate-tax" ).click(function() {
    if($( "#income" ).val() == ""){
        alert("Please enter an income!");
    } else{
        var result = incomeTax(parseInt($( "#income" ).val()), $( "#province" ).val());
        $( "#income-after-tax" ).html("Income after Taxes: $" +
        result[0].toFixed(2).toString() +". <br> Tax Paid: $" + result[1].toFixed(2).toString() + "<br>Amount of earnings taxed: " +
        (result[1]/result[0] * 100).toFixed(2).toString()+'%');
        
    }
})

var rates = {"Newfoundland" : [[0.087, 36926], [0.145, 36926], [0.158, 57998], [0.173, 52740], [0.183, 184590]], 
            "Prince Edward Island" : [[0.098, 31984], [0.138, 31985], [0.167, 63969]],
            "Nova Scotia" : [[0.0879, 29590], [0.1495, 29590], [0.1667, 33820], [0.175, 57000], [0.21, 150000]],
            "New Brunswick" : [[0.0968, 41675], [0.1482, 41676], [0.1652, 52159], [0.1784, 18872], [0.203, 154382]],
            "Ontario"      :  [[0.0505, 42960], [0.0915, 42963], [0.1116, 64077], [0.1216, 70000], [0.1316, 220000]],
            "Manitoba"    :  [[0.108, 31843], [0.1275, 36978], [0.174, 68821]],
            "Saskatchewan" : [[0.105, 45225], [0.125, 83989], [0.145, 129214]],
            "Alberta"     :  [[0.10, 128145], [0.12, 25628], [0.13, 51258], [0.14, 102516], [0.15, 307547]],
            "British Columbia " : [[0.0506, 39676], [0.077, 39677], [0.105, 11754], [0.1229, 19523], [0.147, 39370], [0.168, 150000]],
            "Yukon"        :  [[0.064, 46605], [0.09, 46603], [0.109, 51281], [0.128, 355511], [0.15, 500000]],
            "Northwest Territories" : [[0.059, 42209], [0.086, 42211], [0.122, 52828], [0.1405, 137248]],
            "Nunavut"     :  [[0.04, 44437], [0.07, 44437], [0.09, 55614], [0.115, 144488]] };

function incomeTax(income, province){
    var tax;
    if(province == "Quebec"){
        tax = fedTax(income) + queTax(income)
        return [income - tax, tax];
    }else{
        tax = fedTax(income) + provincialTax(income, rates[province]);
        return [income - tax, tax];
    }

        
}

function fedTax(income){
    if (income <= 46605){ 
        f_tax = income * 0.15;
    }
    else if (income <= 93208) { 
        f_tax = (income - 46605) * 0.205 + 6991;
    }
    else if (income <= 144489) { 
        f_tax = (income - 93208) * 0.26 + 16544;
    }
    else if (income <= 205842) { 
        f_tax = (income - 144489) * 0.29 + 29877;
    }
    else{ 
        f_tax = (income - 205842) * 0.33 + 47670;
    }

    return f_tax;
}

function provincialTax(income, provincialTax){
    var remaining = income;
    var totalTax = 0;
    for(var i = 0; i < provincialTax.length; i++){
        if(remaining <= provincialTax[i][1]){
            totalTax += provincialTax[i][0] * remaining;
            remaining = 0;
        } else{
            totalTax += provincialTax[i][0] * provincialTax[i][1];
            remaining -= provincialTax[i][1];
        }
    }
    return totalTax + remaining * provincialTax[provincialTax.length - 1][0];
}

function queTax(income){
    if (income <= 43055){ 
        q_tax = income * 0.15;
    }
    else if (income <= 86105) { 
        q_tax = income  * 0.20;
    }
    else if (income <= 104765) { 
        q_tax = income  * 0.24;
    }
    else{ 
        q_tax = income  * 0.2575;
    }
    return q_tax;
}
