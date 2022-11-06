-- Active: 1659019681460@@127.0.0.1@3306@jobcenter
CREATE DATABASE jobcenter;

USE jobcenter;

DROP TABLE IF EXISTS countries;

CREATE TABLE countries(
    cntr_id INT PRIMARY KEY AUTO_INCREMENT,
    cntr_name VARCHAR(40) NOT NULL COMMENT 'Name of country' UNIQUE
);

DROP TABLE IF EXISTS district;

CREATE TABLE district(
    dis_id INT PRIMARY KEY AUTO_INCREMENT,
    dis_name VARCHAR(50) NOT NULL COMMENT 'Name of the administrative district',
    dis_country_id INT NOT NULL COMMENT 'Country of administrative district',
    CONSTRAINT `fk_dis_country_id` FOREIGN KEY (dis_country_id) REFERENCES countries (cntr_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS cities;

CREATE TABLE cities(
    cty_id INT PRIMARY KEY AUTO_INCREMENT,
    cty_name VARCHAR(50) NOT NULL COMMENT 'Name of the city',
    cty_district_id INT NOT NULL COMMENT 'City district',
    CONSTRAINT `fk_cty_district_id` FOREIGN KEY (cty_district_id) REFERENCES district (dis_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS tags;

CREATE TABLE tags(
    tag_id INT PRIMARY KEY AUTO_INCREMENT,
    tag_name VARCHAR(100) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS contract_types;

CREATE TABLE contract_types(
    ct_id INT PRIMARY KEY AUTO_INCREMENT,
    ct_name VARCHAR(100) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS job_title;

CREATE TABLE job_title(
    jt_id INT PRIMARY KEY AUTO_INCREMENT,
    jt_name VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS staff;

CREATE TABLE staff(
    stf_id INT PRIMARY KEY AUTO_INCREMENT,
    stf_ced INT NOT NULL COMMENT 'Identification document number',
    stf_name VARCHAR(100) NOT NULL,
    stf_lastname VARCHAR(100) NOT NULL,
    stf_telephone VARCHAR(11) NOT NULL,
    stf_email VARCHAR(100) NOT NULL,
    stf_jt_id INT NOT NULL COMMENT 'Job title id',
    stf_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stf_updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    stf_deleted_at TIMESTAMP NULL,
    CONSTRAINT `fk_stf_jt_id` FOREIGN KEY (stf_jt_id) REFERENCES job_title (jt_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS companies;

CREATE TABLE companies(
    com_nit INT PRIMARY KEY NOT NULL COMMENT 'Tax Identification Number',
    com_name VARCHAR(100) NOT NULL,
    com_address VARCHAR(100) NOT NULL COMMENT 'Head office address',
    com_cty_id INT NOT NULL COMMENT 'City id',
    com_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    com_updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    com_deleted_at TIMESTAMP NULL,
    CONSTRAINT `fk_com_cty_id` FOREIGN KEY (com_cty_id) REFERENCES cities (cty_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS companies_staff;

CREATE TABLE companies_staff(
    cs_id INT PRIMARY KEY AUTO_INCREMENT,
    cs_com_nit INT NOT NULL COMMENT 'Company id',
    cs_stf_id INT NOT NULL COMMENT 'Staff id',
    CONSTRAINT `fk_cs_com_nit` FOREIGN KEY (cs_com_nit) REFERENCES companies (com_nit) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT `fk_cs_stf_id` FOREIGN KEY (cs_stf_id) REFERENCES staff (stf_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS currencies;

CREATE TABLE currencies(
    crr_id INT PRIMARY KEY AUTO_INCREMENT,
    crr_iso VARCHAR(3) NOT NULL COMMENT 'ISO 4217 currency code' UNIQUE
);

DROP TABLE IF EXISTS workday;

CREATE TABLE workday(
    wd_id INT PRIMARY KEY AUTO_INCREMENT,
    wd_name VARCHAR(50) NOT NULL UNIQUE
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
    CONSTRAINT `fk_ot_ofr_id` FOREIGN KEY (ot_ofr_id) REFERENCES offers (ofr_id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT `fk_ot_tag_id` FOREIGN KEY (ot_tag_id) REFERENCES tags (tag_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS social_networks;

CREATE TABLE social_networks(
    sn_id INT PRIMARY KEY AUTO_INCREMENT,
    sn_name VARCHAR(100) NOT NULL UNIQUE,
    sn_icon TINYBLOB NOT NULL COMMENT 'Social network icon'
);

DROP TABLE IF EXISTS contact;

CREATE TABLE contact(
    con_id INT PRIMARY KEY AUTO_INCREMENT,
    con_email VARCHAR(100) NOT NULL,
    con_phone INT NOT NULL COMMENT 'Landline telephone number',
    con_telephone VARCHAR(11) NOT NULL COMMENT 'Smartphone number'
);

DROP TABLE IF EXISTS contact_sn;

CREATE TABLE contact_sn(
    csn_id INT PRIMARY KEY AUTO_INCREMENT,
    csn_con_id INT NOT NULL COMMENT 'Contact Id',
    csn_sn_id INT NOT NULL COMMENT 'Social Network Id',
    csn_path VARCHAR(255) NOT NULL COMMENT 'Social network profile path',
    CONSTRAINT `fk_csn_con_id` FOREIGN KEY (csn_con_id) REFERENCES contact (con_id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT `fk_csn_sn_id` FOREIGN KEY (csn_sn_id) REFERENCES social_networks (sn_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS offices;

CREATE TABLE offices(
    off_id INT PRIMARY KEY AUTO_INCREMENT,
    off_address VARCHAR(100) NOT NULL,
    off_cty_id INT NOT NULL COMMENT 'City Id',
    off_con_id INT NULL COMMENT 'Contact Id',
    off_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    off_updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    off_deleted_at TIMESTAMP NULL,
    CONSTRAINT `fk_off_cty_id` FOREIGN KEY (off_cty_id) REFERENCES cities (cty_id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT `fk_off_con_id` FOREIGN KEY (off_con_id) REFERENCES contact (con_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS graduates;

CREATE TABLE graduates(
    grd_ced INT PRIMARY KEY NOT NULL COMMENT 'Identification document number',
    grd_fir_name VARCHAR(50) NOT NULL COMMENT 'First name',
    grd_sec_name VARCHAR(50) NULL COMMENT 'Second names',
    grd_fir_surname VARCHAR(50) NOT NULL COMMENT 'First surname',
    grd_sec_surname VARCHAR(50) NOT NULL COMMENT 'Second surname',
    grd_email VARCHAR(100) NOT NULL COMMENT 'Institutional email',
    grd_off_id INT NOT NULL COMMENT 'offices Id',
    grd_cty_id INT NOT NULL COMMENT 'City Id',
    grd_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    grd_updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    grd_deleted_at TIMESTAMP NULL,
    CONSTRAINT `fk_grd_off_id` FOREIGN KEY (grd_off_id) REFERENCES offices (off_id) ON DELETE NO ACTION ON UPDATE CASCADE,
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
    CONSTRAINT `fk_cdt_ofr_id` FOREIGN KEY (cdt_ofr_id) REFERENCES offers (ofr_id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT `fk_cdt_grd_ced` FOREIGN KEY (cdt_grd_ced) REFERENCES graduates (grd_ced) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS users;

CREATE TABLE users(
    usr_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    about_me VARCHAR(255) NULL,
    usr_rol_id INT NOT NULL COMMENT 'Role Id',
    usr_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usr_updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    usr_deleted_at TIMESTAMP NULL,
    CONSTRAINT `fk_usr_rol_id` FOREIGN KEY (usr_rol_id) REFERENCES roles (rol_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS users_companies;

CREATE TABLE users_companies(
    uc_id INT PRIMARY KEY AUTO_INCREMENT,
    uc_usr_id INT NOT NULL COMMENT 'User Id',
    uc_com_nit INT NOT NULL COMMENT 'Company Id',
    CONSTRAINT `fk_uc_usr_id` FOREIGN KEY (uc_usr_id) REFERENCES users (usr_id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT `fk_uc_com_nit` FOREIGN KEY (uc_com_nit) REFERENCES companies (com_nit) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS users_graduates;

CREATE TABLE users_graduates(
    ug_id INT PRIMARY KEY AUTO_INCREMENT,
    ug_usr_id INT NOT NULL COMMENT 'User Id',
    ug_grd_ced INT NOT NULL COMMENT 'Graduate Id',
    CONSTRAINT `fk_ug_usr_id` FOREIGN KEY (ug_usr_id) REFERENCES users (usr_id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT `fk_ug_grd_ced` FOREIGN KEY (ug_grd_ced) REFERENCES graduates (grd_ced) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS curriculum;

CREATE TABLE curriculum(
    curr_id INT PRIMARY KEY AUTO_INCREMENT,
    curr_pdf BLOB NOT NULL,
    curr_usr_id INT NOT NULL COMMENT 'User Id',
    CONSTRAINT `fk_curr_usr_id` FOREIGN KEY (curr_usr_id) REFERENCES users (usr_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

