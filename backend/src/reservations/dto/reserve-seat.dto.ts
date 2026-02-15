import { IsNotEmpty, IsString } from "class-validator";

export class ReserveSeatDto {
  @IsString()
  @IsNotEmpty()
  concertId: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
