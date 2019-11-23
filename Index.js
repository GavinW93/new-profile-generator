var x = require("./generateHTML.js");
console.log(x);
const puppeteer = require('puppeteer');
const inquirer = require('inquirer');
const axios = require('axios');
const fs = require("fs");


//var createHTML = require('create-html')
var question1 = [{
  type: 'list',
  name: 'name',
  message: "What's your favourite color?",
  choices: ["green","blue", "pink","red"]
}]
var github;
var HtmlCol="";
  inquirer.prompt(question1).then(answers => {
    if(answers.name=='blue'){
      console.log('blueeee');
      HtmlCol= "#5F64D3";
      question2()
    }
    if(answers.name=='green'){
      console.log('greeen');
      HtmlCol= "#5F64D3";
      question2()
    }
    if(answers.name=='pink'){
      console.log('pinko');
      HtmlCol= "#FF8374";
      question2()
    }
    if(answers.name=='red'){
      console.log('reeeedo');
      HtmlCol= "#870603";
      question2()
    }
   
   /* console.log(`thanks!`)
    var colnum = parseInt(answers)
    if(colnum===1){
      console.log(colnum)
      question2()
    }
    else{
      console.log(`error!`)
  }*/
  })

function question2(){
var questions = [{
    type: 'input',
    name: 'name',
    message: "What's your gihub?",
  }]
  
  inquirer.prompt(questions).then(answers => {
    console.log(`Hi ${answers['name']}!`)
    //console.log(
        const result=`${answers['name']}`;
        
        


        axios.get(`https://api.github.com/users/${result}`)
  .then(function (response) {
    github= response.data;
    // handle success
   // console.log(response);
    console.log(`Your name is ${github.name}`)
    console.log(`Your face this is ${github.avatar_url}`)
    console.log(`Your login this is ${github.login}`)
    
    createPdf();
    //createHTML();
  })
  })
}
const createPdf = async()=>{
   // const newResult = result;
    const browser = await puppeteer.launch()
    const page =await browser.newPage()
    const html = `<!DOCTYPE html>
    <html>
    <head>
    <style>
    body {
      background-color: ${HtmlCol};
    }
    </style>
    </head>
    <body>
    <h1>${github.name}</h1> 
    <p>${github.bio}</p>
    <p>${github.location}</p>
    <a href='${github.html_url}'>Github link</a>
    <p>Public repositories${github.public_repos}</p>
    <p>Followers:${github.followers}</p>
    <p>Following:${github.following}</p>
    
    <img src="${github.avatar_url}" alt="avatar" height="120" width="120"> 
    </body></html>`;

    await page.setContent(html);
   const options = {
        path: 'pdf/web.pdf',
        format:'A4',

        
    }
    await page.pdf(options);
 /*
    //await page.goto(`https://api.github.com/users/${newResult}`, {waitUntil:'networkidle2'});
    await page.pdf(options);
*/
    await browser.close();
};
//createPdf();
