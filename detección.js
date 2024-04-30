const imagen = document.querySelector('.imagen img');
const textoTranscrito = document.getElementById('textoTranscrito');
let isAlarmActive = false;
const alarmAudio = new Audio('images/alarma.mp3');
const API_URL = 'https://65ef77c3ead08fa78a507bac.mockapi.io/ExCasaIHC';

window.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const outputDiv = document.getElementById('output');

    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

    recognition.lang = 'es-ES'; // Establece el idioma a español, cambiar según necesidad

    recognition.onstart = () => {
        console.log('El reconocimiento de voz ha comenzado');
    };

    recognition.onresult = async (event) => {
        const speechToText = event.results[0][0].transcript;
        outputDiv.textContent = `Texto reconocido: ${speechToText}`;
        
        // Verifica si el texto reconocido es "2401"
        if (speechToText.includes('2401')) {
            window.location.href = 'index.html'; // Redirecciona a index.html
        }
        if (speechToText.includes('Alexa, enciende la luz de la recámara.')) {
            imagen.src = 'images/PrenderFocoRecamara.png';
          } else 
          if (speechToText.includes('Alexa, enciende la luz de la sala.')) {
            imagen.src = 'images/PrenderFocoSala.png';
          } else 
          if (speechToText.includes('Alexa, enciende las luces del jardín.')) {
            imagen.src = 'images/PrenderFocosJardín.png';
          } else 
          if (speechToText.includes('Alexa, enciende el ventilador.')) {
            imagen.src = 'images/EncenderVentilador.gif';
        } else 
          if (speechToText.includes('Alexa, abre las cortinas.')) {
            // Crear un elemento de imagen
            //var img = new Image();
            
            // Establecer la ruta de la primera imagen
            imagen.src = 'images/AbrirCortinas.gif';
    
            // Agregar el elemento de imagen al cuerpo del documento
            document.body.appendChild(imagen);
    
            // Esperar 2 segundos
            setTimeout(function() {
              // Cambiar la fuente de la imagen después de 2 segundos
              imagen.src = 'images/cortinasAbiertas.png';
            }, 1900);
    
          }else 
          if (speechToText.includes('Alexa enciende la alarma')) {
            if (!isAlarmActive) {
              isAlarmActive = true;
              // Reproducir el audio de la alarma en bucle
              
              alarmAudio.loop = true;
              alarmAudio.play();
            }
          }else 
          if (speechToText.includes('Alexa, enciende las cámaras de vigilancia.')) {
            imagen.src = 'images/PrenderCamaras.png';
          }else
          if (speechToText.includes('Alexa apaga la luz de la recámara.')) {
            imagen.src = 'images/casa.png';
          } else 
          if (speechToText.includes('Alexa apaga la luz de la sala.')) {
            imagen.src = 'images/casa.png';
          } else 
          if (speechToText.includes('Alexa, apaga las luces del jardín.')) {
            imagen.src = 'images/casa.png';
          } else 
          if (speechToText.includes('Alexa, apaga el ventilador.')) {
            imagen.src = 'images/casa.png';
        } else 
          if (speechToText.includes('Alexa cierra las cortinas.')) {
            // Crear un elemento de imagen
            //var img = new Image();
            
            // Establecer la ruta de la primera imagen
            imagen.src = 'images/AbrirCortinas.gif';
    
            // Agregar el elemento de imagen al cuerpo del documento
            document.body.appendChild(imagen);
    
            // Esperar 2 segundos
            setTimeout(function() {
              // Cambiar la fuente de la imagen después de 2 segundos
              imagen.src = 'images/casa.png';
            }, 1900);
    
          }else
          if (speechToText.includes('Alexa apaga la alarma.')) {
            if (isAlarmActive) {
                isAlarmActive = false;
                // Detener la reproducción del audio de la alarma
                alarmAudio.pause();
                alarmAudio.currentTime = 0;
              }
          }else 
          if (speechToText.includes('Alexa apaga las cámaras de vigilancia.')) {
            imagen.src = 'images/casa.png';
          }
        // Aquí agregamos las órdenes que modifican la imagen
        // ...

        // Luego, almacenamos la orden en la base de datos
        try {
          const orderData = {
              orden: speechToText,
              usuario: 'LuzAguilar', 
              fechaHora: new Date()
          };
          const response = await fetch(API_URL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(orderData)
          });
          if (response.ok) {
              console.log('Orden almacenada en la base de datos');
          } else {
              console.error('Error al almacenar la orden en la base de datos:', response.status);
          }
      } catch (error) {
          console.error('Error al realizar la solicitud HTTP POST:', error);
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
