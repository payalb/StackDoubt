const db = require('../models')
const { AuthenticationError } = require('apollo-server-express');
const jsonwebtoken = require('jsonwebtoken')
const crypto = require('crypto-js')
var getfilesize = require("filesize");
const config = require(__dirname + "/../config/config.json")[process.env.NODE_ENV || "development"];
const { Op } = require("sequelize");
const algorithm  = config.algorithm, secretKey = config.secretKey

const AWS = require('aws-sdk');
global.fetch = require('node-fetch');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const { validate } = require('graphql');

const poolData = {
  UserPoolId: config.cognitoUserPoolId,
  ClientId: config.cognitoClientId
};

// Not added the region in config file since another region is already there.
AWS.config.update({ region: config.awsregion });
console.log("poolData is "+ JSON.stringify(poolData));
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
const userResolvers = {
 Query :{
  
    //implememnt userById method defined in schema
    userById: async (root,args,context,info) => {
      console.log("Accessed Email:>>>"+`${JSON.stringify(context.user)}`);
     // if (!context.user) return new AuthenticationError("Invalid User");
    //  let authUser = context.user;
      console.log("Token User Id: "+args.userId);
    //  if(authUser.userId!=args.userId) return new AuthenticationError("Invalid Access");
         return db.User.findByPk( args.userId).then(data => {
          console.log("user is:  "+ data)
          return data;
        }).catch(e=>{
          console.log(e);
        });

    },

  //implememnt userById method defined in schema
  userByEmailId: async (root,args,context,info) => {
    console.log(`>>>>> userByEmail Starts : ${JSON.stringify(args)}`);
      return db.User.findOne({ where : {emailId: args.emailId}}).then(user => {
      //  user.jwtToken = args.authToken;
        console.log(`<<<<< userByEmail Ends.`+ user);
        return user;
      });
      
  },

     

   Mutation : {
    createUser: (parent, args, info) => {
      console.log(`>>>>> createUser Starts : ${JSON.stringify(args)}`);
      return db.User.create({
        lastname: args.lastname,
        firstname: args.firstname,
        country: args.country,
        isAbove18: args.isAbove18,
        emailId: args.emailId,
        password: args.password,
        isActive: true
      }).then(newUser => {
        return newUser;
      });
    },
    deleteUser: (parent, args, info) => {
      console.log(`>>>>> deleteUser Starts : ${JSON.stringify(args)}`);
      return db.User.update({isActive: false},
      {
        where: {
          userId: args.userId
        }
      }).then(delUser => {
        console.log(`<<<<< deleteUser Ends.`);
        return "User Delete Successfully";
      });
    },

    updateUser: async (parent, args, info) => {
      console.log(`>>>>> updateUser Starts : ${JSON.stringify(args)}`);
      let olduser = await db.User.findByPk(args.userId);
      await db.User.update({
        firstname: args.firstname,
        lastname: args.lastname,
        country:  args.country,
        isAbove18:args.isAbove18,
        emailId: args.emailId,
        password:args.password,
        isActive: args.isActive,
        companyId: args.companyId,
        notificationEnabled:args.notificationEnabled,
        companyName:args.companyName,
        industryId: args.industryId
      },{ where: {
        userId: args.userId
      }
   
      })
      
      return olduser.reload().then(newUser => {
          console.log("new user is "+JSON.stringify(newUser))
        return newUser;
      });
    },
     ,
 User:{
 
 
}
  }


 module.exports = userResolvers
