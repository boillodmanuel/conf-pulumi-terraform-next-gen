import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";


// ORIGINAL

new aws.iam.User('user-bob', {
    name: 'bob',
})


// SOLUTION

const isProd = pulumi.getStack() === 'prod'

if (isProd) {

  new aws.iam.User('user-bob', {
      name: 'bob',
  })

}

// puriste dirons qu'on ne mélange pas logique et ressource (plus propre)
// permet de faire des boucles de boucles, etc...