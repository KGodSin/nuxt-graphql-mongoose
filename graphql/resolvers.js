const users = [
  {
      _id: "1",
      username: "ksindev@naver.com",
      password: "ksindev"
  }  
];




const resolvers = {
    Query: {
        login: (_, { username, password}) => login(username, password)
    },
    Mutation: {

    }
};



export default resolvers;