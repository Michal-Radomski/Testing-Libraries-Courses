import { Collection, MongoClient, ObjectId, ServerApiVersion, WithId } from "mongodb";

import { User } from "./UsersModel";

const dbUri = "mongodb://127.0.0.1:27017/mydatabase";
const dbName = "mydatabase";

let usersCollection: Collection<User>;

const client = new MongoClient(dbUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connect(): Promise<void> {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const dataBase = client.db(dbName);
    usersCollection = dataBase.collection<User>("users");
  } catch (error) {
    console.error(error);
  }
}

export async function close(): Promise<void> {
  await client.close();
}

export async function addUser(user: User): Promise<string> {
  const result = await usersCollection.insertOne(user);
  return result.insertedId.toString();
}

export async function getUser(userId: string): Promise<WithId<User>> {
  const result = await usersCollection.findOne({
    _id: new ObjectId(userId),
  });
  return result;
}

export async function getAllUsers(): Promise<WithId<User>[]> {
  const result = usersCollection.find().toArray();
  return result;
}
