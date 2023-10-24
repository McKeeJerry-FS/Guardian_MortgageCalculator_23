// get the values from the inputs


function getValues(){
    let principle = document.getElementById('loanAmount').value;
    principle = parseInt(principle);
    let term = document.getElementById('term').value;
    term = parseInt(term);
    let rate = document.getElementById('interestRate').value;
    rate = parseFloat(rate);

    if(isNaN(principle) || isNaN(term) || isNaN(rate) || principle <= 0 || term <= 0 || rate < 0) {
        Swal.fire({
            icon: 'error',
            background: false,
            title: 'Oops...',
            text: 'Please enter valid numbers for your loan'
        });
    } else {
        let values = {
            principle : principle,
            term : term,
            rate : rate
        }
        
        calculateStats(values);
         let monthlyPayments = calculateMonthlyPayments(values);
        displayMonthlyPmts(monthlyPayments);
        
    }

}


// display the total values in the stats column
// display the stats for the loan
function calculateStats(values){
    
    let monthPmt = (values.principle * (values.rate/1200)) / (1- Math.pow(1 + values.rate/1200, -values.term));
    
    let totalCost = monthPmt * values.term;
    
    let totalInt = totalCost - values.principle;
    
    let totals = {
        monthPmt : monthPmt,
        totalCost : totalCost,
        totalInt : totalInt,
        totalPrinciple : values.principle
    }
    
    displayStats(totals);
}

function displayStats(totals){
    // let formatOptions = {
    //     style: 'currency',
    //     currency: USD
    // }

    let totalPrincipleView = document.getElementById('principle');
    totalPrincipleView.textContent = `Total Principle: \$${totals.totalPrinciple.toFixed(2).toLocaleString()}`;

    let monthlyPmtView = document.getElementById('monthlyPmt');
    monthlyPmtView.innerText = `\$${totals.monthPmt.toFixed(2).toLocaleString()}`;

    let totalCostView = document.getElementById('totCost');
    totalCostView.innerText = `Toatl Cost: \$${totals.totalCost.toFixed(2).toLocaleString()}`;

    let totalInterestView = document.getElementById('totInterest');
    totalInterestView.innerText = `Total Interest: \$${totals.totalInt.toFixed(2).toLocaleString()}`;
}

// display the values in the table per each month
function calculateMonthlyPayments(){




}














function displayMonthlyPmts(va){
    
    let table = document.getElementById('monthlyPmtTable');
    
    let currentPrinciple = '';
    for (let i = 1; i <= term; i++){
        
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
        

        // Data column for Monthly Interest
        
        // Data column for total interest paid

        // Data column for remaining balance
        
        // add the row to the table
        table.appendChild(pmtRow);


    }
}


