// import { MongoClient, ServerApiVersion } from "mongodb";
// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@haluaauto.uxxwz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// let dbInstance = null;
// const listDb = async (client) => {
//   const databases = await client.db().admin().listDatabases();
//   console.log(databases);
// };
// export const connectDB = async () => {
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverApi: ServerApiVersion.v1,
//   });
//   // connect client to DB
//   await client.connect();

//   dbInstance = client.db(process.env.DB_NAME);
// };
// export const getDB = () => {
//   if (!dbInstance) throw new Error("Must connect to Database first!");
//   return dbInstance;
// };
import mongoose from "mongoose";
const connectDB = () => {
  const conn = mongoose.createConnection(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@haluaauto.uxxwz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  conn.on("connected", function () {
    console.log(`MongoDB:: connected :: ${this.name}`);
  });
  conn.on("disconnected", function () {
    console.log(`MongoDB :: disconnected:: ${this.name}`);
  });
  conn.on("error", function (error) {
    console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
  });

  // return conn;
  return conn;
};
export const newMongoDBConn = connectDB();
