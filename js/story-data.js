const stories = [
    {
        id: "historia-amor",
        titulo: "❤️ HISTORIA DE AMOR ❤️",
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
    },
{
id: "historia-terror",

titulo: "👻 HISTORIA DE TERROR 👻",

preguntas: [
    {
        id: "momentoNoche",
        texto: "Cómo era la noche",
        placeholder: "fría y silenciosa",
        maxlength: 50
    },

    {
        id: "nombreProtagonista",
        texto: "Nombre del protagonista",
        placeholder: "Mauricio",
        maxlength: 35
    },

    {
        id: "lugarAbandonado",
        texto: "Lugar abandonado al que entra",
        placeholder: "el hospital viejo",
        maxlength: 60
    },

    {
        id: "motivoEntrada",
        texto: "Motivo por el que decide entrar",
        placeholder: "buscar a su perro desaparecido",
        maxlength: 80
    },

    {
        id: "objetoPersonal",
        texto: "Objeto personal que lleva consigo",
        placeholder: "un reloj roto",
        maxlength: 60
    },

    {
        id: "fraseAdvertencia",
        texto: "Advertencia extraña que alguien le dijo antes",
        placeholder: "si escuchas tu nombre, no respondas",
        maxlength: 90
    },

    {
        id: "sonidoExtrano",
        texto: "Sonido extraño que escucha dentro",
        placeholder: "golpes detrás de las paredes",
        maxlength: 80
    },

    {
        id: "formaCaminar",
        texto: "Cómo avanza por el lugar",
        placeholder: "intentando no hacer ruido",
        maxlength: 70
    },

    {
        id: "objetoOscuro",
        texto: "Objeto perturbador que encuentra",
        placeholder: "una silla de ruedas cubierta de tierra",
        maxlength: 80
    },

    {
        id: "descripcionCriatura",
        texto: "Describe a la criatura que aparece",
        placeholder: "alta, inmóvil y con la cara vendada",
        maxlength: 90
    },

    {
        id: "reaccionMiedo",
        texto: "El miedo provoca que él...",
        placeholder: "olvide cómo respirar",
        maxlength: 80
    },

    {
        id: "fraseCriatura",
        texto: "Frase aterradora que dice la criatura",
        placeholder: "por fin regresaste",
        maxlength: 90
    },

    {
        id: "accionEscape",
        texto: "Cómo intenta escapar",
        placeholder: "corriendo hacia una puerta metálica",
        maxlength: 80
    },

    {
        id: "descubrimientoFinal",
        texto: "Algo inquietante que descubre al final",
        placeholder: "su nombre estaba escrito en los expedientes del lugar",
        maxlength: 100
    },

    {
        id: "eventoFinal",
        texto: "Qué ocurre justo antes del final",
        placeholder: "las luces comienzan a apagarse una por una",
        maxlength: 100
    }
],

plantilla: `


En una noche {{momentoNoche}}, {{nombreProtagonista}} decidió entrar a {{lugarAbandonado}} para {{motivoEntrada}}.
Antes de salir de casa, recordó una advertencia que alguien le había repetido varias veces:
"{{fraseAdvertencia}}".
Aunque intentó ignorarla, no pudo evitar sentir incomodidad mientras guardaba {{objetoPersonal}} en su bolsillo.
Al cruzar la entrada del edificio, todo quedó en completo silencio.
Entonces comenzó a escuchar {{sonidoExtrano}} resonando en alguna parte del lugar.
Con el corazón acelerado, avanzó {{formaCaminar}} por los oscuros pasillos.
Mientras exploraba el edificio, encontró {{objetoOscuro}} abandonado en medio del corredor.
Lo extraño era que parecía haber sido colocado allí hacía apenas unos minutos.
De repente, las luces parpadearon.
Y justo al fondo del pasillo apareció una figura {{descripcionCriatura}} observándolo fijamente.
El miedo provocó que {{reaccionMiedo}}.
La criatura comenzó a acercarse lentamente mientras susurraba:
"{{fraseCriatura}}".
Desesperado, {{nombreProtagonista}} intentó escapar {{accionEscape}}.
Sin embargo, al abrir la puerta, descubrió algo imposible.
{{descubrimientoFinal}}.
Confundido, comenzó a revisar los documentos del lugar y encontró fotografías antiguas tomadas décadas atrás.
En varias de ellas aparecía él.
Siempre sosteniendo {{objetoPersonal}}.
Entonces comprendió que la criatura no estaba intentando atraparlo.
Parecía estar esperando que recordara algo.
En ese instante, {{eventoFinal}}.
Y justo antes de quedar completamente a oscuras, {{nombreProtagonista}} vio que la figura tenía exactamente su mismo rostro.
`
},

{
id: "historia-aventura",

titulo: "⚔️ HISTORIA DE AVENTURA ⚔️",

preguntas: [
    {
        id: "nombreExplorador",
        texto: "Nombre del protagonista",
        placeholder: "Tomás",
        maxlength: 35
    },

    {
        id: "tipoDia",
        texto: "Cómo era el día al comenzar el viaje",
        placeholder: "nublado y húmedo",
        maxlength: 50
    },

    {
        id: "lugarInicio",
        texto: "Lugar donde comienza la expedición",
        placeholder: "el viejo puerto de carga",
        maxlength: 60
    },

    {
        id: "acompanante",
        texto: "Nombre del compañero de viaje",
        placeholder: "Ramiro",
        maxlength: 35
    },

    {
        id: "objetoExtrano",
        texto: "Objeto raro que lleva el protagonista",
        placeholder: "una brújula agrietada",
        maxlength: 60
    },

    {
        id: "fraseExtrana",
        texto: "Frase extraña que alguien les advirtió antes de partir",
        placeholder: "no sigan las luces azules",
        maxlength: 90
    },

    {
        id: "lugarPeligroso",
        texto: "Lugar peligroso que deben atravesar",
        placeholder: "el bosque de piedra",
        maxlength: 70
    },

    {
        id: "sonidoMisterioso",
        texto: "Sonido extraño que escuchan durante el viaje",
        placeholder: "campanas sonando bajo tierra",
        maxlength: 80
    },

    {
        id: "descubrimiento",
        texto: "Algo imposible que encuentran",
        placeholder: "una ciudad escondida bajo la montaña",
        maxlength: 90
    },

    {
        id: "reaccionProtagonista",
        texto: "El descubrimiento provoca que él...",
        placeholder: "olvide por completo por qué había viajado",
        maxlength: 90
    },

    {
        id: "mensajeInquietante",
        texto: "Mensaje inquietante que aparece escrito",
        placeholder: "ya habías estado aquí antes",
        maxlength: 90
    },

    {
        id: "accionCompanero",
        texto: "Qué hace inesperadamente el compañero",
        placeholder: "esconde el mapa y empieza a retroceder",
        maxlength: 90
    },

    {
        id: "eventoFinal",
        texto: "Qué ocurre justo antes del final",
        placeholder: "la brújula comienza a señalar al protagonista",
        maxlength: 90
    }
],

plantilla:
`

En un día {{tipoDia}}, {{nombreExplorador}} llegó a {{lugarInicio}} junto a {{acompanante}} para iniciar una expedición que prometía cambiar sus vidas.
Antes de partir, un anciano desconocido se acercó lentamente y les advirtió:
"{{fraseExtrana}}".
Aunque ambos se rieron de aquella advertencia, {{nombreExplorador}} no pudo evitar guardar con fuerza {{objetoExtrano}} dentro de su mochila.
Después de varias horas de viaje, tuvieron que atravesar {{lugarPeligroso}}.
Todo parecía normal hasta que comenzaron a escuchar {{sonidoMisterioso}} a lo lejos.
El sonido aparecía y desaparecía como si algo se moviera alrededor de ellos.
Finalmente, tras cruzar un enorme túnel de roca, encontraron {{descubrimiento}}.
El lugar parecía completamente abandonado... pero había antorchas encendidas y huellas recientes sobre el suelo.
Al observar las paredes, {{nombreExplorador}} descubrió un mensaje grabado en piedra:
"{{mensajeInquietante}}".
El descubrimiento provocó que él {{reaccionProtagonista}}.
Confundido, miró a {{acompanante}}, esperando una explicación.
Sin embargo, inesperadamente, {{accionCompanero}}.
En ese instante, {{nombreExplorador}} comprendió que su compañero sabía mucho más de aquel lugar de lo que había dicho.
Entonces ocurrió algo todavía peor.
{{eventoFinal}}.
Al mirar nuevamente las paredes de la ciudad, {{nombreExplorador}} notó cientos de dibujos antiguos representándolo exactamente a él... sosteniendo {{objetoExtrano}}.
Y en todos los dibujos, el final era siempre el mismo.

`
}



];

window.URIDAVIC_STORIES = stories;
