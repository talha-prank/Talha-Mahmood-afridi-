import mongoose from 'mongoose';

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set in Vercel environment variables');
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 8000,
      })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Vercel Serverless Function Handler (Node.js runtime)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Contact API LIVE - atlas-green-zebra',
      database: 'connected-ready',
    });
  }

  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch {
          return res.status(400).json({ success: false, error: 'Invalid JSON payload' });
        }
      }

      const { name, email, message } = body || {};
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: 'Name, email, and message are required fields.',
        });
      }

      await connectDB();
      const db = mongoose.connection.db;
      const result = await db.collection('contacts').insertOne({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        createdAt: new Date(),
      });

      return res.status(201).json({
        success: true,
        id: result.insertedId,
        message: 'Message saved successfully to MongoDB',
      });
    } catch (e) {
      console.error('[API /api/contact error]:', e);
      return res.status(500).json({
        success: false,
        error: e.message || 'Database error occurred',
      });
    }
  }

  return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
}

// Web standard exports for Vercel Edge / Next.js
export async function GET() {
  return Response.json({
    success: true,
    message: 'Contact API LIVE - atlas-green-zebra',
  });
}

export async function POST(req) {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      return Response.json({ success: false, error: 'MONGODB_URI missing in Vercel' }, { status: 500 });
    }
    await connectDB();
    const body = await req.json();
    const result = await mongoose.connection.db.collection('contacts').insertOne({
      ...body,
      createdAt: new Date(),
    });
    return Response.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
