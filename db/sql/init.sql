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
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sender_id MEDIUMINT NOT NULL,
    receiver_id MEDIUMINT NOT NULL,
    message TEXT DEFAULT NULL,
    PRIMARY KEY (id),
    INDEX idx_sender_id (sender_id),
    INDEX idx_receiver_id (receiver_id),
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
) ENGINE=INNODB;

CREATE TABLE messages_video (
    id BIGINT NOT NULL AUTO_INCREMENT,
    parent_message_id BIGINT NOT NULL,
    video_length INT NULL,
    video_source ENUM('YouTube', 'Vevo'),
    INDEX idx_parent_message_id (parent_message_id),
    FOREIGN KEY (parent_message_id) REFERENCES messages(id),
    PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE messages_image (
    id BIGINT NOT NULL AUTO_INCREMENT,
    parent_message_id BIGINT NOT NULL,
    link VARCHAR(1024) NULL,
    image_width INT NULL,
    image_height INT NULL,
    INDEX idx_parent_message_id (parent_message_id),
    FOREIGN KEY (parent_message_id) REFERENCES messages(id),
    PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE messages_text (
    id BIGINT NOT NULL AUTO_INCREMENT,
    parent_message_id BIGINT NOT NULL,
    INDEX idx_parent_message_id (parent_message_id),
    FOREIGN KEY (parent_message_id) REFERENCES messages(id),
    PRIMARY KEY (id)
) ENGINE=INNODB;

-- Tons of ways to skin this cat, Views, Procedures, Flatting the above inheritance into
-- one big flat table. We'd have to work together to define long term goals and time complexity
-- vs space complexity of either solution - not to mention code complexity for long term maintenance
CREATE VIEW messages_view AS
SELECT * FROM (
  SELECT
    m.id,
    type,
    created,
    sender_id,
    receiver_id,
    message,
    '' link,
    '' image_width,
    '' image_height,
    '' video_length,
    '' video_source
  FROM
    messages m,
    messages_text mt
  WHERE
    m.id = mt.parent_message_id
UNION ALL
  SELECT
    m.id,
    type,
    created,
    sender_id,
    receiver_id,
    message,
    '' link,
    '' image_width,
    '' image_height,
    video_length,
    video_source
  FROM
    messages m,
    messages_video mv
  WHERE
    m.id = mv.parent_message_id
UNION ALL
  SELECT
    m.id,
    type,
    created,
    sender_id,
    receiver_id,
    message,
    link,
    image_width,
    image_height,
    '' video_length,
    '' video_source
  FROM
    messages m,
    messages_image mi
  WHERE
    m.id = mi.parent_message_id
  ) as all_messages ;