import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import context from "./context";

dotenv.config();

//Start the server
(async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("MongoDB connected");

  const server = new ApolloServer({ typeDefs, resolvers, context });
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();
