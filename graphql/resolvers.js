const users = [
    {
        email: "ksindev@naver.com",
        password: "ksindev"
    }  
];
  
const login = (email,password) => {
    const find = users.find((user) =>{
        return user.email === email && user.password === password;
    });

    if( find ) {
        return { 
            message: "",
            code: 0
        };
    } else {
        return {
            message: "아이디 혹은 비밀번호가 다릅니다.",
            code: 1
        };
    }
  };
  
const signup = (email,password) => {
    const find = users.find((user) => {
        return user.email === email;
    });

    if( !find ) {
        users.push({email,password});
        return {
            message: "",
            code: 0
        };
    } else {
        return {
            message: "중복된 이메일",
            code: 1
        };
    }
};

const resolvers = {
    Query: {
        login: (_, {email, password}) => login(email, password)
    },
    Mutation: {
        signup: (_, {email, password}) => signup(email, password)
    }
};



export default resolvers;