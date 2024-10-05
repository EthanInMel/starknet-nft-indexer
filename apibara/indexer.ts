export const config = {
  streamUrl: 'https://sepolia.starknet.a5a.ch',
  startingBlock: 210_000,
  network: 'starknet',
  finality: 'DATA_STATUS_ACCEPTED',
  filter: {
    header: { weak: true },
    events: [
      {
        fromAddress:
          '0x01052541FeA264671238d1B26a1DB813b4e54b03EA0CA4D2231249E57f9FD7dc',
        keys: [
          '0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9',
        ],
        includeReceipt: false,
      },
    ],
  },
  sinkType: 'webhook',
  sinkOptions: { targetUrl: 'http://127.0.0.1:3000/event', raw: true },
};

// This transform does nothing.
export default function transform({ header, events }) {
  console.log("events", events);
  const { blockNumber, blockHash, timestamp } = header;
  return events.map(({ event, transaction }) => {
    const transactionHash = transaction.meta.hash;
    const transferId = `${transactionHash}_${event.index}`;

    // const [fromAddress] = event.data;
    // Convert to snake_case because it works better with postgres.
    return event.keys;
  });
}
