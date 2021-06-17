import * as aws from '@pulumi/aws'

new aws.iam.User('user-bob', {
    name: 'bob',
})
