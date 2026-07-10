export interface DocumentationResponse {
  success: boolean;
  data: {
    readme: string;
    setup: string;
    architecture: string;
    api: string;
  };
}