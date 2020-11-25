import {MigrationInterface, QueryRunner} from "typeorm";

export class IntialMigration1606320702330 implements MigrationInterface {
    name = 'IntialMigration1606320702330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `permission_group` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `icon` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `permission` (`id` int NOT NULL AUTO_INCREMENT, `method` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `url` varchar(255) NOT NULL, `permissionGroupId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `mail` varchar(255) NOT NULL, `active` tinyint NOT NULL DEFAULT 1, `phone` varchar(255) NULL, `isSuper` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_065d4d8f3b5adb4a08841eae3c` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `role` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `state` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `abbreviation` varchar(255) NOT NULL, `lat` varchar(255) NOT NULL, `lng` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_roles_role` (`userId` int NOT NULL, `roleId` int NOT NULL, INDEX `IDX_5f9286e6c25594c6b88c108db7` (`userId`), INDEX `IDX_4be2f7adf862634f5f803d246b` (`roleId`), PRIMARY KEY (`userId`, `roleId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_permissions_permission` (`userId` int NOT NULL, `permissionId` int NOT NULL, INDEX `IDX_5b72d197d92b8bafbe7906782e` (`userId`), INDEX `IDX_c43a6a56e3ef281cbfba9a7745` (`permissionId`), PRIMARY KEY (`userId`, `permissionId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `role_permissions_permission` (`roleId` int NOT NULL, `permissionId` int NOT NULL, INDEX `IDX_b36cb2e04bc353ca4ede00d87b` (`roleId`), INDEX `IDX_bfbc9e263d4cea6d7a8c9eb3ad` (`permissionId`), PRIMARY KEY (`roleId`, `permissionId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `permission` ADD CONSTRAINT `FK_29b093b202d3ae3e37438ce158c` FOREIGN KEY (`permissionGroupId`) REFERENCES `permission_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_5f9286e6c25594c6b88c108db77` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_4be2f7adf862634f5f803d246b8` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_permissions_permission` ADD CONSTRAINT `FK_5b72d197d92b8bafbe7906782ec` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_permissions_permission` ADD CONSTRAINT `FK_c43a6a56e3ef281cbfba9a77457` FOREIGN KEY (`permissionId`) REFERENCES `permission`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `role_permissions_permission` ADD CONSTRAINT `FK_b36cb2e04bc353ca4ede00d87b9` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `role_permissions_permission` ADD CONSTRAINT `FK_bfbc9e263d4cea6d7a8c9eb3ad2` FOREIGN KEY (`permissionId`) REFERENCES `permission`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `role_permissions_permission` DROP FOREIGN KEY `FK_bfbc9e263d4cea6d7a8c9eb3ad2`");
        await queryRunner.query("ALTER TABLE `role_permissions_permission` DROP FOREIGN KEY `FK_b36cb2e04bc353ca4ede00d87b9`");
        await queryRunner.query("ALTER TABLE `user_permissions_permission` DROP FOREIGN KEY `FK_c43a6a56e3ef281cbfba9a77457`");
        await queryRunner.query("ALTER TABLE `user_permissions_permission` DROP FOREIGN KEY `FK_5b72d197d92b8bafbe7906782ec`");
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_4be2f7adf862634f5f803d246b8`");
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_5f9286e6c25594c6b88c108db77`");
        await queryRunner.query("ALTER TABLE `permission` DROP FOREIGN KEY `FK_29b093b202d3ae3e37438ce158c`");
        await queryRunner.query("DROP INDEX `IDX_bfbc9e263d4cea6d7a8c9eb3ad` ON `role_permissions_permission`");
        await queryRunner.query("DROP INDEX `IDX_b36cb2e04bc353ca4ede00d87b` ON `role_permissions_permission`");
        await queryRunner.query("DROP TABLE `role_permissions_permission`");
        await queryRunner.query("DROP INDEX `IDX_c43a6a56e3ef281cbfba9a7745` ON `user_permissions_permission`");
        await queryRunner.query("DROP INDEX `IDX_5b72d197d92b8bafbe7906782e` ON `user_permissions_permission`");
        await queryRunner.query("DROP TABLE `user_permissions_permission`");
        await queryRunner.query("DROP INDEX `IDX_4be2f7adf862634f5f803d246b` ON `user_roles_role`");
        await queryRunner.query("DROP INDEX `IDX_5f9286e6c25594c6b88c108db7` ON `user_roles_role`");
        await queryRunner.query("DROP TABLE `user_roles_role`");
        await queryRunner.query("DROP TABLE `state`");
        await queryRunner.query("DROP TABLE `role`");
        await queryRunner.query("DROP INDEX `IDX_065d4d8f3b5adb4a08841eae3c` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `permission`");
        await queryRunner.query("DROP TABLE `permission_group`");
    }

}
