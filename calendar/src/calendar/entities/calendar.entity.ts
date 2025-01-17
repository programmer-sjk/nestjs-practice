import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class Calendar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  title: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}