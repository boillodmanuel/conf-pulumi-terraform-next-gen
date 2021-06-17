import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'

const bucket = new aws.s3.Bucket('my-bucket', {
    acl: 'public-read',
})

// Export the name of the bucket
export const bucketName = bucket.id
