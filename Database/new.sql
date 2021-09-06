-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: leavemanagement_db
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Human Resoures','images/departments/human.jpg'),(2,'Finace','images/departments/finance.jpg'),(3,'Accounting','images/departments/accounting.jpg'),(4,'Research&Development','images/departments/research.png'),(5,'Marketing','images/departments/marketing.jpg'),(6,'Sales','images/departments/sales.jpg');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employes`
--

DROP TABLE IF EXISTS `employes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `phone` int NOT NULL,
  `location` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `usertype` varchar(255) NOT NULL,
  `repOfficer` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `departmentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0478de37c0b121c430a25da7726` (`departmentId`),
  CONSTRAINT `FK_0478de37c0b121c430a25da7726` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employes`
--

LOCK TABLES `employes` WRITE;
/*!40000 ALTER TABLE `employes` DISABLE KEYS */;
INSERT INTO `employes` VALUES (1,'Damu','developer',755900302,'India','hnh','normal',2,'damu@gmail.com','123',3),(2,'Kurip','manager',890765432,'uk','hgtr','repofficer',2,'kurip@gmail.com','123',5),(3,'Deslin','ceo',12345678,'usa','ds','hr',2,'deslinj1@gmail.com','123',6),(4,'Abin','software',987654321,'uae','sd','normal',2,'abin@gmail.com','123',2);
/*!40000 ALTER TABLE `employes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_request`
--

DROP TABLE IF EXISTS `leave_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `leaveType` varchar(255) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `days` int NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Pending',
  `rejectReason` varchar(255) DEFAULT NULL,
  `employeId` int DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `fromDate` varchar(255) NOT NULL,
  `toDate` varchar(255) NOT NULL,
  `applyDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_cbfa58135b7b1b847147e81ac04` (`employeId`),
  CONSTRAINT `FK_cbfa58135b7b1b847147e81ac04` FOREIGN KEY (`employeId`) REFERENCES `employes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_request`
--

LOCK TABLES `leave_request` WRITE;
/*!40000 ALTER TABLE `leave_request` DISABLE KEYS */;
INSERT INTO `leave_request` VALUES (22,'Casual Leave','marriage',2,'Approved',NULL,4,'','2021-06-18','2021-06-20','2021-07-08 14:38:59'),(23,'Sick Leave','Headache',2,'Rejected',NULL,4,'','2021-06-22','2021-06-24','2021-07-09 09:32:01'),(24,'Sick Leave','Covid',2,'Approved',NULL,4,'','2021-05-18','2021-05-20','2021-07-10 10:25:44'),(25,'Casual Leave','party',2,'Approved',NULL,1,'','2021-05-09','2021-05-11','2021-07-11 16:39:26'),(26,'Sick Leave','covid',2,'Approved',NULL,1,'','2021-05-10','2021-05-12','2021-07-12 08:37:15'),(154,'Loss Of Pay','marriage',1,'Rejected','no',3,NULL,'2021-07-14','2021-07-15','2021-07-13 09:44:11'),(156,'Sick Leave','cold',2,'Approved',NULL,3,NULL,'2021-07-07','2021-07-09','2021-07-14 09:45:13'),(157,'Casual Leave','trip',6,'Approved',NULL,3,NULL,'2021-07-22','2021-07-28','2021-07-15 09:45:40'),(158,'Earned Leave','lockdown',2,'Approved',NULL,1,NULL,'2021-07-06','2021-07-08','2021-07-11 09:46:40'),(159,'Sick Leave','headache',1,'Rejected','no',1,NULL,'2021-07-16','2021-07-17','2021-07-12 09:47:59'),(160,'Casual Leave','hospital',1,'Rejected','nojh',1,NULL,'2021-07-07','2021-07-08','2021-07-13 09:47:44'),(161,'Sick Leave','covid',2,'Approved',NULL,2,NULL,'2021-07-01','2021-07-03','2021-07-12 09:52:16'),(162,'Earned Leave','party',3,'Approved',NULL,2,NULL,'2021-07-06','2021-07-09','2021-07-13 09:52:36'),(163,'Sick Leave','hospital',2,'Rejected','no',2,NULL,'2021-07-12','2021-07-14','2021-07-14 09:53:01'),(164,'Sick Leave','no',2,'Approved',NULL,1,NULL,'2021-07-07','2021-07-09','2021-07-15 14:13:32'),(165,'Sick Leave','des',1,'Pending',NULL,3,NULL,'2021-07-08','2021-07-09','2021-07-16 12:17:04');
/*!40000 ALTER TABLE `leave_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `age` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-16 12:33:24
