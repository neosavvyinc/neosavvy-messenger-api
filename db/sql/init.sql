USE challenge;

CREATE TABLE test(col VARCHAR(10));

INSERT INTO test(col) VALUES('ok');

CREATE TABLE users (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    PRIMARY KEY (id)
);