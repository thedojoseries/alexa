const Alexa = require('ask-sdk')

const {
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    DeployIntentHandler
} = require('./handlers')

let skill;

exports.handler = async (event, context) => {
    console.log(`Request: ${JSON.stringify(event)}`)

    if (!skill) {
        skill = Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                LaunchRequestHandler,
                HelpIntentHandler,
                CancelAndStopIntentHandler,
                DeployIntentHandler
            )
            .create()
    }

    const response = await skill.invoke(event, context)
    console.log(`Response: ${JSON.stringify(response)}`)

    return response
}
