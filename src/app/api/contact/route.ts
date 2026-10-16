import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createContactEnquiry } from '@/lib/db';

function generateEnquiryCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomStr = '';
  const bytes = crypto.randomBytes(6);
  for (let i = 0; i < 6; i++) {
    randomStr += chars[bytes[i] % chars.length];
  }
  return `CHARMS-ENQ-${randomStr}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, mobile, subject, message } = body;

    // Validate that all required fields are present
    if (
      !name ||
      typeof name !== 'string' ||
      !name.trim() ||
      !email ||
      typeof email !== 'string' ||
      !email.trim() ||
      !mobile ||
      typeof mobile !== 'string' ||
      !mobile.trim() ||
      !subject ||
      typeof subject !== 'string' ||
      !subject.trim() ||
      !message ||
      typeof message !== 'string' ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: 'All fields (name, email, mobile, subject, message) are required.' },
        { status: 400 }
      );
    }

    const enquiryCode = generateEnquiryCode();

    const enquiry = await createContactEnquiry({
      enquiryCode,
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return NextResponse.json({
      success: true,
      enquiryCode: enquiry.enquiryCode,
    });
  } catch (error) {
    console.error('Failed to submit contact enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error. Failed to submit contact enquiry.' },
      { status: 500 }
    );
  }
}
