# Passport 

This is the instructions on how to create the Outerverse Passport NFT
using the sugar CLI with a reveal.

## Assumptions:
The following things are installed and ready to go on the server:
- Solana CLI
- Sugar CLI
- Metaboss CLI

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
1. Ensure that the `hiddenSettings.uri` is using the arweave link from the passport_placeholder.  The initial hash can be `replacemereplacemereplacemerepla` (32 characters) as we are going to replace as outlined below.

### INITIAL STEPS

These steps are written as vanilla below, but they could include specific options such as `-k {link/to/solana-wallet.json}` or `-r {https://rpc.link/for/main-net}` etc.  

Run `sugar help` for all options.

```bash
$ cd nft/passport
$ sugar validate
$ sugar upload
$ sugar deploy
$ sugar verify
```

### HIDDEN SETTINGS HASH

The next step is to provide an updated `hiddenSettings.hash` value using the SHA256() value of `cache.json`

Note that instuctions where to use SHA256() however when running the `sugar update` below, we get an error about 30 characters.
The only 30 character hash is MD5() so that was used instead for this.

1. For example, the value of `cache.json` is the following:
    ```json
    {"program":{"candyMachine":"5y3TmdoPcSZxToQHnUMkD5Ls16iuSM7sNSnpJShmNfLB","candyMachineCreator":"CUaPGmcmTiYTGCtderok5WPsENwrnqcNbWn5drdczyU2"},"items":{"0":{"name":"Testverse Passport #00000","image_hash":"fb29e9d83cc7963f90b045de01d45ffa7312b7793cba79ad5bc2c5c146956705","image_link":"https://arweave.net/WLNgbCx9afbfZkJ_2U8uHyGMGbh4tniSOSMFaD6wPmo","metadata_hash":"1e2762c81c12d7af8325a69f01a39b31c6d56cf1631f26b7b9689a1c36e41467","metadata_link":"https://arweave.net/66qabHg8n8cyWCmV7lACWS0iTuGu4E1uPRabb51npbE","onChain":false},"1":{"name":"Testverse Passport #00001","image_hash":"75f8ce39f970ebd559fb54be4cf344f84ddf5d3829270f39fc2eb8d405e1f2c1","image_link":"https://arweave.net/oaxV0RxLUnsJqVZS8FpR9XKulvoWSObCKvF0n8uVTuw","metadata_hash":"5651682bd3caad9f38d747d4684ec3c40a6201c7619d4140bb88ca3ec306e80c","metadata_link":"https://arweave.net/tHbMbBZI9Y1C30aG0_Ys-Cveb4k517OPkT0sJycFinI","onChain":false}}}
    ```

1. (TODO: USED MD5) SHA256() the above using a website like https://emn178.github.io/online-tools/sha256.html. Using the above, we get `de341d8210f955ffe6282b625428b4c0192825a852f0ec14d8b3a13fded5caf7`.

1. MD5() the above using a website like https://www.md5hashgenerator.com/. Using the above, we get `d09851a3d6ef19371ee53325a3c466fe`.

1. Edit `config.json` and replace the `hiddenSettings.hash` to use `d09851a3d6ef19371ee53325a3c466fe`

1. Update the config file using sugar.
    ```bash
    $ sugar update
    ```

### MINTING WEBSITE

At this point we have a candy machine id `7Nw7vGgBgANP8bSFKsnvzHWgtqegf3tiVWPpNktDFXt1` 
Update the `.env` file and run the website.

### SIGNING THE MINT

After the public sale is complete, we should sign the NFTs to ensure that owners know they are valid.
```bash
$ metaboss sign all -k ~/.config/solana/devnet-wallet.json -c 6DsrGJQSVDWydFrZaZibHNFCHUAcLgavE2w94U999gDN --v2
```

### GETTING OWNERS

We can now use metaboss to get the list of NFT owners so we can update the meta data.

```bash
$ metaboss snapshot holders --creator 6DsrGJQSVDWydFrZaZibHNFCHUAcLgavE2w94U999gDN --v2
```

### REVEAL THE MINT, aKA UPDATING URI

TODO: We need to write a python script to take the `6DsrGJQSVDWydFrZaZibHNFCHUAcLgavE2w94U999gDN_holders.json`
and output update_uri.json that can be used by metaboss below.

```bash
$ metaboss update uri-all \
    -k ~/.config/solana/devnet-wallet.json \
     --json-file update_uri.json
```

### CLOSE

We've minted the Passport Placeholder so now we can withdraw and close.
```bash
$ sugar withdraw
$ rm cache.json
```

## Next Steps

Test larger batch