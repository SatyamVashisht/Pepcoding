const fs = require("fs");

//console.log(read)

fs.writeFileSync("helloworld.js", "no hello");
let read = fs.readFileSync("./helloworld.js","utf-8");
console.log(read);


