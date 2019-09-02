export interface ConfigTemplate {
  version: string;
  environment: string;
  defaultLocale: string;
  wikipedia: {
    baseUrl: string;
    getThumbnail: string;
  };
}
