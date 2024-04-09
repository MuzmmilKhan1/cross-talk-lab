import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ScrapeHistory {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    url: string

    @Column()
    path: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}