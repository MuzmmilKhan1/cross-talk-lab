import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Chat } from "./chat"

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    type: "sent" | "received" | "context"

    @ManyToOne(() => Chat, chat => chat.messages)
    chat: Chat

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}