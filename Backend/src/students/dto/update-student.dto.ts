import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';

// All fields optional, but any provided field is still validated
export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
