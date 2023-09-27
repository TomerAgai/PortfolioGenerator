import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';

const app = express();

// Connect to MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');

// Replace this with the actual password
const password = "tomer123";

// URL-encode the password
const encodedPassword = encodeURIComponent(password);
const uri = `mongodb+srv://tomeragai:${encodedPassword}@cluster0.9nmroqk.mongodb.net/mydatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
