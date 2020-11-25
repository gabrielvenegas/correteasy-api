import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProspectUserTable1606331902528 implements MigrationInterface {
    name = 'AddProspectUserTable1606331902528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `prospect_user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `mail` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `prospect_user`");
    }

}
