import * as awsx from '@pulumi/awsx'

/**
 * Pulumi Crosswalk for AWS is a collection of libraries that use automatic well-architected best practices to make common infrastructure-as-code tasks in AWS easier and more secure.
 *
 * https://www.pulumi.com/docs/guides/crosswalk/aws/
 * https://www.pulumi.com/docs/guides/crosswalk/aws/vpc/
 */



// Allocate a new VPC with the default settings:
const vpc = new awsx.ec2.Vpc('vpc-awsx', {
    numberOfAvailabilityZones: 2,
    numberOfNatGateways: 2,
})










// Allocate a new VPC with custom subnets:
// const vpc2 = new awsx.ec2.Vpc('vpc-custom-subnets', {
//     subnets: [
//         { type: 'public' },
//         { type: 'private' },
//         { type: 'isolated', name: 'db' },
//         { type: 'isolated', name: 'redis' },
//     ],
// })
