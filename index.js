const buttons = document.querySelectorAll("button")
const equalNumber = document.querySelector(".equal")
const currentOperendOutput = document.querySelector(".current-operend")
const previousOperendOutput = document.querySelector(".previous-operend")

let currentOperend = ""
let previousOperend = ""
let operator = ""

buttons.forEach((btn) => {
  btn.addEventListener("click", (ev) => {
    const currentOperendNumber = parseFloat(currentOperend)
    const previousOperendNumber = parseFloat(previousOperend)


    if(btn.className === "number" || btn.className === "span-two number") {
      if(btn.innerText === "." && currentOperend.includes(".")){
        return
      }
      currentOperend += btn.innerText
      currentOperendOutput.innerText = currentOperend

    } else if(btn.className === "operator" ) {
      if(ev.target.innerText === "-" && currentOperend === ""){
        currentOperend = "-"
        currentOperendOutput.innerText = currentOperend
      }
       else if (operator === "" && currentOperend !== "" && currentOperend !== "." && currentOperend !== "-") { // SE O OPERADOR NAO EXISTIR E SE JA HOUVER NUMERO no current, e o current nao ser apenas . ou -
          operator = ev.target.innerText
          previousOperend = currentOperend
          currentOperend = ""

          currentOperendOutput.innerText = currentOperend
          previousOperendOutput.innerText = previousOperend + operator
      } 
        else if (operator !== "" && currentOperend !== "") { // se o operador existir e nao houver numero no current
          let result = calculate(currentOperendNumber, previousOperendNumber, operator)
          operator = ev.target.innerText
          previousOperend = result
          currentOperend = ""

          currentOperendOutput.innerText = ""
          previousOperendOutput.innerText = previousOperend + operator
      }

    } else if (btn.className === "equal") {
      if(previousOperend !== "" && currentOperend !== "" && operator !== "") {
        let result = calculate(currentOperendNumber, previousOperendNumber, operator)

        if (isNaN(result)) {
          currentOperendOutput.innerText = "Erro"
          currentOperend = ""
        } else{
          currentOperend = result
          currentOperendOutput.innerText = currentOperend
        }
        previousOperend = ""
        operator = ""
        
        previousOperendOutput.innerText = previousOperend
      }
    } else if (btn.className === "span-two all-clear") {
        previousOperend = ""
        currentOperend = ""
        operator = ""
        previousOperendOutput.innerText = ""
        currentOperendOutput.innerText = ""
    } else if (btn.className === "del") {
        const currentSubtractOne = currentOperendOutput.innerText.slice(0, -1)

        currentOperend = currentSubtractOne
        currentOperendOutput.innerText = currentSubtractOne
    }
  })
  
})

function calculate(currentOperend, previousOperend, operator) {
  let result
  switch (operator) {
    case "+":
      return  result = currentOperend + previousOperend
      break;
    case "-":
      return result = previousOperend - currentOperend
      break;
    case "*":
      return result = currentOperend * previousOperend
      break;
    case "/":
      return result = previousOperend / currentOperend
    default:
      break;
  }
 return result
}