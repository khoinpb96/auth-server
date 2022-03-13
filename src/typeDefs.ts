import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]!
    login: Res!
  }

  type Mutation {
    createUser(username: String, password: String): CreateUserRes!
    login(username: String, password: String): Res
    deleteUsers: Res!
  }

  type Res {
    code: Int
    message: String
  }

  type CreateUserRes {
    code: Int
    message: String
    data: User
  }

  type User {
    username: String
    password: String
  }
`;

export default typeDefs;
