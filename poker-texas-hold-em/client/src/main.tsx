import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

// Dojo related imports
import { init } from "@dojoengine/sdk";
import { DojoSdkProvider } from "@dojoengine/sdk/react";
import { SchemaType, schema } from "./typescript/models.gen.ts";
import { setupWorld } from "./typescript/contracts.gen.ts";

import '@fontsource/inter'; 
import '@fontsource/inter/500.css'; 
import '@fontsource/inter/600.css'; 
import '@fontsource/inter/700.css'; 
import '@fontsource/orbitron'; 
import '@fontsource/orbitron/500.css';
import '@fontsource/orbitron/600.css';
import '@fontsource/orbitron/700.css';
import "./index.css";
import { dojoConfig } from "../dojoConfig.ts";
import StarknetProvider from "./starknet-provider.tsx";

/**
 * Initializes and bootstraps the Dojo application.
 * Sets up the SDK, burner manager, and renders the root component.
 *
 * @throws {Error} If initialization fails
 */
async function main() {
    const sdk = await init<SchemaType>(
        {
            client: {
                rpcUrl: dojoConfig.rpcUrl,
                toriiUrl: dojoConfig.toriiUrl,
                relayUrl: dojoConfig.relayUrl,
                worldAddress: dojoConfig.manifest.world.address,
            },
            domain: {
                name: "WORLD_NAME",
                version: "1.0",
                chainId: "KATANA",
                revision: "1",
            },
        },
        schema
    );

    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <DojoSdkProvider
                sdk={sdk}
                dojoConfig={dojoConfig}
                clientFn={setupWorld}
            >
                <StarknetProvider>
                    <App />
                </StarknetProvider>
            </DojoSdkProvider>
        </StrictMode>
    );
}

main().catch((error) => {
    console.error("Failed to initialize the application:", error);
});

