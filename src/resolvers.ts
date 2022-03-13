import bcrypt from "bcrypt";
import { UserModel } from "./models/User";
import jwt from "jsonwebtoken";

interface UserArgs {
  username: string;
  password: string;
}

const respone = (code: number, message: string) => ({
  code,
  message,
});

const resolvers = {
  Query: {
    users: async (_: any, __: any, context: any) => {
      console.log(context);
      return await UserModel.find();
    },
  },
  Mutation: {
    createUser: async (_: any, { username, password }: UserArgs) => {
      try {
        //Check input
        const regex = /\W/g;
        if (regex.test(username) || regex.test(password))
          return respone(404, "Unvalid username or password");

        //Check duplicate
        const isDuplicate = await UserModel.findOne({
          username,
        });
        if (isDuplicate) return respone(404, "Username is already existed");

        const user = await UserModel.create({
          username,
          password: await bcrypt.hash(password, 10),
        });
        return respone(200, `Successfully created user ${username}`);
      } catch (error) {
        return respone(404, error as string);
      }
    },

    deleteUsers: async () => {
      await UserModel.deleteMany();
      return respone(200, "All users have been deleted");
    },

    login: async (_: any, { username, password }: UserArgs) => {
      try {
        const user = await UserModel.findOne({
          username,
        });
        if (!user) return respone(404, `Cannot find ${username}`);
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth) return respone(404, "Login failed");
        const accessToken = jwt.sign(
          { username, password },
          process.env.USER_ACCESS_TOKEN_SECRET!,
          { expiresIn: "1h" }
        );
        return respone(200, accessToken);
      } catch (error) {
        return respone(404, error as string);
      }
    },
  },
};

export default resolvers;
