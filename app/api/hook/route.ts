import { NextRequest, NextResponse } from 'next/server';
import { AddressActivityResponse, ActivityCategory } from './types';
import { WebClient } from '@slack/web-api';


const ADDRESS = process.env.ADDRESS;
const BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const CHANNEL_ID = process.env.SLACK_CHANNEL_ID;
if (!ADDRESS || !BOT_TOKEN || !CHANNEL_ID) throw new Error('Missing env vars');



const client = new WebClient(BOT_TOKEN)
export async function POST(request: NextRequest) {
    const data: AddressActivityResponse = await request.json();
    console.log(request.method);

    if (data.type == 'ADDRESS_ACTIVITY') {
        data.event.activity.forEach(async (activity) => {

            const isOutgoing = activity.fromAddress === ADDRESS;
            const isTokenTransfer = activity.category === ActivityCategory.token;
            const isEtherTransfer = activity.category === ActivityCategory.external && activity.value > 0

            if (isOutgoing && (isTokenTransfer || isEtherTransfer)) {

                const message = `🔔 New activity at block ${parseInt(activity.blockNum, 16)}:\n
    - hash ${activity.hash}\n
    - to ${activity.toAddress}\n
    - value ${activity.value} ${activity.asset}\n
    - details https://etherscan.io/tx/${activity.hash}\n`
                console.log(message);

                await client.chat.postMessage({
                    channel: CHANNEL_ID,
                    text: message,
                })


            }
        })

    }

    return NextResponse.json(
        { message: 'account-notifier' },
        { status: 200, }
    );
}
