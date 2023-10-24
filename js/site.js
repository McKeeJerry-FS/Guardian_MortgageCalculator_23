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
        
        let totals = calculateStats(principle, term, rate);
        displayStats(totals);
        let monthlyPayments = calculateMonthlyPayments(principle, term, rate, totals.monthPmt);
        displayMonthlyPmts(monthlyPayments);
        
    }

}


// display the total values in the stats column
// display the stats for the loan
function calculateStats(principle, term, rate){
    
    let monthPmt = (principle * (rate/1200)) / (1- Math.pow(1 + rate/1200, -term));
    
    let totalCost = monthPmt * term;
    
    let totalInt = totalCost - principle;

    let totalPrinciple = principle;
    let stats = {
        monthPmt, totalCost, totalInt, totalPrinciple
    }
    return stats;

}

function displayStats(totals){
    let formatOptions = {
        style: 'currency',
        currency: 'USD'
    }

    let totalPrincipleView = document.getElementById('principle');
    totalPrincipleView.textContent = `Total Principle: ${totals.totalPrinciple.toLocaleString('en-US', formatOptions)}`;

    let monthlyPmtView = document.getElementById('monthlyPmt');
    monthlyPmtView.innerText = `${totals.monthPmt.toLocaleString('en-US', formatOptions)}`;

    let totalCostView = document.getElementById('totCost');
    totalCostView.innerText = `Toatl Cost: ${totals.totalCost.toLocaleString('en-US', formatOptions)}`;

    let totalInterestView = document.getElementById('totInterest');
    totalInterestView.innerText = `Total Interest: ${totals.totalInt.toLocaleString('en-US', formatOptions)}`;
}

// display the values in the table per each month
function calculateMonthlyPayments(principle, term, rate, monthlyPayment){
    let balance = principle;
    let totalInterest = 0;
    let pmtsArray = [];
    for (let month = 1; month <= term; month++){
        let interestPmt = balance * (rate / 1200);
        let principlePmt = monthlyPayment - interestPmt;
        balance -= principlePmt;
        totalInterest += rate;

        let paymentObj = {
            month : month,
            payment : monthlyPayment,
            principle : principlePmt,
            rate : interestPmt,
            totalInterest : totalInterest,
            balance : balance
        }
        pmtsArray.push(paymentObj);
    }

    return pmtsArray;

}


// display
function displayMonthlyPmts(paymentsArr){
    
    let tableRowTemplate = document.getElementById('monthlyPmtTemplate');
    let table = document.getElementById('monthlyPmtTable');
    
    for (let i = 1; i <= paymentsArr.length; i++){
        
        let payment = paymentsArr[i];
        let pmtRow = tableRowTemplate.content.cloneNode(true);

        let tableCells = pmtRow.querySelectorAll('td');
        tableCells[0].textContent = payment.month;
        tableCells[1].textContent = `\$${payment.payment.toFixed(2).toLocaleString()}`;
        tableCells[2].textContent = `\$${payment.principle.toFixed(2).toLocaleString()}`;
        tableCells[3].textContent = `\$${payment.rate.toFixed(2).toLocaleString()}`;
        tableCells[4].textContent = `\$${payment.totalInterest.toFixed(2).toLocaleString()}`;
        tableCells[5].textContent = `\$${Math.abs(payment.balance).toFixed(2).toLocaleString()}`;

        table.appendChild(pmtRow);


    }
}


