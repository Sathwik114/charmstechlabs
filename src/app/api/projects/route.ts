import { NextResponse } from 'next/server';
import { getPublishedProjects } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category');
    const degree = searchParams.get('degree');

    const projects = await getPublishedProjects({
      categoryId,
      degree,
    });
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
