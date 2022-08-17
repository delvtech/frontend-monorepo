import { Contract } from "ethers";
import * as c from "ansi-colors";

const Logger = {
  deployContract(name?: string): void {
    console.log(c.bold(`Deploying ${name} contract...`));
    console.log("\n");
  },

  successfulDeploy(name?: string, contract?: Contract): void {
    console.log(c.greenBright(`Successfully deployed ${name} contract! 🎉`));
  },
};

export default Logger;
