const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
const users = {
    user_list
    :[
        {
            username: "bj",
            pwd: "pass424"
        }
    ]
}

const isPasswordOk = (pwd) => {
    return pwd.length >= 8 && /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && /[0-9]/.test(pwd);
}

const findUserByName = (username) => {
    return users['user_list'].filter( (user) => user['username'] === username);
}

const addUser = (user) => {
    const {username, pwd} = user;
    if (isPasswordOk(pwd) === false){
        return null;
    } else {
        users['user_list'].push(user);
        return user;
    }
}

// get users, if request sends a name filter then it'll filter otherwise return all users
app.get('/users', (req, res) => {
    const name = req.query.username;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

app.post('/account/register', (req, res) => {
    let userToAdd = req.body;
    if (addUser(userToAdd) === null){
        return res.status(401).send("Bad Password");
    } else {
        return res.status(201).send("Created");
    }
});

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
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      
