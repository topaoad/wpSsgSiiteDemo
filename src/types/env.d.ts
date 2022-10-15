declare namespace NodeJS {
  interface ProcessEnv {
    readonly WP_GRAPHQL_URL: string;
    readonly WP_IMAGES_URL: string;
    readonly NEXT_PUBLIC_WP_URL: string;

  }
}
