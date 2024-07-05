class CustomError extends Error {
  flag: string;
  response: any;
  constructor(message: string, response: any, flag: string) {
    super(message);
    this.name = this.constructor.name;
    this.flag = flag;
    this.response = response;
  }
}
export default CustomError;
