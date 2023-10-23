// get the values from the inputs


function getValues(){
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

// display the total values in the stats column
function calculateRates(){
    let values = getValues();
    let totalPrinciple = document.getElementById('principle');
    totalPrinciple.textContent = `Total Principle: \$${values.princ.toFixed(2).toLocaleString()}`;
    
    let totalInterestView = document.getElementById('totInterest');
    let totalInt = getInterest();
    totalInterestView.innerText = `Total Interest: \$${totalInt.toFixed(2).toLocaleString()}`;

    let totalCostView = document.getElementById('totCost');
    let totalCost = values.princ + totalInt;
    totalCostView.innerText = `Toatl Cost: \$${totalCost.toFixed(2).toLocaleString()}`;

    let monthlyPmtView = document.getElementById('monthlyPmt');
    let monthPmt = calculateMonthlyPayments();
    monthlyPmtView.innerText = `\$${monthPmt.toFixed(2).toLocaleString()}`;

    displayMonthlyPmts();
}

function getInterest(){
    let values = getValues()
    let totalInt = values.princ * (values.rateN/1200);


    return totalInt;
}



// display the values in the table per each month
function calculateMonthlyPayments(){
    let values = getValues();
    let monthPmt = values.princ * (values.rateN/1200)/(1-(1 + values.rateN)/values.termN);
    let interest = getInterest()
    let payment = monthPmt + interest;
    let balance = values.princ - payment;

    return payment;

    
    return monthPmt
}

function calculateRamainingBalance(){
    let values = getValues();
    let monthlyPmt = calculateMonthlyPayments();

}

function displayMonthlyPmts(){
    let terms = document.getElementById('term').value;
    let table = document.getElementById('monthlyPmtTable');
    let termsVal = parseInt(terms);
    let currentPrinciple = '';
    for (let i = 1; i <= termsVal; i++){
        let values = getValues();
        // create the table row
        let pmtRow = document.createElement('tr');
        
        // data column 'Month'
        let term = i;
        let month = document.createElement('td');
        month.innerText = term;
        pmtRow.appendChild(month);
        
        // Data column Month Payment
        let mPmt = document.createElement('td');
        let monthlyPmt = calculateMonthlyPayments();
        mPmt.innerHTML = monthlyPmt.toFixed(2).toLocaleString();
        pmtRow.appendChild(mPmt);

        // Data column for Current princple
        // let principle = values.princ;
        // if (currentPrinciple != ''){
        //     currentPrinciple = principle - payment;
        // }
        // else{
        //     currentPrinciple = principle;
        // }
        // let mPrinc = document.createElement('td');
        // mPrinc.innerText = currentPrinciple;
        // pmtRow.appendChild(mPrinc);

        // // Data column for Monthly Interest
        // let int = document.createElement('td');
        // let monthlyInt = getInterest()
        // int.innerHTML = monthlyInt.toFixed(2).toLocaleString();
        // pmtRow.appendChild(int);

        // Data column for total interest paid

        // Data column for remaining balance
        
        // add the row to the table
        table.appendChild(pmtRow);


    }
}


