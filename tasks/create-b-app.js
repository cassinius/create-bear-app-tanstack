#!/usr/bin/env node

import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";

if (process.argv.length < 3) {
  console.log("You have to provide a name to your app.");
  console.log("For example :");
  console.log("    npx create-b-app my-app");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/cassinius/create-b-app.git";

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(
      `The file ${projectName} already exist in the current directory, please give it another name.`
    );
  } else {
    console.log(error);
  }
  process.exit(1);
}

/**
 *
 */
async function main() {
  try {
    console.log("Downloading files...");
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

    process.chdir(projectPath);

    console.log("Removing unused files");
    execSync("npx rimraf ./.git");
    fs.rmSync(path.join(projectPath, "tasks"), {
      recursive: true,
      force: true,
    });

    console.log(`-> Done, the 🐻 has landed!
-> 'cd ${projectName}' and install dependencies
-> Your 🐻 app is ready to use 😎`);
  } catch (error) {
    console.log(error);
  }
}
main();
