import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'

const vpc = new aws.ec2.Vpc('vpc-demo-config', {
    cidrBlock: '10.0.0.0/16',
})

const subnetAz1 = new aws.ec2.Subnet('subnet-az1', {
    vpcId: vpc.id,
    cidrBlock: '10.0.1.0/24',
    availabilityZone: 'eu-west-3a',
})

const subnetAz2 = new aws.ec2.Subnet('subnet-az2', {
    vpcId: vpc.id,
    cidrBlock: '10.0.2.0/24',
    availabilityZone: 'eu-west-3b',
})

const subnetGroup = new aws.rds.SubnetGroup('db-subnet-group', {
    name: 'db-subnet-group',
    subnetIds: [subnetAz1.id, subnetAz2.id],
})

// EXAMPLE : https://www.pulumi.com/docs/reference/pkg/aws/rds/instance/
