import gql from "graphql-tag";
import { print } from "graphql";

const LOGIN = gql`
query login($email:String!, $password:String!) {
    login(email:$email, password:$password) { 
        message
        code
    }
}
`;




let queries = {
    LOGIN
};

Object.keys(queries).forEach((el) => {
    queries[el] = print(queries[el]);
});

queries.URL = "/graphql";

export default queries;