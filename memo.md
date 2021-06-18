PREPA
=====

## PREPA 
```bash
# voir commande `gitops` dans bashrc
pulumi-login-manu
npmrc offline
```

- se logguer à [AWS](aws.amazon.com)
- se logguer à [Pulumi](app.pulumi.com)
- VSCode => Zoom x2
- Keynote => Play in windows

[Work Adventure](https://play.workadventu.re/register/a043e32f-8537-4308-aa47-ce05ad34321b)

## FIN

```bash
./init.sh destroy
# retourn arrière git (sauf modif à conserver)
```


## RAPPEL

```bash
terraform init
terraform fmt
terraform validate
terraform plan
terraform workspace create dev
terraform workspace select dev

pulumi preview
pulumi upcd .
```

Intro
=====

Note: Bienvenue // Question dans chat ou m'interrompre directement

## `Slide +` Intro

Pour ceux qui connaissent pas Pulumi mais qui connaissent Terraform la description est simple, c'est comme Terraform mais en mieux

Pour les autres, plateforme d'infrastructure as code qui utilise des langages traditionnels (TypeScript, Python, Go, .Net, ...)
et qui permet de déployer des infrastructures de façon moderne.

## `Slide +` Description

- Multicloud, comme terraform, ansible mais pas AWS Cloud Formation, Azure ARM template
- Mais pas 1 code pour plusieurs cloud (ça n'existe pas et pas sûr que cela existe un jour)

- Déclaratif : on décrit l'état pas comment y arriver

- Outils intelligent (je le classe au dessus d'ansible par ex)
  - Persiste l’état de l’infrastructure / diff / optimiser
  - Analyse le code et détermine les tåches à effectuer, assez rapidement, sans appeler le cloud provider (même avec milliers de lignes de code)
  - Ordonnancement et parallélisation automatiques des tâches à effectuer (stockage objet + bd)
  - Gestion du cycle de vie des ressources. 
  - Prévisualiser les changements: 
    - Sait si la ressource doit être création, mise à jour, remplacée ou supprimée
    - Déduire l'impact sur la continuité de service
  - Aussi capable de faire l'opération inverse, c'est à dire détruire les ressources


## Backend

Par défaut, on utilise le backend pulumi pour persister l'état
Tout de suite opérationnel, avec :
- gestion multi-environnement des projets
- persistance de l'état
- collaboration
- traçabilité
- !! pas de limite de run concurrent (en mode gratuit - Terraform Cloud)

Choisir d'autre solution de backend

## Langage

S'appuie sur des langages traditionnels.
Ce qui faisaient hurler les détracteurs, et notamment les défenseurs de Terraform

- sens de l'histoire - toutes les solutions d'infra as code se tournent vers l'utilisation de langage de dev pour répondre aux limites des langages plus statiques (yaml, json, hcl)

Avantage :

- pas forcément de nouveau langage a apprendre
  > si vous n'avez jamais fait de terraform, peu de chance d'avoir déjà fait du HCL!
  > 
  > l'inverse est plus vrai, c'est possible que vous ayez deja des compétences dans le langage choisi ou du moins que vous savez le lire
- syntaxe plus naturelle (ex: boucle)
  > ex `01-language`
- plus d'expressivité (pas de limite (cf REX galère de faire des trucs simples))
- 
- communauté
- réunit ops et dev

Inconvénient :
- c'est la mise en place de l'env. Installer node ou python, ca peut être simple, mais c'est ça peut aussi être compliqué si y'a plusieurs versions etc.


TIPS :

2.5 ans de pulumi
apprentissage d'un nouveau langage - FAUX enfin vrai et faux

 pour avoir fait plusieurs formations a des gens qui ne connaissait pas du tout TS, il suffit d'un petit guide (cheatsheet) de la syntaxe de base, avec les types, les boucles et ça suffit. Et c'est beaucoup plus intuitif qu'en HCL


00-project
==========

syntaxe declarative (comparaison tf, ts, py)
```ts
// show class doc
aws.ec2.Vpc
```
completion (s'appuie sur le langage ts nativ - pas de plugin custom)
doc des attributs

pulumi up
voir AWS
pulumi destroy

01-language
===========

## 01-loop

```ts

// SOLUTION

for (const name of ["Todd", "James", "Lea", "Dottie"]) {

    new aws.iam.User(`user-${name}`, {
        name: name
    })

}

// plus naturel à lire
// puriste dirons qu'on ne mélange pas logique et la déclaration de la ressource (plus propre)
// permet de faire des boucles de boucles, etc...
```

## 02-condition

```ts

// SOLUTION

const isProd = pulumi.getStack() === 'prod'

if (isProd) {

  new aws.iam.User('user-bob', {
      name: 'bob',
  })

}

// puriste dirons qu'on ne mélange pas logique et ressource (plus propre)
// permet de faire des boucles de boucles, etc...
```

## 03-functions

```ts
// SOLUTION

function validateUsername(username: string): string {
  if (!username.startsWith('user-')) {
    throw new Error(`Error: username ${username} should start with 'user-'`)
  }
  return username
}


new aws.iam.User('user-bob', {
    name: validateUsername('user-bob'),
})
```

```ts
// SOLUTION 2

function createUser(username: string): aws.iam.User {
  validateUsername(username)

  return new aws.iam.User(username, {
      name: username,
  })
}

createUser('user-bill')
createUser('user-joe')
```


## 04-modules

```ts
import * as fs from 'fs'

// ...

const files = fs.readdirSync('www')
for (const f of files) {
    new aws.s3.BucketObject(f, {
        bucket: bucket,
        key: f,
        source: `www/${f}`,
        acl: 'public-read',
    })
}

export const url = bucket.bucketRegionalDomainName
```

02-features
===========

## 01-config

```yaml
  demo-config:dbPassword:
    secure: AAABAHhe1/KpvWaxSrXoXIM/zFtITwuF+FTbwiYRGIcHggkQCr5cbDk=
  demo-config:dbUsername: foo
  demo-config:obj:
    key: name
    values: 
    - 1
    - 2

```

```ts
// ENUM & CONFIG & SECRET

// EXAMPLE : https://www.pulumi.com/docs/reference/pkg/aws/rds/instance/

// const database = new aws.rds.Instance("default", {
//   allocatedStorage: 10,
//   engine: "mysql",
//   engineVersion: "5.7",
//   instanceClass: "db.t3.micro",
//   name: "mydb",
//   parameterGroupName: "default.mysql5.7",
//   password: "foobarbaz",
//   skipFinalSnapshot: true,
//   username: "foo",
// })

// SOLUTION

const config = new pulumi.Config()

const database = new aws.rds.Instance('default', {
    allocatedStorage: 10,
    engine: 'mysql',
    engineVersion: '5.7',
    instanceClass: aws.rds.InstanceType.T3_Micro, // ENUM (2)
    name: 'mydb',
    parameterGroupName: 'default.mysql5.7',
    skipFinalSnapshot: true,
    username: config.require('dbUsername'), // CONFIG (3)
    password: config.requireSecret('dbPassword'), // CONFIG SECRET (4)
    dbSubnetGroupName: subnetGroup.name, // ADDED (1)
})


interface Obj {
    key: string
    value: number[]
}

const obj = config.requireObject<Obj>('obj')
```

## 02-component


```ts
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
    publicSubnetsIds: monVpc.publicSubnets.map((s) => s.id),
    privateSubnetsIds: monVpc.privateSubnets.map((s) => s.id),
}

export const monVpc2Info = {
    numberOfAz: monVpc2.numberOfAz,
    publicSubnetsIds: monVpc2.publicSubnets.map((s) => s.id),
    privateSubnetsIds: monVpc2.privateSubnets.map((s) => s.id),
}
```

## 03-awsx

## 05-serverless

```ts
// Upload a file:
// aws s3 cp index.ts s3://$(pulumi stack output bucketName)/index.ts

// Open function
// open https://eu-west-3.console.aws.amazon.com/lambda/home?region=eu-west-3#/functions/$(pulumi stack output functionName)
// Monitor / Log / Open in Cloudwatch
```


Notes
=====

No terraform native secret !

Rien dans doc terraform
- https://www.terraform.io/docs/language/values/variables.html
- https://www.terraform.io/docs/language/state/sensitive-data.html

Rien dans blog 2020
- https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1



Pulumi vient avec un secret manager intégré 
- Chiffrement propre à chaque stack pulumi
- Le code peut être poussé dans GIT

Possibilité d'utiliser d'autre Gestionnaire de secret

- https://www.pulumi.com/docs/intro/concepts/secrets/#available-encryption-providers
  - awskms: AWS Key Management Service (KMS)
  - azurekeyvault: Azure Key Vault
  - gcpkms: Google Cloud Key Management Service (KMS)
  - hashivault: HashiCorp Vault Transit Secrets Engine