#!/usr/bin/env node
import { spawn } from "cross-spawn";

const commandName = process.argv[2];
const availableCommandNames = new Set([
  "build",
  "serve",
]);

if (availableCommandNames.has(commandName)) {
  const spawnedProcess = spawn(
    `${__dirname}/katatema-${commandName}.js`,
    process.argv.slice(3),
    {
      customFds: [0, 1, 2],
      stdio: "inherit",
    }
  );
  spawnedProcess.on("close", (code) => {
    process.exit(code);
  });
  spawnedProcess.on("error", (error) => {
    console.error(error);
    process.exit(1);
  });
} else {
  console.error("Usage: katatema <build|serve> [options]");
  process.exit(1);
}
