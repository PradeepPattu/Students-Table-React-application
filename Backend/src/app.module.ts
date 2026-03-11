import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { Student } from './students/student.entity';

@Module({
  imports: [
    // ── Config (reads .env) ──────────────────────────────────────────────
    ConfigModule.forRoot({ isGlobal: true }),

    // ── Database connection via TypeORM ──────────────────────────────────
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host:     cfg.get<string>('DB_HOST', 'localhost'),
        port:     cfg.get<number>('DB_PORT', 5432),
        username: cfg.get<string>('DB_USER', 'postgres'),
        password: cfg.get<string>('DB_PASS', 'password'),
        database: cfg.get<string>('DB_NAME', 'students_db'),
        entities: [Student],
        synchronize: true,   // auto-create tables — disable in production!
        logging: false,
        ssl: cfg.get('NODE_ENV') === 'production'
          ? { rejectUnauthorized: false }
          : false,
      }),
    }),

    StudentsModule,
  ],
})
export class AppModule {}
