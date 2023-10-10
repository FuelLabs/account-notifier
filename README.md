# Account Notifier

This is a Vercel function that listens for Alchemy's [_Address Activity Webhook_](https://docs.alchemy.com/reference/address-activity-webhook)
to create notifications in a Slack channel.

## Requirements

- Node.js (v14 or later recommended)
- npm (v6 or later recommended)
- Vercel CLI (v23 or later recommended)
- ngrok

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/FuelLabs/account-notifier.git
   ```

2. Navigate into the project directory:

   ```
   cd account-notifier
   ```

3. Install the dependencies:

   ```
   npm install
   ```

## Local Development

Create the env file and fill the required vars

```
cp .env.example > .env
```

To start the local development server, run:

```
vercel dev
```

This starts the server on `localhost:3000`.

To expose your local server to the internet for testing with external services, use `ngrok`. First, install `ngrok` globally:

```
npm install -g ngrok
```

Then, in a separate terminal window, run:

```
ngrok http 3000
```

`ngrok` will provide a URL that you can use to access your local server from the internet.

To test your serverless functions, you can make POST requests to `http://localhost:3000/api/handler` (or the corresponding `ngrok` URL). The functions expect the `x-discourse-event-type` header to be set to either `'post'` or `'topic'`.

## Deployment

To deploy your project to Vercel, run:

```
vercel
```

This command builds and deploys your project, and provides a live URL where you can access it.

## Contributing

If you wish to contribute to this project, please first discuss the change you wish to make via issue, before sending a pull request.