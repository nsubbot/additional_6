module.exports = function zeros(expression) {
  expressionArr = [] = expression.split('*');
  
  for(let i = 0; i < expressionArr.length; i++) {
    if(expressionArr[i][expressionArr[i].length - 2] == "!") {
      //console.log("!! is " + expressionArr[i]);
      expressionArr[i] = doubleFactorial(expressionArr[i].slice(0, -2));
    } else {
      //console.log("! is " + expressionArr[i]);
      expressionArr[i] = simpleFactorial(expressionArr[i].slice(0, -1));
    }
    //console.log(expressionArr[i]);
  }

  let total = expressionArr[0];
  for(let i = 1; i < expressionArr.length; i++) {
    total = multiply(total, expressionArr[i]);
  }
  //console.log(total);

  let zeros = 0;
  for(let i = total.length-1; i > 0; i--) {
    if(total[i] === "0")
      zeros++;
    else 
      break;
  }
  return zeros;

  function simpleFactorial(number) {
    let total = number;
    for(let i = 1; i < parseInt(number); i++) {
        //console.log(number - i + " * " +total);
        total = multiply(total, number - i);
    }
    return total;
  }

  function doubleFactorial(number) {
    let total = number;
    for(let i = 1; i < parseInt(number) - 1; i=i+2) {
        //console.log(number - i - 1 + " * " +total);
        total = multiply(total, number - i - 1 );
    }
    return total;
  }

  // Taked from "product" task
  function multiply(first, second) {
    if(first > second) {
      let temp = second
      second = first;
      first = temp;
    }
  
    // Adaptation for [1...9]
    if(first.length == 1 || second.length ==1) {
      return (parseInt(first) * parseInt(second)).toString();
    }
  
    first = reverseStr(first.toString());
    second = reverseStr(second.toString());
  
    let circleMult = [];
    let summary = [];
    let temp = 0;
    let buff = 0;
    for(let i = 0; i < second.length; i++) {
      for(let j = 0; j < first.length; j++) {
        temp = parseInt(first[j]) * parseInt(second[i]);
        temp = temp + buff;
        buff = remainderOfDivision(temp, 10);
        temp = temp % 10;
        circleMult.push(temp.toString());
        temp = 0;
      }
      //console.log("res of " + second[i] + " mult " + reverseStr(first) + " is " + reverseStr(circleMult.join('') + buff));
      if(buff != 0) { 
        circleMult.push(buff.toString());
        buff = 0;
      }
      circleMult.reverse();
      for (let j = 0; j < i; j++)
      circleMult.push('0');
      circleMult.reverse();
      //console.log("res of " + second[i] + " mult " + reverseStr(first) + " is " + reverseStr(circleMult.join('')));
      summary.push(circleMult.join(''));
      circleMult = [];
    }
    //console.log(summary);
  
    let tempCheck = [];
    buff = 0;
    temp = 0;
    let total = summary[0];
    for(let i = 1; i < summary.length; i++) {
      for(let j = 0; j < summary[i].length; j ++) {
        if(total[j])
          temp = parseInt(total[j]) + parseInt(summary[i][j]);
        else 
          temp = parseInt(summary[i][j]);
        temp = temp + buff;
        buff = remainderOfDivision(temp, 10);
        //console.log(summary[i] + " " + temp + " buff: " + buff);
        temp = temp % 10;
        tempCheck.push(temp.toString());
        //total[j] =  temp.toString();
      }
      if (buff !== 0) {
        tempCheck.push(buff.toString())
      }
      total = tempCheck;
      //console.log(total);
      tempCheck = [];
      buff = 0;
      temp = 0;
    }
    return total.reverse().join('');
  
  
  
    function reverseStr(str) {
        return str.split("").reverse().join("");
      }
  
    function remainderOfDivision(number, divisor) {
      return (number - number%10)/10;
    }
  }
}
