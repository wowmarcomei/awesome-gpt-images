/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://awesome-gpt-images.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/api/*', '/_next/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/_next/*'],
      },
    ],
    additionalSitemaps: [
      'https://awesome-gpt-images.com/sitemap.xml',
    ],
  },
}; 