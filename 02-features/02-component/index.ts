import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'

// Component resource
// https://www.pulumi.com/docs/intro/concepts/resources/#authoring-a-new-component-resource

const numberOfAz = 3

const vpc = new aws.ec2.Vpc('vpc-demo-config', {
    cidrBlock: '10.0.0.0/16',
})

const publicSubnets = []

for (let i = 1; i <= numberOfAz; i++) {
    const subnet = new aws.ec2.Subnet(`subnet-public-az${i}`, {
        vpcId: vpc.id,
        cidrBlock: `10.0.${i}.0/24`,
        availabilityZoneId: `euw3-az${i}`,
    })

    publicSubnets.push(subnet)
}

const privateSubnets = []

for (let i = 1; i <= numberOfAz; i++) {
    const subnet = new aws.ec2.Subnet(`subnet-private-az${i}`, {
        vpcId: vpc.id,
        cidrBlock: `10.0.${i + 10}.0/24`,
        availabilityZoneId: `euw3-az${i}`,
    })

    privateSubnets.push(subnet)
}
