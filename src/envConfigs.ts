export function getEnvVars(): { awsContainerCredRelativeUri?: string, awsContainerCredFullUri?: string, ec2Home?: string } {
    return {
        awsContainerCredRelativeUri: process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI,
        awsContainerCredFullUri: process.env.AWS_CONTAINER_CREDENTIALS_FULL_URI,
        ec2Home: process.env.EC2_HOME
    }
}
