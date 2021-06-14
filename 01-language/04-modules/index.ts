import * as pulumi from "@pulumi/pulumi"
import * as aws from "@pulumi/aws"
import * as fs from 'fs'


// ORIGINAL

const bucket = new aws.s3.Bucket("my-bucket", {
    acl: 'public-read',
})

// Export the name of the bucket
export const bucketName = bucket.id


// SOLUTION

const files = fs.readdirSync('www')
for (const f of files) {
    new aws.s3.BucketObject(f, {
        bucket: bucket,
        key: f,
        source: `www/${f}`,
        acl: 'public-read',
    })
}

export const url = bucket.bucketRegionalDomainName