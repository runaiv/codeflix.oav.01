module.exports = function parseIni(content) {
    let fs = require("fs");
    const lines_cleaned = content.trim().replace(/;+.*/gm, "")
        .replace(/ +/gm, ' ')
        .replace(/\s\s+/gm, '\n').replace(/^(.+)(=)/gm, "$1$2 ");
    const content_tab = lines_cleaned.match(/^(\[.*\])|^(.+)=(.+)/gm);
    //console.log(content_tab)
    let json_tab = {};
    let key_category = "";
    for (const line of content_tab) {
        let json = {};
        if (line.match(/^\[(.*)\]/gm)) {
        key_category = line.replace(/^\[(.*)\]/gm, "$1");
        json_tab[key_category] = [];
        } 
        else 
        {
        const [key, value] = line.split("=");
        json[key.trim()] = value.replace(/\"(.*)\"/gm, "$1");
        json_tab[key_category].push(json)
        }
    }
    function getDateString() {
        const date = new Date();
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day =`${date.getDate()}`.padStart(2, '0');
        return `${year}${month}${day}`
      }
    fs.writeFile(`php.${getDateString()}.json`, JSON.stringify(json_tab, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("Your ini.json file has been created");
    });
}
