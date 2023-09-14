/*
	WEB 303 Assignment 1 - jQuery
	Clayton Laliberty 0673373
*/


$(document).ready(function() {
    
    const $salaryInput = $('#yearly-salary');
    const $percentInput = $('#percent');
    const $amountSpan = $('#amount');

    
    function calculateAmount() {
        const salary = parseFloat($salaryInput.val());
        const percent = parseFloat($percentInput.val());

        if (!isNaN(salary) && !isNaN(percent)) {
            const amount = (salary * (percent / 100)).toFixed(2); 
            $amountSpan.text(`$${amount}`);
        } else {
            $amountSpan.text('$0');
        }
    }

    
    $salaryInput.on('keyup', calculateAmount);
    $percentInput.on('keyup', calculateAmount);

    
    calculateAmount();
});
