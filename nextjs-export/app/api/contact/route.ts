import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, whatsapp, message } = body;

    // 1. Validation
    if (!name || !email || !whatsapp || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields (name, email, whatsapp, message) are required.' },
        { status: 400 }
      );
    }

    // 2. Database Insertion (MongoDB / Mongoose)
    await connectToDatabase();
    const newContact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp.trim(),
      message: message.trim(),
      createdAt: new Date(),
    });

    // 3. Email Notification via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.MY_EMAIL || 'talhamahmood1055@gmail.com';

    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: recipientEmail,
            subject: `New Portfolio Message from ${name}`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 8px;">
                <h2 style="color: #38bdf8; margin-top: 0;">New Contact Form Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #38bdf8;">${email}</a></p>
                <p><strong>WhatsApp:</strong> <a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}" style="color: #34d399;">${whatsapp}</a></p>
                <hr style="border: 0; border-top: 1px solid #334155; margin: 16px 0;" />
                <p><strong>Message:</strong></p>
                <blockquote style="margin: 0; padding: 12px 16px; background-color: #1e293b; border-left: 4px solid #38bdf8; border-radius: 4px;">
                  ${message.replace(/\n/g, '<br/>')}
                </blockquote>
              </div>
            `,
          }),
        });
      } catch (emailErr: any) {
        console.error('[Resend Error]:', emailErr?.message || emailErr);
      }
    }

    // 4. WhatsApp Notification via Twilio (Optional)
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_WHATSAPP_NUMBER;
    const myWhatsApp = process.env.MY_WHATSAPP_NUMBER || 'whatsapp:+923255691055';

    if (twilioSid && twilioToken && twilioNumber) {
      try {
        const auth = Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64');
        const params = new URLSearchParams();
        params.append('From', twilioNumber.startsWith('whatsapp:') ? twilioNumber : `whatsapp:${twilioNumber}`);
        params.append('To', myWhatsApp.startsWith('whatsapp:') ? myWhatsApp : `whatsapp:${myWhatsApp}`);
        params.append(
          'Body',
          `*New Portfolio Inquiry*\n*From:* ${name}\n*Email:* ${email}\n*WhatsApp:* ${whatsapp}\n*Message:* ${message}`
        );

        await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        });
      } catch (twilioErr: any) {
        console.warn('[Twilio Error]:', twilioErr?.message || twilioErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent!',
        contact: {
          id: newContact._id,
          name: newContact.name,
          email: newContact.email,
          whatsapp: newContact.whatsapp,
          message: newContact.message,
          createdAt: newContact.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[POST /api/contact Error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
