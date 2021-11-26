const UserSchema =`
  type User {
    userId: ID,
    firstname: String,
    lastname: String,
    country: String,
    isAbove18: Boolean,
    emailId: String,
    password: String,
    referralId: String,
    wallet: Float,
    jwtToken: String,
    verificationCode: String,
    isActive: Boolean,
    notificationEnabled:Boolean,
    companyId: String,
    companyName: String,
    industryId: Int,
  }
   type Query {
    userById(userId:ID!):User
    userByEmailId(emailId:String!):User
 
}
 type Mutation {
    createUser(firstname:String!,lastname:String!,country:String!,isAbove18:Boolean!,emailId:String!,password:String!):User
    updateUser(userId:ID!,firstname:String,lastname:String,country:String,isAbove18:Boolean,emailId:String,password:String,isActive:Boolean,notificationEnabled:Boolean,companyId:String,companyName:String,industryId:Int):User
    deleteUser(userId:ID!):String
   
  }
`;

module.exports = UserSchema;
