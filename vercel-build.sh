#!/bin/bash

# Vercel Build Script for Spenza Webhook Frontend

echo "🚀 Starting Vercel build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Set environment variables
echo "🔧 Setting up environment..."
if [ -z "$VITE_API_URL" ]; then
  echo "⚠️  VITE_API_URL not set, using default..."
  export VITE_API_URL="https://your-backend-url.vercel.app"
fi

# Build the application
echo "🏗️  Building application..."
npm run build

# Verify build output
if [ -d "dist" ]; then
  echo "✅ Build successful!"
  echo "📁 Build output:"
  ls -la dist/
else
  echo "❌ Build failed - no dist directory found"
  exit 1
fi

echo "🎉 Vercel build completed successfully!"
