let fs = require('fs');
 
function dirTree(dir, shift) {
    if (shift === undefined)
        shift = 0;
 
    let list = fs.readdirSync(dir),
        name;
    for (let item of list) {
    
 
        if (fs.statSync(name = dir + "/" + item).isDirectory()) {
            if (item === "node_modules" || item === ".git") { 
                
            } else { 
                console.log("\t".repeat(shift) + item + "/");
                dirTree(name, shift + 1); }
        }
        else
            console.log("\t".repeat(shift) + item);
    }
}
 
// process.stdout.write("\033c");
// process.stdout.write("\033c");
dirTree("/home/alexander/projects/IISS_course");