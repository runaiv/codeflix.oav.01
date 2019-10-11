module.exports = function parseEnv(content) {
    // console.log("env file")
    let json = {}
    const file = content.match(/^([\w]+)=(.+)/gm)
    for(const line of file){
        const [key, value] = line.split('=')
        json[key] = value
    }
    console.log(json)
    
    
}