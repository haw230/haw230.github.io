// Collection of the functions behind each tool

// Income Tax
// Purpose
// incomeTax(income, province) consumes income and province to produce the income after income tax

// Contract
// incomeTax: Num Str -> Num

function incomeTax(income, province){
    Math.round((provincialTax(fedTax(income), rates[province]) * 100)) / 100;
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

    return income - f_tax;
}
var rates = {"Newfoundland" : [[0.087, 35851], [0.145, 35850], [0.158, 56309], [0.173, 51204], [0.183, 179214]],};

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
    return income - totalTax - remaining * provincialTax[provincialTax.length - 1][0];
}

function ROI(g_invest,c_invest){
    roi = (g_invest - c_invest) / c_invest
    return roi
}



// Compound Calc
// Purpose
// compound(principal, interestRate, compoundRate, time) consumes principal, interestRate, compoundRate, time
// to produce the new amount after being compounded at interestRate at compoundRate for time

// Contract
// compound: Num Num Num Num -> Num
// requires: interestRate is expected to be passed in as a percentage (NOT a decimal)
//           compoundRate is 1 if compounded annually, 12 if monthly

function compound(principal, interestRate, compoundRate, time){
    principal * Math.pow(1 + (interestRate / 100) / compoundRate, compoundRate * time / 12);
}