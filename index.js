var fetch = require("node-fetch");
var fs = require('fs');

let fileName = process.argv[2]
if (fileName === undefined) {
  console.log("You did not provide a text file as an argument")
  return;
} else {

  let getNames = function (fileName) {
    return new Promise(function (resolve, reject){
      try{
        fs.readFile(fileName, 'utf8', function (err, content) {
          if (err) {
            console.log("This file does not exist:", fileName)
            reject(err)
          } else if (content === '') {
            console.log("This file has no data", fileName)
            reject(err);
          } else {
          let contentArray = content.split('\n');
            resolve(contentArray);
          }
        });
      }
      catch{
          console.log("This file does not exist:", fileName)
          reject(err)
      }
    })
  };

  getNames(fileName).then(function(content){
    for (let i = 0; i < content.length; i++) {
      let currentName = content[i]
      getTypes(currentName)
    }
  })

  let getTypes = function(name) {

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(function(response){
        return response.json();
      })

      .then(function(json){
        let types = json.types
        let result = `${name}: `
        //console.log(types)
        for (var i = 0; i< types.length; i++) {
          //console.log(types[elem].type.name)
          let type = types[i].type.name
          if (i !== types.length -1) {
          result += `${type}, `
          } else {
          result += `${type}`
          }
        }
        console.log("result", result);
      })

      .catch(function(error){
          console.log(`${name} is not a Pokemon`)
          console.log(error)
      })
  }
}