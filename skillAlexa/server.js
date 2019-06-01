const Alexa = require('ask-sdk');
const request = require("request");

const WELCOME_MESSAGE = "¡Hola! soy Ada la asistente virtual de tu educacion, solo dime que necesitas saber!!"
const SKILL_NAME = 'Ada Teacher';
const HELP_MESSAGE = '<s>Me puedes preguntar información casi cualquier cosa,como mostrarte el sistema solar</s>';
const STOP_MESSAGE = '<s>Recuerda que cuando tengas dudas solo preguntamelas, <say-as interpret-as="interjection">SUERTE!!</say-as> </s>';


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest'
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak(WELCOME_MESSAGE + " " + HELP_MESSAGE).getResponse();
    }
};

const ActivarSistemaSolar = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'ActivarSistemaSolar';
    },
    async handle(handlerInput) {
        return handlerInput.responseBuilder.speak("Ingresa a la aplicacion de Realidad Aumentada y enfocame !! Y preguntame soble cualquier planeta !!").getResponse();
    }
};

const Sol = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'Sol';
    },
    async handle(handlerInput) {
        return handlerInput.responseBuilder.speak(`Eso es el Sol. El Sol es una estrella. Es una enorme esfera de gas caliente que está brillando y girando. Aparece mucho más grande y más brillante que las otras estrellas porque nosotros estamos muy cerca de él. El Sol es el centro de nuestro sistema solar. Todos los planetas en nuestro sistema solar, incluyendo la Tierra, giran alrededor del Sol.`).getResponse();
    }
};

const ActivarAnimal = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'ActivarAnimal';
    },
    async handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const animal = slots.animal;
        if (animal.value) {
            if(animal.value == "perro"){

                request({
                    "url":"https://331bd71b.ngrok.io/alexa",
                    "method":"POST",
                    "json":{
                        id:2
                    }
                },(req,res,body)=>{
                    console.log(body)
                })
                return handlerInput.responseBuilder.speak(`El perro (Canis lupus familiaris),1​2​3​ llamado perro doméstico o can,4​ y coloquialmente chucho5​ o tuso,6​ y también choco;7​ es un mamífero carnívoro de la familia de los cánidos, que constituye una subespecie del lobo (Canis lupus). En 2001, se estimaba que había cuatrocientos millones de perros en el mundo.8​ Su tamaño o talla, su forma y pelaje es muy diverso según la raza. Posee un oído y olfato muy desarrollados, siendo este último su principal órgano sensorial. Su longevidad media es de unos trece a quince años, aunque las razas pequeñas pueden alcanzar hasta veinte años o más, mientras que las razas gigantes solo viven nueve o diez años.`).getResponse();
            }
            else if(animal.value == "venado"){
                request({
                    "url":"https://331bd71b.ngrok.io/alexa",
                    "method":"POST",
                    "json":{
                        id:4
                    }
                },(req,res,body)=>{
                    console.log(body)
                })
                return handlerInput.responseBuilder.speak(`Los cérvidos (Cervidae) son una familia de mamíferos rumiantes que incluye los ciervos o venados. Su tamaño es variable, siendo el alce el mayor (hasta 450 kg), y el venadito o pudú sudamericano, el menor, con unos 8 o 10 kg.`).getResponse();
            }
            else if (animal.value == "drone"){
                request({
                    "url":"https://331bd71b.ngrok.io/alexa",
                    "method":"POST",
                    "json":{
                        id:1
                    }
                },(req,res,body)=>{
                    console.log(body)
                })
                return handlerInput.responseBuilder.speak(`Un vehículo aéreo no tripulado (VANT), UAV (del inglés unmanned aerial vehicle) o comúnmente dron1​nota 1​ , también se denomina RPA (del inglés Remotely Piloted Aircraft)2​ es una aeronave que vuela sin tripulación. Un VANT es un vehículo sin tripulación reutilizable, capaz de mantener de manera autónoma un nivel de vuelo controlado y sostenido, y propulsado por un motor de explosión, eléctrico o de reacción.`).getResponse();
            }
            else{
                return handlerInput.responseBuilder.speak(animal.value + " no encontrado en la base de datos").getResponse();
            }

        } 
        else {
            return handlerInput.responseBuilder.speak("Intenta preguntando por un animal o cosa!!").getResponse();
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


const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder.addRequestHandlers(LaunchRequestHandler, HelpHandler, ActivarSistemaSolar,ActivarAnimal,Sol, ExitHandler, SessionEndedRequestHandler).addErrorHandlers(ErrorHandler).lambda();