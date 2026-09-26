import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const contact = await Contact.create(body);
    return Response.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
