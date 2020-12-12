
import * as mongoose from "mongoose";

export default (db: string) => {
  const mongoConnection = () => {
    
    mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => {
        return console.log(`Successfully connected to ${db}`);
      })
      .catch(error => {
        console.log("Error connecting to database: ", error);
        return process.exit(1);
      });
  };
  mongoConnection();


  mongoose.connection.on("disconnected", mongoConnection);
};