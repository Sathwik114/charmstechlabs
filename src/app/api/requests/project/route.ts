import { NextResponse } from 'next/server';
import { createProjectRequest } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Generate Request Code dynamically: CHARMS-PRJ-[YEAR]-[RANDOM 5 DIGITS]
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const requestCode = `CHARMS-PRJ-${year}-${randomDigits}`;

    const newRequest = await createProjectRequest({
      requestCode,
      projectId: body.projectId || null,
      fullName: body.fullName,
      mobile: body.mobile,
      email: body.email,
      college: body.college,
      degree: body.degree,
      branch: body.branch,
      year: body.year,
      preferredContact: body.preferredContact || 'Email',
      message: body.message || '',
      status: 'New',
    });

    return NextResponse.json(
      { success: true, requestCode: newRequest.requestCode, message: 'Your project request has been received.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Project request error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit request' },
      { status: 500 }
    );
  }
}
