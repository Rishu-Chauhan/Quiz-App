-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: quiz_server_db
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `correct_answer` varchar(255) DEFAULT NULL,
  `marks` int DEFAULT NULL,
  `option1` varchar(255) DEFAULT NULL,
  `option2` varchar(255) DEFAULT NULL,
  `option3` varchar(255) DEFAULT NULL,
  `option4` varchar(255) DEFAULT NULL,
  `question_text` varchar(1000) DEFAULT NULL,
  `quiz_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb0yh0c1qaxfwlcnwo9dms2txf` (`quiz_id`),
  CONSTRAINT `FKb0yh0c1qaxfwlcnwo9dms2txf` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'option2',1,'Mobile app development','Building standalone Spring applications','Game development','Desktop application development','1. What is Spring Boot primarily used for?',1),(2,'option3',1,'@SpringApplication','@EnableBoot','@SpringBootApplication','@Configuration','2. Which annotation marks the main class of a Spring Boot application?',1),(3,'option2',1,'Stack','Queue','Tree','Graph','Which data structure follows the FIFO (First In, First Out) principle?',3),(4,'option1',1,'Stack','Queue','Linked List','Heap','Which data structure follows the LIFO (Last In, First Out) principle?',3),(5,'option1',1,'Array','Linked List','Queue','Tree','Which data structure stores elements in contiguous memory locations?',3),(6,'option2',1,'Array','Linked List','Stack','Queue','Which data structure allows dynamic memory allocation?',3),(7,'option2',1,'Linear Search','Binary Search','DFS','BFS',' Which searching algorithm requires the data to be sorted?',3),(8,'option2',1,'O(1)','O(n)','O(log n)','O(n log n)','What is the time complexity of Linear Search in the worst case?',3),(9,'option2',1,'O(n)','O(log n)','O(n²)','O(1)','What is the time complexity of Binary Search in the worst case?',3),(10,'option1',1,'Bubble Sort','Merge Sort','Quick Sort','Heap Sort','Which sorting algorithm repeatedly swaps adjacent elements?',3),(11,'option1',1,'Stack','Queue','Array','Tree','Which data structure is used for implementing recursion?',3),(12,'option3',1,'Queue','Stack','Tree','Array','Which data structure represents hierarchical relationships?',3),(13,'option4',1,'Stack','Queue','Tree','Graph','Which data structure is commonly used to represent a network?',3),(14,'option1',1,'Preorder','Inorder','Postorder','Level Order','Which traversal visits the root node first?',3),(15,'option3',1,'Delete','Pop','Push','Peek','Which operation adds an element to a stack?',3),(16,'option2',1,'Push','Dequeue','Peek','Insert','Which operation removes an element from a queue?',3),(17,'option2',1,'Iteration','Recursion','Sorting','Searching','Which algorithmic technique solves a problem by calling itself?',3),(18,'option2',1,'Alpha Notation','Big O Notation','Delta Notation','Sigma Notation','Which notation is used to describe algorithm efficiency?',3),(19,'option2',1,'Bubble Sort','Merge Sort','Selection Sort','Insertion Sort ','Which sorting algorithm divides the array into two halves before sorting?',3),(20,'option1',1,'Stack','Queue','Tree','Graph','Which data structure is best for implementing a browser\'s Back button?',3),(21,'option1',1,'Linear Search','Binary Search','Depth-First Search','Breadth-First Search','Which search algorithm checks elements one by one?',3),(22,'option3',1,'Stack','Queue','Tree','Graph','Which of the following is not a linear data structure?',3);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `time_limit` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `total_marks` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (1,'2026-07-10 08:46:06.956448','Assess your understanding of Spring Boot fundamentals, REST APIs, dependency injection, Spring Data JPA, Spring Security, validation, and database integration. Perfect for backend developers.',_binary '',20,'Spring Boot Essential',20),(3,'2026-07-10 08:58:47.892023','Evaluate your knowledge of arrays, linked lists, stacks, queues, trees, graphs, searching, sorting, recursion, and time complexity. Great for coding interview preparation.',_binary '',20,'Data Structures & Algorithms',20);
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_attempt`
--

DROP TABLE IF EXISTS `quiz_attempt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_attempt` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `answers` varchar(5000) DEFAULT NULL,
  `attempted_at` datetime(6) DEFAULT NULL,
  `correct_answers` int DEFAULT NULL,
  `score` int DEFAULT NULL,
  `total_questions` int DEFAULT NULL,
  `wrong_answers` int DEFAULT NULL,
  `quiz_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8l6wmgul0rgeha0lp6abrp5fa` (`quiz_id`),
  KEY `FKdwtjplymtc83ovymfhx0fk2a5` (`user_id`),
  CONSTRAINT `FK8l6wmgul0rgeha0lp6abrp5fa` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`),
  CONSTRAINT `FKdwtjplymtc83ovymfhx0fk2a5` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_attempt`
--

LOCK TABLES `quiz_attempt` WRITE;
/*!40000 ALTER TABLE `quiz_attempt` DISABLE KEYS */;
INSERT INTO `quiz_attempt` VALUES (1,'{\"1\":\"option2\",\"2\":\"option2\"}','2026-07-10 08:51:18.971545',1,1,2,1,1,2),(2,'{\"1\":\"option2\",\"2\":\"option1\"}','2026-07-10 09:15:09.117034',1,1,2,1,1,3),(3,'{\"3\":\"option2\",\"4\":\"option2\",\"5\":\"option1\",\"6\":\"option2\",\"7\":\"option2\",\"8\":\"option2\",\"9\":\"option2\",\"10\":\"option1\",\"11\":\"option4\",\"12\":\"option3\",\"13\":\"option4\",\"14\":\"option1\",\"15\":\"option3\",\"16\":\"option3\",\"17\":\"option2\",\"18\":\"option2\",\"19\":\"option2\",\"20\":\"option2\",\"21\":\"option1\",\"22\":\"option1\"}','2026-07-10 09:17:29.942441',15,15,20,5,3,3),(4,'{\"3\":\"option1\",\"4\":\"option1\",\"5\":\"option1\",\"6\":\"option1\",\"7\":\"option1\",\"8\":\"option1\",\"9\":\"option2\",\"10\":\"option2\",\"11\":\"option2\",\"12\":\"option3\",\"13\":\"option3\",\"14\":\"option4\",\"15\":\"option1\",\"16\":\"option4\",\"17\":\"option2\",\"18\":\"option1\",\"19\":\"option2\",\"20\":\"option1\",\"21\":\"option1\",\"22\":\"option2\"}','2026-07-10 09:18:52.765305',8,8,20,12,3,2);
/*!40000 ALTER TABLE `quiz_attempt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_chk_1` CHECK ((`role` between 0 and 1))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin@gmail.com','Admin','admin',0),(2,'test@gmail.com','test','test',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2026-07-10 12:31:41.326523','admin@gmail.com',_binary '','Admin','admin','ADMIN'),(2,'2026-07-10 08:37:52.022951','rishuchauhan1@gmail.com',_binary '','Rishu Chauhan ','admin','USER'),(3,'2026-07-10 08:54:17.955426','rimi123@gmail.com',_binary '','vikash ','rimi@123','USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-11 10:51:38
