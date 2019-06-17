echo "pulling from origin master..."

git fetch origin master

git reset --hard origin/master

echo "initiating build..."

npm run build

echo "restarting server..."

pm2 restart server