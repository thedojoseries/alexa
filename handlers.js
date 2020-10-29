const {
    buildFullUrl,
    triggerJenkins
} = require('./helper')

exports.LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
    },
    handle(handlerInput) {
        const speechText = 'Welcome to Deployment Manager - The coolest deployer out there.'

        return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse()
    }
}

exports.DeployIntent = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
               handlerInput.requestEnvelope.request.intent.name === 'DeployIntent'
    },
    handle(handlerInput) {
        const deployEnv = handlerInput.requestEnvelope.request.intent.slots.environment.value
        const fullUrl = buildFullUrl('deploy', deployEnv)
        let speechText

        const response = triggerJenkins(fullUrl)

        if (response === 201) {
            speechText = `I was able to successfully trigger Jenkins to deploy the website to ${deployEnv}. I hope the build succeeds. It would be very funny if it failed. Haha.`
        } else {
            speechText = 'Unfortunately there was an error when triggering Jenkins. Go to the Jenkins console to check out what happened'
        }

        return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse()
    }
}

exports.HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
               handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
    },
    handle(handlerInput) {
        const speechText = 'You can ask me to deploy the website to staging or production'

        return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse()
    }
}

exports.CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
               (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
               handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
    },
    handle(handlerInput) {
        const speechText = 'It was great serving you. Goodbye!'

        return handlerInput.responseBuilder
          .speak(speechText)
          .withShouldEndSession(true)
          .getResponse()
    }
}