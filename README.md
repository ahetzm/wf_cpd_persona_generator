# Persona Generator

## Backend
Node sever connecting to OpenAI API
### Development
```shell
cd backend
npm install
npm run dev
```

### Deployment
Deployment using "caprover"
1. create ".tar" file from src folder (inlcuding "captain-definition")
2. create new app in caprover
3. upload ".tar" to caprover
4. deploy and put correct "env" variables analog to ".env.example"
5. enable HTTPS and make app accessible publicly

## Frontend
React native with expo

### Development
```shell
cd frontend
npm install
npx expo start
```
