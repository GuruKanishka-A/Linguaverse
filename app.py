from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import os
from deep_translator import GoogleTranslator
from gtts import gTTS
import docx
import base64
import tempfile
from functools import wraps

VOICE_LANG_MAPPING = {
    'en': 'en',
    'ja': 'ja',
    'ko': 'ko',
    'zh-cn': 'zh',  # gTTS uses 'zh' for Chinese
    'zh-tw': 'zh',
    'es': 'es',
    'fr': 'fr',
    'de': 'de',
    'it': 'it',
    'ru': 'ru',
    'ar': 'ar',
    'hi': 'hi'
}
SUPPORTED_LANGUAGES = {
    'af': 'Afrikaans', 'sq': 'Albanian', 'am': 'Amharic', 'ar': 'Arabic',
    'hy': 'Armenian', 'az': 'Azerbaijani', 'eu': 'Basque', 'be': 'Belarusian',
    'bn': 'Bengali', 'bs': 'Bosnian', 'bg': 'Bulgarian', 'ca': 'Catalan',
    'ceb': 'Cebuano', 'zh-CN': 'Chinese (Simplified)', 'zh-TW': 'Chinese (Traditional)',
    'co': 'Corsican', 'hr': 'Croatian', 'cs': 'Czech', 'da': 'Danish',
    'nl': 'Dutch', 'en': 'English', 'eo': 'Esperanto', 'et': 'Estonian',
    'fi': 'Finnish', 'fr': 'French', 'fy': 'Frisian', 'gl': 'Galician',
    'ka': 'Georgian', 'de': 'German', 'el': 'Greek', 'gu': 'Gujarati',
    'ht': 'Haitian Creole', 'ha': 'Hausa', 'haw': 'Hawaiian', 'he': 'Hebrew',
    'hi': 'Hindi', 'hmn': 'Hmong', 'hu': 'Hungarian', 'is': 'Icelandic',
    'ig': 'Igbo', 'id': 'Indonesian', 'ga': 'Irish', 'it': 'Italian',
    'ja': 'Japanese', 'jv': 'Javanese', 'kn': 'Kannada', 'kk': 'Kazakh',
    'km': 'Khmer', 'ko': 'Korean', 'ku': 'Kurdish', 'ky': 'Kyrgyz',
    'lo': 'Lao', 'la': 'Latin', 'lv': 'Latvian', 'lt': 'Lithuanian',
    'lb': 'Luxembourgish', 'mk': 'Macedonian', 'mg': 'Malagasy', 'ms': 'Malay',
    'ml': 'Malayalam', 'mt': 'Maltese', 'mi': 'Maori', 'mr': 'Marathi',
    'mn': 'Mongolian', 'my': 'Myanmar (Burmese)', 'ne': 'Nepali', 'no': 'Norwegian',
    'ny': 'Nyanja (Chichewa)', 'or': 'Odia (Oriya)', 'ps': 'Pashto',
    'fa': 'Persian', 'pl': 'Polish', 'pt': 'Portuguese', 'pa': 'Punjabi',
    'ro': 'Romanian', 'ru': 'Russian', 'sm': 'Samoan', 'gd': 'Scots Gaelic',
    'sr': 'Serbian', 'st': 'Sesotho', 'sn': 'Shona', 'sd': 'Sindhi',
    'si': 'Sinhala (Sinhalese)', 'sk': 'Slovak', 'sl': 'Slovenian',
    'so': 'Somali', 'es': 'Spanish', 'su': 'Sundanese', 'sw': 'Swahili',
    'sv': 'Swedish', 'tl': 'Tagalog (Filipino)', 'tg': 'Tajik', 'ta': 'Tamil',
    'tt': 'Tatar', 'te': 'Telugu', 'th': 'Thai', 'tr': 'Turkish',
    'tk': 'Turkmen', 'uk': 'Ukrainian', 'ur': 'Urdu', 'ug': 'Uyghur',
    'uz': 'Uzbek', 'vi': 'Vietnamese', 'cy': 'Welsh', 'xh': 'Xhosa',
    'yi': 'Yiddish', 'yo': 'Yoruba', 'zu': 'Zulu'
}


app = Flask(__name__)

# Home route with menu
@app.route('/')
def index():
    return render_template('index.html')

# Translator route
@app.route('/translator')
def translator_page():
    return render_template('translator.html')

@app.route('/get_languages')
def get_languages():
    return jsonify(SUPPORTED_LANGUAGES)

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get('text')
    source_lang = data.get('source_lang', 'auto')
    target_lang = data.get('target_lang')

    try:
        translator = GoogleTranslator(source=source_lang, target=target_lang)
        result = translator.translate(text)
        return jsonify({'translation': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/text_to_speech', methods=['POST'])
def text_to_speech():
    data = request.get_json()
    text = data.get('text')
    lang = data.get('lang', 'en')

    try:
        tts_lang = VOICE_LANG_MAPPING.get(lang.lower(), 'en')
        temp_file = tempfile.NamedTemporaryFile(suffix='.mp3', delete=False)
        temp_filename = temp_file.name
        temp_file.close()

        try:
            tts = gTTS(text=text, lang=tts_lang, slow=False)
            tts.save(temp_filename)
            with open(temp_filename, 'rb') as audio_file:
                audio_data = base64.b64encode(audio_file.read()).decode('utf-8')
            return jsonify({'audio': audio_data})
        finally:
            if os.path.exists(temp_filename):
                os.unlink(temp_filename)
    except Exception as e:
        return jsonify({'error': f'TTS Generation failed: {str(e)}'}), 500

@app.route('/english-pronunciation', methods=['POST'])
def english_pronunciation():
    data = request.get_json()
    text = data.get('text')

    try:
        tts = gTTS(text=text, lang='en')
        with tempfile.NamedTemporaryFile(suffix='.mp3', delete=False) as temp_file:
            temp_filename = temp_file.name
        tts.save(temp_filename)
        try:
            with open(temp_filename, 'rb') as audio_file:
                audio_data = base64.b64encode(audio_file.read()).decode('utf-8')
        finally:
            os.unlink(temp_filename)
        return jsonify({'audio': audio_data})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/process_file', methods=['POST'])
def process_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        content = ''
        if file.filename.endswith('.txt'):
            content = file.read().decode('utf-8')
        elif file.filename.endswith(('.doc', '.docx')):
            doc = docx.Document(file)
            content = '\n'.join([paragraph.text for paragraph in doc.paragraphs])
        else:
            return jsonify({'error': 'Unsupported file format'}), 400

        return jsonify({'content': content})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Game route
@app.route('/game')
def game_page():
    return render_template('game.html')

# Serve static files
@app.route('/static/<path:filename>')
def static_files(filename):
    return app.send_static_file(filename)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if username in users and users[username] == password:
            session['username'] = username
            return redirect(url_for('dashboard'))
        return render_template('login.html', error='Invalid credentials')
    
    return render_template('login.html')

users = {}

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'username' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if username in users:
            return render_template('register.html', error='Username already exists')
        
        users[username] = password
        session['username'] = username
        return redirect(url_for('dashboard'))
    
    return render_template('register.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')


if __name__ == "__main__":
    app.run(debug=True)
