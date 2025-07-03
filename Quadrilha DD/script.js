// Palavras por categoria
const wordCategories = {
    festaJunina: [
        'pipoca', 'fogueira', 'bandeirinha', 'quadrilha', 'bingo',
        'pau de cebo', 'milho', 'maçã do amor', 'cocada', 'balao',
        'quentão', 'churro', 'pastel', 'pau de cebo', 'amendoim', 'beijo quente', 'paçoca',
        'canjicao', 'barraquinha'
    ],
    // Categoria 'general' alterada para 'SENAI' com as novas palavras
    SENAI: [
        'desenvolvimento de sistema', 'mecanica', 'soldagem', 'segurança do trabalho', // Added 'ç' back for display
        'administracao', 'eletromecanica', 'jardel', 'tarley', 'hernane', 'marcos',
        
    ]
};

// Elementos do DOM
const wordLetters = document.getElementById('wordLetters');
const attemptsLeft = document.getElementById('attemptsLeft');
const keyboard = document.getElementById('keyboard');
const newGameBtn = document.getElementById('newGameBtn');
const messageOverlay = document.getElementById('messageOverlay');
const messageTitle = document.getElementById('messageTitle');
const messageText = document.getElementById('messageText');
const wordReveal = document.getElementById('wordReveal');
const playAgainBtn = document.getElementById('playAgainBtn');
const categoryBtns = document.querySelectorAll('.category-btn');

// Canvas
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

// Variaveis do jogo
let selectedWord = ''; // This will store the normalized word (without diacritics) for comparison
let originalSelectedWord = ''; // This will store the word as it is in the list (with diacritics) for display
let guessedLetters = [];
let wrongLetters = [];
let attempts = 6;
let gameActive = false;
let selectedCategory = 'festaJunina'; 

// Inicializa o teclado
function initKeyboard() {
    // Adicionamos 'Ç' à lista de letras
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÇ'.split(''); 
    keyboard.innerHTML = '';
    
    letters.forEach(letter => {
        const key = document.createElement('div');
        key.classList.add('key');
        key.textContent = letter;
        // Para 'Ç', o data-letter será 'c' para a lógica de comparação
        key.dataset.letter = (letter === 'Ç' ? 'c' : letter).toLowerCase(); 
        key.removeEventListener('click', handleGuessWrapper); 
        key.addEventListener('click', handleGuessWrapper);
        keyboard.appendChild(key);
    });
}

// Wrapper para handleGuess para garantir que o 'this' e 'event' sejam passados corretamente
function handleGuessWrapper(event) {
    if (gameActive && !this.disabled) {
        handleGuess(this.dataset.letter);
    }
}


// Seleciona uma palavra aleatória
function selectRandomWord() {
    const words = wordCategories[selectedCategory];
    const randomIndex = Math.floor(Math.random() * words.length);
    originalSelectedWord = words[randomIndex]; // Armazena a palavra original para exibição
    selectedWord = originalSelectedWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); // Normaliza para comparação
    
    // Tratamento específico para 'ç' na palavra normalizada
    selectedWord = selectedWord.replace(/ç/g, 'c');

    console.log('Palavra original:', originalSelectedWord);
    console.log('Palavra selecionada (normalizada):', selectedWord);
    return selectedWord;
}

// Atualiza a exibição da palavra
function updateWordDisplay() {
    wordLetters.innerHTML = '';
    // Usamos a palavra original para exibir, mas a normalizada para verificar
    const originalWordArray = originalSelectedWord.split(''); 
    let allLettersGuessed = true;
    
    originalWordArray.forEach(char => {
        const letterElement = document.createElement('div');
        letterElement.classList.add('letter');
        
        if (char === ' ') {
            letterElement.textContent = '';
            letterElement.style.borderBottom = 'none';
            letterElement.style.boxShadow = 'none';
            letter.style.backgroundColor = 'transparent';
            letterElement.style.margin = '0 5px';
        } else {
            // Normaliza o caractere para verificar se foi adivinhado
            const normalizedChar = char.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const charToCheck = (char.toLowerCase() === 'ç' ? 'c' : normalizedChar); // Trata 'ç' como 'c' na verificação

            if (guessedLetters.includes(charToCheck)) {
                letterElement.textContent = char.toUpperCase(); // Exibe o caractere original (com acento/cedilha)
                letterElement.classList.add('revealed');
            } else {
                letterElement.textContent = '_';
                allLettersGuessed = false;
            }
        }
        wordLetters.appendChild(letterElement);
    });
    
    return allLettersGuessed;
}

// Atualiza o teclado
function updateKeyboard() {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        const letter = key.dataset.letter; // Essa é a letra normalizada (ex: 'c' para 'ç')
        
        key.classList.remove('used', 'correct', 'incorrect');
        key.disabled = false;

        if (guessedLetters.includes(letter)) {
            key.classList.add('used');
            key.disabled = true;
            if (selectedWord.includes(letter)) {
                key.classList.add('correct');
            } else {
                key.classList.add('incorrect');
            }
        }
    });
}

// Processa um palpite
function handleGuess(letter) {
    if (!gameActive) return;
    if (guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);
    
    if (!selectedWord.includes(letter)) {
        wrongLetters.push(letter);
        attempts--;
        attemptsLeft.textContent = attempts;
        drawFestaJuninaScene(); 
        
        if (attempts === 0) {
            endGame(false);
        }
    }
    
    const wordComplete = updateWordDisplay();
    updateKeyboard();
    
    if (wordComplete) {
        endGame(true);
    }
}

// Desenha os elementos da Festa Junina no canvas
function drawFestaJuninaScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = varStyles.darkColor;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    // Fogueira (base - 1 erro)
    if (wrongLetters.length >= 1) {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 20, canvas.height - 40);
        ctx.lineTo(canvas.width / 2 + 20, canvas.height - 40);
        ctx.moveTo(canvas.width / 2 - 15, canvas.height - 40);
        ctx.lineTo(canvas.width / 2 - 5, canvas.height - 80);
        ctx.lineTo(canvas.width / 2 + 5, canvas.height - 80);
        ctx.lineTo(canvas.width / 2 + 15, canvas.height - 40);
        ctx.stroke();
    }
    
    // Chamas da fogueira (2 erros)
    if (wrongLetters.length >= 2) {
        ctx.fillStyle = '#ffc300'; // Amarelo
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height - 85, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#e63946'; // Vermelho
        ctx.beginPath();
        ctx.arc(canvas.width / 2 - 5, canvas.height - 90, 8, 0, Math.PI * 2);
        ctx.fill();
    }

    // Bandeirinha 1 (3 erros)
    if (wrongLetters.length >= 3) {
        ctx.fillStyle = '#8338ec'; // Roxo
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 70, 50);
        ctx.lineTo(canvas.width / 2 - 40, 50);
        ctx.lineTo(canvas.width / 2 - 55, 80);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = varStyles.darkColor;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 70, 50);
        ctx.lineTo(canvas.width / 2 + 70, 50);
        ctx.stroke(); // Corda
    }
    
    // Bandeirinha 2 (4 erros)
    if (wrongLetters.length >= 4) {
        ctx.fillStyle = '#fca311'; // Laranja
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + 10, 50);
        ctx.lineTo(canvas.width / 2 + 40, 50);
        ctx.lineTo(canvas.width / 2 + 25, 80);
        ctx.closePath();
        ctx.fill();
    }
    
    // Balão (5 erros)
    if (wrongLetters.length >= 5) {
        ctx.fillStyle = '#e63946'; // Vermelho
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2, 150, 40, 60, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = varStyles.darkColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 10, 200);
        ctx.lineTo(canvas.width / 2 - 5, 210);
        ctx.lineTo(canvas.width / 2 + 5, 210);
        ctx.lineTo(canvas.width / 2 + 10, 200);
        ctx.stroke();
    }
    
    // Detalhe final / Tristeza (6 erros)
    if (wrongLetters.length >= 6) {
        ctx.fillStyle = '#000';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Oh, não!', canvas.width / 2, canvas.height / 2 - 50);
        // Desenha a "cara triste" no balão ou no cenário
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(canvas.width / 2 - 15, 140, 3, 0, Math.PI * 2); ctx.fill(); 
        ctx.arc(canvas.width / 2 + 15, 140, 3, 0, Math.PI * 2); ctx.fill(); 
        ctx.beginPath();
        ctx.arc(canvas.width / 2, 170, 15, 0, Math.PI, false); 
        ctx.stroke();
    }
}

// Termina o jogo
function endGame(won) {
    gameActive = false;
    
    // Desabilita todas as teclas do teclado quando o jogo termina
    const allKeys = keyboard.querySelectorAll('.key');
    allKeys.forEach(key => {
        key.disabled = true;
    });

    if (won) {
        messageTitle.textContent = 'Arraiá de Sucesso!';
        messageText.textContent = 'Parabéns, você acertou a palavra e salvou a festa!';
    } else {
        messageTitle.textContent = 'Deu Ruim no Arraiá!';
        messageText.textContent = 'Que pena, você não conseguiu adivinhar a palavra...';
    }
    
    // Exibe a palavra original para o usuário (com acentos e espaços se houver)
    wordReveal.textContent = originalSelectedWord.toUpperCase();

    messageOverlay.classList.add('show');
}

// Reinicia o jogo
function startNewGame() {
    // Reset das variáveis
    guessedLetters = [];
    wrongLetters = [];
    attempts = 6;
    attemptsLeft.textContent = attempts;
    gameActive = true; 
    
    // Seleciona uma nova palavra
    selectRandomWord();
    
    // Atualiza a interface
    updateWordDisplay();
    updateKeyboard(); 
    drawFestaJuninaScene(); 
    
    // Esconde a mensagem de fim de jogo
    messageOverlay.classList.remove('show');
}

// Event listeners
newGameBtn.addEventListener('click', startNewGame);
playAgainBtn.addEventListener('click', startNewGame);

// Event listener para teclado físico
document.addEventListener('keydown', (e) => {
    if (!gameActive || messageOverlay.classList.contains('show')) return; 
    
    const key = e.key.toLowerCase();
    // Adiciona o mapeamento para 'ç' ser reconhecido como 'c' ao digitar
    let processedKey = key;
    if (key === 'ç') {
        processedKey = 'c';
    }

    if (/^[a-z]$/.test(processedKey) && !guessedLetters.includes(processedKey)) {
        handleGuess(processedKey);
    }
});

// Event listeners para as categorias
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const newCategory = btn.dataset.category;
        if (newCategory === selectedCategory && gameActive) {
            return; 
        }

        if (gameActive) {
            const confirmChange = confirm('Um jogo está em andamento. Deseja começar um novo jogo com esta categoria?');
            if (!confirmChange) {
                return; 
            }
        }
        
        selectedCategory = newCategory;
        
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        startNewGame(); 
    });
});

// Obtém estilos computados para usar as variáveis CSS no JS
const varStyles = getComputedStyle(document.documentElement);

// Inicializa o jogo
function initGame() {
    initKeyboard();
    startNewGame();
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        drawFestaJuninaScene(); 
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

// Inicia o jogo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initGame);