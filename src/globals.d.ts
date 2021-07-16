declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly DEBUG_CHANNEL_ID: string;
    readonly GOOGLE_API_KEY: string;
    readonly GOOGLE_CSE_ID: string;

    // Discord
    readonly DISCORD_OWN_BOT_NAME: string;

    // Conoha API
    readonly CONOHA_AUTH_USERNAME: string;
    readonly CONOHA_AUTH_PASSWORD: string;
    readonly CONOHA_AUTH_TENANT_ID: string;
    readonly CONOHA_SERVER_ID: string;
  }
}
