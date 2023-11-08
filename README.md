# Account Notifier

This is a Vercel function that listens for Alchemy's [_Address Activity Webhook_](https://docs.alchemy.com/reference/address-activity-webhook)
to create notifications in a Slack channel.

This webhook tracks the account activity events of an array of addresses, these should be set in both the webhook and Alchemy.
Additional to the addresses list, a same length array of names must be provided.  

Index:

1. [Setting up local environment](#local-environment)
2. [Alchemy webhook configuration](#webhook-configuration)
3. [Deployment](#deployment)
4. [Contributing](#contributing)

## Local Environment

### Requirements

- Node.js (v18 or later recommended)
- npm (v6 or later recommended)
- Vercel CLI (v23 or later recommended)
- ngrok

### Setup

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
   pnpm install
   ```

### Local Development

Create the env file and fill the required vars

```
cp .env.example > .env
```

To start the local development server, run:

```
vercel dev
```

This starts the server on `localhost:3000`.

### Testing

#### Local Host

Use the following request to test the code.

```
curl --location 'localhost:3000/api' \
--header 'Content-Type: text/plain' \
--data '{
  "webhookId": "wh_foo",
  "id": "fooid_foobody",
  "createdAt": "2023-11-03T16:06:02.931Z",
  "type": "ADDRESS_ACTIVITY",
  "event": {
    "network": "ETH_MAINNET",
    "activity": [
      {
        "fromAddress": $FROM,
        "toAddress": $TO,
        "blockNum": "0x11a9c46",
        "hash": "0xabcd...",
        "value": 420,
        "asset": "USDC",
        "category": "token",
        "rawContract": {
          "rawValue": "0x000000000000000000000000000000000000000000000000000000039f712f63",
          "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "decimals": 6
        },
        "log": {}
      }
    ]
  }
}'
```

To expose your local server to the internet for testing with external services, use `ngrok`. First, install `ngrok` globally:

```
npm install -g ngrok
```

Then, in a separate terminal window, run:

```
ngrok http 3000
```

`ngrok` will provide a URL that you can use to access your local server from the internet.

To test your serverless functions, you can make POST requests to `http://localhost:3000/api/handler` (or the corresponding `ngrok` URL).

Check this [guide](https://docs.alchemy.com/reference/notify-api-quickstart#test-webhooks-with-ngrok) to get further information.

## Webhook Configuration

This notifier uses the Alchemy [Address Activity Webhook](https://docs.alchemy.com/reference/address-activity-webhook).

Please visit [this guide](https://docs.alchemy.com/reference/address-activity-webhook#how-to-set-up-address-activity-webhook) to see how to setup a new webhook. Consider using the [webhook api](https://docs.alchemy.com/reference/create-webhook) to quickly create the webhooks for the array of addresses in just one HTTP request.

## Deployment

To deploy your project to Vercel, run:

```
vercel
```

This command builds and deploys your project, and provides a live URL where you can access it. Use that URL in your Alchemy dashboard.

## Contributing

If you wish to contribute to this project, please first discuss the change you wish to make via issue, before sending a pull request.

### todo

- [] add signature verification. See more [here](https://docs.alchemy.com/reference/notify-api-quickstart#find-your-signing-key). 