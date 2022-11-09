-- CreateTable
CREATE TABLE `candidatures` (
    `cdt_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cdt_ofr_id` INTEGER NOT NULL,
    `cdt_grd_ced` INTEGER NOT NULL,
    `cdt_status` ENUM('En proceso', 'En espera', 'Contratado', 'Rechazado') NULL,
    `cdt_created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `cdt_updated_at` TIMESTAMP(0) NULL,
    `cdt_deleted_at` TIMESTAMP(0) NULL,

    INDEX `fk_cdt_grd_ced`(`cdt_grd_ced`),
    INDEX `fk_cdt_ofr_id`(`cdt_ofr_id`),
    PRIMARY KEY (`cdt_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cities` (
    `cty_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cty_name` VARCHAR(50) NOT NULL,
    `cty_district_id` INTEGER NOT NULL,

    INDEX `fk_cty_district_id`(`cty_district_id`),
    PRIMARY KEY (`cty_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companies` (
    `com_nit` INTEGER NOT NULL,
    `com_name` VARCHAR(100) NOT NULL,
    `com_address` VARCHAR(100) NOT NULL,
    `com_cty_id` INTEGER NOT NULL,
    `com_created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `com_updated_at` TIMESTAMP(0) NULL,
    `com_deleted_at` TIMESTAMP(0) NULL,

    INDEX `fk_com_cty_id`(`com_cty_id`),
    PRIMARY KEY (`com_nit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact` (
    `con_id` INTEGER NOT NULL AUTO_INCREMENT,
    `con_email` VARCHAR(100) NOT NULL,
    `con_phone` INTEGER NOT NULL,
    `con_telephone` INTEGER NOT NULL,

    PRIMARY KEY (`con_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_sn` (
    `csn_id` INTEGER NOT NULL AUTO_INCREMENT,
    `csn_con_id` INTEGER NOT NULL,
    `csn_sn_id` INTEGER NOT NULL,
    `csn_path` VARCHAR(255) NOT NULL,

    INDEX `fk_csn_con_id`(`csn_con_id`),
    INDEX `fk_csn_sn_id`(`csn_sn_id`),
    PRIMARY KEY (`csn_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contract_types` (
    `ct_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `ct_name`(`ct_name`),
    PRIMARY KEY (`ct_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `currencies` (
    `crr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `crr_iso` VARCHAR(3) NOT NULL,

    UNIQUE INDEX `crr_iso`(`crr_iso`),
    PRIMARY KEY (`crr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `curriculum` (
    `curr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `curr_pdf` BLOB NOT NULL,
    `curr_usr_id` INTEGER NOT NULL,

    INDEX `fk_curr_usr_id`(`curr_usr_id`),
    PRIMARY KEY (`curr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `district` (
    `dis_id` INTEGER NOT NULL AUTO_INCREMENT,
    `dis_name` VARCHAR(50) NOT NULL,
    `dis_country_id` INTEGER NOT NULL,

    INDEX `fk_dis_country_id`(`dis_country_id`),
    PRIMARY KEY (`dis_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `graduates` (
    `grd_ced` INTEGER NOT NULL,
    `grd_fir_name` VARCHAR(50) NOT NULL,
    `grd_sec_name` VARCHAR(50) NULL,
    `grd_fir_surname` VARCHAR(50) NOT NULL,
    `grd_sec_surname` VARCHAR(50) NOT NULL,
    `grd_email` VARCHAR(100) NOT NULL,
    `grd_off_id` INTEGER NOT NULL,
    `grd_cty_id` INTEGER NOT NULL,
    `grd_created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `grd_updated_at` TIMESTAMP(0) NULL,
    `grd_deleted_at` TIMESTAMP(0) NULL,

    INDEX `fk_grd_cty_id`(`grd_cty_id`),
    INDEX `fk_grd_off_id`(`grd_off_id`),
    PRIMARY KEY (`grd_ced`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offices` (
    `off_id` INTEGER NOT NULL AUTO_INCREMENT,
    `off_address` VARCHAR(100) NOT NULL,
    `off_cty_id` INTEGER NOT NULL,
    `off_con_id` INTEGER NULL,
    `off_created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `off_updated_at` TIMESTAMP(0) NULL,
    `off_deleted_at` TIMESTAMP(0) NULL,

    INDEX `fk_off_con_id`(`off_con_id`),
    INDEX `fk_off_cty_id`(`off_cty_id`),
    PRIMARY KEY (`off_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offers` (
    `ofr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ofr_com_nit` INTEGER NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `salary` VARCHAR(100) NOT NULL,
    `ofr_crr_id` INTEGER NOT NULL,
    `vacancies` INTEGER NOT NULL DEFAULT 1,
    `modality` ENUM('Presencial', 'Remoto', 'Flexible') NOT NULL,
    `hiring` DATE NOT NULL,
    `ofr_ct_id` INTEGER NULL,
    `ofr_wd_id` INTEGER NULL,
    `ofr_description` TEXT NULL,
    `ofr_requisites` TEXT NULL,
    `ofr_created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ofr_updated_at` TIMESTAMP(0) NULL,
    `ofr_deleted_at` TIMESTAMP(0) NULL,

    INDEX `fk_ofr_com_nit`(`ofr_com_nit`),
    INDEX `fk_ofr_crr_id`(`ofr_crr_id`),
    INDEX `fk_ofr_ct_id`(`ofr_ct_id`),
    INDEX `fk_ofr_wd_id`(`ofr_wd_id`),
    PRIMARY KEY (`ofr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offers_tags` (
    `ot_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ot_ofr_id` INTEGER NOT NULL,
    `ot_tag_id` INTEGER NOT NULL,

    INDEX `fk_ot_ofr_id`(`ot_ofr_id`),
    INDEX `fk_ot_tag_id`(`ot_tag_id`),
    PRIMARY KEY (`ot_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restrictions` (
    `res_id` INTEGER NOT NULL AUTO_INCREMENT,
    `res_description` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`res_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `rol_id` INTEGER NOT NULL AUTO_INCREMENT,
    `rol_description` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`rol_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles_restrictions` (
    `rr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `rr_rol_id` INTEGER NOT NULL,
    `rr_res_id` INTEGER NOT NULL,

    INDEX `fk_rr_res_id`(`rr_res_id`),
    INDEX `fk_rr_rol_id`(`rr_rol_id`),
    PRIMARY KEY (`rr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `social_networks` (
    `sn_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sn_name` VARCHAR(100) NOT NULL,
    `sn_icon` TINYBLOB NOT NULL,

    UNIQUE INDEX `sn_name`(`sn_name`),
    PRIMARY KEY (`sn_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `tag_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag_name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `tag_name`(`tag_name`),
    PRIMARY KEY (`tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `usr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `about_me` VARCHAR(255) NULL,
    `usr_rol_id` INTEGER NOT NULL,
    `usr_created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `usr_updated_at` TIMESTAMP(0) NULL,
    `usr_deleted_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `email`(`email`),
    INDEX `fk_usr_rol_id`(`usr_rol_id`),
    PRIMARY KEY (`usr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_companies` (
    `uc_id` INTEGER NOT NULL AUTO_INCREMENT,
    `uc_usr_id` INTEGER NOT NULL,
    `uc_com_nit` INTEGER NOT NULL,

    INDEX `fk_uc_com_nit`(`uc_com_nit`),
    INDEX `fk_uc_usr_id`(`uc_usr_id`),
    PRIMARY KEY (`uc_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_graduates` (
    `ug_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ug_usr_id` INTEGER NOT NULL,
    `ug_grd_ced` INTEGER NOT NULL,

    INDEX `fk_ug_grd_ced`(`ug_grd_ced`),
    INDEX `fk_ug_usr_id`(`ug_usr_id`),
    PRIMARY KEY (`ug_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workday` (
    `wd_id` INTEGER NOT NULL AUTO_INCREMENT,
    `wd_name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `wd_name`(`wd_name`),
    PRIMARY KEY (`wd_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `cntr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cntr_name` VARCHAR(40) NOT NULL,

    UNIQUE INDEX `cntr_name`(`cntr_name`),
    PRIMARY KEY (`cntr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companies_staff` (
    `cs_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cs_com_nit` INTEGER NOT NULL,
    `cs_stf_id` INTEGER NOT NULL,

    INDEX `fk_cs_com_nit`(`cs_com_nit`),
    INDEX `fk_cs_stf_id`(`cs_stf_id`),
    PRIMARY KEY (`cs_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_title` (
    `jt_id` INTEGER NOT NULL AUTO_INCREMENT,
    `jt_name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`jt_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff` (
    `stf_id` INTEGER NOT NULL AUTO_INCREMENT,
    `stf_ced` INTEGER NOT NULL,
    `stf_name` VARCHAR(100) NOT NULL,
    `stf_lastname` VARCHAR(100) NOT NULL,
    `stf_telephone` INTEGER NOT NULL,
    `stf_email` VARCHAR(100) NOT NULL,
    `stf_jt_id` INTEGER NOT NULL,
    `stf_created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `stf_updated_at` TIMESTAMP(0) NULL,
    `stf_deleted_at` TIMESTAMP(0) NULL,

    INDEX `fk_stf_jt_id`(`stf_jt_id`),
    PRIMARY KEY (`stf_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `candidatures` ADD CONSTRAINT `fk_cdt_grd_ced` FOREIGN KEY (`cdt_grd_ced`) REFERENCES `graduates`(`grd_ced`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `candidatures` ADD CONSTRAINT `fk_cdt_ofr_id` FOREIGN KEY (`cdt_ofr_id`) REFERENCES `offers`(`ofr_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cities` ADD CONSTRAINT `fk_cty_district_id` FOREIGN KEY (`cty_district_id`) REFERENCES `district`(`dis_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companies` ADD CONSTRAINT `fk_com_cty_id` FOREIGN KEY (`com_cty_id`) REFERENCES `cities`(`cty_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact_sn` ADD CONSTRAINT `fk_csn_con_id` FOREIGN KEY (`csn_con_id`) REFERENCES `contact`(`con_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact_sn` ADD CONSTRAINT `fk_csn_sn_id` FOREIGN KEY (`csn_sn_id`) REFERENCES `social_networks`(`sn_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `curriculum` ADD CONSTRAINT `fk_curr_usr_id` FOREIGN KEY (`curr_usr_id`) REFERENCES `users`(`usr_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `district` ADD CONSTRAINT `fk_dis_country_id` FOREIGN KEY (`dis_country_id`) REFERENCES `countries`(`cntr_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `graduates` ADD CONSTRAINT `fk_grd_cty_id` FOREIGN KEY (`grd_cty_id`) REFERENCES `cities`(`cty_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `graduates` ADD CONSTRAINT `fk_grd_off_id` FOREIGN KEY (`grd_off_id`) REFERENCES `offices`(`off_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offices` ADD CONSTRAINT `fk_off_con_id` FOREIGN KEY (`off_con_id`) REFERENCES `contact`(`con_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offices` ADD CONSTRAINT `fk_off_cty_id` FOREIGN KEY (`off_cty_id`) REFERENCES `cities`(`cty_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offers` ADD CONSTRAINT `fk_ofr_com_nit` FOREIGN KEY (`ofr_com_nit`) REFERENCES `companies`(`com_nit`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offers` ADD CONSTRAINT `fk_ofr_crr_id` FOREIGN KEY (`ofr_crr_id`) REFERENCES `currencies`(`crr_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offers` ADD CONSTRAINT `fk_ofr_ct_id` FOREIGN KEY (`ofr_ct_id`) REFERENCES `contract_types`(`ct_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offers` ADD CONSTRAINT `fk_ofr_wd_id` FOREIGN KEY (`ofr_wd_id`) REFERENCES `workday`(`wd_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offers_tags` ADD CONSTRAINT `fk_ot_ofr_id` FOREIGN KEY (`ot_ofr_id`) REFERENCES `offers`(`ofr_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offers_tags` ADD CONSTRAINT `fk_ot_tag_id` FOREIGN KEY (`ot_tag_id`) REFERENCES `tags`(`tag_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roles_restrictions` ADD CONSTRAINT `fk_rr_res_id` FOREIGN KEY (`rr_res_id`) REFERENCES `restrictions`(`res_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roles_restrictions` ADD CONSTRAINT `fk_rr_rol_id` FOREIGN KEY (`rr_rol_id`) REFERENCES `roles`(`rol_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_usr_rol_id` FOREIGN KEY (`usr_rol_id`) REFERENCES `roles`(`rol_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_companies` ADD CONSTRAINT `fk_uc_com_nit` FOREIGN KEY (`uc_com_nit`) REFERENCES `companies`(`com_nit`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_companies` ADD CONSTRAINT `fk_uc_usr_id` FOREIGN KEY (`uc_usr_id`) REFERENCES `users`(`usr_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_graduates` ADD CONSTRAINT `fk_ug_grd_ced` FOREIGN KEY (`ug_grd_ced`) REFERENCES `graduates`(`grd_ced`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_graduates` ADD CONSTRAINT `fk_ug_usr_id` FOREIGN KEY (`ug_usr_id`) REFERENCES `users`(`usr_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companies_staff` ADD CONSTRAINT `fk_cs_com_nit` FOREIGN KEY (`cs_com_nit`) REFERENCES `companies`(`com_nit`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companies_staff` ADD CONSTRAINT `fk_cs_stf_id` FOREIGN KEY (`cs_stf_id`) REFERENCES `staff`(`stf_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `staff` ADD CONSTRAINT `fk_stf_jt_id` FOREIGN KEY (`stf_jt_id`) REFERENCES `job_title`(`jt_id`) ON DELETE NO ACTION ON UPDATE CASCADE;
