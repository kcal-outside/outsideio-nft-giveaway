# Passport Minting Read Me

This is a test run for the Outerverse Passport
Generation is currently done here: https://colab.research.google.com/drive/14aEYlcPCrz4MJyF2Rpq1iNKtsKDcU_gp#scrollTo=i5kY853XekcI

## Dev Net

### Set Dev Net:
```bash
solana config set \
  --url https://still-young-field.solana-devnet.quiknode.pro/81df49796d09f840779524549a89c1d8c9eefb42/ \
  --keypair ~/.config/solana/devnet-wallet.json
```

### Upload the Placeholder PNG using Bundlr

Using mainnet-wallet as it costs $ so pre-funding using 100,000,000 lamports (0.1 SOL)

```bash
bundlr fund 100000000 -h https://node1.bundlr.network -w ~/.config/solana/mainnet-wallet.json -c solana
```

Upload the placeholder:

``` bash
bundlr upload ./nft/passport/assets/passport_pre_reveal.png -h https://node1.bundlr.network -w ~/.config/solana/mainnet-wallet.json -c solana
```

This will return something like:

```bash
...
Loaded address: GwWB3qBvNEB31pshJu7pi4F1UQ8DsnD4jjNCH9XEXF81
Uploaded to https://arweave.net/fQadc6eDxHbtdrHySOHjJ6MKU46KBJ6sRKidkFWLk-0
```

Which is the location of the Placeholder PNG which now can be cut/pasted back into the Passport Generator's placeholder JSON:

```json
{
	"name": "Testverse Passport",
	"external_url": "https://outside.io",
	"symbol": "OUTPASS",
	"description": "Unlock first access and even more perks and benefits with our utility-enhanced generative art NFT, the Outerverse Passport. Earn ongoing benefits that increase the longer you hold the pass, the events you attend, the NFTs you own from the marketplace, and of course the more you get outside. Think of this as your VIP global entry, skip the line pass to all things Outerverse.",
	"seller_fee_basis_points": 1000,
	"image": "https://arweave.net/fQadc6eDxHbtdrHySOHjJ6MKU46KBJ6sRKidkFWLk-0",
	"edition": 0,
	"attributes": [],
	"properties": {
		"creators": [{
			"address": "8tBxoLVjvAoCzYdENnNxP36MCvzKmiPhCgGB6xu4aVhE",
			"share": 100
		}],
		"files": [{
			"uri": "https://arweave.net/fQadc6eDxHbtdrHySOHjJ6MKU46KBJ6sRKidkFWLk-0",
			"type": "image/png"
		}]
	},
	"collection": {
		"name": "Testverse Passport",
		"family": "Outside Testverse"
	}
}
```

### Candy Machine

Now we configure the candy machine.  As we are using the dev-net for the test, ensure `config.json` is using
correct devnet wallets, has the test price, and the correct amount.

We also need to clear any old Candy Machine caches.

```bash
rm -rf .cache
```

We need to ensure that the `assets` folder just has the item config json and the png.

```bash
rm nft/passport/assets/*_real.json
rm nft/passport/assets/passport_pre_reveal.png
rm nft/passport/assets/.DS*
```

#### Running Candy Machine

```bash

ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts upload \
    --env devnet \
    --keypair ~/.config/solana/devnet-wallet.json \
    --config-path ./nft/passport/config.json \
    --rpc-url https://still-young-field.solana-devnet.quiknode.pro/81df49796d09f840779524549a89c1d8c9eefb42/ \
    ./nft/passport/assets
```