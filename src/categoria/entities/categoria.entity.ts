import { Produto } from "src/produto/entities/produto.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Repository, UpdateDateColumn } from "typeorm";

@Entity({ name: "categorias" })
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ default: true })
    ativo: boolean;

    @CreateDateColumn({ name : 'created_at'})
    createdAt: string;

    @UpdateDateColumn({ name : 'updated_at'})
    updatedAt: string;

    @DeleteDateColumn({ name : 'deleted_at'})
    deletedAt: string;

    @OneToMany(type => Produto, Produto => Produto.categoria_id) //(id: number) => Repository<Produto>
    produtos: Produto[];
}