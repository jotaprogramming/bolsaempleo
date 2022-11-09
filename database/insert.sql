-- Active: 1659019681460@@127.0.0.1@3306
USE jobcenter;

INSERT INTO countries (cntr_name) VALUES ('Colombia');
INSERT INTO district (dis_name, dis_country_id) VALUES ('Santander', 1);
INSERT INTO cities (cty_name, cty_district_id) VALUES ('Bucaramanga', 1);
INSERT INTO job_title (jt_name) VALUES ('Representante Legal'), ('Recursos Humanos');
INSERT INTO roles (rol_description) VALUES ('root'), ('admin'), ('mod'), ('company'), ('graduate'), ('visitor');