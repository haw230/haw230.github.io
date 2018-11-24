
function ROI(g_invest,c_invest){
    roi = (g_invest - c_invest) / c_invest
    return roi
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

    return Math.round((income - f_tax) * 100) / 100
}


