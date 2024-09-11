import mongoose from "mongoose";

export const ConnectDb = async () => {
  try {
    mongoose.connect(`${process.env.MONGO_URI!}/${"NEXTAUTH"}`);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MONGO DB CONNECTED");
    });

    connection.on("error", (error) => {
      console.log("MONGO DB connection  error",error);

      process.exit();
    });
  } catch (error) {
    console.log("db coonection faild while connecting the DB", error);
  }
};
