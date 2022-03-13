import jwt from "jsonwebtoken";

const context = ({ req }: any) => {
  let role;
  const token = req?.headers?.authorization?.split(" ")[1];
  jwt.verify(
    token,
    process.env.USER_ACCESS_TOKEN_SECRET!,
    (_: any, data: any) => {
      if (data) role = "user";
      return;
    }
  );
  return { role };
};

export default context;
