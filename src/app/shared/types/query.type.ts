export type Query = {
  $not?: any;
  $in?: Array<string | RegExp>;
  $nin?: Array<string | RegExp>;
  $ne?: string;
  $exists?: boolean;
  optional?: string;
};
