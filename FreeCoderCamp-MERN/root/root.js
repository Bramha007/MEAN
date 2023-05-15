const fetch = require("cross-fetch");

console.log("Welcome to Programiz!");
const demo = async () => {
    console.log("This will run first");
    let data;
    data = await fetch(
        "https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog"
    );
    console.log(data);

    console.log("This shld run after data if sync");
};
demo();
console.log("This log is outseid demo");
