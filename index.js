var fetch = require("node-fetch");
var fs = require('fs');
/*
Command line arguments
      fs.readFile(filePath, 'utf8', function (err, content) {
        //console.log('Example from callbackReview.js')
        if (err) {
          //console.log('fs.readFile failed :(\n', err)
          reject(err);
        } else {
          content = content.split('\r\n');
          content = content[0];
          //console.log('fs.readFile successfully completed :', content);
          resolve(content);
        }
      });

//input
  // charizard
  // pikachu

// output
Charizard: flying, fire
Pikachu: electric

.fetch
*/
//console.log(process.argv);
//get file name from user (process.argv)
//iterate through the names on the text file
let fileName = process.argv[2]
let getNames = function (fileName) {
  return new Promise(function (resolve, reject){

    try{
      fs.readFile(fileName, 'utf8', function (err, content) {
      //console.log('Example from callbackReview.js')
      if (err) {
        //console.log('fs.readFile failed :(\n', err)
        reject(err);
      } else {
        let contentArray = content.split('\n');
        //console.log("This should be an array of names", contentArray)
        //console.log('fs.readFile successfully completed :', content);
        resolve(contentArray);
        }
      });
    }
    catch{
        reject(err)
    }
  })
};

getNames(fileName).then(function(content){
//console.log("This should be an array of names", content)
  for (let i = 0; i < content.length; i++) {
    let currentName = content[i]
    //console.log("name:" , currentName)
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
        console.log(error)
    })
}
/*
var pluckFirstLineFromFileAsync = function(filePath) {
  // TODO
  // content = content.split('\r\n');
  // content = content[0];
  // console.log('fs.readFile successfully completed :', content);
  return new Promise(function (resolve, reject){
    try{
      fs.readFile(filePath, 'utf8', function (err, content) {
        //console.log('Example from callbackReview.js')
        if (err) {
          //console.log('fs.readFile failed :(\n', err)
          reject(err);
        } else {
          content = content.split('\r\n');
          content = content[0];
          //console.log('fs.readFile successfully completed :', content);
          resolve(content);
        }
      });
    }
    catch(err){
      reject(err)
    }
  });
};
*/



    /*
    name: charizard
types [
  {
    slot: 1,
    type: { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' }
  },
  {
    slot: 2,
    type: { name: 'flying', url: 'https://pokeapi.co/api/v2/type/3/' }
  }
]
*/