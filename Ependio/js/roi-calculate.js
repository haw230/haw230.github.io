$( "#calculate-roi" ).click(function() {
    if($( "#invested" ).val() == "" || $( "#returned" ).val() == ""){
        alert("Please enter the amount!");
    } else{
        var result = ROI(parseInt($( "#invested" ).val()), $( "#returned" ).val());
        $( "#roi" ).text("Your Return on Investment is " + result.toFixed(2).toString() + "%");
        console.log(result);
    }
})



function ROI(g_invest,c_invest){
    roi = (g_invest - c_invest) / c_invest
    if (g_invest > c_invest)
       return (-1 * roi)
    else 
        return roi
}


