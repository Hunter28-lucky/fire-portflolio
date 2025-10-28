# 🔧 Firebase Authentication Setup Guide

## Issue: Google Sign-In Not Working on Admin Page

### ✅ Quick Fix Steps

#### 1. **Enable Google Sign-In in Firebase Console**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `krish-goswami-portfolio-qb9yp`
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Google** provider
5. Click **Enable**
6. Add your support email: `krrishyogi18@gmail.com`
7. Click **Save**

#### 2. **Add Authorized Domains**

In the same Authentication section:
1. Scroll down to **Authorized domains**
2. Make sure these domains are listed:
   - `krishgoswami.me` ✅
   - `www.krishgoswami.me` ✅
   - `localhost` (for local development) ✅
   - `krish-goswami-portfolio-qb9yp.firebaseapp.com` ✅

3. If `krishgoswami.me` is missing, click **Add domain** and add it

#### 3. **Verify Firebase Configuration**

Check that these are correctly set in `src/lib/firebase/client.ts`:
```typescript
const firebaseConfig = {
  authDomain: "krish-goswami-portfolio-qb9yp.firebaseapp.com", // ✅ Critical
  apiKey: "AIzaSyBiS2sr84cCa7ojoRD9Kr3WkSzo1rw_xB4",
  projectId: "krish-goswami-portfolio-qb9yp",
  // ... rest of config
};
```

## 🔍 Testing the Fix

### On Local Development (localhost:9002)
1. Visit `http://localhost:9002/admin`
2. Click "Login with Google"
3. Select your Google account (`krrishyogi18@gmail.com`)
4. Should redirect to admin panel

### On Production (krishgoswami.me)
1. Visit `https://krishgoswami.me/admin`
2. Click "Login with Google"
3. If popup is blocked, it will automatically try redirect method
4. Login should work

## 🐛 Troubleshooting

### Error: "Popup blocked"
**Solution**: The updated code now automatically falls back to redirect method

### Error: "Unauthorized domain"
**Solution**: Add your domain to Firebase Console → Authentication → Authorized domains

### Error: "This app is not authorized"
**Solution**: 
1. Enable Google Sign-In provider in Firebase Console
2. Add support email

### Login works on localhost but not on krishgoswami.me
**Solution**: 
1. Add `krishgoswami.me` to authorized domains
2. Wait 5-10 minutes for DNS propagation
3. Clear browser cache and try again

## 📝 Code Changes Made

### 1. Enhanced Error Handling
- Added detailed error logging
- User-friendly error messages
- Automatic fallback to redirect method

### 2. Dual Login Methods
- **Popup method**: Better UX, works on desktop
- **Redirect method**: More reliable, works on mobile
- Automatic fallback if popup is blocked

### 3. Redirect Result Handling
- Checks for redirect result on page load
- Handles authentication after redirect

## 🔐 Security Notes

- Only `krrishyogi18@gmail.com` can access admin panel
- Email check happens in `src/app/admin/page.tsx`
- To add more admins, update the `authorizedAdminEmails` array:

```typescript
const authorizedAdminEmails = [
  'krrishyogi18@gmail.com',
  // Add more emails here
];
```

## 🚀 Deployment

After making changes:
```bash
git add -A
git commit -m "Fix: Enhanced Firebase authentication with redirect fallback"
git push origin master
```

Firebase App Hosting will auto-deploy in ~2-5 minutes.

## ✨ What's Fixed

- ✅ Added redirect method as fallback
- ✅ Better error messages
- ✅ Popup blocked detection
- ✅ Account selection prompt
- ✅ Redirect result handling
- ✅ Comprehensive error logging

## 📞 Still Not Working?

1. **Check browser console** (F12) for error messages
2. **Try incognito mode** (clear cache issues)
3. **Verify email**: Make sure you're using `krrishyogi18@gmail.com`
4. **Check Firebase Console**: Look for any error logs in Firebase Console → Authentication → Users

---

**Last Updated**: October 28, 2025
