const http_port = 8181;
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
//app.use('./static', express.static(path.join(__dirname, 'content')));
const staticFolder = path.join(__dirname, 'content');
const mainCounterFileName = 'mainpagecounter.json';
const aboutCounterFileName = 'aboutpagecounter.json';

let countPreviewMain = JSON.parse(fs.readFileSync(path.join(staticFolder, mainCounterFileName), 'utf-8'));
let countPreviewAbout = JSON.parse(fs.readFileSync(path.join(staticFolder, aboutCounterFileName), 'utf-8'));
//let countErrorRequest = 0;
//console.log(countPreviewMain.main);

app.use('/',(req, res, next)=>{
    countPreviewMain.main = countPreviewMain.main + 1;
    fs.writeFile(path.join(staticFolder, mainCounterFileName),JSON.stringify({main:countPreviewMain.main}), (err)=>{
        if (err){
            console.error(err);
        }
        console.log('Main counter incremented');    
    });
    next();
});

app.use('/about',(req, res, next)=>{
    countPreviewAbout.about = countPreviewAbout.about + 1;
    fs.writeFile(path.join(staticFolder, aboutCounterFileName),JSON.stringify({about:countPreviewAbout.about}), (err)=>{
        if (err){
            console.error(err);
        }
        console.log('About counter incremented');    
    });
    next();
});

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'content', 'main.html'));
});

app.get('/about', (req, res)=>{
    res.sendFile(path.join(__dirname, 'content', 'about.html'));
});

app.listen(http_port, ()=>{
    console.log(`Server started on port ${http_port}`);
});
