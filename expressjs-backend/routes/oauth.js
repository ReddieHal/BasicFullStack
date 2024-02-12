import express from "express";
import dotenv from "dotenv";
import { generateAccessToken } from "./../models/auth.js";
import userServices from "./../models/userServices.js";
const authRouter = express.Router();

dotenv.config();

import { OAuth2Client } from "google-auth-library";

async function maybeMakeNewUser(username, randomPassword) {
    const user = await userServices.findUserByName(username);
    if (user === null){
        await userServices.addUser(username, randomPassword);
    }
}

async function getUserData(access_token) {

    const response = await fetch(

        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`

    );

    const data = await response.json();
    console.log("data", data);
    await maybeMakeNewUser(data.name, data.sub);
    const token = await generateAccessToken(data.name);
    return token;

}




authRouter.get("/", async function (req, res, next) {

    const code = req.query.code;
    
    try {

        const redirectUrl = "https://localhost:8000/oath";
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
         redirectUrl
        );
        
        const result = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(result.tokens);
        const user = oAuth2Client.credentials;
        // show data that is returned from the Google call
        const token = await getUserData(user.access_token);
                
     // call your code to generate a new JWT from your backend, don't reuse Googles
        res.redirect(303, `https://localhost:3000/redirect?token=${token}`);

        } catch (err) {
                     console.log("Error with signin with Google", err);
                     res.redirect(303, "https://localhost:3000/");
        }
});

export default authRouter;