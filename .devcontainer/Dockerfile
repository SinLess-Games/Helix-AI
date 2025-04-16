FROM mcr.microsoft.com/devcontainers/python:3.12-bookworm

ENV DEBIAN_FRONTEND=noninteractive \
    ZSH=/workspace/.oh-my-zsh \
    ZSH_CUSTOM=/workspace/.oh-my-zsh/custom

# Combine apt-get commands to reduce image layers and clean up properly
RUN echo "vscode ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/vscode && \
    apt-get update -y --fix-missing && \
    apt-get install -y --no-install-recommends \
      cloud-image-utils \
      curtain \
      direnv \
      dos2unix \
      fonts-powerline \
      genisoimage \
      git \
      git-flow \
      iputils-ping \
      make \
      ovmf \
      qemu-system \
      qemu-utils \
      ruby-full \
      tzdata \
      zsh && \
    rm -rf /var/lib/apt/lists/*

# Install Oh My Zsh and plugins in a single RUN command to reduce layers
RUN rm -rf $ZSH && \
    CHSH=no RUNZSH=no sh -c "$(curl --retry 3 --retry-delay 5 -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" && \
    git clone --depth=1 https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM}/plugins/zsh-autosuggestions && \
    git clone --depth=1 https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM}/plugins/zsh-syntax-highlighting && \
    git clone --depth=1 https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM}/plugins/zsh-completions && \
    git clone --depth=1 https://github.com/fabiogibson/envrc-zsh-plugin.git ${ZSH_CUSTOM}/plugins/envrc && \
    git clone --depth=1 https://github.com/superbrothers/zsh-kubectl-prompt.git ${ZSH_CUSTOM}/plugins/zsh-kubectl-prompt && \
    git clone --depth=1 https://github.com/zdharma-continuum/fast-syntax-highlighting.git ${ZSH_CUSTOM}/plugins/fast-syntax-highlighting && \
    git clone --depth=1 https://github.com/zsh-users/zsh-history-substring-search ${ZSH_CUSTOM}/plugins/zsh-history-substring-search && \
    git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM}/themes/powerlevel10k && \
    gem install colorls

# Combine COPY and subsequent commands into a single RUN to reduce layers
COPY .zshrc /home/vscode/.zshrc
COPY .starship.toml /home/vscode/.config/starship.toml
COPY .p10k.zsh /home/vscode/.p10k.zsh
RUN dos2unix /home/vscode/.zshrc && \
    if [ -f /home/vscode/.gnupg/pub.gpg ]; then \
      gpg --import /home/vscode/.gnupg/pub.gpg; \
    fi && \
    chown -R vscode:vscode /workspace && \
    dos2unix /home/vscode/.config/starship.toml && \
    chown -R vscode:vscode /home/vscode/.zshrc && \
    chown -R vscode:vscode /home/vscode/.config/starship.toml

USER vscode
WORKDIR /workspace

CMD ["zsh"]
