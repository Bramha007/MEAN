const fs = require("fs");

fs.readFile("../content/sample.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log("READING THE FILE");
        // console.log(data);
        const result = data;
        fs.writeFile("../content/sample-write.txt", result, (err) => {
            console.log("WRITING THE FILE THAT WAS READ");
            if (err) {
                console.log(err);
                return;
            }
        });
    }
});
