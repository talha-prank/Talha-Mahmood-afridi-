import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader ? authHeader.replace(/^Bearer\s+/i, '') : '';
    const { searchParams } = new URL(req.url);
    const password = searchParams.get('password');

    if (token !== 'admin123' && password !== 'admin123') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid admin credentials' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      count: contacts.length,
      database: 'MongoDB Atlas',
      contacts: contacts.map((c: any) => ({
        id: c._id.toString(),
        name: c.name,
        email: c.email,
        whatsapp: c.whatsapp,
        message: c.message,
        createdAt: c.createdAt,
      })),
    });
  } catch (error: any) {
    console.error('[GET /api/admin/contacts Error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
