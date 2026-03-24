let display = document.getElementById('result');
let kiFill = document.getElementById('kiFill');
let powerLevel = document.getElementById('powerLevel');

let currentInput = '';
let operator = '';
let previousInput = '';


// _____________________________________________________________________________


function updateKiBar() {
    const maxLength = 20;
    const currentLength = display.value.length;
    const percentage = Math.min((currentLength / maxLength) * 100, 100);
    kiFill.style.width = percentage + '%';
    
    // Power Level dinâmico ÉPICO
    const power = Math.min(9000 + (currentLength * 150), 999999);
    powerLevel.textContent = power.toLocaleString() + (power > 9000 ? '🔥' : '+');
}

function appendToDisplay(value) {
   
    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/'];
    
    if (operators.includes(lastChar) && operators.includes(value)) {
        return; // Não permite operador após operador
    }
    
    if (display.value === '0' || display.value === 'ERRO') {
        display.value = value;
    } else {
        display.value += value;
    }
    
    updateKiBar();
    
    
    display.style.boxShadow = '0 0 50px #00d2d3, inset 0 0 20px rgba(0,210,211,0.3)';
    setTimeout(() => {
        display.style.boxShadow = '0 0 30px rgba(255,215,0,0.3), inset 0 5px 15px rgba(0,0,0,0.5)';
    }, 200);
}

function clearAll() {
    display.value = '0';
    currentInput = '';
    operator = '';
    previousInput = '';
    kiFill.style.width = '0%';
    powerLevel.textContent = '9000+';
    
   
    const clearBtn = document.querySelector('.clear-btn');
    clearBtn.style.transform = 'scale(1.2) rotate(10deg)';
    clearBtn.style.boxShadow = '0 15px 40px rgba(254,202,87,0.8)';
    
    setTimeout(() => {
        clearBtn.style.transform = 'scale(1) rotate(0deg)';
        clearBtn.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
    }, 200);
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
    updateKiBar();
    
   
    const deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        deleteBtn.style.transform = 'scale(1)';
    }, 150);
}


// _____________________________________________________________________________

function calculate() {
    try {
        let expression = display.value;
        
       
        expression = expression.replace(/×/g, '*');
        
    
        expression = expression.replace(/\s/g, '');
        

        let result = Function('"use strict"; return (' + expression + ')')();
        
     
        if (Number.isFinite(result)) {
            if (result.toString().includes('.')) {
                result = parseFloat(result.toFixed(10)).toString();
            }
            display.value = result;
        } else {
            throw new Error('Resultado inválido');
        }
        
        updateKiBar();
        
    
        const kameBtn = document.querySelector('.kamehameha-btn');
        kameBtn.style.transform = 'scale(1.15)';
        kameBtn.style.boxShadow = '0 0 60px rgba(0,210,211,1)';
        
        document.body.style.filter = 'brightness(1.3)';
        
        setTimeout(() => {
            kameBtn.style.transform = 'scale(1)';
            kameBtn.style.boxShadow = '0 15px 40px rgba(0,210,211,0.8)';
            document.body.style.filter = 'brightness(1)';
        }, 300);
        
    } catch (error) {
        
        display.value = 'ERRO';
        kiFill.style.width = '100%';
        kiFill.style.background = 'linear-gradient(90deg, #ff4757, #ff6b35, #ff3838)';
        powerLevel.textContent = 'OVER 9000? ❌';
        
        // Shake effect
        document.querySelector('.dragon-ball-calculator').style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            document.querySelector('.dragon-ball-calculator').style.animation = '';
        }, 500);
        
        // Reset após 1.5s
        setTimeout(() => {
            clearAll();
            kiFill.style.background = 'linear-gradient(90deg, #ff4757, #ffa502, #00d2d3)';
        }, 1500);
    }
}



// aqui é onde tudo acontece // _____________________________________________________________________________! ⌨️




document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Números e ponto
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
        event.preventDefault();
    } 
    // Operadores pra usar
    else if (key === '+' || key === '-') {
        appendToDisplay(key);
        event.preventDefault();
    } 
    else if (key === '*') {
        appendToDisplay('×');
        event.preventDefault();
    } 
    else if (key === '/') {
        appendToDisplay('/');
        event.preventDefault();
    } 
    // Enter = Calcular calculo
    else if (key === 'Enter' || key === '=') {
        calculate();
        event.preventDefault();
    } 
    // Escape C = Limpar
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearAll();
        event.preventDefault();
    } 
    // Backspace = Deletar
    else if (key === 'Backspace') {
        deleteLast();
        event.preventDefault();
    }
});


document.addEventListener('DOMContentLoaded', function() {
    clearAll();
    updateKiBar();
});


const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);


// _____________________________________________________________________________
































// _____________________________________________________________________________



const video = document.getElementById("videoIntro");
const musica = document.getElementById("musica");
const startBtn = document.getElementById("startBtn");
const pularBtn = document.getElementById("pular");

startBtn.addEventListener("click", iniciar);
pularBtn.addEventListener("click", pularIntro);


// _____________________________________________________________________________


function iniciar() {
  startBtn.style.display = "none";
  pularBtn.style.display = "block";
  video.style.display = "block";

  video.play();
  musica.play();
}


video.onended = () => {
  mostrarSite();
};


function pularIntro() {
  video.pause();
  musica.pause();
  mostrarSite();
}

// _____________________________________________________________________________
function mostrarSite() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("conteudo").style.display = "block";
  document.body.style.overflow = "auto";
}

