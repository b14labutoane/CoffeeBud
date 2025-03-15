import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./api/dao/restaurantsDAO.js" 

dotenv.config()
const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

MongoClient.connect(
  process.env.RESTREVIEWS_DB_URI,
  {
      useNewUrlParser: true,  
      useUnifiedTopology: true, 
      wtimeoutMS: 2500,
  }
  )
  .then(async client => {
    await RestaurantsDAO.injectDB(client)
    console.log("✅ Successfully connected to MongoDB");

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  })