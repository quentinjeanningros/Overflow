CREATE TABLE users (
  id         INTEGER      NOT NULL AUTO_INCREMENT,
  username   VARCHAR(256) NOT NULL,
  password   VARCHAR(256) NOT NULL,
  CONSTRAINT PRIMARY KEY (id),
  CONSTRAINT unique_username UNIQUE KEY (username)
);

CREATE TABLE contacts (
  id         INTEGER      NOT NULL AUTO_INCREMENT,
  title      VARCHAR(256) NOT NULL,
  email      VARCHAR(256) NOT NULL,
  CONSTRAINT PRIMARY KEY (id)
);

CREATE TABLE partnerships (
  id         INTEGER      NOT NULL AUTO_INCREMENT,
  name       VARCHAR(256) NOT NULL,
  image      VARCHAR(256) NOT NULL,
  info       TEXT         NOT NULL,
  epitech    BOOL         NOT NULL DEFAULT TRUE,
  eartsup    BOOL         NOT NULL DEFAULT FALSE,
  iseg       BOOL         NOT NULL DEFAULT FALSE,
  CONSTRAINT PRIMARY KEY (id)
);

CREATE TABLE events (
  id         INTEGER       NOT NULL AUTO_INCREMENT,
  name       VARCHAR(256)  NOT NULL,
  image      VARCHAR(256)  NOT NULL,
  sound      VARCHAR(256)  NOT NULL,
  place      VARCHAR(256)  NOT NULL,
  link_map   VARCHAR(256)  NOT NULL,
  date       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  price      DECIMAL(19,4) NOT NULL,
  info       TEXT          NOT NULL,
  epitech    BOOL          NOT NULL DEFAULT TRUE,
  eartsup    BOOL          NOT NULL DEFAULT FALSE,
  iseg       BOOL          NOT NULL DEFAULT FALSE,
  CONSTRAINT PRIMARY KEY (id)
);