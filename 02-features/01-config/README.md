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