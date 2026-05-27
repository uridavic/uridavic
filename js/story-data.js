const stories = [
    {
        id: "historia-amor",
        titulo: "HISTORIA DE AMOR",
        preguntas: [
            {
                id: "momentoDia",
                texto: "Descripción del día",
                placeholder: "caluroso/lluvioso/soleado/etc",
                maxlength: 45
            },
            {
                id: "lugarInicial",
                texto: "Un lugar donde inicia todo",
                placeholder: "el pasillo de la escuela",
                maxlength: 60
            },
            {
                id: "nombreUsuario",
                texto: "Nombre del protagonista",
                placeholder: "Luis",
                maxlength: 35
            },
            {
                id: "adjetivoCriatura",
                texto: "Adjetivo para describir a la persona que te gusta",
                placeholder: "hermosa",
                maxlength: 35
            },
            {
                id: "nombreElla",
                texto: "Nombre de ella",
                placeholder: "Anacleta",
                maxlength: 35
            },
            {
                id: "reaccion",
                texto: "Ella provoca que él...",
                placeholder: "olvide como respirar",
                maxlength: 70
            },
            {
                id: "formaDeAcercarse",
                texto: "Cómo se acerca él",
                placeholder: "con pasos nerviosos",
                maxlength: 70
            },
            {
                id: "adjetivoCuerpo",
                texto: "Adjetivo para el cuerpo",
                placeholder: "perfecto",
                maxlength: 35
            },
            {
                id: "adjetivoUsuario",
                texto: "Cómo piensa ella que eres",
                placeholder: "increiblemente guapo",
                maxlength: 55
            },
            {
                id: "lugarCita",
                texto: "Actividad a la que invita",
                placeholder: "comer helado",
                maxlength: 55
            },
            {
                id: "respuesta",
                texto: "Respuesta a la invitaión",
                placeholder: "claro que sí",
                maxlength: 80
            },
            {
                id: "lugarLlegada",
                texto: "Lugar al que llegan",
                placeholder: "la plaza del centro",
                maxlength: 60
            },
            {
                id: "tipoBeso",
                texto: "¿Qué te gustaría que te diera ella?",
                placeholder: "un beso dramatico",
                maxlength: 50
            },
            {
                id: "actividad",
                texto: "Qué están haciendo",
                placeholder: "tomados de la mano",
                maxlength: 70
            },
            {
                id: "interrupcion",
                texto: "Algo que interrumpe",
                placeholder: "suena una alarma insoportable",
                maxlength: 80
            }
        ],
        plantilla: "Un día {{momentoDia}}, en {{lugarInicial}}, {{nombreUsuario}} ve a la más {{adjetivoCriatura}} criatura que haya visto jamás. Su nombre es {{nombreElla}}, y cada movimiento que ella hace, provoca que él {{reaccion}}. Él se acerca a ella {{formaDeAcercarse}} y le dice: \"Wow, ese tiene que ser el cuerpo más {{adjetivoCuerpo}} que jamás he visto.\" De repente, ella lo mira y empieza a caminar en dirección hacia él. Al llegar, ella le dice: \"Noté que estabas justo enfrente de mí. Tenía que decirte que pienso que eres {{adjetivoUsuario}}, y me preguntaba si te gustaría ir a {{lugarCita}}.\" Con una cara de tonto, él responde: \"{{respuesta}}\". Cuando finalmente llegan a {{lugarLlegada}}, ella se acerca a él y le da {{tipoBeso}}. Ellos están {{actividad}}, cuando {{interrupcion}}. Entonces él abre los ojos y se da cuenta de que todo ha sido sólo un sueño."
    }
];

window.URIDAVIC_STORIES = stories;
