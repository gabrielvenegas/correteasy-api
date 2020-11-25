import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCustomerTable1606321890777 implements MigrationInterface {
    name = 'CreateCustomerTable1606321890777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `customer` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `mail` varchar(255) NOT NULL, `active` tinyint NOT NULL DEFAULT 1, `phone` varchar(255) NULL, `cpf` varchar(255) NULL, `rg` varchar(255) NULL, `cep` varchar(255) NULL, `street` varchar(255) NULL, `city` varchar(255) NULL, `state` varchar(255) NULL, `number` varchar(255) NULL, `district` varchar(255) NULL, `complement` varchar(255) NULL, `civilState` varchar(255) NULL, `birthDate` varchar(255) NULL, `gender` varchar(255) NULL, `height` varchar(255) NOT NULL, `schooling` varchar(255) NULL, `profession` varchar(255) NULL, `company` varchar(255) NULL, `role` varchar(255) NULL, `income` varchar(255) NULL, `physicalDeficit` tinyint NULL, `physicalDeficitDesc` varchar(255) NULL, `profilePic` varchar(255) NULL, `userId` int NULL, UNIQUE INDEX `IDX_ac1455877a69957f7466d5dc78` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `customer` ADD CONSTRAINT `FK_3f62b42ed23958b120c235f74df` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `customer` DROP FOREIGN KEY `FK_3f62b42ed23958b120c235f74df`");
        await queryRunner.query("DROP INDEX `IDX_ac1455877a69957f7466d5dc78` ON `customer`");
        await queryRunner.query("DROP TABLE `customer`");
    }

}
