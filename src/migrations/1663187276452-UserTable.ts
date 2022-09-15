import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class UserTable1662003912530 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "usuarios",
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
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "password",
                        type: "varchar",
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("usuarios")
    }

}
