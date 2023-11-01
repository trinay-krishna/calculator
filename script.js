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
        const subDisplay=document.querySelector('.subDisplay');
        subDisplay.textContent="";
        mainDisplay.textContent="I see you're a fan of Buzz Lightyear";
        return;
    }
    mainDisplay.textContent=expression;
}

function displaySubScreen(firstOperand,lastOperand){
    const subDisplay=document.querySelector('.subDisplay');

    subDisplay.textContent=`${firstOperand} ${operator} ${lastOperand}=`;
}

function buildExpression(input){
    let operators=['+','-','*','/','='];
    let firstOperand,lastOperand;
    if(operators.includes(input)){

        //Handles the case when the expression is empty and the user wants to enter a negative number.
        if(expression==""){
            if(input=='-')
                expression+=input;
        }
        else{
            const lastChar=expression.charAt(expression.length-1);

            //Checking if the last character is a number.
            if(!operators.includes(lastChar)){
                if(operator!=undefined){

                    //Handles the case when subtracting with negative numbers where the general case fails.
                    // Ex: -3-3, where the split in the gen case fails returning ['','3','3'].
                    if(expression.charAt(0)=='-' && operator=='-'){
                        [_,firstOperand,lastOperand]=expression.split(operator);
                        firstOperand=`-${firstOperand}`;
                    }
                    else
                        //Splits the string into its operands to perform the required operation.
                        [firstOperand,lastOperand]=expression.split(operator);
                    displaySubScreen(firstOperand,lastOperand);
                    firstOperand=expression=operate(+firstOperand,operator,+lastOperand);
                }
                //Ignoring the "=" because it should never be displayed on the screen.
                operator=(input!="=")?input:undefined;
                expression+=(input!="=")?input:"";
            }
        }
    }
    else
        expression+=input; //Appending to the expression if the input is an operand.
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