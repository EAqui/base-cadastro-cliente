export class GetTokenDto {
  token: string;

  constructor(data: string) {
    this.token = data;
  }
}
