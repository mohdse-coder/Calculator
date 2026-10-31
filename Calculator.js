// گرفتن المان های html
let display = document.getElementById("display")
let buttons = document.querySelectorAll("button")

let currentNumber = "0"
let previousNumber = ""
let operator = ""

buttons.forEach(function(btn){
    btn.addEventListener("click", function() {
        
        // اعداد
        if (btn.dataset.number !== undefined){
            if (currentNumber === "0") {
                currentNumber = btn.dataset.number
            } else {
                currentNumber = currentNumber + btn.dataset.number
            }
            display.textContent = currentNumber
        }

        // عملگرها
        if(btn.dataset.action === "operator"){
            if (currentNumber === "0") return; 
            previousNumber = currentNumber
            operator = btn.dataset.value
            currentNumber = "0"
            // display.textContent = previousNumber + " " + operator // (اختیاری: اگه میخوای عملگر رو هم نشون بده)
        }

        // اعشار
        if (btn.dataset.action === "decimal") {
            if (!currentNumber.includes(".")) {
                currentNumber = currentNumber + "."
                display.textContent = currentNumber
            }
        }

        // مساوی
        if (btn.dataset.action === "calculate"){
            let result = 0
            let num1 = Number(previousNumber)
            let num2 = Number(currentNumber)

            switch(operator) {
                case "+": result = num1 + num2; break
                case "-": result = num1 - num2; break
                case "*": result = num1 * num2; break
                case "/": result = num1 / num2; break
            }
            
            currentNumber = String(result)
            display.textContent = currentNumber
            previousNumber = ""
            operator = ""
        }

        // پاک کردن
        if(btn.dataset.action === "clear"){
            currentNumber = "0"
            previousNumber = ""
            operator = ""
            display.textContent = "0"
        }
        
    })
})

// پشتیبانی از کیبورد
document.addEventListener("keydown", function(event) {
    let key = event.key;
    console.log("Key pressed:", key); // ← برای تست در کنسول
    
    let btn = null;

    if (key >= "0" && key <= "9") {
        btn = document.querySelector(`button[data-number="${key}"]`);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        btn = document.querySelector(`button[data-action="operator"][data-value="${key}"]`);
    } else if (key === "=" || key === "Enter") {
        btn = document.querySelector(`button[data-action="calculate"]`);
    } else if (key === "Escape" || key.toLowerCase() === "c") {
        btn = document.querySelector(`button[data-action="clear"]`);
    } else if (key === ".") {
        btn = document.querySelector(`button[data-action="decimal"]`);
    }

    if (btn) {
        btn.click();
    }
});