const Alexa = require('ask-sdk');
const request = require("request");

const WELCOME_MESSAGE = "¡Hola! soy LIA y lo se todo sobre los pokemons, solo dime que necesitas saber!!"
const SKILL_NAME = 'Pokedex';
const HELP_MESSAGE = '<s>Me puedes preguntar información sobre los pokemones, habilidades y linea evolutiva</s>';
const STOP_MESSAGE = '<s>Recuerda que cuando tengas dudas solo preguntamelas, <say-as interpret-as="interjection">SUERTE!!</say-as> </s>';

const typesTraslates = {
    "normal": "normal",
    "fighting": "lucha",
    "flying": "volador",
    "poison": "veneno",
    "ground": "suelo",
    "rock": "rock",
    "bug": "insecto",
    "ghost": "fantasma",
    "steel": "acero",
    "fire": "fuego",
    "water": "agua",
    "grass": "hierba",
    "electric": "eléctrico",
    "psychic": "psíquico",
    "ice": "hielo",
    "dragon": "continuar",
    "dark": "oscuro",
    "fairy": "hada",
    "unknown": "desconocido",
    "shadow": "sombra"
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest'
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak(WELCOME_MESSAGE + " " + HELP_MESSAGE).getResponse();
    }
};

const BuscarPokemonHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'BuscarPokemonIntent';
    },
    async handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const pokemon = slots.pokemon;
        if (pokemon.value) {
          return handlerInput.responseBuilder.speak(await requestPokemon(pokemon.value)).getResponse();
        } 
        else {
            return handlerInput.responseBuilder.speak("Intenta preguntando por un pokemon!!").getResponse();
        }
    }
};

const HelpHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak(HELP_MESSAGE).getResponse();
    }
};

const ExitHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak(STOP_MESSAGE).getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Se ha terminado la sesión por las siguientes causas: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder.speak('<say-as interpret-as="interjection">Ocurrió un error</say-as>').getResponse();
    }
};

const requestPokemon = (namePokemon) => {
    return new Promise((resolve, reject) => {
        request(`http://pokeapi.co/api/v2/pokemon/${namePokemon}`, function(error, response, body) {
            if (body == "Not Found") {
              resolve("pokemon no encontrado !!");
            } else {
                let data = JSON.parse(body);
                let nombre = data["name"];
                let texto = nombre + " es un pokemon de tipo ";
                for (let i = 0; i < data["types"].length; i++) {
                    texto += typesTraslates[data["types"][i]["type"]["name"]] + " "
                }
                resolve(texto);
            }
        });
    });
}

const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder.addRequestHandlers(LaunchRequestHandler, HelpHandler, BuscarPokemonHandler, ExitHandler, SessionEndedRequestHandler).addErrorHandlers(ErrorHandler).lambda();