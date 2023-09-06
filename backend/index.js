const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
// var router = express.Router();




// app.post('/auth', async(req, res) => {
//     // let userExists = false;
//     // console.log("finding : " + req.body.username + " with password : " +req.body.password);

//     // Auth.findOne({username : req.body.username})
//     //             .then((userNameExist) => {
//     //                 if(userNameExist){
//     //                     console.log("username exists");
//     //                     console.log(userNameExist.password);
//     //                     if(userNameExist.password === req.body.password){
//     //                         console.log("password matches ");
//     //                         return res.status(200).json({code : 1,name : userNameExist.name, isRec : 0});
                            
//     //                     }else res.status(401).json({code : 0});
//     //                 } 

//     //             }).catch(err => {console.log(err);});

//     // Recregistration.findOne({username : req.body.username})
//     // .then((recruterExists) => {
//     //     if(recruterExists){
//     //         console.log("username exists");
//     //         console.log(recruterExists.password);
//     //         if(recruterExists.password === req.body.password){
//     //             console.log("password matches ");
//     //             return res.status(200).json({code : 1,name : recruterExists.name,isRec : 1});

//     //         }else res.status(401).json({code : 0});
//     //     } 

//     // }).catch(err => {console.log(err);});
    

// });


// app.post('/auth/register', (req, res) => {

//     const {username, password, name} = req.body;
//     if(!username || !password || !name ){
//         console.log("Please the Enter details");

//         return res.status(422).json({code : 0});
//     }

//     Auth.findOne({username : username})
//     .then((userExist) => {
//         if(userExist){
//             return res.status(422).json({code: 2, error : "Email alredy exist"})
//         }

//         const newUser = new Auth({username,password,name});
//         console.log(newUser);
        
//         newUser.save();
//         res.json(newUser);
        
//     }).catch(err => {console.log(err);});



// })




app.get('/downloadit',async(req,res)=>{
    console.log("-------------Fetching----------");
    console.log(req.body);
    // Jobs.find().then((data)=>{
    //     data=res.json(data)
    // }).then(()=>console.log(data))
    const response = {"name" : "bozz"};
        // console.log('response', response)
    // res.send(response)
    res.send(response);
})






app.listen(3001, ()=> {
    console.log("Server started on port 3001");
})