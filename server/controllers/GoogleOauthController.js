
const GoogleOauthMiddleware = {};

GoogleOauthMiddleware.getGoogleAccesToken = (req, res, next) => {
    
    // code is the authorization code that is provided by client side. *client side got this code from google*
    const {code} = req.body;
    //Google Oauth options
    let rootUrl = 'https://oauth2.googleapis.com/token';

    const options = {
        code: code,
        ////////// change this to env variables later ///////
        client_id: '1021401509525-0lggmm4a9ln7cqbmer2dqlctednoghcv.apps.googleusercontent.com',
        client_secret: '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',
        redirect_uri: 'http://localhost:3000/oauth', ////////////////////////// needs to be changed to the dashboard url ////////////////////
        grant_type: 'authorization_code',
    }

    const qs = new URLSearchParams(options);
    const TokenUrl = `${rootUrl}?${qs.toString()}`;
    console.log(TokenUrl);

    // fetch the access token
    fetch(TokenUrl,{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then((data) =>{    
        return data.json(); // parse the data to json
    })
    .then((data) => {

        res.locals.token = data;
        next();
    })
    .catch((err) => {
        next({
            log:`error exist in oauth.controller.ts in getGoogleAccesToken middleware:  ${err}`,
            status: 500,
            message:`error occurred ${err}`
    })
    })
}
/////////////////////////////////////////////
// use the access token to get the user info inorder for us to save it in DB

GoogleOauthMiddleware.getUserInfo = async (req, res, next) => {
    const {access_token, expires_in, id_token} = res.locals.token;
    try{
        let data;
        let userInfo = {};

        //For Google Oauth
        data = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,{
            headers:{'Authorization': `Bearer ${id_token}`}
        })

        userInfo = await data.json()
        
        res.locals.userInfo = userInfo;
        next();
    }
    catch(err){
        next({
            log:`error exist in GoogleOauthController.js in getUserInfo middleware:  ${err}`,
            status: 500,
            message:`error occurred ${err}`
        });
    };
};

module.exports = GoogleOauthMiddleware;