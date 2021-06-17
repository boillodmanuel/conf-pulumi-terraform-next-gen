# Source: https://unix.stackexchange.com/questions/146570/arrow-key-enter-menu/415155#415155
# Alternative: https://serverfault.com/questions/144939/multi-select-menu-in-bash-script
# Renders a text based list of options that can be selected by the
# user using up, down and enter keys and returns the chosen option.
#
#   Arguments   : list of options, maximum of 256
#                 "opt1" "opt2" ...
#   Return value: selected index (0 for opt1, 1 for opt2 ...)
function do_select_option {
    # little helpers for terminal print control and key input
    ESC=$( printf "\033")
    cursor_blink_on()  { printf "$ESC[?25h"; }
    cursor_blink_off() { printf "$ESC[?25l"; }
    cursor_to()        { printf "$ESC[$1;${2:-1}H"; }
    print_option()     { printf "  %s" "$1"; }
    print_selected()   { printf "\e[0;32m>\e[0;39m %s" "$1"; }
    get_cursor_row()   { IFS=';' read -r -sdR -p $'\E[6n' ROW _; echo "${ROW#*[}"; }
    key_input()        { read -r -s -n3 key 2>/dev/null >&2
                         if [[ $key = $ESC[A ]]; then echo up;    fi
                         if [[ $key = $ESC[B ]]; then echo down;  fi
                         if [[ $key = ""     ]]; then echo enter; fi; }

    # initially print empty new lines (scroll down if at bottom of screen)
    for opt; do printf "\n"; done

    # determine current screen position for overwriting the options
    local lastrow
    lastrow="$(get_cursor_row)"
    local startrow=$((lastrow - $#))

    # ensure cursor and input echoing back on upon a ctrl+c during read -s
    trap "cursor_blink_on; stty echo; printf '\n'; exit 2" 2
    cursor_blink_off

    local selected=0
    while true; do
        # print options by overwriting the last lines
        local idx=0
        for opt; do
            cursor_to $((startrow + idx))
            if [ $idx -eq "$selected" ]; then
                print_selected "$opt"
            else
                print_option "$opt"
            fi
            idx=$((idx + 1))
        done

        # user key control
        case "$(key_input)" in
            enter) break;;
            up)    selected=$((selected - 1));
                   if [ "$selected" -lt 0 ]; then selected=$(($# - 1)); fi;;
            down)  selected=$((selected + 1));
                   if [ "$selected" -ge $# ]; then selected=0; fi;;
        esac
    done

    # cursor position back to normal
    cursor_to "$lastrow"
    printf "\n"
    cursor_blink_on

    return "$selected"
}

# Usage:
#   select_option "the prompt:" OPTION "opt1" "opt2"
#   echo "$OPTION"
function select_option {
    local prompt="$1"
    local retval="$2"
    shift 2
    local options=("$@")

    printf "\e[1;36m%s\e[0;39m\n" "$prompt"
    local choice
    do_select_option "${options[@]}" && choice="$?" || choice="$?"
    # shellcheck disable=SC2034
    value="${options[$choice]}"
    eval "$retval"='("$value")'
}


