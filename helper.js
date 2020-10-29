const request = require('request-promise')

const jenkinsUser = process.env.JENKINS_USER
const jenkinsUserApiToken = process.env.JENKINS_USER_API_TOKEN
const jenkinsBaseUrl = process.env.JENKINS_BASE_URL
const jenkinsJobToken = process.env.JENKINS_JOB_TOKEN

exports.buildFullUrl = (jobName, environment) => {
    return `http://${jenkinsUser}:${jenkinsUserApiToken}@${jenkinsBaseUrl}/job/${jobName}/buildWithParameters?token=${jenkinsJobToken}&ENVIRONMENT=${environment}`
}

exports.triggerJenkins = async (fullUrl) => {
    const options = {
        uri: fullUrl,
        resolveWithFullResponse: true
    }

    try {
        const response = await request(options)
        return response.statusCode
    } catch (error) {
        return error
    }
}
