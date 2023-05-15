const fs = require("fs");

const data = fs.readFileSync("../content/sample.txt", "utf-8");
console.log(data);

console.log(`######################################

Writing the file

`);
fs.writeFileSync(
    "../content/sampleWrite.txt",
    `Here is the result \n${data}`,
    "utf-8"
);
