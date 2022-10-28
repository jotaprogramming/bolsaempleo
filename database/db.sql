-- Active: 1659019681460@@127.0.0.1@3306@jobcenter
CREATE DATABASE jobcenter;

USE jobcenter;

DROP TABLE IF EXISTS country;

CREATE TABLE country(
    cntr_id INT PRIMARY KEY AUTO_INCREMENT,
    cntr_name VARCHAR(40) NOT NULL COMMENT 'Name of country'
);

DROP TABLE IF EXISTS district;

CREATE TABLE district(
    dis_id INT PRIMARY KEY AUTO_INCREMENT,
    dis_name VARCHAR(50) NOT NULL COMMENT 'Name of the administrative district',
    dis_country_id INT NOT NULL COMMENT 'Country of administrative district',
    CONSTRAINT `fk_dis_country_id` FOREIGN KEY (dis_country_id) REFERENCES country (cntr_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS cities;

CREATE TABLE cities(
    cty_id INT PRIMARY KEY AUTO_INCREMENT,
    cty_name VARCHAR(50) NOT NULL COMMENT 'Name of the city',
    cty_district_id INT NOT NULL COMMENT 'City district',
    CONSTRAINT `fk_cty_district_id` FOREIGN KEY (cty_district_id) REFERENCES district (dis_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS tags;

CREATE TABLE tags(
    tag_id INT PRIMARY KEY AUTO_INCREMENT,
    tag_name VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS contract_types;

CREATE TABLE contract_types(
    ct_id INT PRIMARY KEY AUTO_INCREMENT,
    ct_name VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS legal_representative;

CREATE TABLE legal_representative(
    lg_id INT PRIMARY KEY NOT NULL COMMENT 'Identification document number',
    lg_name VARCHAR(100) NOT NULL,
    lg_lastname VARCHAR(100) NOT NULL,
    lg_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lg_updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    lg_deleted_at TIMESTAMP NULL
);

DROP TABLE IF EXISTS human_resources;

CREATE TABLE human_resources(
    hr_id INT PRIMARY KEY NOT NULL COMMENT 'Identification document number',
    hr_name VARCHAR(100) NOT NULL,
    hr_lastname VARCHAR(100) NOT NULL,
    hr_telephone INT NOT NULL,
    hr_email VARCHAR(100) NOT NULL,
    hr_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    hr_updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    hr_deleted_at TIMESTAMP NULL
);

DROP TABLE IF EXISTS companies;

CREATE TABLE companies(
    com_nit INT PRIMARY KEY NOT NULL COMMENT 'Tax Identification Number',
    com_name VARCHAR(100) NOT NULL,
    com_address VARCHAR(100) NOT NULL COMMENT 'Head office address',
    com_hr_id INT NOT NULL,
    com_lg_id INT NOT NULL,
    com_cty_id INT NOT NULL,
    com_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    com_updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    com_deleted_at TIMESTAMP NULL,
    CONSTRAINT `fk_com_hr_id` FOREIGN KEY (com_hr_id) REFERENCES human_resources (hr_id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT `fk_com_lg_id` FOREIGN KEY (com_lg_id) REFERENCES legal_representative (lg_id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT `fk_com_cty_id` FOREIGN KEY (com_cty_id) REFERENCES cities (cty_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS currencies;

CREATE TABLE currencies(
    crr_id INT PRIMARY KEY AUTO_INCREMENT,
    crr_iso VARCHAR(3) NOT NULL COMMENT 'ISO 4217 currency code'
);

DROP TABLE IF EXISTS workday;

CREATE TABLE workday(
    wd_id INT PRIMARY KEY AUTO_INCREMENT,
    wd_name VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS offers;

CREATE TABLE offers(
    ofr_id INT PRIMARY KEY AUTO_INCREMENT,
    ofr_com_nit INT NOT NULL COMMENT 'Company Id',
    title VARCHAR(100) NOT NULL,
    salary VARCHAR(100) NOT NULL,
    ofr_crr_id INT NOT NULL COMMENT 'Currency ID',
    vacancies INT NOT NULL DEFAULT 1 COMMENT 'Number of vacancies available for the offer',
    modality ENUM('Presencial', 'Remoto', 'Flexible') NOT NULL,
    hiring DATE NOT NULL COMMENT 'Date of hire',
    ofr_ct_id INT NULL COMMENT 'Contract Type Id',
    ofr_wd_id INT NULL COMMENT 'Workday Id',
    ofr_description TEXT,
    ofr_requisites TEXT,
    ofr_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ofr_updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    ofr_deleted_at TIMESTAMP NULL,
    CONSTRAINT `fk_ofr_com_nit` FOREIGN KEY (ofr_com_nit) REFERENCES companies (com_nit) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT `fk_ofr_crr_id` FOREIGN KEY (ofr_crr_id) REFERENCES currencies (crr_id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT `fk_ofr_ct_id` FOREIGN KEY (ofr_ct_id) REFERENCES contract_types (ct_id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `fk_ofr_wd_id` FOREIGN KEY (ofr_wd_id) REFERENCES workday (wd_id) ON DELETE SET NULL ON UPDATE CASCADE
);

DROP TABLE IF EXISTS offers_tags;

CREATE TABLE offers_tags(
    ot_id INT PRIMARY KEY AUTO_INCREMENT,
    ot_ofr_id INT NOT NULL COMMENT 'Company Id',
    ot_tag_id INT NOT NULL COMMENT 'Currency ID',
    CONSTRAINT `fk_ot_ofr_id` FOREIGN KEY (ot_ofr_id) REFERENCES offers (ofr_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_ot_tag_id` FOREIGN KEY (ot_tag_id) REFERENCES tags (tag_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS social_networks;

CREATE TABLE social_networks(
    sn_id INT PRIMARY KEY AUTO_INCREMENT,
    sn_name VARCHAR(100) NOT NULL,
    sn_path INT NOT NULL COMMENT 'Social network profile path',
    sn_icon TINYBLOB NOT NULL COMMENT 'Social network icon'
);

DROP TABLE IF EXISTS contact;

CREATE TABLE contact(
    con_id INT PRIMARY KEY AUTO_INCREMENT,
    con_email VARCHAR(100) NOT NULL,
    con_phone INT NOT NULL COMMENT 'Landline telephone number',
    con_telephone INT NOT NULL COMMENT 'Smartphone number'
);

DROP TABLE IF EXISTS contact_sn;

CREATE TABLE contact_sn(
    csn_id INT PRIMARY KEY AUTO_INCREMENT,
    csn_con_id INT NOT NULL COMMENT 'Contact Id',
    csn_sn_id INT NOT NULL COMMENT 'Social Network Id',
    CONSTRAINT `fk_csn_con_id` FOREIGN KEY (csn_con_id) REFERENCES contact (con_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_csn_sn_id` FOREIGN KEY (csn_sn_id) REFERENCES social_networks (sn_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS headquarters;

CREATE TABLE headquarters(
    hq_id INT PRIMARY KEY AUTO_INCREMENT,
    hq_address VARCHAR(100) NOT NULL,
    hq_cty_id INT NOT NULL COMMENT 'City Id',
    hq_con_id INT NOT NULL COMMENT 'Contact Id',
    hq_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    hq_updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    hq_deleted_at TIMESTAMP NULL,
    CONSTRAINT `fk_hq_cty_id` FOREIGN KEY (hq_cty_id) REFERENCES cities (cty_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_hq_con_id` FOREIGN KEY (hq_con_id) REFERENCES contact (con_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS graduates;

CREATE TABLE graduates(
    grd_ced INT PRIMARY KEY NOT NULL COMMENT 'Identification document number',
    grd_fir_name VARCHAR(50) NOT NULL COMMENT 'First name',
    grd_sec_name VARCHAR(50) NULL COMMENT 'Second names',
    grd_fir_surname VARCHAR(50) NOT NULL COMMENT 'First surname',
    grd_sec_surname VARCHAR(50) NOT NULL COMMENT 'Second surname',
    grd_per_email VARCHAR(100) NOT NULL COMMENT 'Personal email',
    grd_ins_email VARCHAR(100) NOT NULL COMMENT 'Institutional email',
    grd_hq_id INT NOT NULL COMMENT 'Headquarters Id',
    grd_cty_id INT NOT NULL COMMENT 'City Id',
    grd_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    grd_updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    grd_deleted_at TIMESTAMP NULL,
    CONSTRAINT `fk_grd_hq_id` FOREIGN KEY (grd_hq_id) REFERENCES headquarters (hq_id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT `fk_grd_cty_id` FOREIGN KEY (grd_cty_id) REFERENCES cities (cty_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS restrictions;

CREATE TABLE restrictions(
    res_id INT PRIMARY KEY AUTO_INCREMENT,
    res_description VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS roles;

CREATE TABLE roles(
    rol_id INT PRIMARY KEY AUTO_INCREMENT,
    rol_description VARCHAR(20) NOT NULL
);

DROP TABLE IF EXISTS roles_restrictions;

CREATE TABLE roles_restrictions(
    rr_id INT PRIMARY KEY AUTO_INCREMENT,
    rr_rol_id INT NOT NULL COMMENT 'Role Id',
    rr_res_id INT NOT NULL COMMENT 'Restrictions Id',
    CONSTRAINT `fk_rr_rol_id` FOREIGN KEY (rr_rol_id) REFERENCES roles (rol_id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT `fk_rr_res_id` FOREIGN KEY (rr_res_id) REFERENCES restrictions (res_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS candidatures;

CREATE TABLE candidatures(
    cdt_id INT PRIMARY KEY AUTO_INCREMENT,
    cdt_ofr_id INT NOT NULL COMMENT 'Offer Id',
    cdt_grd_ced INT NOT NULL COMMENT 'Graduate Id',
    cdt_status ENUM('En proceso', 'En espera', 'Contratado', 'Rechazado') COMMENT 'Candidate status during the recruitment process',
    cdt_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cdt_updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    cdt_deleted_at TIMESTAMP NULL,
    CONSTRAINT `fk_cdt_ofr_id` FOREIGN KEY (cdt_ofr_id) REFERENCES offers (ofr_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_cdt_grd_ced` FOREIGN KEY (cdt_grd_ced) REFERENCES graduates (grd_ced) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS users;

CREATE TABLE users(
    usr_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    about_me VARCHAR(255) NULL,
    usr_rol_id INT NOT NULL COMMENT 'Role Id',
    usr_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usr_updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    usr_deleted_at TIMESTAMP NULL,
    CONSTRAINT `fk_usr_rol_id` FOREIGN KEY (usr_rol_id) REFERENCES roles (rol_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS users_companies;

CREATE TABLE users_companies(
    uc_id INT PRIMARY KEY AUTO_INCREMENT,
    uc_usr_id INT NOT NULL COMMENT 'User Id',
    uc_com_nit INT NOT NULL COMMENT 'Company Id',
    CONSTRAINT `fk_uc_usr_id` FOREIGN KEY (uc_usr_id) REFERENCES users (usr_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_uc_com_nit` FOREIGN KEY (uc_com_nit) REFERENCES companies (com_nit) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS users_graduates;

CREATE TABLE users_graduates(
    ug_id INT PRIMARY KEY AUTO_INCREMENT,
    ug_usr_id INT NOT NULL COMMENT 'User Id',
    ug_grd_ced INT NOT NULL COMMENT 'Graduate Id',
    CONSTRAINT `fk_ug_usr_id` FOREIGN KEY (ug_usr_id) REFERENCES users (usr_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_ug_grd_ced` FOREIGN KEY (ug_grd_ced) REFERENCES graduates (grd_ced) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS curriculum;

CREATE TABLE curriculum(
    curr_id INT PRIMARY KEY AUTO_INCREMENT,
    curr_pdf BLOB NOT NULL,
    curr_usr_id INT NOT NULL COMMENT 'User Id',
    CONSTRAINT `fk_curr_usr_id` FOREIGN KEY (curr_usr_id) REFERENCES users (usr_id) ON DELETE CASCADE ON UPDATE CASCADE
);

