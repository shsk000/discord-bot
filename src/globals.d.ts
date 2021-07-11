declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly DEBUG_CHANNEL_ID: string;
  }
}
