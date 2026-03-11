import {
  IsString,
  IsEmail,
  IsInt,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MinLength(2,  { message: 'Name must be at least 2 characters' })
  @MaxLength(120, { message: 'Name must be under 120 characters' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Must be a valid email address' })
  @MaxLength(200)
  email: string;

  @IsNotEmpty({ message: 'Age is required' })
  @IsInt({ message: 'Age must be a whole number' })
  @Min(10,  { message: 'Age must be at least 10' })
  @Max(100, { message: 'Age must be at most 100' })
  age: number;
}
