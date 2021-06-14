import * as aws from "@pulumi/aws"

// CODE 

const mainVpc = new aws.ec2.Vpc("mainVpc", {
  cidrBlock: "10.0.0.0/16",
  instanceTenancy: "default",
  enableDnsSupport: true,
  enableDnsHostnames: true,

  tags: {
      Name: "main",
      Project: "my-app",
  },
})

const mainSubnet = new aws.ec2.Subnet("mainSubnet", {
  vpcId: mainVpc.id,
  cidrBlock: "10.0.1.0/24",

  tags: {
      Name: "Main",
      Project: "my-app",
  },
})
