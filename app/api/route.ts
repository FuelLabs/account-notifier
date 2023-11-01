import { NextRequest, NextResponse } from 'next/server';
import { WebClient } from '@slack/web-api';
import { types, constants, helpers } from '../../src';

const client = new WebClient(constants.BOT_TOKEN)

// export async function GET(request: NextRequest) {
//     return NextResponse.json({ message: 'account-notifier' }, { status: 200 });
// }

export async function POST(request: NextRequest) {
    try {
        const data: types.AddressActivityResponse = await request.json();
        if (data.type !== 'ADDRESS_ACTIVITY') return NextResponse.json({ message: 'invalid-event-type' }, { status: 400 });

        console.log(JSON.stringify(data, null, 2));

        data.event.activity.forEach(async (activity) => {

            const outgoingAddress = helpers.isOutgoing(activity.fromAddress);
            if (!outgoingAddress.found) return; // ignore incoming transactions

            const isTokenTransfer = activity.category === types.ActivityCategory.token;
            const isEtherTransfer = activity.category === types.ActivityCategory.external && activity.value > 0

            if (!(isTokenTransfer || isEtherTransfer)) return; // ignore non-transfers

            const message = `
🔔 New activity at block ${parseInt(activity.blockNum, 16)}:\n
    - from ${constants.ADDRESS_NAMES[outgoingAddress.index] ?? activity.fromAddress}\n
    - to ${activity.toAddress}\n
    - hash ${activity.hash}\n
    - value ${activity.value} ${activity.asset ?? "missing-asset-name"}\n
    - details https://etherscan.io/tx/${activity.hash}\n`;

            await client.chat.postMessage({
                channel: constants.CHANNEL_ID,
                text: message,
            });
        })

        return NextResponse.json({ message: 'account-notifier' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'server-error' }, { status: 500 });
    }
}
