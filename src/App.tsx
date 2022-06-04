import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { useMemo } from "react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    getPhantomWallet,
    getSlopeWallet,
    getSolflareWallet,
    getSolflareWebWallet,
    getSolletWallet,
    getSolletExtensionWallet,
    getSolongWallet,
    getLedgerWallet,
    getSafePalWallet,
} from "@solana/wallet-adapter-wallets";

import {
    WalletModalProvider
} from '@solana/wallet-adapter-react-ui';

import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Redeem from "./pages/Redeem";

require('@solana/wallet-adapter-react-ui/styles.css');


const candyMachineId = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_ID!
);

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const theme = createTheme({
    palette: {
        type: 'dark',
    },
    overrides: {
        MuiButtonBase: {
            root: {
                justifyContent: 'flex-start',
            },
        },
        MuiButton: {
            root: {
                textTransform: undefined,
                padding: '12px 16px',
            },
            startIcon: {
                marginRight: 8,
            },
            endIcon: {
                marginLeft: 8,
            },
        },
    },
});

const App = () => {

    // Custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), []);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            getPhantomWallet(),
            getSlopeWallet(),
            getSolflareWallet(),
            getSolflareWebWallet(),
            getSolletWallet({ network }),
            getSolletExtensionWallet({ network }),
            getSolongWallet(),
            getLedgerWallet(),
            getSafePalWallet(),
        ],
        []
    );

  return (
      <ThemeProvider theme={theme}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect={true}>
            <WalletModalProvider>

            <Router>
                <div>
                  <nav>
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about">About</Link>
                      </li>
                      <li>
                        <Link to="/users">Users</Link>
                      </li>
                    </ul>
                  </nav>

                  {/* A <Switch> looks through its children <Route>s and
                      renders the first one that matches the current URL. */}
                  <Routes>
                    <Route path="/" element={
                      <Home
                          candyMachineId={candyMachineId}
                          connection={connection}
                          txTimeout={txTimeout}
                          rpcHost={rpcHost}
                        />
                    } />
                    <Route path="/about" element={<About />} />
                    <Route path="/redeem" element={<Redeem />} />
                  </Routes>
                </div>
              </Router>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ThemeProvider>
  );
};

export default App;
