import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'

// A storage bucket.
const videos = new aws.s3.Bucket('video')

// Trigger a Lambda function when something is added.
const eventSubscription = videos.onObjectCreated('onNewVideo', (event: aws.s3.BucketEvent) => {
    const record = event.Records![0]
    console.log(`*** New Item in Bucket [name: '${record.s3.object.key}', size: ${record.s3.object.size}]`)
})

// Export the bucket & function name.
export const bucketName = videos.bucket
export const functionName = eventSubscription.func.name

export const url = pulumi.interpolate`https://eu-west-3.console.aws.amazon.com/lambda/home?region=eu-west-3#/functions/${functionName}`
export const upload = pulumi.interpolate`aws s3 cp index.ts s3://${bucketName}/index.ts`
