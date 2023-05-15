const path = require("path");

console.log(path.sep);

const filePath = path.join("/content/", "/subfolder", "sample3.txt");
console.log(filePath);

const base = path.basename(filePath);
console.log(base);

const absolutePath = path.resolve(
    __dirname,
    "content",
    "subfolder",
    "sample3.txt"
);
console.log(absolutePath);
console.log(__dirname);
console.log(__filename);
