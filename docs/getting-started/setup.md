# Initial Setup Guide for Helix AI

Welcome to the setup guide for Helix AI! After installing the platform, follow this guide to configure Helix AI for your specific environment and requirements.

---

## 🎯 Purpose of This Guide

This guide walks you through:

1. Configuring essential environment variables and settings.
2. Connecting required dependencies like databases, message queues, and APIs.
3. Starting Helix AI services and verifying the initial setup.

---

## 🔧 Step-by-Step Setup

### 1. Configure Environment Variables

Helix AI uses environment variables to manage configurations. These can be set directly or using a `.env` file.

- **Create a `.env` File**:  
  Copy the provided `.env.example` file as `.env`.

  ```bash
  cp .env.example .env
  ```

- **Edit the `.env` File**:  
  Update the following variables with your details:

  ```env
  DATABASE_URL="postgres://username:password@hostname:5432/helix_db"
  REDIS_URL="redis://localhost:6379"
  JWT_SECRET="your-secure-jwt-secret"
  NODE_ENV="production"
  ```

  Refer to the [Configuration Reference](../infrastructure/applications.md#configuration) for more details.

---

### 2. Set Up Required Dependencies

Helix AI relies on the following dependencies:

- **Database**: Ensure your database (e.g., PostgreSQL) is running. Run migrations to set up the schema:

  ```bash
  npm run migrate
  ```

- **Redis**: Start Redis for caching and message queuing.
- **Message Broker**: If using Kafka or RabbitMQ, ensure they are up and running.

---

### 3. Start the Services

Start the Helix AI services using Docker Compose or directly with Node.js.

- **Using Docker Compose**:

  ```bash
  docker-compose up -d
  ```

- **Using Node.js**:

  ```bash
  npm start
  ```

---

### 4. Verify the Setup

After starting the services:

- **Access the Frontend**: Open your browser and go to `http://localhost:3000` (or your configured URL).
- **Check the Admin Panel**: Log in to the admin panel at `/admin` using the default credentials:
  - **Username**: `admin`
  - **Password**: `admin123` (change this immediately after logging in).
- **Monitor the Logs**: Check logs to ensure all services are running smoothly.

  ```bash
  docker-compose logs -f
  ```

---

## ⚙️ Optional Configuration

- **Enable HTTPS**: Configure SSL certificates with [Cert-Manager](../infrastructure/security.md#cert-manager).
- **Set Up Feature Flags**: Use [Flagsmith](../features/integrations.md#flagsmith) for managing feature toggles.
- **Scale Services**: Configure Kubernetes auto-scaling for production environments.

---

## ✅ Next Steps

1. **Explore Features**: Learn more about [Helix AI's Features](../features/index.md).
2. **Secure Your Setup**: Review the [Security Guide](../infrastructure/security.md) for best practices.
3. **Start Developing**: Dive into the [Developer Guide](../development/index.md) for customizations.

---

## 💡 Need Assistance?

If you encounter any issues during setup:

- Visit the [Troubleshooting Guide](../troubleshooting/index.md).
- Contact [Support](mailto:support@helixaibot.com).

---

Congratulations! You're now ready to explore and use Helix AI. 🎉
