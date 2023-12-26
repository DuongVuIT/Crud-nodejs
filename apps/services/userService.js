const { ObjectId } = require("mongodb");
var config = require("./../../config/setting.json");
class UserService {
  databaseConnection = require("./../database/database");
  user = require("./../model/user");
  client;
  userDatabase;
  userCollection;
  constructor() {
    this.client = this.databaseConnection.getMongoClient();
    this.userDatabase = this.client.db(config.mongodb.database);
    this.userCollection = this.userDatabase.collection("btUser");
  }
  async updateUser(user) {
    console.log("Updating user");
    return await this.userCollection.updateOne(
      { _id: new ObjectId(user._id) },
      { $set: user }
    );
  }
  async deleteUser(id) {
    return await this.userCollection.deleteOne({ _id: new ObjectId(id) });
  }
  async insertUser(user) {
    return await this.userCollection.insertOne(user);
  }
  // async getUser(id) {
  //   return await this.productCollection.findOne({ _id: new ObjectId(id) }, {});
  // }
  async getUserById(userId) {
    try {
      const user = await this.userCollection.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getUserList() {
    const cursor = await this.userCollection.find({}, {});

    return await cursor.toArray();
  }
}
module.exports = UserService;
