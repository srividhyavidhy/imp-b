const User = require('../models/User');
const csv = require('csvtojson');

const CsvParser = require('json2csv').Parser;

const users = async(req,res)=>{
          try{
             const userData = await User.find({});
             res.status(200).send({result:true, data:userData});       
          } catch (error) {
                    res.status(400).send({result:false,msg:error.massage});
          }
}

const importUser = async(req,res)=>{
          try{
             const userData = [];
             csv()
             .fromFile(req.file.path)
             .then(async(response)=>{
                    console.log(response);
                    for(var x=0; x < response.length; x++){
                              userData.push({
                                        name:response[x].Name,
                                        email:response[x].Email,
                                        mobile:response[x].Mobile,
                              });
                    }
                    await User.insertMany(userData);
             });
             res.status(200).send({result:true, msg:'User Imported Successfully'});       
          } catch (error) {
                    res.status(400).send({result:false,msg:error.massage});
          }
}


const exportsUser = async(req,res)=>{
          try{
                    let users = [];

             const userData = await User.find({});

             userData.forEach((user)=>{
                    const {id, name, email, mobile} = user;
                    user.push({ id, name, email, mobile});
             });
             const json2csvParser = new CsvParser();
             const Csv = json2csvParser.parser(users);
             res.setHeader('Content-Type', 'application/octet-stream');
             res.attachment('Users.csv');
             res.status(200).send(csv);       
          } catch (error) {
                    res.status(400).send({result:false,msg:error.massage});
          }
}

module.exports ={
          users,
          importUser,
          exportsUser
}