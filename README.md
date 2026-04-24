# 🌐 LinguaVerse — Multi-Language Learning Platform

> A comprehensive language learning platform combining a multilingual translator and an interactive word game — built with Python, Flask, and JavaScript.

![Python](https://img.shields.io/badge/Python-3.x-blue) ![Flask](https://img.shields.io/badge/Flask-Lightweight-green) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow) ![HTML/CSS](https://img.shields.io/badge/HTML%2FCSS-Frontend-orange)

---

## 📌 Overview

LinguaVerse is an innovative language learning platform that solves a key problem with existing translation tools — **they only translate into one language at a time**. LinguaVerse translates text into **3 languages simultaneously**, allowing users to compare linguistic structures side by side.

Combined with an **interactive word game** across 5 languages and 5 difficulty levels, and a **competitive leaderboard**, LinguaVerse makes language learning both effective and engaging.

---

## ✨ Features

### 🔤 Multilingual Translator
- Translates input text into **3 languages simultaneously**
- Supports **100+ languages** worldwide
- **Text-to-speech (gTTS)** — hear translations in native accents
- **Document translation** — upload `.txt` or `.docx` files for full document translation
- Auto language detection
- Copy and listen buttons for each translation panel

### 🎮 Interactive Word Game
- Supports **5 major languages**: Japanese, German, French, Italian, Chinese
- **5 progressive difficulty levels** — from basic vocabulary to complex word puzzles
- Game modes: Word Matching, Sentence Building, Listening Challenge
- **Real-time feedback** on correct and incorrect answers
- **Adaptive difficulty** — increases complexity based on user progress

### 🏆 Leaderboard System
- Tracks scores across languages and levels
- Competitive ranking by speed, accuracy, and level completion
- Filter leaderboard by language and level
- Motivates continuous improvement

### 👤 User Authentication
- Register and login system
- Session-based progress tracking
- Personalized game history

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, Flask |
| Frontend | HTML, CSS, JavaScript |
| Translation | Deep Translator (Google Translate API) |
| Text-to-Speech | gTTS (Google Text-to-Speech) |
| Document Processing | python-docx |
| Audio Encoding | Base64, Tempfile |
| Session Management | Flask Sessions |

---

## 📁 Project Structure

```
linguaverse/
│
├── app.py                  # Main Flask application
├── templates/
│   ├── index.html          # Landing page / Dashboard
│   ├── translator.html     # Translator interface
│   ├── game.html           # Word game interface
│   ├── login.html          # Login page
│   ├── register.html       # Registration page
│   └── dashboard.html      # User dashboard
│
├── static/
│   ├── css/                # Stylesheets
│   ├── js/                 # Game logic & frontend scripts
│   └── assets/             # Images and icons
│
└── requirements.txt        # Python dependencies
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Python 3.x
- pip

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/GuruKanishka-A/linguaverse.git
cd linguaverse

# 2. Install dependencies
pip install flask deep-translator gtts python-docx

# 3. Run the application
python app.py

# 4. Open in browser
# Visit: http://127.0.0.1:5000
```

### Hardware Requirements
- RAM: 6 GB minimum
- OS: Windows / Linux / macOS
- Processor: Intel i5 or equivalent

---

## 🚀 How It Works

```
User Input (text / file)
        ↓
Flask Backend receives request
        ↓
Deep Translator → 3 simultaneous translations
        ↓
gTTS generates audio (Base64 encoded)
        ↓
Frontend displays results + plays audio
```

### Game Flow
```
User Login → Select Language → Select Level
        ↓
Word Challenge presented
        ↓
Real-time answer validation (JavaScript)
        ↓
Score updated → Leaderboard refreshed
```

---

## 📸 Screenshots

### Dashboard
<img width="1019" height="620" alt="Dashboard" src="https://github.com/user-attachments/assets/46314834-d945-4fe5-931a-dc1d30b463b9" />

### Translator — 3 simultaneous translations
<img width="964" height="595" alt="Translator" src="https://github.com/user-attachments/assets/56e11dd6-b6c7-4cc5-9ba8-b1b28a789b50" />

### Login page 
<img width="1019" height="589" alt="image" src="https://github.com/user-attachments/assets/520e7ed0-be34-4319-bbd0-1306d7ae9c4d" />

### Game Features
<img width="1044" height="595" alt="Game Features" src="https://github.com/user-attachments/assets/eb2e79ca-537d-4830-beb1-24562ff24e4e" />

### Word Game Interface
<img width="1193" height="592" alt="Game interface" src="https://github.com/user-attachments/assets/473d0df1-80ff-4c75-8db9-c8d2fae58dd3" />

### Leaderboard
<img width="1174" height="593" alt="image" src="https://github.com/user-attachments/assets/00f0f435-87d6-438a-8a3f-733a23d31905" />


---

## 🔌 Key API Routes

| Route | Method | Description |
|---|---|---|
| `/` | GET | Home / Dashboard |
| `/translator` | GET | Translator page |
| `/translate` | POST | Translate text to target language |
| `/get_languages` | GET | Get all supported languages |
| `/text_to_speech` | POST | Generate audio for translated text |
| `/process_file` | POST | Upload and extract text from .txt/.docx |
| `/game` | GET | Word game page |
| `/login` | GET/POST | User login |
| `/register` | GET/POST | User registration |
| `/dashboard` | GET | User dashboard (auth required) |

---

## 🌍 Supported Languages

LinguaVerse supports **100+ languages** including:

`Afrikaans` `Arabic` `Bengali` `Chinese (Simplified)` `Chinese (Traditional)` `Dutch` `English` `French` `German` `Greek` `Gujarati` `Hindi` `Indonesian` `Italian` `Japanese` `Kannada` `Korean` `Malayalam` `Marathi` `Nepali` `Persian` `Polish` `Portuguese` `Punjabi` `Russian` `Spanish` `Swahili` `Tamil` `Telugu` `Thai` `Turkish` `Ukrainian` `Urdu` `Vietnamese` and more...

---

## 🔮 Future Enhancements

- [ ] Transliteration support (script conversion for pronunciation)
- [ ] Translate more than 3 languages simultaneously
- [ ] Voice-based interactions and speaking challenges
- [ ] Multiplayer game modes
- [ ] Personalized learning paths
- [ ] Mobile app version
- [ ] PDF document translation support
- [ ] More languages in the word game (currently 5)

---

## 👨‍💻 Author

**Guru Kanishka A**  
B.Sc. Computer Science (Data Science & Analytics)  
Subbalakshmi Lakshmipathy College of Science, Madurai  

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/guru-kanishka-a-41bbb133a)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/GuruKanishka-A)
📧 gurukanishka2005@gmail.com

---

## 📄 License

This project was developed as a Mini Project for B.Sc. Computer Science (Data Science & Analytics) with M. Vishnuvarthini as a project partner at Subbalakshmi Lakshmipathy College of Science, Madurai (2024–2025).

---

*"Bridging the gap between translation and active language practice."*
