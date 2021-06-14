"""An AWS Python Pulumi program"""

import pulumi
from pulumi_aws import ec2

# CODE 

main_vpc = ec2.Vpc("mainVpc",
    cidr_block="10.0.0.0/16",
    instance_tenancy="default",
    enable_dns_support=True,
    enable_dns_hostnames=True,
    tags={
        "Name": "main",
        "Project": "my-app",
    })


main_subnet = ec2.Subnet("mainSubnet",
    vpc_id=main_vpc.id,
    cidr_block="10.0.1.0/24",
    tags={
        "Name": "Main",
        "Project": "my-app",
    })
