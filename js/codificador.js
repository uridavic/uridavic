/**
 * codificador.js
 * Lógica interactiva para la aplicación retro "Codificador Genkidan".
 * Recrea el comportamiento de Visual Basic 2012 con estética y audio retro.
 */

document.addEventListener('DOMContentLoaded', () => {
    // === 1. MAPA DE SUSTITUCIÓN (DICCIONARIO DE CODIFICACIÓN) ===
    const charToCode = {
        'A': '01', 'B': '02', 'C': '03', 'D': '04', 'E': '05', 'F': '06', 
        'G': '07', 'H': '08', 'I': '09', 'J': '10', 'K': '11', 'L': '12', 
        'M': '13', 'N': '14', 'Ñ': '15', 'O': '16', 'P': '17', 'Q': '18', 
        'R': '19', 'S': '20', 'T': '21', 'U': '22', 'V': '23', 'W': '24', 
        'X': '25', 'Y': '26', 'Z': '27',
        '.': '28', ',': '29', "'": '30', '¡': '31', '!': '32', '¿': '33', 
        '?': '34', ':': '35', ';': '36'
    };

    // Crear el mapa inverso para decodificación rápida
    const codeToChar = {};
    for (const [char, code] of Object.entries(charToCode)) {
        codeToChar[code] = char;
    }

    // === 2. DYNAMICALLY GENERATE SUBSTITUTION TABLE IN HELP MODAL ===
    const tableBody = document.getElementById('xp-table-body');
    if (tableBody) {
        const entries = Object.entries(charToCode);
        let html = '';
        // Mostraremos en filas de 3 pares para optimizar espacio
        for (let i = 0; i < entries.length; i += 3) {
            html += '<tr>';
            for (let j = 0; j < 3; j++) {
                if (i + j < entries.length) {
                    const [char, code] = entries[i + j];
                    html += `<td style="font-weight: bold; color: #b00000;">${char}</td>`;
                    html += `<td style="background-color: #fafaf5;">${code}</td>`;
                } else {
                    html += '<td></td><td></td>';
                }
            }
            html += '</tr>';
        }
        tableBody.innerHTML = html;
    }

    // === 3. SINTETIZADOR DE AUDIO RETRO (Web Audio API) ===
    let audioCtx = null;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playRetroSound(type) {
        try {
            initAudio();
            if (!audioCtx) return;

            // Reabrir contexto si está suspendido (políticas del navegador)
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            const now = audioCtx.currentTime;

            if (type === 'click') {
                // Click clásico y seco de botón mecánico
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(900, now);
                osc.frequency.exponentialRampToValueAtTime(100, now + 0.03);
                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                osc.start(now);
                osc.stop(now + 0.03);
            } 
            else if (type === 'error') {
                // Pitido de alerta/error de Windows clásico (Chord o Exclamation)
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(80, now + 0.25);
                gain.gain.setValueAtTime(0.18, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                osc.start(now);
                osc.stop(now + 0.25);
            } 
            else if (type === 'success') {
                // Notificación alegre de éxito o copia
                osc.type = 'sine';
                // Primer tono
                osc.frequency.setValueAtTime(880, now);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.setValueAtTime(0.1, now + 0.06);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                
                // Segundo tono (creamos otro oscilador para el arpegio rápido)
                const osc2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(1320, now + 0.08);
                gain2.gain.setValueAtTime(0.0, now);
                gain2.gain.setValueAtTime(0.1, now + 0.08);
                gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                
                osc2.connect(gain2);
                gain2.connect(audioCtx.destination);
                
                osc.start(now);
                osc.stop(now + 0.08);
                osc2.start(now + 0.08);
                osc2.stop(now + 0.2);
            } 
            else if (type === 'minimize') {
                // Deslizamiento descendente
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
            } 
            else if (type === 'restore') {
                // Deslizamiento ascendente
                osc.type = 'sine';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.exponentialRampToValueAtTime(700, now + 0.2);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
            }
        } catch (e) {
            console.warn("La Web Audio API no está soportada o fue bloqueada:", e);
        }
    }

    // === 4. ELEMENTOS DE LA INTERFAZ (DOM) ===
    const textarea = document.getElementById('xp-textarea');
    const charCountLabel = document.getElementById('status-char-count');
    const alertPanel = document.getElementById('xp-alert');
    const alertMsg = document.getElementById('xp-alert-msg');
    
    // Botones principales
    const btnEncode = document.getElementById('btn-encode');
    const btnDecode = document.getElementById('btn-decode');
    
    // Botones de utilidad
    const btnCopy = document.getElementById('btn-copy');
    const btnClear = document.getElementById('btn-clear');
    const btnHelp = document.getElementById('btn-help');
    const btnExit = document.getElementById('btn-exit');
    
    // Control de ventanas (minimizar/cerrar/reabrir)
    const appWrapper = document.getElementById('genkidan-app');
    const closedWrapper = document.getElementById('xp-closed-state');
    const btnWinMinimize = document.getElementById('btn-win-minimize');
    const btnWinClose = document.getElementById('btn-win-close');
    const btnReopen = document.getElementById('btn-reopen');

    // Modal de Ayuda
    const helpModal = document.getElementById('xp-help-modal');
    const btnHelpClose = document.getElementById('btn-help-close');
    const btnHelpMenuClose = document.getElementById('btn-help-menu-close');
    const helpMenuBtns = document.querySelectorAll('.xp-help-menu-btn');
    const tabContents = document.querySelectorAll('.xp-tab-content');

    // === 5. FUNCIONES AUXILIARES DE UI ===
    
    // Actualizar dinámicamente contador de caracteres
    function updateCharCount() {
        if (textarea) {
            const count = textarea.value.length;
            charCountLabel.textContent = `Caracteres: ${count}`;
        }
    }

    if (textarea) {
        textarea.addEventListener('input', updateCharCount);
        updateCharCount(); // Inicializar
    }

    // Mostrar alerta elegante
    function showAlert(message) {
        if (alertPanel && alertMsg) {
            alertMsg.textContent = message;
            alertPanel.classList.remove('hidden');
            playRetroSound('error');
        }
    }

    // Ocultar alerta
    function hideAlert() {
        if (alertPanel) {
            alertPanel.classList.add('hidden');
        }
    }

    // === 6. ALGORITMOS DE CODIFICACIÓN Y DECODIFICACIÓN ===

    // Limpiar acentos y pasar a mayúsculas
    function cleanAccentsAndUppercase(str) {
        return str
            .replace(/[áäàâ]/gi, 'a')
            .replace(/[éëèê]/gi, 'e')
            .replace(/[íïìî]/gi, 'i')
            .replace(/[óöòô]/gi, 'o')
            .replace(/[úüùû]/gi, 'u')
            .toUpperCase();
    }

    // CODIFICAR: Texto -> Números (Separados por guiones y conservando espacios)
    function encodeText(text) {
        hideAlert();
        if (!text) {
            showAlert("Error: El área de texto está vacía.");
            return;
        }

        const cleanedText = cleanAccentsAndUppercase(text);
        let result = '';
        let inWord = false;
        const invalidChars = new Set();

        for (let i = 0; i < cleanedText.length; i++) {
            const char = cleanedText[i];

            if (char === ' ' || char === '\n' || char === '\r') {
                inWord = false;
                result += char;
            } else {
                let code = '';
                if (charToCode[char]) {
                    code = charToCode[char];
                } else {
                    invalidChars.add(cleanedText[i]);
                    code = '??';
                }

                if (inWord) {
                    result += '-' + code;
                } else {
                    result += code;
                    inWord = true;
                }
            }
        }

        // Reemplazar contenido con el resultado codificado
        textarea.value = result;
        updateCharCount();

        if (invalidChars.size > 0) {
            const charList = Array.from(invalidChars).join(', ');
            showAlert(`Se marcaron caracteres inválidos como '??' (${charList}). Solo se permiten letras A-Z, Ñ y signos: . , ' ¡ ! ¿ ? : ;`);
        } else {
            playRetroSound('success');
        }
    }

    // DECODIFICAR: Números -> Texto
    function decodeText(text) {
        hideAlert();
        if (!text) {
            showAlert("Error: El área de texto está vacía.");
            return;
        }

        // Comprobamos si tiene letras comunes (para alertar si intentan decodificar texto normal)
        if (/[a-zA-ZñÑ]/g.test(text.replace(/\?\?/g, ''))) {
            showAlert("Error: El texto contiene letras. ¿Estás intentando CODIFICAR en lugar de decodificar?");
            return;
        }

        // Dividir el texto conservando los bloques de espacios y saltos de línea
        const tokens = text.split(/(\s+)/);
        let result = '';
        const invalidCodes = new Set();

        for (const token of tokens) {
            if (/^\s+$/.test(token)) {
                // Es un bloque de espacios o saltos de línea
                result += token;
            } else if (token !== '') {
                // Es una palabra codificada (ej: "02-22-05-14")
                const letterCodes = token.split('-');
                let word = '';

                for (const code of letterCodes) {
                    if (code === '') continue;
                    
                    if (codeToChar[code]) {
                        word += codeToChar[code];
                    } else {
                        invalidCodes.add(code);
                        word += '?';
                    }
                }
                result += word;
            }
        }

        textarea.value = result;
        updateCharCount();

        if (invalidCodes.size > 0) {
            const codeList = Array.from(invalidCodes).join(', ');
            showAlert(`Códigos desconocidos detectados (${codeList}). Fueron reemplazados por '?'.`);
        } else {
            playRetroSound('success');
        }
    }

    // === 7. EVENTOS DE BOTONES PRINCIPALES ===

    if (btnEncode) {
        btnEncode.addEventListener('click', () => {
            playRetroSound('click');
            encodeText(textarea.value);
        });
    }

    if (btnDecode) {
        btnDecode.addEventListener('click', () => {
            playRetroSound('click');
            decodeText(textarea.value);
        });
    }

    // Copiar Texto
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            playRetroSound('click');
            if (!textarea.value.trim()) {
                showAlert("Error: Nada que copiar.");
                return;
            }
            navigator.clipboard.writeText(textarea.value)
                .then(() => {
                    playRetroSound('success');
                    // Cambiar temporalmente el texto del botón para feedback visual premium
                    const originalText = btnCopy.innerHTML;
                    btnCopy.innerHTML = '✅ ¡Copiado!';
                    btnCopy.classList.add('pressed');
                    setTimeout(() => {
                        btnCopy.innerHTML = originalText;
                        btnCopy.classList.remove('pressed');
                    }, 1500);
                })
                .catch(err => {
                    console.error("Fallo al copiar con Clipboard API, usando fallback:", err);
                    // Fallback clásico con select y copy
                    textarea.select();
                    try {
                        document.execCommand('copy');
                        playRetroSound('success');
                    } catch (e) {
                        showAlert("Error: No se pudo copiar al portapapeles de forma automática.");
                    }
                });
        });
    }

    // Borrar todo
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            playRetroSound('click');
            textarea.value = '';
            hideAlert();
            updateCharCount();
            textarea.focus();
        });
    }

    // === 8. LÓGICA DE MODAL DE AYUDA ===
    
    function openHelp() {
        playRetroSound('click');
        if (helpModal) {
            helpModal.classList.remove('hidden');
        }
    }

    function closeHelp() {
        playRetroSound('click');
        if (helpModal) {
            helpModal.classList.add('hidden');
        }
    }

    if (btnHelp) btnHelp.addEventListener('click', openHelp);
    if (btnHelpClose) btnHelpClose.addEventListener('click', closeHelp);
    if (btnHelpMenuClose) btnHelpMenuClose.addEventListener('click', closeHelp);

    // Navegación por pestañas (Tabs) en el modal
    helpMenuBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Evitar procesar el botón de cerrar del menú
            if (btn.classList.contains('xp-help-menu-close')) return;

            playRetroSound('click');
            const targetTab = btn.getAttribute('data-tab');

            // Quitar active de botones
            helpMenuBtns.forEach(b => b.classList.remove('active'));
            // Agregar active al seleccionado
            btn.classList.add('active');

            // Quitar active de contenidos
            tabContents.forEach(content => content.classList.remove('active'));
            // Mostrar contenido seleccionado
            const activeTabContent = document.getElementById(`tab-${targetTab}`);
            if (activeTabContent) {
                activeTabContent.classList.add('active');
            }
        });
    });

    // Cerrar modal al hacer click fuera del contenedor de la ventana
    if (helpModal) {
        helpModal.addEventListener('click', (e) => {
            if (e.target === helpModal) {
                closeHelp();
            }
        });
    }

    // === 9. CONTROLES DE VENTANA (MINIMIZAR, CERRAR, REABRIR) ===

    function closeApp() {
        playRetroSound('minimize');
        if (appWrapper) appWrapper.classList.add('hidden');
        if (closedWrapper) closedWrapper.classList.remove('hidden');
    }

    function reopenApp() {
        playRetroSound('restore');
        if (appWrapper) appWrapper.classList.remove('hidden');
        if (closedWrapper) closedWrapper.classList.add('hidden');
        if (textarea) textarea.focus();
    }

    if (btnExit) btnExit.addEventListener('click', closeApp);
    if (btnWinClose) btnWinClose.addEventListener('click', closeApp);
    if (btnWinMinimize) btnWinMinimize.addEventListener('click', closeApp);
    if (btnReopen) btnReopen.addEventListener('click', reopenApp);
});
