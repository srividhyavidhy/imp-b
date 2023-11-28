const express = require('express');
const user = express();
const bodyParser = require("body-parser")
user.use(bodyParser.json());
user.use(bodyParser.urlencoded({extended:true}));

const multer = require("multer");
const path = require("path");

user.use(express.static(path.resolve(__dirname,'public')));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads')
    },
    filename:(req,file,cb)=>{
      cb(null,file.originalname)
    }
});

const upload = multer({storage:storage});

const userController = require("../controllers/userController");

user.post('/import-user',upload.single('file'),userController.importUser);

user.get('/users',userController.users);


user.get('/export-user', userController.exportsUser);



module.exports = user;