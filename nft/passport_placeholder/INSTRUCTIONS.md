# Passport Placeholder

This is the instructions on how to create the Outerverse Passport Placeholder NFT
using the sugar CLI.

## Assumptions:
The following things are installed and ready to go on the server:
- Solana CLI
- Sugar CLI

## Solana Config

```bash
solana config set \
  --url https://still-young-field.solana-devnet.quiknode.pro/81df49796d09f840779524549a89c1d8c9eefb42/ \
  --keypair ~/.config/solana/devnet-wallet.json
```

## Instructions

### IMPORTANT
1. Ensure that the right solana config is loaded.
1. Ensure that `config.json` is using the correct wallets.

### STEPS

```bash
$ cd nft/passport_placeholder
$ sugar validate
$ sugar upload
$ sugar deploy
$ sugar verify
```

### PROPERTIES
At this point we have a candy machine id `85JikCaWsqp2x9Eo85V7zU5pNfKiP8ishHasu2ARnCUG` 
but more importantly, we have the placeholder assets loaded into arweave.

Look at the generated `cache.json` file for the `metadata_link` property that looks like: https://h2lqx5nssy3mjlyhofssf7adp2mgcepqqhxfji2nzq2elxf4ex2q.arweave.net/PpcL9bKWNsSvB3FlIvwDfphhEfCB7lSjTcw0Rdy8JfU

### CLOSE

We've minted the Passport Placeholder so now we can withdraw and close.
```bash
$ sugar withdraw
```

## Next Steps

Copy the `matadata_link` property as we will use that as the `hiddenSettings.URI` for the actual Passport Mint.
