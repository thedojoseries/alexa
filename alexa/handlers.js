const request = require('request-promise')
const util = require('util');
const { handler } = require('.');
const { buildBaseUrl } = require('./helper')

exports.LaunchRequestHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
	},
	handle(handlerInput) {
		const speechText = 'Welcome to Deployment Manager - the coolest deployer out there.'

		return handlerInput.responseBuilder
		  .speak(speechText)
		  .getResponse();
	}
}

exports.DeployIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'DeployIntent';
    },
    async handle(handlerInput) {
        const deployEnv = handlerInput.requestEnvelope.request.intent.slots.environment.value
        const fullUrl = buildBaseUrl('deploy', deployEnv)
        let speechText

        const response = await triggerJenkins(fullUrl)
        console.log(response)

        if (response === 201) {
            speechText = `I was able to successfully trigger Jenkins to deploy the landing page to ${deployEnv}. I hope the build succeeds. It would very funny if it failed. haha.`
        } else {
            speechText = 'Unfortunately I was not able to trigger Jenkins. Go to the Jenkins console and check the error.'
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse()
    }
}

exports.HelpIntentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
		&& handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
	},
	handle(handlerInput) {
		const speechText = 'You can ask me to deploy the landing page to staging or production';

		return handlerInput.responseBuilder
		.speak(speechText)
		.getResponse();
	}
};

exports.CancelAndStopIntentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
		&& (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
			|| handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
	},
	handle(handlerInput) {
		const speechText = 'It was great serving you. Goodbye!';

		return handlerInput.responseBuilder
		.speak(speechText)
		.withShouldEndSession(true)
		.getResponse();
	}
};

async function triggerJenkins(uri) {
    const options = {
        uri: uri,
        resolveWithFullResponse: true
    }

    try {
        const response = await request(options)
        
        return response.statusCode
    } catch (error) {
        return error
    }
}