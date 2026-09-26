import mongoose from 'mongoose';

export async function GET() {
  return Response.json({ message: "Contact API LIVE - atlas-green-zebra" });
}

export async function POST(req) {
  try {
    const uri = process.env.MONGODB_URI;
    if(!uri) return Response.json({error: "MONGODB_URI missing in Vercel"}, {status: 500});
    if(mongoose.connection.readyState === 0) await mongoose.connect(uri);
    const body = await req.json();
    const result = await mongoose.connection.db.collection("contacts").insertOne({...body, createdAt: new Date()});
    return Response.json({ success: true, id: result.insertedId });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, {status: 500});
  }
}
