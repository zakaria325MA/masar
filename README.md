# 🚀 MASAR CLONE PRO - Guide "En Ligne"

Had l-project m-soweb bach i-khdm online f GitHub, Vercel, w Render. 

## 🛠️ Step 1: MongoDB Atlas (Online Database)
1. Dkhol l [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Dir Create Cluster (Free).
3. Dir User w Password.
4. Kopi l **Connection String** w 7tha f l-fichier `server/.env` f blast `MONGODB_URI`.

## 📦 Step 2: GitHub
1. Dir Repo jdid f GitHub.
2. Push l-code kaml:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

## 🌐 Step 3: Deployment
### Backend (Server)
- Dir compte f [Render.com](https://render.com).
- Connecter GitHub dyalk.
- Ch-tar "Web Service" w khtar l-folder `server`.
- Dir l-Environment Variables (MONGODB_URI, JWT_SECRET) f Render.

### Frontend (Client)
- Dir compte f [Vercel.com](https://vercel.com).
- Connecter GitHub dyalk.
- Khtar l-folder `client`.
- Vercel ghadi i-dir kolchi bou7do!

---
**Note:** Ila bghiti n-zido l-Dashboard dyal Prof w Tilmid, ghir gouliha liya!
