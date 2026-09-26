import dbConnect from '@/lib/mongodb'
import Contact from '@/models/Contact'

export async function POST(req) {
  try {
    await dbConnect()
    const { name, email, message } = await req.json()
    const contact = await Contact.create({ name, email, message })
    return Response.json({ success: true, message: 'Message Sent Successfully!', data: contact })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
