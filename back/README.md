# back

Backend for simple webshop app. Contains 1 AWS Lambda function that connects to stripe to grab the products, formats them and returns back to the frontend.

### Deploy

First set the env var:
```
mv env.example .env.[STAGE]
```
Replace `STRIPE_SECRET_KEY` with the correct keys for where your deploying in the env file. Then install packages:
```
npm install
```

Change the name & region of the service to an appropriate one for your purpose and finally run
```
serverless deploy --stage [STAGE] --aws-profile [PROFILE] --env [STAGE]
```

In all of the above [STAGE] stands for the environment (so production, development etc)