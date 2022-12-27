import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CredentialsDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 32, { message: '8文字以上で入力してください' })
  password: string;
}
