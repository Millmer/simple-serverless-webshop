# front
Vue.js project using [tailwindcss](https://tailwindcss.com/docs) (utility based css classes) with PostCSS to purge unused classes (reduce bulk) and stripe integration for the checkout.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Deploy
Make sure you have the the production env vars setup correctly:
- VUE_APP_STRIPE_PUBLIC_KEY -> The stripe public checkout key
- VUE_APP_STRIPE_REDIRECT_URL -> The URL this site is hosted on so stripe knows how to come back (the root URL basically)
- VUE_APP_BE_URL -> The URL of the BE Lambda function

Set up an S3 bucket and simply replace the variables in the `deploy` script in the `package.json` with your S3 Bucket URL and AWS Profile. Then run:
```
npm run deploy
```
