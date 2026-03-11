import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly repo: Repository<Student>,
  ) {}

  // ── Read all ─────────────────────────────────────────────────────────────
  findAll(): Promise<Student[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  // ── Read one ─────────────────────────────────────────────────────────────
  async findOne(id: number): Promise<Student> {
    const student = await this.repo.findOneBy({ id });
    if (!student) throw new NotFoundException(`Student #${id} not found`);
    return student;
  }

  // ── Create ───────────────────────────────────────────────────────────────
  async create(dto: CreateStudentDto): Promise<Student> {
    await this.assertEmailUnique(dto.email);
    const student = this.repo.create(dto);
    return this.repo.save(student);
  }

  // ── Update ───────────────────────────────────────────────────────────────
  async update(id: number, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);
    if (dto.email && dto.email !== student.email) {
      await this.assertEmailUnique(dto.email);
    }
    Object.assign(student, dto);
    return this.repo.save(student);
  }

  // ── Delete ───────────────────────────────────────────────────────────────
  async remove(id: number): Promise<{ message: string }> {
    const student = await this.findOne(id);
    await this.repo.remove(student);
    return { message: `Student #${id} deleted successfully` };
  }

  // ── Private helpers ──────────────────────────────────────────────────────
  private async assertEmailUnique(email: string): Promise<void> {
    const exists = await this.repo.findOneBy({ email });
    if (exists) throw new ConflictException(`Email "${email}" is already in use`);
  }
}
