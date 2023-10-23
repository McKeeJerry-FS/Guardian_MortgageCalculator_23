// get the values from the inputs


function getValues(clickedBtn){
    let principle = document.getElementById('loanAmount').value;
    let principleNum = parseInt(principle);
    let term = document.getElementById('term').value;
    let termNum = parseInt(term);
    let rate = document.getElementById('interestRate').value;
    let rateFloat = parseFloat(rate);

    let values = {
        princ : principleNum,
        termN : termNum,
        rateN : rateFloat
    }
    return values;
}

function calculateRates(){
    let values = getValues();
    let totalPrinciple = document.getElementById('principle');
    totalPrinciple.textContent = `Total Principle: \$${values.princ.toFixed(2).toLocaleString()}`;
    
    let totalInterestView = document.getElementById('totInterest');
    let totalInt = values.princ * values.rateN;
    totalInterestView.innerText = `Total Interest: \$${totalInt.toFixed(2).toLocaleString()}`;

    let totalCostView = document.getElementById('totCost');
    let totalCost = values.princ + totalInt;
    totalCostView.innerText = `Toatl Cost: \$${totalCost.toFixed(2).toLocaleString()}`;

    let monthlyPmtView = document.getElementById('monthlyPmt');
    let monthPmt = totalCost / values.termN;
    monthlyPmtView.innerText = `\$${monthPmt.toFixed(2).toLocaleString()}`;

}



// display the total values in the stats column

// display the values in the table per each month