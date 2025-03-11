/* eslint-disable import/no-unassigned-import */
import "./database/postgres";
import "./configs/consoleLogger";
import { ServiceModes } from "./types/commonTypes";
/* eslint-enable import/no-unassigned-import */

const SERVICE_MODE = process.env.SERVICE_MODE;

switch (SERVICE_MODE) {
  case ServiceModes.server: {
    const serverSetup = async () => {
      // import required modules
      const serverInit = await import("./configs/initServer");

      // run server setup
      await serverInit.initServer();
    };

    serverSetup().catch((error) => {
      console.error({
        prefixMsg: "Error in serverSetup",
        error,
      });
    });
    break;
  }

  default:
    console.error({
      prefixMsg: "Error: Invalid service mode",
      error: SERVICE_MODE,
    });
    process.exit(1);
}

// ## ERROR HANDLING

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

errorTypes.forEach((type) => {
  process.on(type, (error) => {
    try {
      console.error({
        prefixMsg: `Error: process.on ${type}`,
        error,
      });

      // notifications can be added for failure
    } catch (e) {
      console.error({
        prefixMsg: `Error: process.on ${type}`,
        error: e,
      });
    }
  });
});

signalTraps.forEach((type) => {
  process.once(type, () => {
    try {
      console.error({
        prefixMsg: `SignalTrap Error: process.once ${type}`,
        error: type,
      });
    } finally {
      process.kill(process.pid, type);
    }
  });
});
