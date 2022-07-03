type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type ResponseFunction = FunctionPropertyNames<Response>;
type TransformedResponse<T extends ResponseFunction> = ReturnType<Response[T]>;

// TODO: implement Dataloader (https://github.com/graphql/dataloader)
export default class AmazonS3API {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getFile<T extends ResponseFunction>(
    fileName: string,
    transformation?: T,
  ): TransformedResponse<T> {
    return fetch(`${this.baseUrl}${fileName}`).then((res) =>
      res[transformation || "text"](),
    ) as TransformedResponse<T>;
  }
}
