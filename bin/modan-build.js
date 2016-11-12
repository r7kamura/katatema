#!/usr/bin/env node
import build from "../lib/build";

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
