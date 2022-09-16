import { Categoria } from "../../categoria/entities/categoria.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @JoinColumn({ name: 'categoria_id', referencedColumnName: 'id' })
    @ManyToOne(type => Categoria, Categoria => Categoria.id)
    @Column({ name: "categoria_id" })
    categoria_id: number;

    @CreateDateColumn({ name : 'created_at'})
    createdAt: string;

    @UpdateDateColumn({ name : 'updated_at'})
    updatedAt: string;

    @DeleteDateColumn({ name : 'deleted_at'})
    deletedAt: string;

     //(id: number) => Repository<Categoria>
    //categoria: Categoria;
}