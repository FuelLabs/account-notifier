import { NextRequest, NextResponse } from 'next/server';
import { AddressActivityResponse, ActivityCategory } from './types';

const ADDRESS = process.env.ADDRESS;
if (!ADDRESS) throw new Error('Missing env var: ADDRESS');

export async function POST(request: NextRequest) {
    const data: AddressActivityResponse = await request.json();

    if (data.type == 'ADDRESS_ACTIVITY') {
        data.event.activity.forEach((activity) => {

            const isOutgoing = activity.fromAddress === ADDRESS;
            const isTokenTransfer = activity.category === ActivityCategory.token;
            const isEtherTransfer = activity.category === ActivityCategory.external && activity.value > 0

            if (isOutgoing && (isTokenTransfer || isEtherTransfer)) {

                console.log('\n_____\n');
                console.log(data.createdAt, data.event.network, '\n');
                console.log(`New activity at block ${parseInt(activity.blockNum, 16)}:\n`);
                console.log(`- type ${activity.category}`);
                console.log(`- hash ${activity.hash}`);
                console.log(`- to ${activity.toAddress}`);
                console.log(`- value ${activity.value} ${activity.asset}`);
                console.log(`- details https://etherscan.io/tx/${activity.hash}`);

            }
        })

    }

    return NextResponse.json(
        { message: 'account-notifier' },
        { status: 200, }
    );
}
