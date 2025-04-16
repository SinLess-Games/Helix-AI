# -------------------------- Zsh Shell Configuration Template --------------------------

# Enable 'nullglob' to prevent unmatched globs from expanding to themselves
setopt nullglob

# -------------------------- General Zsh Options --------------------------
setopt autocd
setopt interactivecomments
setopt magicequalsubst
setopt nonomatch
setopt notify
setopt numericglobsort
setopt promptsubst

# Clean up WORDCHARS
WORDCHARS=${WORDCHARS//\\/}
PROMPT_EOL_MARK=""

# -------------------------- Keybindings --------------------------
bindkey -e
bindkey ' ' magic-space
bindkey '^U' backward-kill-line
bindkey '^[[3;5~' kill-word
bindkey '^[[3~' delete-char
bindkey '^[[1;5C' forward-word
bindkey '^[[1;5D' backward-word
bindkey '^[[5~' beginning-of-buffer-or-history
bindkey '^[[6~' end-of-buffer-or-history
bindkey '^[[H' beginning-of-line
bindkey '^[[F' end-of-line
bindkey '^[[Z' undo

# -------------------------- Completion Settings --------------------------
autoload -Uz compinit
compinit -d ~/.cache/zcompdump
zstyle ':completion:*:*:*:*:*' menu select
zstyle ':completion:*' auto-description 'specify: %d'
zstyle ':completion:*' completer _expand _complete
zstyle ':completion:*' format 'Completing %d'
zstyle ':completion:*' group-name ''
zstyle ':completion:*' list-colors ''
zstyle ':completion:*' list-prompt %SAt %p: Hit TAB for more, or the character to insert%s
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}'
zstyle ':completion:*' rehash true
zstyle ':completion:*' select-prompt %SScrolling active: current selection at %p%s
zstyle ':completion:*' use-compctl false
zstyle ':completion:*' verbose true
zstyle ':completion:*:kill:*' command 'ps -u $USER -o pid,%cpu,tty,cputime,cmd'

# -------------------------- History Configuration --------------------------
HISTFILE=~/.zsh_history
HISTSIZE=1000
SAVEHIST=2000
setopt hist_expire_dups_first
setopt hist_ignore_dups
setopt hist_ignore_space
setopt hist_verify
alias history="history 0"

# -------------------------- Timing --------------------------
TIMEFMT=$'\nreal\t%E\nuser\t%U\nsys\t%S\ncpu\t%P'

# -------------------------- PATH Configuration --------------------------
export PATH="/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin:/home/vscode/bin:/home/vscode/.local/bin:/usr/local/bin:$PATH"

# -------------------------- Environment Variables --------------------------
export ZSH="/home/vscode/.oh-my-zsh"
export STARSHIP_CONFIG="/home/vscode/.starship.toml"
export DEFAULT_FONT='FiraCode NF'
export HOMEBREW_NO_ENV_HINTS=1


# -------------------------- Oh My Zsh Theme and Plugins --------------------------
ZSH_THEME="robbyrussell"
plugins=(
    aliases ansible aws azure brew direnv docker docker-compose emoji encode64 fluxcd gcloud
    gem gh git git-commit git-extras git-flow github git-lfs helm history kubectl microk8s
    minikube ng npm nvm pre-commit redis-cli ssh ssh-agent sudo systemd terraform ubuntu
    ufw vscode yarn
    zsh-syntax-highlighting
    zsh-autosuggestions
    zsh-completions
    you-should-use
    zsh-bat

)


source $ZSH/oh-my-zsh.sh

# -------------------------- Prompt Configuration --------------------------
PROMPT_ALTERNATIVE=twoline
NEWLINE_BEFORE_PROMPT=yes

configure_prompt() {
    prompt_symbol=㉿
    case "$PROMPT_ALTERNATIVE" in
        twoline)
            PROMPT=$'%F{%(#.blue.green)}┌──${debian_chroot:+($debian_chroot)─}${VIRTUAL_ENV:+($(basename $VIRTUAL_ENV))─}(%B%F{%(#.red.blue)}%n'${prompt_symbol}'%m%b%F{%(#.blue.green)})-[%B%F{reset}%(6~.%-1~/…/%4~.%5~)%b%F{%(#.blue.green)}]\n└─%B%(#.%F{red}#.%F{blue}$)%b%F{reset} '
            ;;
        oneline)
            PROMPT=$'${debian_chroot:+($debian_chroot)}${VIRTUAL_ENV:+($(basename $VIRTUAL_ENV))}%B%F{%(#.red-blue)}%n@%m%b%F{reset}:%B%F{%(#.blue-green)}%~%b%F{reset}%(#.#.$) '
            ;;
        backtrack)
            PROMPT=$'${debian_chroot:+($debian_chroot)}${VIRTUAL_ENV:+($(basename $VIRTUAL_ENV))}%B%F{red}%n@%m%b%F{reset}:%B%F{blue}%~%b%F{reset}%(#.#.$) '
            ;;
    esac
    unset prompt_symbol
}

if [ -n "$force_color_prompt" ]; then
    color_prompt=yes
    VIRTUAL_ENV_DISABLE_PROMPT=1
    configure_prompt
fi

# Toggle prompt layout with Ctrl+P
zle -N toggle_oneline_prompt
bindkey ^P toggle_oneline_prompt

toggle_oneline_prompt() {
    [ "$PROMPT_ALTERNATIVE" = oneline ] && PROMPT_ALTERNATIVE=twoline || PROMPT_ALTERNATIVE=oneline
    configure_prompt
    zle reset-prompt
}

# Terminal window title
case "$TERM" in
    xterm*|rxvt*|Eterm|aterm|kterm|gnome*|alacritty)
        TERM_TITLE=$'\e]0;${debian_chroot:+($debian_chroot)}${VIRTUAL_ENV:+($(basename $VIRTUAL_ENV))}%n@%m: %~\a'
        ;;
esac

precmd() {
    print -Pnr -- "$TERM_TITLE"
    [ "$NEWLINE_BEFORE_PROMPT" = yes ] && { [ -n "$_NEW_LINE_BEFORE_PROMPT" ] && print "" || _NEW_LINE_BEFORE_PROMPT=1; }
}

# -------------------------- Highlighting & Suggestions --------------------------
if [ -f /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh ]; then
    . /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
fi

if [ -f /usr/share/zsh-autosuggestions/zsh-autosuggestions.zsh ]; then
    . /usr/share/zsh-autosuggestions/zsh-autosuggestions.zsh
    ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=#999'
fi

[ -f /etc/zsh_command_not_found ] && . /etc/zsh_command_not_found

# -------------------------- Color Support & Aliases --------------------------
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    export LS_COLORS="$LS_COLORS:ow=30;44:"
    alias ls='ls --color=auto'
    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
    alias diff='diff --color=auto'
    alias ip='ip --color=auto'
    zstyle ':completion:*' list-colors "${(s.:.)LS_COLORS}"
fi

alias ll='ls -l'
alias la='ls -A'
alias l='ls -CF'

# -------------------------- Logging Utilities --------------------------
log_info()    { echo -e "\033[1;34m🔵 [INFO] | $1\033[0m"; }
log_warn()    { echo -e "\033[0;33m🟠 [WARN] | $1\033[0m"; }
log_error()   { echo -e "\033[1;31m🔴 [ERROR] | $1\033[0m"; }
log_success() { echo -e "\033[0;32m✅ [SUCCESS] | $1\033[0m"; }

# -------------------------- Brewfile Automation --------------------------
if [ -f "{{ user.home_directory }}/Brewfile" ]; then
    log_info "Brewfile found. Installing..."
    brew bundle --file={{ user.home_directory }}/Brewfile >/dev/null 2>&1 && log_success "Installed" || log_error "Install failed"
else
    log_warn "No Brewfile found."
fi

# -------------------------- Direnv Setup --------------------------
if ! command -v direnv &>/dev/null; then
  log_info "Installing direnv..."
  brew install direnv
fi

# -------------------------- Dev Aliases --------------------------
alias gs='git status'
alias gl='git log'
alias gc='git commit -m'
alias gp='git push'
alias gpl='git pull'
alias ga='git add .'

alias c='clear'

alias k='kubectl'
alias nodes='kubectl get nodes'
alias services='kubectl get services'
alias pods='kubectl get pods'
alias deploys='kubectl get deployments'

alias dps='docker ps'
alias dstop='docker stop $(docker ps -aq)'
alias dc='docker-compose'
alias dcb='docker-compose build'
alias dcu='docker-compose up'
alias dcd='docker-compose down'

# -------------------------- Brew Update --------------------------
brew-update() {
    log_info "Updating Homebrew..."
    brew update >/dev/null 2>&1
    brew outdated >/dev/null 2>&1
    brew upgrade >/dev/null 2>&1
}
alias bu='brew-update'

# -------------------------- Release Helper --------------------------
create_release() {
    npm install -g generate-changelog
    last_tag=$(git describe --tags $(git rev-list --tags --max-count=1) 2>/dev/null || echo "0.0.0")
    IFS='.' read -r major minor patch <<< "${last_tag:-0.0.0}"
    new_tag="${major}.${minor}.$((patch+1))"
    git tag -a "$new_tag" -m "Release $new_tag"
    git push origin "$new_tag"
    changelog_file="CHANGELOGS/Changelog-$(date +%m-%d-%Y).md"
    generate-changelog --file "$changelog_file" --tag "$last_tag..$new_tag"
    git add "$changelog_file"
    git commit -m "Changelog for $new_tag"
    git push origin master
}

# -------------------------- Reload Function --------------------------
reload() {
  source ~/.zshrc
  log_info "Reloaded .zshrc"
}

# -------------------------- Final Setup --------------------------
if ! brew list | grep -q 'python'; then
  log_info "Linking python..."
  brew link python
fi

direnv allow
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
eval "$(starship init zsh)"

# -------------------------- SSH Agent Setup --------------------------
if [ -z "$SSH_AUTH_SOCK" ] ; then
  eval $(ssh-agent -s)
fi

for key in ~/.ssh/id_ed25519-*; do
  [[ -f "$key" && "$key" != *.pub && "$key" != *-cert.pub ]] && log_info "Adding SSH key: $key" && ssh-add "$key" > /dev/null 2>&1
done
