import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then(m => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const ContactSchema = new mongoose.Schema({
  name: String, email: String, message: String, createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    const saved = await Contact.create(data);
    return Response.json({ success: true, saved });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ status: "API WORKING - POST to this endpoint" });
}
