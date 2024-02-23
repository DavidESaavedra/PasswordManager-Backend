DROP DATABASE IF EXISTS `password`;
CREATE DATABASE `password`;
USE `password`;

-- DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `refreshToken` varchar(200),
  PRIMARY KEY (`ID`)
);

-- DROP TABLE IF EXISTS `passwords`;
CREATE TABLE `passwords` (
  `userID` int NOT NULL,
  `pKey` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  FOREIGN KEY (`userID`) REFERENCES `users` (`ID`),
  PRIMARY KEY (`pKey`)
);