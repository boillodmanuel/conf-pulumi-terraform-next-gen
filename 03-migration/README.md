
# Étape 1 : Créer un projet Pulumi qui s'intégre avec terraform

Lire un state terraform

```ts
import * as tf from "@pulumi/terraform"

const remoteState = new tf.state.RemoteStateReference("s3state", {
    backendType: "s3",
    bucket: "pulumi-terraform-state-test",
    key: "test/terraform.tfstate",
    region: "us-west-2"
})

// Use the getOutput function on the resource to access root outputs
const vpcId= remoteState.getOutput("vpc_id")
```



# Étape 2 : Migrer l'existant

Convertir le code terraform avec [tf2pulumi](https://www.pulumi.com/tf2pulumi/)







# Étape 3 : Enjoy 😎
