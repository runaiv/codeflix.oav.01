  
module.exports = function parseEnv(content) {
    // console.log("env file")
    let fs = require("fs");
    let json = {}
    const file = content.match(/^([\w]+)=(.+)/gm)
    for(const line of file){
        const [key, value] = line.split('=')
        json[key] = value
    }
    function getDateString() {
        const date = new Date();
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day =`${date.getDate()}`.padStart(2, '0');
        return `${year}${month}${day}`
      }
    fs.writeFile(`php.${getDateString()}.json`, JSON.stringify(json, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("php." + getDateString()+ ".json has been sucessfully created");
    });
}