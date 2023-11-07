import { NextRequest } from 'next/server';
import { createHmac } from 'crypto';
import type { Readable } from 'node:stream';

import { ALCHEMY_AUTH_TOKEN, ADDRESS_LIST } from './constants';

export async function buffer(readable: Readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

function computeSHA256HMAC(payload, secret) {
    const hmac = createHmac('sha256', secret);
    hmac.update(payload, 'utf8');
    return hmac.digest('hex');
}

export function hasValidSignature(signature: string, payload: string) {

    if (!signature || typeof signature !== 'string') return false;
    const hmac = computeSHA256HMAC(payload, ALCHEMY_AUTH_TOKEN);

    console.log('signature', signature);
    console.log('hmac', hmac);

    return signature === hmac
}

export const isOutgoing = (address) => {
    const index = ADDRESS_LIST.findIndex((a) => a.toLowerCase() === address);
    return {
        found: index > -1,
        index
    }
};
