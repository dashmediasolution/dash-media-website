import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dashmediasolutions.com";

  // Define your static routes here (add any others you have in your app directory)
  const staticRoutes = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/terms',
    // '/faq',
    // '/pricing',
    '/careers',
    '/privacy',
    '/services',
    '/app-development',
    '/seo',
    '/content-marketing',
    '/email-marketing',
    '/native-marketing',
    '/pay-per-click',
    '/sem',
    '/social-media-marketing',
    '/web-design',
    '/video-marketing',

  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  // Fetch all blog URLs from your database
  const blogs = await prisma.blog.findMany({
    select: { blogUrl: true, updatedAt: true, imageUrl: true }
  });

  const blogEntries = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.blogUrl}`,
    lastModified: blog.updatedAt,
    images: typeof blog.imageUrl === 'string' ? [blog.imageUrl.startsWith('http') ? blog.imageUrl : `${baseUrl}${blog.imageUrl}`] : undefined,
  }));

  // Fetch distinct categories and their latest updated date along with an image
  const categories = await prisma.blog.findMany({
    distinct: ['category'],
    orderBy: [
      { category: 'asc' }, // Required by Prisma when using distinct
      { updatedAt: 'desc' }
    ],
    select: { category: true, updatedAt: true, imageUrl: true }
  });

  const categoryEntries = categories.map((cat) => ({
    url: `${baseUrl}/category/${slugify(cat.category)}`,
    lastModified: cat.updatedAt || new Date(),
    // images: cat.imageUrl ? [cat.imageUrl.startsWith('http') ? cat.imageUrl : `${baseUrl}${cat.imageUrl}`] : undefined,
  }));

  // Fetch active area serve locations
  const locations = await prisma.areaServeLocation.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true }
  });

  const locationEntries = locations.map((loc) => ({
    url: `${baseUrl}/${loc.slug}`,
    lastModified: loc.updatedAt || new Date(),
  }));

  return [
    ...staticEntries,
    ...blogEntries,
    ...categoryEntries,
    ...locationEntries,
  ];
}