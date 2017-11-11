USE challenge;

CREATE TABLE test(col VARCHAR(10));

INSERT INTO test(col) VALUES('ok');

CREATE TABLE users (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE messages (
    id BIGINT NOT NULL AUTO_INCREMENT,
    type ENUM('text', 'image', 'video'),
    sender_id MEDIUMINT NOT NULL,
    receiver_id MEDIUMINT NOT NULL,
    message TEXT DEFAULT NULL,
    link VARCHAR(1024) NULL,
    image_width INT NULL,
    image_height INT NULL,
    video_length INT NULL,
    video_source ENUM('YouTube', 'Vevo'),
    PRIMARY KEY (id),
    INDEX idx_sender_id (sender_id),
    INDEX idx_receiver_id (receiver_id),
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
) ENGINE=INNODB;