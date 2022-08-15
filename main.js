const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display')

keys.onclick = (e) => {
    //todo: Kiểm tra xem có click chính xác không.
    if(e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent

        //todo: Xử lí khi click vào Number
        if(!action) {
            console.log('number key!')
            if(displayedNum === '0' || calculator.dataset.previousKeyType === 'operator') {
                display.textContent = keyContent
            }
            else {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKeyType = 'number'
        }

        //todo: Xử lý khi click vào Operator
        if(
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            console.log('operator key!');
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action

        }

        //todo: Xử lý khi click vào AC (clear)
        if(action === 'clear') {
            console.log('clear key!');
            calculator.dataset.previousKeyType = 'clear'
            display.textContent = '0'
        }

        //todo: Xử lý khi click vào decimal ('.')
        if(action === 'decimal') {
            console.log('decimal key!');
            calculator.dataset.previousKeyType = 'decimal'
            if(!displayedNum.includes('.')){
                display.textContent = displayedNum + '.'
            }
        }

        //todo: Xử lý khi click vào calculate ('=')
        if(action === 'calculate') {
            console.log('calculate key!');
            calculator.dataset.previousKeyType = 'calculate'

            //* Đặt biến (chuyển từ string -> number)
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if(firstValue != undefined && operator != undefined) {
                display.textContent = calculate(firstValue, operator, secondValue)
            }
        }

        //todo: Xử lý khi click vào delete ('xóa')
        var newNum = Array.from(displayedNum)
        if(action === 'delete' && displayedNum !== '0') {
            console.log('delete key!');
            calculator.dataset.previousKeyType = 'delete'
            
            //todo: Xử lý xóa bớt
            newNum.pop()
            display.textContent = newNum.join('').toString()

            if(newNum.length === 0) {
                display.textContent = '0'
            }
        }
    }
}

//todo: Hàm tính toán
function calculate(firstNum, operator, secondNum) {
    if(operator === 'add') {
        return Number(firstNum) + Number(secondNum)
    }
    if(operator === 'subtract') {
        return Number(firstNum) - Number(secondNum)
    }
    if(operator === 'multiply') {
        return Number(firstNum) * Number(secondNum)
    }
    if(operator === 'divide') {
        return Number(firstNum) / Number(secondNum)
    }
}
