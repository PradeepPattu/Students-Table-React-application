import { IsString, IsEmail, IsInt, MinLength, MaxLength, Min, Max, IsOptional } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(200)
  email?: string;

  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(100)
  age?: number;
}
