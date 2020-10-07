const jenkinsBaseUrl = process.env.JENKINS_BASE_URL
const jenkinsJobToken = process.env.JENKINS_JOB_TOKEN
const jenkinsUser = process.env.JENKINS_USER
const jenkinsUserApiToken = process.env.JENKINS_USER_API_TOKEN

exports.buildBaseUrl = (jobName, environment) => {
    return `http://${jenkinsUser}:${jenkinsUserApiToken}@${jenkinsBaseUrl}/job/${jobName}/buildWithParameters?token=${jenkinsJobToken}&ENVIRONMENT=${environment}`
}
