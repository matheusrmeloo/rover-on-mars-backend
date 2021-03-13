const IO = require("./io");
(async ()=>{
    const io = new IO();
    console.log((await io.getResultRoverTrip("instructions.txt")));
})();