const Alexa = require('ask-sdk')

const {
    LaunchRequestHandler,
    DeployIntent,
    HelpIntentHandler,
    CancelAndStopIntentHandler
} = require('./handlers')

let skill

exports.handler = async (event, context) => {
    if (!skill) {
        skill = Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                LaunchRequestHandler,
                DeployIntent,
                HelpIntentHandler,
                CancelAndStopIntentHandler
            )
            .create()
    }

    const response = await skill.invoke(event, context)

    return response 
}