  export function detectedPaymentSys(formattedValueInput, arrayPayments){
    if(arrayPayments) {
      for(let system of arrayPayments){
        if(system.regExp.test(formattedValueInput)){
          return system.key;
        }
      }
    }
    
  }

  export function digitsOnly(formattedValueInput){
    return (/^\d*$/.test(formattedValueInput));
  }

  export function lengthNumber(formattedValueInput){
    return formattedValueInput.length > 12 && formattedValueInput.length < 20
  }

  export function isSomePaymentSys(formattedValueInput, arrayPayments){
    if(arrayPayments) {
      return arrayPayments.some(payment => payment.regExp.test(formattedValueInput)) 
    }
  }

  export function luhnCheck(formattedValueInput){
    const digits = formattedValueInput.split('').map((prev) => parseInt(prev, 10));
    let sum = 0;
    let shouldDouble = false; 

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
    
      if (shouldDouble) {
        digit = digit * 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
    
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  }

