// config
export const BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
export const CHANNEL_ID = process.env.SLACK_CHANNEL_ID;
export const ALCHEMY_AUTH_TOKEN = process.env.ALCHEMY_AUTH_TOKEN;
const RAW_ADDRESS_LIST = process.env.ADDRESS_LIST;

if (!BOT_TOKEN || !CHANNEL_ID || !RAW_ADDRESS_LIST || !ALCHEMY_AUTH_TOKEN) throw new Error('Missing env vars');

export const ADDRESS_LIST = RAW_ADDRESS_LIST.split(',');
