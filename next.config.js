module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "dl.airtable.com"
    ]
  },
  headers: () => {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ],
      },
    ]
  },
}
