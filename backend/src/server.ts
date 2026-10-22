import express, { Express } from "express";
import cors from "cors";
import { registerCSVHandler } from "./activity-parser/activityParserHandler.js";
import { registerWeatherCSVHandler } from "./weather-parser/weatherParserHandler.js";
import { fetchWeatherInBoundingBox } from "./weather-parser/fetchWeatherServices.js";
import { fetchActivityDataFromGoogleSheet } from "./activity-parser/activityDataFetcher.js";
import { registerInitLocationHandler } from "./initial-loc-parser/InitialLocParserHandler.js";
import { registerTileManagerHandler } from "./tile-manager/tileManagerHandler.js";
import { registerHighlightRedliningHandler } from "./red-linning/redLinningHandler.js";
import { registerFilterHandler } from "./filter/filterHandler.js";
import { registerFindPathHandler } from "./street-graph/bestRouteHandler.js";
import { routeThroughStops } from "./street-graph/multiStopAStar.js";
import { registerSaveTripHandler } from "./firebase/registerSaveTripHandler.js";

/**
 * Class representing the backend server application.
 */
export class ServerApp {
  public app: Express;
  private port: number;

  /**
   * Creates a new ServerApp instance.
   *
   * @param port - The port number the server listens on (default: 3001).
   */
  constructor(port: number = 3001) {
    this.app = express();
    this.port = port;
    this.configureMiddleware();
    this.registerHandlers();
  }

  /**
   * Configures global middleware for the Express app.
   */
  private configureMiddleware() {
    this.app.use(cors());
    this.app.use(express.json({ limit: "5mb" }));
  }

  /**
   * Registers all route handlers for the server.
   */
  private registerHandlers() {
    registerCSVHandler(this.app, fetchActivityDataFromGoogleSheet);
    registerWeatherCSVHandler(this.app, fetchWeatherInBoundingBox);
    registerInitLocationHandler(this.app);
    registerTileManagerHandler(this.app);
    registerHighlightRedliningHandler(this.app);
    registerFilterHandler(this.app);
    registerFindPathHandler(this.app, routeThroughStops);
    registerSaveTripHandler(this.app);
    // Add more handlers here, maybe have flags to activate certain commands (?)
  }

  /**
   * Starts the Express server on the configured port.
   */
  public start() {
    this.app.listen(this.port, () => {
      console.log(`Backend running at http://localhost:${this.port}`);
    });
  }

  /**
   * Returns the underlying Express app instance.
   *
   * @returns The Express application.
   */
  public getApp(): Express {
    return this.app;
  }
}

/**
 * Starts the server if this module is run directly.
 */
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const server = new ServerApp();
  server.start();
}
