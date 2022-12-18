/** @type {import('next').NextConfig} */

module.exports = { 
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['s3.amazonaws.com', 'm.media-amazon.com', 'cdn.pixabay.com', 'i.ibb.co']
  }
}
