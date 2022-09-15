import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class ProdutoTable1662004228641 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "produtos",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isUnique: true,
                        isGenerated:true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: "nome",
                        type: "varchar",
                    },
                    {
                        name: "tipo_quantidade",
                        type: "varchar",
                    },
                    {
                        name: "quantidade",
                        type: "double",
                    },
                    {
                        name: "ativo",
                        type: "boolean",
                        default: true,
                    },
                    {
                        name: "categoria_id",
                        type: "int",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        default: null,
                        isNullable: true,
                    },
                ]
            }),
            true,
        )

        queryRunner.clearSqlMemory()

        await queryRunner.createForeignKey(
            "produtos",
            new TableForeignKey({
                columnNames: ["categoria_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "categorias",
                onDelete: "CASCADE",
            }),
        )

         /*await queryRunner.query('ALTER TABLE `produtos` ADD CONSTRAINT `FK_330ac6c492cb0bbcce953f3d9eb` FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE CASCADE')*/

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable("produtos")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("categoria_id") !== -1,
        )
        await queryRunner.dropForeignKey("produtos", foreignKey)

        await queryRunner.dropTable("produtos")
    }

}
