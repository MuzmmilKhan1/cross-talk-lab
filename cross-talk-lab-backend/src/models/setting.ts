import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Setting {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    key: string

    @Column()
    value: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}