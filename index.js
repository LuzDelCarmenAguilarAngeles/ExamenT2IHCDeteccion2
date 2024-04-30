window.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const outputDiv = document.getElementById('output');

    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

    recognition.lang = 'es-ES'; // Establece el idioma a español, cambiar según necesidad

    recognition.onstart = () => {
        console.log('El reconocimiento de voz ha comenzado');
    };

    recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        outputDiv.textContent = `Texto reconocido: ${speechToText}`;
        
        // Verifica si el texto reconocido es "2401"
        if (speechToText.includes('2401')) {
            window.location.href = 'detección.html'; // Redirecciona a index.html
        }else
        if (speechToText.includes('2102')) {
            window.location.href = 'detección2.html'; // Redirecciona a index.html
        }else
        {
            alert("Lo siento, la contraseña es incorrecta");
        }
    };

    recognition.onerror = (event) => {
        console.error('Se ha producido un error en el reconocimiento de voz: ', event.error);
    };

    startBtn.addEventListener('click', () => {
        recognition.start();
        outputDiv.textContent = 'Escuchando...';
    });
});
