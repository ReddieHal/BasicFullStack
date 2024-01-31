import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import userServices from "./models/userServices.js";
import bcrypt from 'bcrypt';
import { authenticateUser, loginUser} from "./models/auth.js";
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const isPasswordOk = (pwd) => {
    return pwd.length >= 8 && /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && /[0-9]/.test(pwd);
}

// get users, if request sends a name filter then it'll filter otherwise return all users
app.get('/users', authenticateUser, async (req, res) => {
    const result = await userServices.getUsers()
    res.send(result)
      
});

app.post('/account/register', async (req, res) => {
    const username = req.body.username;
    const pwd = req.body.pwd;
    if (!isPasswordOk(pwd)){
        return res.status(401).send("Bad Password");
    }
    const doesUserExist = await userServices.findUserByName(username);
    if (doesUserExist){
        return res.status(401).send("User Exists");
    }
    const result = await userServices.addUser(username,pwd)
    if (result === null){
        return res.status(401).send("Bad Password");
    } else {
        return res.status(201).send("Created");
    }
});

app.post('/account/login', loginUser);
/*
app.post('/account/login', (req, res) => {
    
    const {username, pwd} = req.body;
    let result = findUserByName(username);
    if (result.length === 0){
        return res.status(401).send("No Such User");
    } else if (result[0]['pwd'] !== pwd){
        return res.status(401).send("Invalid Credentials");
    } else {
        randtoken = Math.floor(Math.random() * 10000);
        return res.status(200).send(randtoken.toString());
    }
}); */


app.get('/', (req, res) => {
    res.send('Hello World!');
});

https.createServer({
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/cert.pem')
}, app).listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
});      
