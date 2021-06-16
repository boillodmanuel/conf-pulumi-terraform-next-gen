import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'

// Component resource
// https://www.pulumi.com/docs/intro/concepts/resources/#authoring-a-new-component-resource

// ORIGINAL

// const numberOfAz = 3

// const vpc = new aws.ec2.Vpc('vpc-demo-config', {
//     cidrBlock: '10.0.0.0/16',
// })

// const publicSubnets = []

// for (let i = 1; i <= numberOfAz; i++) {
//     const subnet = new aws.ec2.Subnet(`subnet-public-az${i}`, {
//         vpcId: vpc.id,
//         cidrBlock: `10.0.${i}.0/24`,
//         availabilityZoneId: `euw3-az${i}`,
//     })

//     publicSubnets.push(subnet)
// }

// const privateSubnets = []

// for (let i = 1; i <= numberOfAz; i++) {
//     const subnet = new aws.ec2.Subnet(`subnet-private-az${i}`, {
//         vpcId: vpc.id,
//         cidrBlock: `10.0.${i + 10}.0/24`,
//         availabilityZoneId: `euw3-az${i}`,
//     })

//     privateSubnets.push(subnet)
// }

// SOLUTION

interface MonVpcArgs {
  /** Le nombre d'AZ */
  numberOfAz: number
}

class MonVpc extends pulumi.ComponentResource {
  public readonly vpc: aws.ec2.Vpc 
  public readonly publicSubnets: aws.ec2.Subnet[]
  public readonly privateSubnets: aws.ec2.Subnet[]
  public readonly numberOfAz: number

  public constructor(name: string, args: MonVpcArgs, opts?: pulumi.ComponentResourceOptions) {
    super('company:vpc', name, {}, opts)

    this.numberOfAz = args.numberOfAz

    this.vpc = new aws.ec2.Vpc(`${name}-vpc`, {
        cidrBlock: '10.0.0.0/16',
    }, {
      parent: this,
    })

    this.publicSubnets = []

    for (let i = 1; i <= args.numberOfAz; i++) {
        const subnet = new aws.ec2.Subnet(`${name}-subnet-public-az${i}`, {
            vpcId: this.vpc.id,
            cidrBlock: `10.0.${i}.0/24`,
            availabilityZoneId: `euw3-az${i}`,
        }, {
          parent: this,
        })

        this.publicSubnets.push(subnet)
    }

    this.privateSubnets = []

    for (let i = 1; i <= args.numberOfAz; i++) {
        const subnet = new aws.ec2.Subnet(`${name}-subnet-private-az${i}`, {
            vpcId: this.vpc.id,
            cidrBlock: `10.0.${i + 10}.0/24`,
            availabilityZoneId: `euw3-az${i}`,
        }, {
          parent: this,
        })

        this.privateSubnets.push(subnet)
    }
  }
}

const monVpc = new MonVpc('vpc1', {
  numberOfAz: 3,
})

const monVpc2 = new MonVpc('vpc2', {
  numberOfAz: 2,
})

export const monVpcInfo = {
  numberOfAz: monVpc.numberOfAz,
  publicSubnetsIds: monVpc.publicSubnets.map(s => s.id),
  privateSubnetsIds: monVpc.privateSubnets.map(s => s.id),
}

export const monVpc2Info = {
  numberOfAz: monVpc2.numberOfAz,
  publicSubnetsIds: monVpc2.publicSubnets.map(s => s.id),
  privateSubnetsIds: monVpc2.privateSubnets.map(s => s.id),
}