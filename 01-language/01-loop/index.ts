import * as aws from "@pulumi/aws";


// ORIGINAL

new aws.iam.User('user-bob', {
    name: 'bob',
})


// SOLUTION

for (const name of ["Todd", "James", "Alice", "Dottie"]) {

    new aws.iam.User(`user-${name}`, {
        name: name
    })

}

// plus naturel à lire
// puriste dirons qu'on ne mélange pas logique et la déclaration de la ressource (plus propre)
// permet de faire des boucles de boucles, etc...