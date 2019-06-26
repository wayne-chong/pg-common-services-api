export function getEnvVars(): { awsContainerCredRelativeUri?: string, awsContainerCredFullUri?: string, } {
    return {
        awsContainerCredRelativeUri: process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI,
        awsContainerCredFullUri: process.env.AWS_CONTAINER_CREDENTIALS_FULL_URI,
    }
}
