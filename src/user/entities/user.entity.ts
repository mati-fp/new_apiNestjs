import { BaseEntity, BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hashSync } from 'bcrypt';


@Entity({ name: "usuarios" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ name : 'created_at'})
    createdAt: string;

    @UpdateDateColumn({ name : 'updated_at'})
    updatedAt: string;

    @DeleteDateColumn({ name : 'deleted_at'})
    deletedAt: string;
    

    @BeforeInsert()
    criptografaSenha(){
        this.password = hashSync(this.password, 10);
    }
}

