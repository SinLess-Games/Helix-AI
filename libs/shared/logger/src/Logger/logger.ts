import chalk from 'chalk'
import winston from 'winston'
import { OpenTelemetryTransportV3 } from '@opentelemetry/winston-transport'
import LokiTransport from 'winston-loki'
import { FluentClient } from '@fluent-org/logger'

// Fluentd configuration options
export interface FluentdOptions {
  host: string
  port: number
  timeout?: number
  tag_prefix: string
}

// Logger configuration options
export interface LoggerOptions {
  serviceName: string
  fluentd: FluentdOptions
  // (Optional) You can extend options here with overrides for winston or loki transports if needed.
}

// Define custom logging levels so that our logger can support levels beyond the default ones.
const customLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  success: 3,
  info: 4,
  debug: 5,
  trace: 6,
}

// This mapping is used in formatting the console output.
const levelStyles: Record<keyof typeof customLevels, (text: string) => string> =
  {
    fatal: chalk.bold.redBright,
    error: chalk.red,
    warn: chalk.hex('#FFA500'), // Orange
    success: chalk.green,
    info: chalk.blue,
    debug: chalk.white,
    trace: chalk.gray,
  }

export class Logger {
  private serviceName: string
  private fluentClient: FluentClient
  private winstonLogger: winston.Logger

  constructor(options: LoggerOptions) {
    this.serviceName = options.serviceName

    // Initialize FluentClient for logging to Fluentd.
    this.fluentClient = new FluentClient(options.fluentd.tag_prefix, {
      socket: {
        host: options.fluentd.host,
        port: options.fluentd.port,
        timeout: options.fluentd.timeout || 3000,
      },
    })

    // Create a winston logger configured with:
    // 1. A Console transport with a custom format.
    // 2. An OpenTelemetry transport that sends records to the OpenTelemetry Logs SDK.
    // 3. A Loki transport to send logs to Grafana Loki.
    this.winstonLogger = winston.createLogger({
      level: 'info',
      levels: customLevels,
      format: winston.format.combine(
        winston.format.timestamp(),
        // Custom formatting: prepend the timestamp and styled service name/level.
        winston.format.printf(({ timestamp, level, message }) => {
          // Ensure the level key is one of our custom ones.
          const style =
            levelStyles[level as keyof typeof customLevels] || ((txt) => txt)
          // Convert level to uppercase for display.
          return `${timestamp} ${style(
            `[${this.serviceName}] [${level.toUpperCase()}] ${message}`,
          )}`
        }),
      ),
      transports: [
        // Console transport for local output
        new winston.transports.Console(),
        // OpenTelemetry transport; ensure you have configured the OpenTelemetry Logs SDK elsewhere
        new OpenTelemetryTransportV3(),
        // Loki transport to send logs to Grafana Loki.
        new LokiTransport({
          host: process.env.LOKI_HOST || 'http://127.0.0.1:3100',
          json: true,
          // Adjust these options as needed – interval is in seconds.
          interval: 5,
          batching: true,
          labels: { service: this.serviceName },
        }),
      ],
    })
  }

  // Private unified log method that sends logs using both winston and fluent.
  private log(level: keyof typeof customLevels, message: string): void {
    // Log via winston. Note: converting the level to lower-case allows custom levels to match.
    this.winstonLogger.log({ level: level.toLowerCase(), message })

    // Also send logs to Fluentd using the FluentClient.
    this.fluentClient.emit(level, {
      serviceName: this.serviceName,
      level,
      message,
      timestamp: new Date().toISOString(),
    })
  }

  // Logging methods – you can call these from your application.
  fatal(message: string) {
    this.log('fatal', message)
  }

  error(message: string) {
    this.log('error', message)
  }

  warn(message: string) {
    this.log('warn', message)
  }

  info(message: string) {
    this.log('info', message)
  }

  debug(message: string) {
    this.log('debug', message)
  }

  trace(message: string) {
    this.log('trace', message)
  }

  success(message: string) {
    this.log('success', message)
  }
}

// Export the Logger class as the only export from this module.
export default Logger
