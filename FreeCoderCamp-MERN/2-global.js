// GLOBALS  - NO WINDOW in NODE

// __dirname => path to current directory
// __filename => file name
// require => function to import/use modules (CommonJS)
// module => info about the current module (file)
// process => info about env and where the process is being executed

console.log(__dirname);
setInterval(() => {
    console.log("Hello");
}, 1000);
