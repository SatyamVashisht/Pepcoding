const fs = require("fs");
let f1data = fs.readFileSync("txt1.text", "utf8");

function applySflag(f1data) {
    let empty = false;
    let result = [];
    let splitdata = f1data.split("\r\n");
    console.log(splitdata)
    for (let i = 0; i < splitdata.length; i++) {
        if (splitdata[i] == '' && empty == false) {
            result.push(splitdata[i]);
        } else if (splitdata[i] != '') {
            result.push(splitdata[i]);
            if (i < splitdata.length - 2) empty = true;
        }
    }
    console.log(result);
    let removedSpacesString = result.join("\r\n");
    return removedSpacesString;
}




//let removedSpacesString = applySflag(f1data);
//console.log(removedSpacesString);


function applyNflag(data){     
    let count = 1 ; 
    let splitteddata = data.split("\n")
for (let i = 0 ; i < splitteddata.length ; i++){
    splitteddata[i] = (count+"."+splitteddata[i]);
    count ++;

}

//console.log(splitteddata);
let nflag  = splitteddata.join("\n");
return nflag ;


}

let res = applyNflag(f1data);
console.log(res);