import { Categoria } from "../../categoria/entities/categoria.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "produtos" })
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ name: "tipo_quantidade" })
    tipoQuantidade: string;

    @Column()
    quantidade: number;

    @Column({ default: true })
    ativo: boolean;

    @Column()
    categoria_id: number;

    @CreateDateColumn({ name : 'created_at'})
    createdAt: string;

    @UpdateDateColumn({ name : 'updated_at'})
    updatedAt: string;

    @DeleteDateColumn({ name : 'deleted_at'})
    deletedAt: string;

    @ManyToOne(type => Categoria, Categoria => Categoria.id) //(id: number) => Repository<Categoria>
    categoria: Categoria;
}