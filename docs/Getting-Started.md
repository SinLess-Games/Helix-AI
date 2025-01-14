Here's your refined **Getting Started** guide:

---

# Getting Started with Helix AI

> **Note:** This project leverages VS Code Development Containers for a seamless development experience. If you are not using VS Code, you must manually install the dependencies. Start with the [Before Cloning](#before-cloning) section for details.

To start working on Helix AI, follow these steps to install the project and set up its dependencies.

---

## Before Cloning

Ensure the following dependencies are installed based on your development setup.

### For Dev-Container Users:
1. **[Docker](https://docs.docker.com/engine/install/):** A containerization platform.
   - **Docker Compose** is included with Docker Desktop.
   - For **Windows**, ensure **[WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)** is installed.
2. **[Docker Desktop](https://www.docker.com/products/docker-desktop):** Simplifies using Docker on Windows and macOS.
3. **[Visual Studio Code (VS Code)](https://code.visualstudio.com/download):** Recommended IDE for this project.

### For Non-Dev-Container Users:
1. **[Docker](https://docs.docker.com/engine/install/):** Includes **Docker Compose**.
2. **[Node.js](https://nodejs.org/en/download/):** For the frontend.
3. **[Golang](https://golang.org/doc/install):** Backend programming language.
4. **[Python 3.13](https://www.python.org/downloads/):** For backend services.
5. **[direnv](https://direnv.net/):** Automates loading/unloading environment variables.

---

## Cloning the Repository

Clone the Helix AI repository:

```bash
git clone https://github.com/SinLess-Games-LLC/Helix-Ai.git
```

---

## Setting Up the Project

Navigate to the repository and install dependencies:

```bash
cd Helix-Ai
```

For frontend dependencies:

```bash
npm install
```

---

## Beginning Development

### Using VS Code and Dev Containers:
1. Open the project in VS Code:

   ```bash
   code .
   ```

2. Click on the bottom-left corner of VS Code and select **"Reopen in Container"**.
   - Ensure the **Remote - Containers** extension is installed.

### Without VS Code (Manual Setup):
1. Start the development environment:

   ```bash
   cd docker && docker-compose up
   ```

This will initialize the development ecosystem for the Helix AI project.

---

With this setup, you are ready to begin contributing to Helix AI. For further guidance, consult the project's documentation. If you encounter any issues, feel free to reach out for support.
