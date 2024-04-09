import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Message } from "./message";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    vectorDataPath: string

    @OneToMany(() => Message, message => message.chat, { cascade: true })
    messages: Message[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}