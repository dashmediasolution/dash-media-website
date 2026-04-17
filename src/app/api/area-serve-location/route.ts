import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!prisma.areaServeLocation) throw new Error("Prisma Client is outdated. Stop your terminal, run 'npx prisma generate', and restart 'npm run dev'.");

    const locations = await prisma.areaServeLocation.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(locations);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!prisma.areaServeLocation) throw new Error("Prisma Client is outdated. Stop your terminal, run 'npx prisma generate', and restart 'npm run dev'.");

    const { 
      name, slug, description, heroHeading, heroSubheading, 
      strategyHeading, strategySubheading, servicesHeading, 
      workflowHeading, workflowSubheading, audienceHeading, 
      audienceSubheading, faqHeading, faqSubheading, 
      metaTitle, metaDescription, isActive 
    } = body;
    
    const newLocation = await prisma.areaServeLocation.create({
      data: { 
        name, slug, description, heroHeading, heroSubheading, 
        strategyHeading, strategySubheading, servicesHeading, workflowHeading, workflowSubheading, 
        audienceHeading, audienceSubheading, faqHeading, faqSubheading, metaTitle, metaDescription, isActive 
      },
    });
    return NextResponse.json(newLocation, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Failed to create location', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!prisma.areaServeLocation) throw new Error("Prisma Client is outdated. Stop your terminal, run 'npx prisma generate', and restart 'npm run dev'.");

    const { 
      id, name, slug, description, heroHeading, heroSubheading, 
      strategyHeading, strategySubheading, servicesHeading, 
      workflowHeading, workflowSubheading, audienceHeading, 
      audienceSubheading, faqHeading, faqSubheading, 
      metaTitle, metaDescription, isActive 
    } = body;
    
    const updatedLocation = await prisma.areaServeLocation.update({
      where: { id },
      data: { 
        name, slug, description, heroHeading, heroSubheading, 
        strategyHeading, strategySubheading, servicesHeading, workflowHeading, workflowSubheading, 
        audienceHeading, audienceSubheading, faqHeading, faqSubheading, metaTitle, metaDescription, isActive 
      },
    });
    return NextResponse.json(updatedLocation);
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update location', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    if (!prisma.areaServeLocation) throw new Error("Prisma Client is outdated. Stop your terminal, run 'npx prisma generate', and restart 'npm run dev'.");

    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.areaServeLocation.delete({ where: { id } });
    return NextResponse.json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete location' }, { status: 500 });
  }
}