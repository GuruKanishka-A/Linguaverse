document.addEventListener('DOMContentLoaded', () => {
    // DOM elements for multiple screens
    const loginScreen = document.getElementById('login-screen');
    const gameMenuScreen = document.getElementById('game-menu');
    const leaderboardScreen = document.getElementById('leaderboard-screen');
    const gameScreen = document.getElementById('game-screen');
    
    // Login and registration
    const loginForm = document.getElementById('login-form');
    const registerBtn = document.getElementById('register-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // Game Menu elements
    const playButton = document.getElementById('play-btn');
    const leaderboardButton = document.getElementById('leaderboard-btn');
    const logoutButton = document.getElementById('logout-btn');
    const levelSelection = document.getElementById('level-selection');
    const levelButtons = document.querySelectorAll('.level-btn');
    const startGameButton = document.getElementById('start-game-btn');
    const backToMenuButton = document.getElementById('back-to-menu-btn');
    
    // Leaderboard elements
    const backFromLeaderboardButton = document.getElementById('back-from-leaderboard');
    const languageFilter = document.getElementById('language-filter');
    const levelFilter = document.getElementById('level-filter');
    const leaderboardData = document.getElementById('leaderboard-data');
    
    // Game state
    const gameState = {
        currentUser: null,
        currentLevel: 1,
        currentLanguage: 'spanish',
        hearts: 3,
        score: 0,
        progress: 0,
        currentQuestion: null,
        currentQuestionType: null,
        questionIndex: 0,
        correctAnswers: 0,
        totalQuestions: 15,
        usedQuestions: {},
        levelDifficulty: {
            1: { questionCount: 10, difficulty: 'easy' },
            2: { questionCount: 12, difficulty: 'easy' },
            3: { questionCount: 15, difficulty: 'medium' },
            4: { questionCount: 18, difficulty: 'medium' },
            5: { questionCount: 20, difficulty: 'hard' }
        }
    };

    // Language database with translations
    const languageData = {
        spanish: {
            translations: [
                { english: "Hello", foreign: "Hola" },
                { english: "Good morning", foreign: "Buenos días" },
                { english: "How are you?", foreign: "¿Cómo estás?" },
                { english: "Thank you", foreign: "Gracias" },
                { english: "Please", foreign: "Por favor" },
                { english: "Yes", foreign: "Sí" },
                { english: "No", foreign: "No" },
                { english: "Goodbye", foreign: "Adiós" },
                { english: "I speak English", foreign: "Hablo inglés" },
                { english: "What is your name?", foreign: "¿Cómo te llamas?" },
                { english: "My name is", foreign: "Me llamo" },
                { english: "I don't understand", foreign: "No entiendo" },
                { english: "Where is the bathroom?", foreign: "¿Dónde está el baño?" },
                { english: "How much does it cost?", foreign: "¿Cuánto cuesta?" },
                { english: "I need help", foreign: "Necesito ayuda" }
            ],
            sentences: [
                { english: "I want to eat breakfast", foreign: "Quiero comer el desayuno" },
                { english: "The cat is black", foreign: "El gato es negro" },
                { english: "She has a red car", foreign: "Ella tiene un coche rojo" },
                { english: "Where is the library?", foreign: "¿Dónde está la biblioteca?" },
                { english: "I like to read books", foreign: "Me gusta leer libros" }
            ]
        },
        french: {
            translations: [
                { english: "Hello", foreign: "Bonjour" },
                { english: "Good morning", foreign: "Bon matin" },
                { english: "How are you?", foreign: "Comment allez-vous?" },
                { english: "Thank you", foreign: "Merci" },
                { english: "Please", foreign: "S'il vous plaît" },
                { english: "Yes", foreign: "Oui" },
                { english: "No", foreign: "Non" },
                { english: "Goodbye", foreign: "Au revoir" },
                { english: "I speak English", foreign: "Je parle anglais" },
                { english: "What is your name?", foreign: "Comment vous appelez-vous?" },
                { english: "My name is", foreign: "Je m'appelle" },
                { english: "I don't understand", foreign: "Je ne comprends pas" },
                { english: "Where is the bathroom?", foreign: "Où sont les toilettes?" },
                { english: "How much does it cost?", foreign: "Combien ça coûte?" },
                { english: "I need help", foreign: "J'ai besoin d'aide" }
            ],
            sentences: [
                { english: "I want to eat breakfast", foreign: "Je veux prendre le petit déjeuner" },
                { english: "The cat is black", foreign: "Le chat est noir" },
                { english: "She has a red car", foreign: "Elle a une voiture rouge" },
                { english: "Where is the library?", foreign: "Où est la bibliothèque?" },
                { english: "I like to read books", foreign: "J'aime lire des livres" }
            ]
        },
        german: {
            translations: [
                { english: "Hello", foreign: "Hallo" },
                { english: "Good morning", foreign: "Guten Morgen" },
                { english: "How are you?", foreign: "Wie geht es dir?" },
                { english: "Thank you", foreign: "Danke" },
                { english: "Please", foreign: "Bitte" },
                { english: "Yes", foreign: "Ja" },
                { english: "No", foreign: "Nein" },
                { english: "Goodbye", foreign: "Auf Wiedersehen" },
                { english: "I speak English", foreign: "Ich spreche Englisch" },
                { english: "What is your name?", foreign: "Wie heißt du?" },
                { english: "My name is", foreign: "Ich heiße" },
                { english: "I don't understand", foreign: "Ich verstehe nicht" },
                { english: "Where is the bathroom?", foreign: "Wo ist die Toilette?" },
                { english: "How much does it cost?", foreign: "Wie viel kostet das?" },
                { english: "I need help", foreign: "Ich brauche Hilfe" }
            ],
            sentences: [
                { english: "I want to eat breakfast", foreign: "Ich möchte frühstücken" },
                { english: "The cat is black", foreign: "Die Katze ist schwarz" },
                { english: "She has a red car", foreign: "Sie hat ein rotes Auto" },
                { english: "Where is the library?", foreign: "Wo ist die Bibliothek?" },
                { english: "I like to read books", foreign: "Ich lese gerne Bücher" }
            ]
        },
        italian: {
            translations: [
                { english: "Hello", foreign: "Ciao" },
                { english: "Good morning", foreign: "Buongiorno" },
                { english: "How are you?", foreign: "Come stai?" },
                { english: "Thank you", foreign: "Grazie" },
                { english: "Please", foreign: "Per favore" },
                { english: "Yes", foreign: "Sì" },
                { english: "No", foreign: "No" },
                { english: "Goodbye", foreign: "Arrivederci" },
                { english: "I speak English", foreign: "Parlo inglese" },
                { english: "What is your name?", foreign: "Come ti chiami?" },
                { english: "My name is", foreign: "Mi chiamo" },
                { english: "I don't understand", foreign: "Non capisco" },
                { english: "Where is the bathroom?", foreign: "Dov'è il bagno?" },
                { english: "How much does it cost?", foreign: "Quanto costa?" },
                { english: "I need help", foreign: "Ho bisogno di aiuto" }
            ],
            sentences: [
                { english: "I want to eat breakfast", foreign: "Voglio fare colazione" },
                { english: "The cat is black", foreign: "Il gatto è nero" },
                { english: "She has a red car", foreign: "Lei ha una macchina rossa" },
                { english: "Where is the library?", foreign: "Dov'è la biblioteca?" },
                { english: "I like to read books", foreign: "Mi piace leggere libri" }
            ]
        },
        japanese: {
            translations: [
                { english: "Hello", foreign: "こんにちは (Konnichiwa)" },
                { english: "Good morning", foreign: "おはようございます (Ohayou gozaimasu)" },
                { english: "How are you?", foreign: "お元気ですか？ (Ogenki desu ka?)" },
                { english: "Thank you", foreign: "ありがとう (Arigatou)" },
                { english: "Please", foreign: "お願いします (Onegaishimasu)" },
                { english: "Yes", foreign: "はい (Hai)" },
                { english: "No", foreign: "いいえ (Iie)" },
                { english: "Goodbye", foreign: "さようなら (Sayounara)" },
                { english: "I speak English", foreign: "英語を話します (Eigo wo hanashimasu)" },
                { english: "What is your name?", foreign: "お名前は何ですか？ (Onamae wa nan desu ka?)" },
                { english: "My name is", foreign: "私の名前は (Watashi no namae wa)" },
                { english: "I don't understand", foreign: "わかりません (Wakarimasen)" },
                { english: "Where is the bathroom?", foreign: "トイレはどこですか？ (Toire wa doko desu ka?)" },
                { english: "How much does it cost?", foreign: "いくらですか？ (Ikura desu ka?)" },
                { english: "I need help", foreign: "助けてください (Tasukete kudasai)" }
            ],
            sentences: [
                { english: "I want to eat breakfast", foreign: "朝食を食べたいです (Choushoku wo tabetai desu)" },
                { english: "The cat is black", foreign: "猫は黒いです (Neko wa kuroi desu)" },
                { english: "She has a red car", foreign: "彼女は赤い車を持っています (Kanojo wa akai kuruma wo motte imasu)" },
                { english: "Where is the library?", foreign: "図書館はどこですか？ (Toshokan wa doko desu ka?)" },
                { english: "I like to read books", foreign: "本を読むのが好きです (Hon wo yomu noga suki desu)" }
            ]
        },
        chinese: {
            translations: [
                { english: "Hello", foreign: "你好 (Nǐ hǎo)" },
                { english: "Good morning", foreign: "早上好 (Zǎoshang hǎo)" },
                { english: "How are you?", foreign: "你好吗？(Nǐ hǎo ma?)" },
                { english: "Thank you", foreign: "谢谢 (Xièxiè)" },
                { english: "Please", foreign: "请 (Qǐng)" },
                { english: "Yes", foreign: "是 (Shì)" },
                { english: "No", foreign: "不是 (Bù shì)" },
                { english: "Goodbye", foreign: "再见 (Zàijiàn)" },
                { english: "I speak English", foreign: "我说英语 (Wǒ shuō Yīngyǔ)" },
                { english: "What is your name?", foreign: "你叫什么名字？(Nǐ jiào shénme míngzì?)" },
                { english: "My name is", foreign: "我的名字是 (Wǒ de míngzì shì)" },
                { english: "I don't understand", foreign: "我不明白 (Wǒ bù míngbái)" },
                { english: "Where is the bathroom?", foreign: "洗手间在哪里？(Xǐshǒujiān zài nǎlǐ?)" },
                { english: "How much does it cost?", foreign: "这个多少钱？(Zhège duōshǎo qián?)" },
                { english: "I need help", foreign: "我需要帮助 (Wǒ xūyào bāngzhù)" }
            ],
            sentences: [
                { english: "I want to eat breakfast", foreign: "我想吃早餐 (Wǒ xiǎng chī zǎocān)" },
                { english: "The cat is black", foreign: "猫是黑色的 (Māo shì hēisè de)" },
                { english: "She has a red car", foreign: "她有一辆红色的车 (Tā yǒu yī liàng hóngsè de chē)" },
                { english: "Where is the library?", foreign: "图书馆在哪里？(Túshūguǎn zài nǎlǐ?)" },
                { english: "I like to read books", foreign: "我喜欢读书 (Wǒ xǐhuān dúshū)" }
            ]
        }
    };

    // DOM elements
    const languageSelect = document.getElementById('language-select');
    const questionContainer = document.getElementById('question-container');
    const question = document.getElementById('question');
    const instruction = document.getElementById('instruction');
    const optionsContainer = document.getElementById('options-container');
    const wordBankContainer = document.getElementById('word-bank-container');
    const answerContainer = document.getElementById('answer-container');
    const feedbackContainer = document.getElementById('feedback-container');
    const correctFeedback = document.getElementById('correct-feedback');
    const incorrectFeedback = document.getElementById('incorrect-feedback');
    const correctAnswer = document.getElementById('correct-answer');
    const correctSolution = document.getElementById('correct-solution');
    const continueBtn = document.getElementById('continue-btn');
    const heartElements = document.querySelectorAll('.heart');
    const progressElement = document.querySelector('.progress');

    // Event listeners
    languageSelect.addEventListener('change', (e) => {
        gameState.currentLanguage = e.target.value;
        resetGame();
    });

    continueBtn.addEventListener('click', () => {
        feedbackContainer.classList.add('hidden');
        nextQuestion();
    });

    // User Authentication
    // Load users from localStorage
    let users = JSON.parse(localStorage.getItem('languageGameUsers')) || {};
    
    // Load leaderboard from localStorage
    let leaderboard = JSON.parse(localStorage.getItem('languageGameLeaderboard')) || [];
    
    // Login form handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        if (users[username] && users[username].password === password) {
            loginUser(username);
        } else {
            alert('Invalid username or password');
        }
    });
    
    // Register button handler
    registerBtn.addEventListener('click', () => {
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        if (!username || !password) {
            alert('Please enter a username and password');
            return;
        }
        
        if (users[username]) {
            alert('Username already exists');
            return;
        }
        
        // Create new user
        users[username] = { 
            password: password,
            completedLevels: {},
            highScores: {}
        };
        
        // Save to localStorage
        localStorage.setItem('languageGameUsers', JSON.stringify(users));
        
        // Login the new user
        loginUser(username);
    });
    
    // Login user function
    function loginUser(username) {
        gameState.currentUser = username;
        showScreen(gameMenuScreen);
    }
    
    // Logout button handler
    logoutButton.addEventListener('click', () => {
        gameState.currentUser = null;
        showScreen(loginScreen);
        usernameInput.value = '';
        passwordInput.value = '';
    });
    
    // Screen management
    function showScreen(screen) {
        // Hide all screens
        loginScreen.classList.add('hidden');
        gameMenuScreen.classList.add('hidden');
        leaderboardScreen.classList.add('hidden');
        gameScreen.classList.add('hidden');
        
        // Show the requested screen
        screen.classList.remove('hidden');
    }
    
    // Game Menu handlers
    playButton.addEventListener('click', () => {
        levelSelection.classList.remove('hidden');
    });
    
    backToMenuButton.addEventListener('click', () => {
        levelSelection.classList.add('hidden');
    });
    
    // Level selection handlers
    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove selected class from all buttons
            levelButtons.forEach(btn => btn.classList.remove('selected'));
            // Add selected class to the clicked button
            button.classList.add('selected');
            gameState.currentLevel = parseInt(button.dataset.level);
        });
    });
    
    // Start game button handler
    startGameButton.addEventListener('click', () => {
        if (!document.querySelector('.level-btn.selected')) {
            alert('Please select a level');
            return;
        }
        
        // Set the current language
        gameState.currentLanguage = document.getElementById('language-select').value;
        
        // Initialize game
        initializeGame();
        
        // Show game screen
        showScreen(gameScreen);
    });
    
    // Leaderboard button handler
    leaderboardButton.addEventListener('click', () => {
        loadLeaderboard();
        showScreen(leaderboardScreen);
    });
    
    // Back from leaderboard button handler
    backFromLeaderboardButton.addEventListener('click', () => {
        showScreen(gameMenuScreen);
    });
    
    // Leaderboard filter handlers
    languageFilter.addEventListener('change', loadLeaderboard);
    levelFilter.addEventListener('change', loadLeaderboard);
    
    // Load leaderboard data
    function loadLeaderboard() {
        const language = languageFilter.value;
        const level = levelFilter.value;
        
        // Clear current leaderboard
        leaderboardData.innerHTML = '';
        
        // Filter the leaderboard data
        let filteredLeaderboard = [...leaderboard];
        
        if (language !== 'all') {
            filteredLeaderboard = filteredLeaderboard.filter(entry => entry.language === language);
        }
        
        if (level !== 'all') {
            filteredLeaderboard = filteredLeaderboard.filter(entry => entry.level === parseInt(level));
        }
        
        // Sort by score (descending)
        filteredLeaderboard.sort((a, b) => b.score - a.score);
        
        // Display the leaderboard
        filteredLeaderboard.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${entry.username}</td>
                <td>${entry.language}</td>
                <td>${entry.level}</td>
                <td>${entry.score}</td>
            `;
            leaderboardData.appendChild(row);
        });
        
        // If no entries, display a message
        if (filteredLeaderboard.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="5" style="text-align: center">No scores yet</td>
            `;
            leaderboardData.appendChild(row);
        }
    }
    
    // Save score to leaderboard
    function saveScore() {
        if (!gameState.currentUser) return;
        
        // Create leaderboard entry
        const entry = {
            username: gameState.currentUser,
            language: gameState.currentLanguage,
            level: gameState.currentLevel,
            score: gameState.score,
            date: new Date().toISOString()
        };
        
        // Add to leaderboard
        leaderboard.push(entry);
        
        // Save to localStorage
        localStorage.setItem('languageGameLeaderboard', JSON.stringify(leaderboard));
    }
    
    // Initialize game
    function initializeGame() {
        // Set level properties based on current level
        const levelConfig = gameState.levelDifficulty[gameState.currentLevel];
        gameState.totalQuestions = levelConfig.questionCount;
        
        // Reset game state
        gameState.hearts = 3;
        gameState.score = 0;
        gameState.progress = 0;
        gameState.questionIndex = 0;
        gameState.correctAnswers = 0;
        gameState.usedQuestions = {};
        
        // Update UI to show current level and language
        document.getElementById('current-level').textContent = `Level ${gameState.currentLevel}`;
        document.getElementById('current-language').textContent = gameState.currentLanguage.charAt(0).toUpperCase() + gameState.currentLanguage.slice(1);
        document.getElementById('score-value').textContent = '0';
        
        // Initialize the game
        updateHearts();
        updateProgress();
        nextQuestion();
    }

    // Update UI elements
    function updateHearts() {
        heartElements.forEach((heart, index) => {
            if (index < gameState.hearts) {
                heart.textContent = '❤️';
            } else {
                heart.textContent = '🖤';
            }
        });
    }

    function updateProgress() {
        const progressPercent = (gameState.correctAnswers / gameState.totalQuestions) * 100;
        progressElement.style.width = progressPercent + '%';
    }

    // Question generation
    function nextQuestion() {
        if (gameState.hearts <= 0) {
            gameOver();
            return;
        }

        if (gameState.questionIndex >= gameState.totalQuestions) {
            gameComplete();
            return;
        }

        // Clear previous question
        optionsContainer.innerHTML = '';
        wordBankContainer.innerHTML = '';
        answerContainer.innerHTML = '';
        
        optionsContainer.classList.add('hidden');
        wordBankContainer.classList.add('hidden');
        answerContainer.classList.add('hidden');

        // Decide which type of question to show based on level difficulty
        let questionType;
        const levelConfig = gameState.levelDifficulty[gameState.currentLevel];
        
        if (levelConfig.difficulty === 'easy') {
            questionType = Math.random() > 0.7 ? 'wordBank' : 'multipleChoice';
        } else if (levelConfig.difficulty === 'medium') {
            questionType = Math.random() > 0.5 ? 'wordBank' : 'multipleChoice';
        } else {
            questionType = Math.random() > 0.3 ? 'wordBank' : 'multipleChoice';
        }
        
        gameState.currentQuestionType = questionType;
        
        const currentLanguageData = languageData[gameState.currentLanguage];
        let sourceData;
        let dataType;
        
        // Randomly choose between word translations and sentences based on level
        if (gameState.currentLevel <= 2) {
            // Easier levels use more basic translations
            if (Math.random() > 0.2) {
                sourceData = currentLanguageData.translations;
                instruction.textContent = "Select the correct translation";
                dataType = 'translations';
            } else {
                sourceData = currentLanguageData.sentences;
                instruction.textContent = "Translate this sentence";
                dataType = 'sentences';
            }
        } else if (gameState.currentLevel <= 4) {
            // Mid levels mix translations and sentences
            if (Math.random() > 0.5) {
                sourceData = currentLanguageData.translations;
                instruction.textContent = "Select the correct translation";
                dataType = 'translations';
            } else {
                sourceData = currentLanguageData.sentences;
                instruction.textContent = "Translate this sentence";
                dataType = 'sentences';
            }
        } else {
            // Hardest level uses more sentences
            if (Math.random() > 0.7) {
                sourceData = currentLanguageData.translations;
                instruction.textContent = "Select the correct translation";
                dataType = 'translations';
            } else {
                sourceData = currentLanguageData.sentences;
                instruction.textContent = "Translate this sentence";
                dataType = 'sentences';
            }
        }
        
        // Create a unique identifier for questions to track used questions
        let questionIdentifier = '';
        let randomIndex;
        let maxAttempts = 20; // Prevent infinite loops if all questions are used
        
        do {
            // Select a random item from the data
            randomIndex = Math.floor(Math.random() * sourceData.length);
            const currentQuestion = sourceData[randomIndex];
            
            // Create a question identifier based on the question content and language
            questionIdentifier = `${gameState.currentLanguage}_${dataType}_${randomIndex}`;
            maxAttempts--;
        } while (gameState.usedQuestions[questionIdentifier] && maxAttempts > 0);
        
        // Mark this question as used
        gameState.usedQuestions[questionIdentifier] = true;
        
        gameState.currentQuestion = sourceData[randomIndex];
        
        // Direction based on level: higher levels have more foreign to English (harder)
        const isEnglishToForeign = gameState.currentLevel <= 3 ? Math.random() > 0.4 : Math.random() > 0.6;
        
        if (isEnglishToForeign) {
            question.textContent = gameState.currentQuestion.english;
            gameState.correctAnswer = gameState.currentQuestion.foreign;
        } else {
            question.textContent = gameState.currentQuestion.foreign;
            gameState.correctAnswer = gameState.currentQuestion.english;
        }
        
        // Generate the appropriate question type
        if (questionType === 'multipleChoice') {
            generateMultipleChoiceQuestion(sourceData, randomIndex, isEnglishToForeign);
        } else {
            generateWordBankQuestion(isEnglishToForeign);
        }
        
        gameState.questionIndex++;
    }

    function generateMultipleChoiceQuestion(sourceData, correctIndex, isEnglishToForeign) {
        // Get the correct answer
        const correctAnswer = isEnglishToForeign 
            ? sourceData[correctIndex].foreign 
            : sourceData[correctIndex].english;
        
        // Create array of potential wrong answers
        const wrongAnswers = [];
        const usedIndices = new Set([correctIndex]);
        
        // Get 3 random wrong answers
        while (wrongAnswers.length < 3) {
            const randIndex = Math.floor(Math.random() * sourceData.length);
            if (!usedIndices.has(randIndex)) {
                usedIndices.add(randIndex);
                wrongAnswers.push(isEnglishToForeign 
                    ? sourceData[randIndex].foreign 
                    : sourceData[randIndex].english);
            }
        }
        
        // Combine and shuffle all answers
        const allAnswers = [correctAnswer, ...wrongAnswers];
        shuffleArray(allAnswers);
        
        // Create option elements
        allAnswers.forEach(answer => {
            const option = document.createElement('div');
            option.className = 'option';
            option.textContent = answer;
            
            option.addEventListener('click', () => handleOptionClick(option, answer, correctAnswer));
            
            optionsContainer.appendChild(option);
        });
        
        optionsContainer.classList.remove('hidden');
    }

    function generateWordBankQuestion(isEnglishToForeign) {
        // Get the correct answer
        const answer = isEnglishToForeign 
            ? gameState.currentQuestion.foreign 
            : gameState.currentQuestion.english;
        
        // Split the answer into words
        const words = answer.split(' ');
        
        // Create a shuffled copy of the words
        const shuffledWords = [...words];
        shuffleArray(shuffledWords);
        
        // Create word bank elements
        shuffledWords.forEach(word => {
            const wordElement = document.createElement('div');
            wordElement.className = 'word-piece';
            wordElement.textContent = word;
            wordElement.dataset.word = word;
            
            wordElement.addEventListener('click', () => handleWordPieceClick(wordElement));
            
            wordBankContainer.appendChild(wordElement);
        });
        
        wordBankContainer.classList.remove('hidden');
        answerContainer.classList.remove('hidden');
    }
    
    // Event handlers
    function handleOptionClick(option, selectedAnswer, correctAnswer) {
        const options = document.querySelectorAll('.option');
        options.forEach(opt => {
            opt.style.pointerEvents = 'none';  // Disable further clicks
            if (opt.textContent === correctAnswer) {
                opt.style.backgroundColor = '#58cc02';  // Highlight correct answer
                opt.style.color = 'white';
            }
        });
        
        const isCorrect = selectedAnswer === correctAnswer;
        
        if (isCorrect) {
            option.style.backgroundColor = '#58cc02';
            option.style.color = 'white';
            handleCorrectAnswer();
        } else {
            option.style.backgroundColor = '#ff4b4b';
            option.style.color = 'white';
            handleIncorrectAnswer(correctAnswer);
        }
    }
    
    let selectedWords = [];
    
    function handleWordPieceClick(wordElement) {
        if (wordElement.classList.contains('used')) {
            return;  // Skip if word is already used
        }
        
        // Mark as used
        wordElement.classList.add('used');
        
        // Add to answer area
        const answerWord = document.createElement('div');
        answerWord.className = 'answer-word';
        answerWord.textContent = wordElement.dataset.word;
        answerWord.dataset.originalElementId = wordElement.id;
        
        answerWord.addEventListener('click', () => handleAnswerWordClick(answerWord, wordElement));
        
        answerContainer.appendChild(answerWord);
        selectedWords.push(wordElement.dataset.word);
        
        // Check if sentence is complete
        if (wordBankContainer.querySelectorAll('.word-piece:not(.used)').length === 0) {
            checkWordBankAnswer();
        }
    }
    
    function handleAnswerWordClick(answerWord, originalWordElement) {
        // Remove from answer
        answerContainer.removeChild(answerWord);
        
        // Remove from selected words
        const index = selectedWords.indexOf(answerWord.textContent);
        if (index > -1) {
            selectedWords.splice(index, 1);
        }
        
        // Reactivate in word bank
        if (originalWordElement) {
            originalWordElement.classList.remove('used');
        } else {
            const wordPieces = wordBankContainer.querySelectorAll('.word-piece');
            for (const piece of wordPieces) {
                if (piece.dataset.word === answerWord.textContent && piece.classList.contains('used')) {
                    piece.classList.remove('used');
                    break;
                }
            }
        }
    }
    
    function checkWordBankAnswer() {
        const userAnswer = selectedWords.join(' ');
        const isCorrect = userAnswer === gameState.correctAnswer;
        
        if (isCorrect) {
            handleCorrectAnswer();
        } else {
            handleIncorrectAnswer(gameState.correctAnswer);
        }
    }
    
    // Result handlers
    function handleCorrectAnswer() {
        setTimeout(() => {
            correctFeedback.classList.remove('hidden');
            correctAnswer.textContent = gameState.correctAnswer;
            feedbackContainer.classList.remove('hidden');
            
            // Award more points for higher levels and harder question types
            let scoreBonus = 10;
            
            // Level bonus
            scoreBonus += (gameState.currentLevel - 1) * 2;
            
            // Question type bonus (word bank is harder)
            if (gameState.currentQuestionType === 'wordBank') {
                scoreBonus += 5;
            }
            
            gameState.score += scoreBonus;
            document.getElementById('score-value').textContent = gameState.score;
            gameState.correctAnswers++;
            updateProgress();
        }, 1000);
    }
    
    function handleIncorrectAnswer(correctAnswerText) {
        setTimeout(() => {
            incorrectFeedback.classList.remove('hidden');
            correctSolution.textContent = correctAnswerText;
            feedbackContainer.classList.remove('hidden');
            
            gameState.hearts--;
            updateHearts();
        }, 1000);
    }
    
    function gameOver() {
        question.textContent = "Game Over!";
        instruction.textContent = "You've run out of hearts. Try again!";
        
        optionsContainer.innerHTML = '';
        wordBankContainer.innerHTML = '';
        answerContainer.innerHTML = '';
        
        // Save score to leaderboard
        saveScore();
        
        const resetButton = document.createElement('button');
        resetButton.textContent = "Try Again";
        resetButton.className = "option";
        resetButton.addEventListener('click', () => initializeGame());
        
        const menuButton = document.createElement('button');
        menuButton.textContent = "Back to Menu";
        menuButton.className = "option";
        menuButton.addEventListener('click', () => showScreen(gameMenuScreen));
        
        optionsContainer.appendChild(resetButton);
        optionsContainer.appendChild(menuButton);
        optionsContainer.classList.remove('hidden');
    }
    
    function gameComplete() {
        question.textContent = "Congratulations!";
        instruction.textContent = `You've completed Level ${gameState.currentLevel} with ${gameState.hearts} hearts remaining!`;
        
        optionsContainer.innerHTML = '';
        wordBankContainer.innerHTML = '';
        answerContainer.innerHTML = '';
        
        // Calculate bonus points for remaining hearts
        const heartBonus = gameState.hearts * 20;
        gameState.score += heartBonus;
        document.getElementById('score-value').textContent = gameState.score;
        
        // Save score to leaderboard
        saveScore();
        
        // Update user's completed levels
        if (users[gameState.currentUser]) {
            const user = users[gameState.currentUser];
            if (!user.completedLevels[gameState.currentLanguage]) {
                user.completedLevels[gameState.currentLanguage] = [];
            }
            
            if (!user.completedLevels[gameState.currentLanguage].includes(gameState.currentLevel)) {
                user.completedLevels[gameState.currentLanguage].push(gameState.currentLevel);
            }
            
            // Update high score if this score is higher
            const scoreKey = `${gameState.currentLanguage}_${gameState.currentLevel}`;
            if (!user.highScores[scoreKey] || user.highScores[scoreKey] < gameState.score) {
                user.highScores[scoreKey] = gameState.score;
            }
            
            // Save updated user data
            localStorage.setItem('languageGameUsers', JSON.stringify(users));
        }
        
        // Create buttons for next actions
        let buttons = [];
        
        // Add "Next Level" button if not at max level
        if (gameState.currentLevel < 5) {
            const nextLevelButton = document.createElement('button');
            nextLevelButton.textContent = `Go to Level ${gameState.currentLevel + 1}`;
            nextLevelButton.className = "option";
            nextLevelButton.addEventListener('click', () => {
                gameState.currentLevel++;
                initializeGame();
            });
            buttons.push(nextLevelButton);
        }
        
        // Add "Play Again" button
        const playAgainButton = document.createElement('button');
        playAgainButton.textContent = "Play Again";
        playAgainButton.className = "option";
        playAgainButton.addEventListener('click', () => initializeGame());
        buttons.push(playAgainButton);
        
        // Add "View Leaderboard" button
        const leaderboardButton = document.createElement('button');
        leaderboardButton.textContent = "View Leaderboard";
        leaderboardButton.className = "option";
        leaderboardButton.addEventListener('click', () => {
            loadLeaderboard();
            showScreen(leaderboardScreen);
        });
        buttons.push(leaderboardButton);
        
        // Add "Back to Menu" button
        const menuButton = document.createElement('button');
        menuButton.textContent = "Back to Menu";
        menuButton.className = "option";
        menuButton.addEventListener('click', () => showScreen(gameMenuScreen));
        buttons.push(menuButton);
        
        // Add buttons to the options container
        buttons.forEach(button => {
            optionsContainer.appendChild(button);
        });
        
        optionsContainer.classList.remove('hidden');
    }
    
    // Utility functions
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    // Start the game
    resetGame();
});