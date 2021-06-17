#!/usr/bin/env bash

set -euo pipefail # e(errexit): exit on error, u(nounset): exit on undeclared variables, -o pipefail: pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${DIR}" || exit 1

ACTION="${1:-=''}"

DESTROY=false
PREVIEW=false
UP_AND_DESTROY=false

function init_action() {
    case "$ACTION" in
    destroy) 
        DESTROY=true;;
    preview)
        PREVIEW=true;;
    up-and-destroy)
        UP_AND_DESTROY=true;;
    *)
        source "./select.bash"
        select_option 'Choose action to execute:' ACTION 'destroy' 'preview' 'up-and-destroy'
        init_action
        ;;
    esac
}
init_action

function go() {
  printf "\n\e[1;36mPROJECT ./%s\e[0;39m\n\n" "$1"
  cd "${DIR}/$1" || exit 1
}

function do_pulumi_action() {
    if "$DESTROY"; then pulumi destroy --skip-preview; fi
    if "$PREVIEW"; then pulumi preview; fi
    if "$UP_AND_DESTROY"; then 
        pulumi up --yes; 
        pulumi destroy --skip-preview
    fi
}

function do_terraform_action() {
    if "$DESTROY"; then terraform destroy -auto-approve; fi
    if "$PREVIEW"; then terraform plan; fi
    if "$UP_AND_DESTROY"; then 
        terraform apply -auto-approve; 
        terraform destroy -auto-approve
    fi
}

go "00-project/pulumi-py" && do_pulumi_action
go "00-project/pulumi-ts" && do_pulumi_action
go "00-project/terraform" && do_terraform_action

go "01-language/01-loop" && do_pulumi_action && do_terraform_action
go "01-language/02-condition" && do_pulumi_action && do_terraform_action
go "01-language/03-functions" && do_pulumi_action
go "01-language/04-modules" && do_pulumi_action

go "02-features/01-config" && do_pulumi_action
go "02-features/02-component" && do_pulumi_action
go "02-features/03-awsx" && do_pulumi_action
go "02-features/05-serverless" && do_pulumi_action






