# Passport Placeholder

This is the instructions on how to create the Outerverse Passport Placeholder NFT
using the sugar CLI.

## Assumptions:
The following things are installed and ready to go on the server:
- Solana CLI
- Sugar CLI

## Solana Config - KCAL WALLET

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

### PROPERTIES
At this point we have a candy machine id `27rERSaj96YcLtEBj8X4ugrsNT6Ricuk71ZECHdcKwN9` 

### COLLECTION

Now we need to set the collection per Metaplex. Use the token id from `art_storm_collection`
ie., 6D4c2L2AaMT9pLxtJQWUy6SDBreAJkeYuEZNUbegrkMs

```bash
$ sugar collection set --collection-mint 6D4c2L2AaMT9pLxtJQWUy6SDBreAJkeYuEZNUbegrkMs
```

## MINT

Note: this may fail part way, so you can keep at it until all the NFTs have been minted out.
```
$ sugar mint -n 16
```

### CLOSE

We've minted the Passport Placeholder so now we can sign, withdraw and close.

But we messed up, we minted with the FILESYSTEM wallet.  We need to switch to the Creator wallet to sign NFTs.

Note: Candy Machine v1 uses -c {CANDY MACHINE CREATOR} vs. --v2 uses {CANDY MACHINE ID}
ie.,look at https://solscan.io/token/CDjP84owHPVbfmghkLsZpas4EHdwXPsTdswkxkLTR5CU

You'll see 0% Creator is `eNbusgXA1bStmBvmXqk9mdrVB8gpqMmEfuZL8rYL3DC`

```bash
$ sguar withdraw
$ metaboss sign all -k ~/.config/solana/kcal_public.json -c eNbusgXA1bStmBvmXqk9mdrVB8gpqMmEfuZL8rYL3DC -l debug -r https://solana-api.projectserum.com

```

Now we're trying to get Verified collection
https://collections.metaplex.com/create-collection
Connect wallet as the update authority (ie, the account you minted the candy machine)

Use the first NFT address to create the collection.

After you are successful, we have a collection address `7btXLptWiFjzcWmqpQPUp1YZazwKhLt8UX6tiEmaaR4M`


```bash
$ sugar withdraw
```

## Next Steps

Copy the `matadata_link` property as we will use that as the `hiddenSettings.URI` for the actual Passport Mint.
