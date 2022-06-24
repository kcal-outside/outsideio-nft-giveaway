# Fire Storm Collection

This is the instructions on how to create the Outerverse Passport Placeholder NFT
using the sugar CLI.

## Assumptions:
The following things are installed and ready to go on the server:
- Solana CLI
- Sugar CLI

## Solana Config -- Use KCAL PUBLIC

```bash
solana config set \
  --url https://long-old-rain.solana-mainnet.quiknode.pro/c98f1c4c592f8fa10569d624c807bf2dbc0ec790/ \
  --keypair ~/.config/solana/kcal_public.json
```

## Instructions

### IMPORTANT
1. Ensure that the right solana config is loaded.
1. Ensure that `config.json` is using the correct wallets.

### STEPS

```bash
$ sugar validate
$ sugar upload
$ sugar deploy
$ sugar verify
```

### PROPERTIES
At this point we have a candy machine id `27rERSaj96YcLtEBj8X4ugrsNT6Ricuk71ZECHdcKwN9` 



### MINT

This mints the NFT into the connected wallet.

```bash
$ sugar mint
```

Check the wallet for the token ID `6D4c2L2AaMT9pLxtJQWUy6SDBreAJkeYuEZNUbegrkMs` which will be used for the next collection.

### CLOSE

We've minted the Passport Placeholder so now we can withdraw and close.
```bash
$ sugar withdraw
```

## Next Steps

Copy the `matadata_link` property as we will use that as the `hiddenSettings.URI` for the actual Passport Mint.
