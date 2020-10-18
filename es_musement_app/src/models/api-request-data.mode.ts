export default interface ApiRequestDataMode {
  limit: number;
  offset: number;
  language?: string;
  currency?: string;
  callback?: Function;
}
