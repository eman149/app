const mongoose = require('mongoose');


const dbConnection = () => {
  mongoose
  .connect("mongodb+srv://eman:F4R1uCJPl8Je4PsY@atlascluster.c2m65lc.mongodb.net/")
    .then((conn) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    })
    // .catch((err) => {
    //   console.error(`Database Error: ${err}`);
    //   process.exit(1);
    // });
};

module.exports = dbConnection;
