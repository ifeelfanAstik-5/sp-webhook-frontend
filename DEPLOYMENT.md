# 🚀 Vercel Deployment Guide

## 📋 Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **GitHub Integration** - Connect your GitHub account to Vercel
3. **Backend Deployed** - Ensure your backend is deployed and accessible

## 🔧 Configuration Files Created

### **1. vercel.json**
- Build configuration for Vercel
- Static file serving
- Environment variable mapping
- Security headers
- SPA routing support

### **2. .vercelignore**
- Excludes unnecessary files from deployment
- Reduces build time and deployment size

### **3. vercel-build.sh**
- Custom build script for Vercel
- Environment validation
- Build verification

### **4. .env.example**
- Environment variable template
- Production configuration guide

## 🚀 Deployment Steps

### **Method 1: Vercel CLI**

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy from Frontend Directory**
```bash
cd /home/darkenvy-5/spenza/sp-webhook-frontend
vercel --prod
```

4. **Set Environment Variables**
```bash
vercel env add VITE_API_URL production
# Enter your backend URL when prompted
```

### **Method 2: GitHub Integration (Recommended)**

1. **Push to GitHub**
```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

2. **Import Project in Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your frontend repository
   - Vercel will auto-detect the configuration

3. **Configure Environment Variables**
   - In Vercel dashboard → Settings → Environment Variables
   - Add `VITE_API_URL` with your backend URL
   - Example: `https://your-backend.vercel.app`

## 🔧 Environment Variables

### **Required Variables**
```bash
VITE_API_URL=https://your-backend-url.vercel.app
```

### **Optional Variables**
```bash
VITE_LOCALTUNNEL_SUBDOMAIN=spenza-webhook
NODE_ENV=production
```

## 🌐 Deployment URLs

After deployment, your app will be available at:
- **Production**: `https://your-project-name.vercel.app`
- **Preview**: `https://your-branch-name.your-project-name.vercel.app`

## 🔍 Troubleshooting

### **Common Issues**

1. **Build Failures**
   - Check that `package.json` has correct build script
   - Verify all dependencies are installed
   - Check Vercel build logs for specific errors

2. **API Connection Issues**
   - Ensure `VITE_API_URL` is set correctly
   - Verify backend is deployed and accessible
   - Check CORS configuration on backend

3. **Routing Issues**
   - SPA routing is configured in `vercel.json`
   - All routes redirect to `index.html`
   - React Router handles client-side routing

### **Debug Commands**

```bash
# Local build test
npm run build

# Vercel local development
vercel dev

# Check deployment logs
vercel logs
```

## 📊 Build Optimization

The configuration includes:

- **Code Splitting**: Automatic with Vite
- **Asset Optimization**: Vite handles optimization
- **Caching Headers**: Static assets cached for 1 year
- **Security Headers**: XSS protection, content type options
- **Compression**: Automatic gzip compression

## 🔄 CI/CD Integration

### **Automatic Deployments**
- **Main Branch** → Production
- **Pull Requests** → Preview deployments
- **Other Branches** → Preview deployments

### **Deployment Hooks**
The build script automatically:
- Installs dependencies
- Sets environment variables
- Builds the application
- Verifies build output

## 🎯 Production Checklist

Before deploying to production:

- [ ] Backend is deployed and accessible
- [ ] `VITE_API_URL` environment variable set
- [ ] All environment variables configured
- [ ] Local build test passes (`npm run build`)
- [ ] CORS configured on backend
- [ ] SSL certificates (automatic with Vercel)

## 📈 Performance

The Vercel configuration provides:
- **Edge Network**: Global CDN distribution
- **Automatic HTTPS**: SSL certificates included
- **Zero Config Deployment**: Automatic optimization
- **Instant Rollbacks**: Previous versions available
- **Analytics**: Built-in performance monitoring

---

## 🎉 Ready for Deployment!

Your frontend is now fully configured for Vercel deployment with:

- ✅ Optimized build configuration
- ✅ Environment variable management
- ✅ Security headers
- ✅ SPA routing support
- ✅ Production-ready settings

**Deploy now and share your webhook management system with the world!** 🚀
