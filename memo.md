# PREPA

```bash
# voir commande `gitops` dans bashrc
pulumi-login-manu
npmrc offline
```

- se logguer à [AWS](aws.amazon.com)
- se logguer à [Pulumi](app.pulumi.com)

[Work Adventure](https://play.workadventu.re/register/a043e32f-8537-4308-aa47-ce05ad34321b)

# RAPPEL

```bash
terraform init
terraform fmt
terraform validate
terraform plan
terraform workspace create dev
terraform workspace select dev

pulumi preview
pulumi up
```

# Intro

Pour ceux qui connaissent pas Pulumi mais qui connaissent Terraform la description est simple, c'est comme Terraform mais en mieux
Pour les autres, langage d'infrastructure as code de type déclaratif qui utilise des langages traditionnels (TypeScript, Python, Go, .Net, ...)
et qui permet de déployer des infrastructures de façon moderne.

## Description

- Multicloud, comme terraform, ansible mais pas AWS Cloud Gormation, Azure ARM template
- Mais pas 1 code pour plusieurs cloud (ça n'existe pas et pas sûr que cela existe un jour)

- Déclaratif : on décrit l'état pas comment y arriver
- Outils intelligent (le classe au dessus d'ansible par ex)
  - Persiste l’état de l’infrastructure
  - Analyse le code et détermine les tåches à effectuer, assez rapidement (même avec milliers de lignes de code), et sans appeler le cloud provider
  - Ordonnancement et parallélisation automatiques des tâches à effectuer
  - Gestion du cycle de vie des ressources. Sait si la ressource doit être création, mise à jour, remplacée ou supprimée
  - Aussi capable de faire l'opération inverse, c'est à dire détruire les ressources
  - Dry-run pour prévisualiser les changements

## Langage

S'appuie sur des langages traditionnels.
Ce qui faisaient hurler les détracteurs, et notamment les défenseurs de Terraform

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

TIPS :

Inconvénient, c'est la mise en place de l'env. Installer node ou python, ca peut être simple, mais c'est ça peut aussi être compliqué si y'a plusieurs versions etc.

apprentissage d'un nouveau langage - FAUX enfin vrai et faux

 pour avoir fait plusieurs formations a des gens qui ne connaissait pas du tout TS, il suffit d'un petit guide (cheatsheet) de la syntaxe de base, avec les types, les boucles et ça suffit. Et c'est beaucoup plus intuitif qu'en HCL

```
eu-west-3
```

Pulumi: Multi Language Packages
https://www.youtube.com/watch?v=_RXvNS5N8A8
