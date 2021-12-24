const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'our-data.txt')
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home')
})


app.get('/form', (req, res) => {
    // res.setHeader("Content-Type", "text/html");
    // res.send("<form action='/submit' method='POST' ><label>Name <input type='text' name='name' /></label> \n <label> Password <input type ='password' name='pass' /> \n <button type ='submit'>Submit</button></form>");
    res.render('form')
})

app.post('/submit', (req, res) => {
    // res.setHeader("Content-Type", "text/html");
    // res.send("<h1>Sucessfully Submitted</h1>");
    res.render('submit')
    let myData = '';
    req.on('data', (chunk) => {
        myData += chunk;
    })
    req.on('end', () => {
        // fs.readFile(filePath,('utf8'),(err,data)=>{
        //     console.log(data)
        // });
        // fs.writeFile(filePath,myData)
        fs.readFile(filePath, ('utf8'), (err, data) => {
            const newData = data + '\n' + myData;
            fs.writeFile(filePath, newData, () => {
                const splitedData = newData.split("&");
                console.log(splitedData)
            });
        })
    })
    console.log('pak')
})


app.listen(port, () => {
    console.log('Hi')
})