let interval;
let firstNumber = null;
let secondNumber = null;
const aciertos = document.getElementById('aciertos');
const tiempo = document.getElementById('tiempo');
const movimientos = document.getElementById('movimientos');
let acerts = 0;
let movs = 0;
let time = 45;
let cantidad = 8;
let numeros = [];
let buttonsArray = [];
for (let i = 0; i < cantidad; i ++) {
    numeros.push(i + 1);
    numeros.push(i + 1);
}
tiempo.textContent = time;
numeros.sort(function() {return Math.random() - 0.5});
crearBotones();
game();
const level = document.getElementById('level');
level.addEventListener('change', function() {
    cantidad = level.value;
    numeros = [];
    console.log(cantidad);
    if (cantidad == 8) {
        tiempo.textContent= time = 45;
    } else if (cantidad == 16) {
        tiempo.textContent = time = 180;
    }
    console.log(time);
    for (let i = 0; i < cantidad; i ++) {
        numeros.push(i + 1);
        numeros.push(i + 1);
    }
    numeros.sort(function() {return Math.random() - 0.5});
    crearBotones();
    game();
});
function crearBotones() {
    const buttons = document.getElementById('buttons');
    buttons.textContent = '';
    for (let i = 0; i < cantidad * 2; i ++) {
        const button = document.createElement('button');
        button.className = 'button';
        button.textContent = '';
        buttons.appendChild(button);
    }
    buttons.style.gridTemplateColumns = `repeat(${cantidad/2}, 1fr)`;
}
function game() {
    const button = document.getElementsByClassName('button');
    buttonsArray = Array.from(button);
    buttonsArray.forEach((button, index) => {
        button.addEventListener('click', function() {
            if (movs === 0 && firstNumber === null) {
                timer();
            }
            button.textContent = numeros[index];
            if (firstNumber === null) {
                firstNumber = button;
                firstNumber.textContent = numeros[buttonsArray.indexOf(firstNumber)];
                firstNumber.disabled = true;
            } else if (secondNumber === null) {
                secondNumber = button;
                secondNumber.textContent = numeros[buttonsArray.indexOf(secondNumber)];
                secondNumber.disabled = true;
            }
            if (firstNumber !== null && secondNumber !== null) {
                if (numeros[buttonsArray.indexOf(firstNumber)] === numeros[buttonsArray.indexOf(secondNumber)]) {
                    aciertos.textContent = ++acerts;
                    movimientos.textContent = ++movs;
                    firstNumber = null;
                    secondNumber = null;
                } else {
                    setTimeout(function() {
                        firstNumber.textContent = '';
                        secondNumber.textContent = '';
                        firstNumber.disabled = false;
                        secondNumber.disabled = false;
                        firstNumber = null;
                        secondNumber = null;
                        movimientos.textContent = ++movs;
                    }, 400);
                }
            }
        });
    });
}
const reset = document.getElementById('reset');
reset.addEventListener('click', function() {
    numeros.sort(function() {return Math.random() - 0.5});
    buttonsArray.forEach((button) => {
        button.textContent = '';
        button.disabled = false;
    });
    firstNumber = null;
    secondNumber = null;
    aciertos.textContent = acerts = 0;
    movimientos.textContent = movs = 0;
    if (cantidad == 8) {
        tiempo.textContent= time = 45;
    } else if (cantidad == 16) {
        tiempo.textContent = time = 180;
    }
    clearInterval(interval);
});
function timer() {
    interval = setInterval(function() {
        if (acerts === 8) {
            clearInterval(interval);
        }
        if (time > 0) {
            tiempo.textContent = --time;
        } else {
            tiempo.textContent = time;
            clearInterval(interval);
            buttonsArray.forEach((button) => {
                button.disabled = true;
                button.textContent = numeros[buttonsArray.indexOf(button)];
            });
        }
    }, 1000);
}