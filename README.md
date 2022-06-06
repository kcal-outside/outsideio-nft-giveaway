# Outerverse NFT Giveaway Platform

POC to spin up an Outerverse NFT Giveaway.

## Getting Started

First, run the development server:

```bash
yarn install
yarn dev
```


## Minting

We require candy machine to mint so follow along here:
https://www.quicknode.com/guides/web3-sdks/how-to-deploy-an-nft-on-solana-using-candy-machine-v2

This is to create a single POAP-like NFT release to be given away instead of generative 1, 2, 3. etc.

The code below is the example code for the `./nft/outsideplus` NFT project.

We are also using quiknode.pro for Solana RPC setup.

### Requirements

You need to have the following installed:
* Solana Filesystem Wallets -- Testnet and Mainnet.
* https://github.com/metaplex-foundation/metaplex.  Note that the code below uses a `ln -s` link to `~/metaplex`
* https://github.com/CalebEverett/arloader


### Network

A key pattern you need to get comfortable with is switching between mainnet and devnet

#### Mainnet

This is real money.

```bash
solana config set \
   --url https://long-old-rain.solana-mainnet.quiknode.pro/c98f1c4c592f8fa10569d624c807bf2dbc0ec790/ \
   --keypair ~/.config/solana/mainnet-wallet.json
```

#### Devnet

Testing purposes. 
Note that instead of the direct RPC call, we're using Quicknode.

```bash
solana config set \
  --url https://still-young-field.solana-devnet.quiknode.pro/81df49796d09f840779524549a89c1d8c9eefb42/ \
  --keypair ~/.config/solana/devnet-wallet.json
```

### Verifying
Once you completed your project's artwork and metadata preparation, it is important to verify that the files are ready to be uploaded. The Candy Machine CLI provides the verify_assets command to check that the files in the assets folder are in the correct format. This involves verifying that:

```bash
ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts verify_assets ./nft/outside_bedrock/assets
```

### Uploading
Once you have your collection prepared, the next step is to upload your assets and create a Candy Machine. 
This step is completed by a single command via the Candy Machine CLI.

We are going to do it in two parts. 
1. Manually upload files to arweave for the hiddenSettings
2. Use Candy Machine to create the NFT Mint

#### Arweave

You need to use a mainnet wallet to push the image resource into Arweave.

```bash
arloader upload ./nft/outside_bedrock/assets/0.gif \
  --with-sol \
  --sol-keypair-path ~/.config/solana/mainnet-wallet.json \
  --ar-default-keypair --no-bundle
```

Get the arweave token and test it using: https://arweave.net/{TOKEN}
eg., `https://arweave.net/LA8LpxrPbNkq_p1j2rWnGBUd1PHr8ewnQmlVQaPh2k8`

Use this to update the 0.json's `image` and `files[0].uri` for the nft.

Now push the asset config:

```bash
arloader upload ./nft/outside_bedrock/assets/0.json \
  --with-sol \
  --sol-keypair-path ~/.config/solana/mainnet-wallet.json \
  --ar-default-keypair --no-bundle
```

Get the arweave token and test it using: https://arweave.net/{TOKEN}
eg., `https://arweave.net/HKEoesjl1Awh0cQK5cTV1w3XSDYDz3-k6A6HtgTCFpQ`

Use this to update the config.json's `hiddenSettings:uri` for the nft.

#### Candy Machine

When launching the candymachine, make sure to use production (mainnet-test) or devnet.

To initialize a whole new Candy Machine, you need to delete `.cache` folder.
Make sure you do a `withdraw` before you delete the `.cache` folder.

General steps to do an unlimited drop:
1. Set config.json to number=0 using a hiddenSetting
2. Upload the 0.json to arweave
3. Upload the assets using Candy Machine
4. Update the Candy Machine config.json to number=99999 and point to the arweave.json for the hiddenSettings

##### TEST / devnet
```bash
ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts upload \
    -e devnet \
    -k ~/.config/solana/devnet-wallet.json \
    -cp ./nft/outside_bedrock/config.json \
    -c outside_bedrock \
    --rpc-url https://still-young-field.solana-devnet.quiknode.pro/81df49796d09f840779524549a89c1d8c9eefb42/ \
    ./nft/outside_bedrock/assets
```

##### PRODUCTION / mainnet-test

Note: If you are using mainnet-test, make sure your *.json files are using mainnet addresses. 
ie., `config.json: solTreasuryAccount` or `0.json: creators.address`

```bash
ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts upload \
    -e mainnet-beta \
    -k ~/.config/solana/mainnet-wallet.json \
    -cp ./nft/outside_bedrock/config.json \
    -c outside_bedrock \
    ./nft/outside_bedrock/assets
```

You'll see a line:

```bash
...
Candy machine address: 9wBH6xD3DkiVy6HCuBqk5FbtVTfB2VXD2ujvkQLrrmv8
...
```
Get this address and use in the `.env` file.


### Update the Iten Count to be greater than 0

Edit `config.json` and change the `number` to something high like 999999 then run the `update_candy_machine`

#### Test
```bash
ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts update_candy_machine \
    -e devnet \
    -k ~/.config/solana/devnet-wallet.json \
    -cp ./nft/outside_bedrock/config.json \
    -c  outside_bedrock \
    --rpc-url https://still-young-field.solana-devnet.quiknode.pro/81df49796d09f840779524549a89c1d8c9eefb42/ 
```
  
#### Production
```bash
ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts update_candy_machine \
    -e mainnet-beta \
    -k ~/.config/solana/mainnet-wallet.json \
    -cp ./nft/outside_bedrock/config.json \
    -c  outside_bedrock
```
  

### Verify the Upload
Once it has completed, you need to verify that everything uploaded correctly.

#### Test
```bash
ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts verify_upload \
    -e devnet \
    -c outside_bedrock \
    -k ~/.config/solana/devnet-wallet.json
```

#### Production
```bash
ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts verify_upload \
    -e mainnet-beta \
    -c outside_bedrock \
    -k ~/.config/solana/mainnet-wallet.json
```

### See Status of Mint
Once it has completed, you need to verify that everything uploaded correctly.

#### Test
```bash
ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts show \
    -e devnet \
    -k ~/.config/solana/devnet-wallet.json \
    -c outside_bedrock \
    --rpc-url https://still-young-field.solana-devnet.quiknode.pro/81df49796d09f840779524549a89c1d8c9eefb42/ 
```

#### Production
```bash
ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts show \
    -e mainnet-beta \
    -k ~/.config/solana/mainnet-wallet.json \
    -c outside_bedrock 
```


# Original Code Base for POC
https://github.com/Fulgurus/candy-machine-v2-responsive-ui