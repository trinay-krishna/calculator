function operate(firstNumber,operator,lastNumber){
    let result;
    switch(operator){
        case "+":
            result=firstNumber+lastNumber;
            break;
        case '-':
            result=firstNumber-lastNumber;
            break;
        case '*':
            result=firstNumber*lastNumber;
            break;
        case '/':
            result=(firstNumber/lastNumber).toFixed(2);
            break;
        default:
            console.log(`Invalid operator ${operator}`);
    }
    return `${result}`;
}

function displayScreen(){
    const mainDisplay=document.querySelector('.mainDisplay');
    if(expression=="Infinity"){
        mainDisplay.textContent="I see you're a fan of Buzz Lightyear";
        return;
    }
    mainDisplay.textContent=expression;
}

function displaySubScreen(firstNumber,lastNumber){
    const subDisplay=document.querySelector('.subDisplay');
    if(firstNumber && lastNumber)
        subDisplay.textContent=`${firstNumber} ${operator} ${lastNumber}=`;
    else
        subDisplay.textContent=expression;
}

function buildExpression(c){
    let operators=['+','-','*','/','='];
    let validFirstOperators=['+','-'];
    let firstNumber,lastNumber;
    if(operators.includes(c)){
        if(expression==""){
            if(validFirstOperators.includes(c))
                expression+=c;
        }
        else{
            let lastChar=expression.charAt(expression.length-1);
            if(!operators.includes(lastChar) && !operator){
                if(c!="="){
                    expression+=c;
                    operator=c;
                    displaySubScreen(firstNumber,lastNumber);
                }
            }
            else if(!operators.includes(lastChar) && operator){
                if(operator!="="){
                    [firstNumber,lastNumber]=expression.split(operator);
                    displaySubScreen(firstNumber,lastNumber);
                    firstNumber=expression=operate(+firstNumber,operator,+lastNumber);
                }
                operator=c;
                if(operator!="="){
                    expression+=c;
                }
            }
        }
    }
    else{
        expression+=c;
    }
    displayScreen();  
}

function clearDisplay(){
    const mainDisplay=document.querySelector('.mainDisplay');
    const subDisplay=document.querySelector('.subDisplay');
    subDisplay.textContent="";
    mainDisplay.textContent="";
    expression="";
    operator=undefined;
}

function deleteButton(){
    if(expression){
        const lastIndex=expression.length-1;
        const lastChar=expression.charAt(lastIndex);
        if(lastChar==operator)
            operator=undefined;
        expression=expression.slice(0,lastIndex);
        displayScreen();
    }
}

function setupEventListeners(){
    const ops=document.querySelector('.ops');
    ops.addEventListener('click',
        (event)=>{
            const target=event.target;
            const className=target.className;
            if(className=="clear")
                clearDisplay();
            else
                deleteButton();
        }
    );

    const operators=document.querySelector('.operators');
    operators.addEventListener('click',
        (event)=>{
            const target=event.target;
            const id=target.id;
            buildExpression(id);
        }
    );
}

let expression="",operator;
setupEventListeners();