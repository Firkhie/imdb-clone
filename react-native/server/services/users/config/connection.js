const { MongoClient } = require('mongodb')

class MongoDBConnection {
  static db = false
  static async connectToCluster() {
    let mongoClient;
    let uri = process.env.MONGO_DB_URI
    try {
      mongoClient = new MongoClient(uri);
      console.log('Connecting to MongoDB Atlas cluster...');
      await mongoClient.connect();
      console.log('Successfully connected to MongoDB Atlas!');
      this.db = mongoClient.db('p3c2')
      return mongoClient;
    } catch (error) {
      console.error('Connection to MongoDB Atlas failed!', error);
      throw error
    }
  }
}

module.exports = MongoDBConnection