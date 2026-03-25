document.addEventListener('DOMContentLoaded', function() {
    // Add click handler for transliterate buttons
    document.querySelectorAll('.transliterate-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const targetDiv = e.target.closest('.target-language');
            const translatedText = targetDiv.querySelector('.translated-text').value;
            const sourceLang = document.getElementById('source-language').value;
            transliterateText(translatedText, sourceLang);
        });
    });

    // Add click handler for listen buttons
    document.querySelectorAll('.listen-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const targetDiv = e.target.closest('.target-language');
            const text = targetDiv.querySelector('.translated-text').value;
            const lang = targetDiv.querySelector('.target-lang-select').value;
            playAudio(text, lang);
        });
    });
// Populate language dropdowns
fetch('/get_languages')
    .then(response => response.json())
    .then(languages => {
        const sourceSelect = document.getElementById('source-language');
        const targetSelects = document.querySelectorAll('.target-lang-select');
        
        for (const [code, name] of Object.entries(languages)) {
            // Source language
            const sourceOption = new Option(name, code);
            sourceSelect.add(sourceOption);
            
            // Target languages
            targetSelects.forEach(select => {
                // Add placeholder option if not present
                if (select.querySelector('option[value=""]') === null) {
                    select.add(new Option('Select Language', ''), 0);
                }
                const targetOption = new Option(name, code);
                select.add(targetOption);
            });
        }
    });

// Add two more target language sections (total of 3)
const targetLanguages = document.querySelector('.target-languages');
for (let i = 0; i < 2; i++) {
    const targetSection = targetLanguages.querySelector('.target-language').cloneNode(true);
    // Reset the select element's value for the cloned sections
    targetSection.querySelector('.target-lang-select').value = '';
    targetLanguages.appendChild(targetSection);
}

// Set up event listeners for buttons
const listenButtons = document.querySelectorAll('.listen-btn');
listenButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const translatedText = e.target.closest('.target-language')
            .querySelector('.translated-text').value;
        const targetLang = e.target.closest('.target-language')
            .querySelector('.target-lang-select').value;
        if (translatedText) {
            textToSpeech(translatedText, targetLang);
        }
    });
});

const pronEnButtons = document.querySelectorAll('.pronounce-en-btn');
pronEnButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const translatedText = e.target.closest('.target-language')
            .querySelector('.translated-text').value;
        if (translatedText) {
            englishPronunciation(translatedText);
        }
    });
});

const copyButtons = document.querySelectorAll('.copy-btn');
copyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const textArea = e.target.closest('.target-language')
            .querySelector('.translated-text');
        textArea.select();
        document.execCommand('copy');
    });
});

// Ensure at least one target language is selected
const validateTargetLanguages = () => {
    const targetSelects = document.querySelectorAll('.target-lang-select');
    let selectedCount = 0;
    targetSelects.forEach(select => {
        if (select.value) selectedCount++;
    });
    return selectedCount > 0 && selectedCount <= 3;
};

// File upload handling
document.getElementById('file-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Check file extension
    const allowedExtensions = ['.txt', '.doc', '.docx'];
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
        alert('Please upload a .txt, .doc, or .docx file');
        this.value = ''; // Clear the file input
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/process_file', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('input-text').value = data.content;
            if (validateTargetLanguages()) {
                translateText();
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error processing file');
    });
});

// Translation handling
let translateTimeout;
document.getElementById('input-text').addEventListener('input', function() {
    clearTimeout(translateTimeout);
    translateTimeout = setTimeout(translateText, 500);
});

// Add translate button click handlers
const translateButtons = document.querySelectorAll('.translate-btn');
translateButtons.forEach(button => {
    button.addEventListener('click', () => translateText());
});

function translateText() {
    var text = document.getElementById('input-text').value;
    if (!text) return;
    
    const sourceLang = document.getElementById('source-language').value;
    const targetSelects = document.querySelectorAll('.target-lang-select');
    const translatedTexts = document.querySelectorAll('.translated-text');

    targetSelects.forEach((select, index) => {
        const targetLang = select.value;
        if (!targetLang) return;

        fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                source_lang: sourceLang || 'auto',
                target_lang: targetLang
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.translation) {
                translatedTexts[index].value = data.translation;
            }else{
                translatedTexts[index].value = data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            translatedTexts[index].value = 'Translation failed';
        });
    });
}

function transliterateText(text, sourceLang = 'auto') {
    if (!text) return;

    fetch('/transliterate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text,
            source_lang: sourceLang
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.transliteration) {
            // Find the closest translated-text textarea to the clicked button
            const button = event.target;
            const controlsDiv = button.closest('.controls');
            const targetDiv = controlsDiv.closest('.target-language');
            const translatedText = targetDiv.querySelector('.translated-text');
            translatedText.value = data.transliteration;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function playAudio(text, lang) {
    if (!text) return;

    fetch('/text-to-speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text,
            lang: lang
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            const audio = new Audio('data:audio/mp3;base64,' + data.audio);
            audio.play();
        }
    })

}

function englishPronunciation(text) {
    if (!text) return;

    fetch('/english-pronunciation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            const audio = new Audio('data:audio/mp3;base64,' + data.audio);
            audio.play();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('English pronunciation error');
    });
}

// Text-to-speech handling
document.querySelectorAll('.listen-btn').forEach((button, index) => {
    button.addEventListener('click', function() {
        const text = document.querySelectorAll('.translated-text')[index].value;
        const lang = document.querySelectorAll('.target-lang-select')[index].value;

        if (!text || !lang) return;

        fetch('/text_to_speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                lang: lang
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.audio) {
                const audio = new Audio('data:audio/mp3;base64,' + data.audio);
                audio.play();
            }
            else{
                alert(data.error);
            }
        })
    });
});

// Copy text handling
document.querySelectorAll('.copy-btn').forEach((button, index) => {
    button.addEventListener('click', function() {
        const text = document.querySelectorAll('.translated-text')[index].value;
        navigator.clipboard.writeText(text)
            .then(() => alert('Text copied to clipboard!'))
            .catch(err => alert('Failed to copy text'));
    });
});

// Transliteration handling
document.querySelectorAll('.transliterate-btn').forEach((button, index) => {
    button.addEventListener('click', function() {
        const text = document.querySelectorAll('.translated-text')[index].value;
        if (!text) {
            alert('Please enter some text to transliterate');
            return;
        }
        
        fetch('/transliterate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                document.querySelectorAll('.translated-text')[index].value = data.transliteration;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Transliteration error');
        });
    });
});
});