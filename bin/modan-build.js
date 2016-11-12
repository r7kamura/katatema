#!/usr/bin/env node
import build from "../build";

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
