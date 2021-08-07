#!/usr/bin/env node

let fs = require('fs');
let inputarr = process.argv.slice(2);

// console.log(inputarr);

let optionarr = [];
let filearr = [];

for (let i = 0; i < inputarr.length; i++) {
    let firstchar = inputarr[i].charAt(0);
    if (firstchar == "-")
        optionarr.push(inputarr[i]);
    else
        filearr.push(inputarr[i]);
}

// option check
if (optionarr.includes("-n") && optionarr.includes("-b")) {
    console.log("Either enter -n or -b option");
    return;
}

// Check file existance
for (let i = 0; i < filearr.length; i++) {
    // buffer
    let isExist = fs.existsSync(filearr[i]);
    if (isExist == false) {
        console.log(`${filearr[i]} is Invalid file name`);
        return;
    }
}
// console.log(filearr);
let content = [];
for (let i = 0; i < filearr.length; i++) {
    // buffer
    let buffercontent = fs.readFileSync(filearr[i]);
    content += buffercontent + "\r\n";
}
// console.log(content);
let contentarr = content.split("\r\n");
// console.log(contentarr);

// -s
let Spresent = optionarr.includes("-s");
if (Spresent == true) {
    for (let i = 1; i < contentarr.length; i++) {
        if (contentarr[i] == "" && contentarr[i - 1] == "")
            contentarr[i] = null;
        else if (contentarr[i] == "" && contentarr[i - 1] == null)
            contentarr[i] = null;
    }
    let temparr = [];
    for (let i = 0; i < contentarr.length; i++) {
        if (contentarr[i] != null)
            temparr.push(contentarr[i]);
    }
    contentarr = temparr;
}
// -n
let Npresent = optionarr.includes("-n");
if (Npresent == true) {
    for (let i = 0; i < contentarr.length; i++) {
        contentarr[i] = `${i+1} ${contentarr[i]}`;
    }
}
// -b
let Bpresent = optionarr.includes("-b");
if (Bpresent == true) {
    let c = 0;
    for (let i = 0; i < contentarr.length; i++) {
        if (contentarr[i] != "")
            contentarr[i] = `${++c} ${contentarr[i]}`;
    }
}

console.log(contentarr.join("\n"));