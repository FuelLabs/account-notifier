export enum ActivityCategory {
    external = 'external',
    internal = 'internal',
    erc721 = 'erc721',
    erc1155 = 'erc1155',
    erc20 = 'erc20',
    token = 'token'
}

export interface Log {
    address: string;
    topics: string[];
    data: string;
    blockNumber: string;
    transactionHash: string;
    transactionIndex: string;
    blockHash: string;
    logIndex: string;
    removed: boolean;
};

export interface RawContract {
    rawValue: string;
    address: string;
    decimals: number;
}

export interface Activity {
    blockNum: string;
    hash: string;
    fromAddress: string;
    toAddress: string;
    value: number;
    erc721TokenId: string | null;
    erc1155Metadata: null;
    asset: string;
    category: ActivityCategory;
    rawContract: RawContract;
    typeTraceAddress: string | null;
    log: Log;
};

export interface Event {
    network: string;
    activity: Activity[];
}

export interface AddressActivityResponse {
    webhookId: string;
    id: string;
    createdAt: string;
    type: string;
    event: Event;
}