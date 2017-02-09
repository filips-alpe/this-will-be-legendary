const inquirer = require("inquirer");
const lerna = require("lerna");

const question = {
    type: "list",
    choices: ["l", "e", "g", "n", "d", "a", "r", "y", "All of them"],
    name: "pkg",
    message: "Which package would you like to build?"
};

inquirer.prompt([question]).then(({pkg}) => {
    const flags = {};
    if (pkg.length === 1) {
        flags.scope = `legendary-${pkg}`;
    }
    new lerna.__commands__.bootstrap([], flags).run();
});
