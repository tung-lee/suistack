export interface PublishState {
  status: boolean;
  message: string;
  functions: {
    name: string;
    args: string[];
  }[];
}