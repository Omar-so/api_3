-- phpMyAdmin SQL Dump
-- version 5.2.2deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 26, 2025 at 11:21 AM
-- Server version: 11.8.1-MariaDB-2
-- PHP Version: 8.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alumni`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE `Admin` (
  `Id_Admin` int(11) NOT NULL,
  `Name_Admin` varchar(100) NOT NULL,
  `Email_Admin` varchar(100) NOT NULL,
  `Passwd_Admin` varchar(100) NOT NULL,
  `Img_Admin` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `Admin`
--

INSERT INTO `Admin` (`Id_Admin`, `Name_Admin`, `Email_Admin`, `Passwd_Admin`, `Img_Admin`) VALUES
(1, 'admin', 'admin', '$2y$12$KQy9UVPgHvGuKBbk3lV7LOBLFMdvfvGMjwTmA6DV/.t0IkWzg4aYi', 'https://i.ibb.co/NggKLSQg/Screenshot-2024-11-26-13-10-31.png');

-- --------------------------------------------------------

--
-- Table structure for table `Alumni`
--

CREATE TABLE `Alumni` (
  `Id_Alumni` int(11) NOT NULL,
  `Name_Alumni` varchar(100) NOT NULL,
  `Email_Alumni` varchar(100) NOT NULL,
  `Passwd_Alumni` varchar(100) NOT NULL,
  `Job_Alumni` varchar(100) DEFAULT NULL,
  `Img_Alumni` varchar(100) DEFAULT NULL,
  `Department_Alumni` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `Alumni`
--

INSERT INTO `Alumni` (`Id_Alumni`, `Name_Alumni`, `Email_Alumni`, `Passwd_Alumni`, `Job_Alumni`, `Img_Alumni`, `Department_Alumni`) VALUES
(1, 'omar', 'omar@gmail.com', '$2y$12$3pRLdhC3/hdDTx2ihzQ0ye95/LXB/CeWLX07w7ItL6S.YA9Pwqw/a', 'softwareegineer', NULL, 'cs'),
(2, 'omar', 'momoa@gmail.xddee', '$2y$12$wjlIi2IT1d4d/gzmHlFZp.FQCCfvIVOpX0djET3Tp9Yqmi.RuWGK.', 'engineer', 'https://i.ibb.co/DHx72Rm2/Screenshot-2024-12-19-10-57-38.png', 'cs'),
(3, 'omar', 'said@gmail.com', '$2y$12$xw4rL3ORWzEEACNhnJcZ.unHhliQYBEWxZam1/pEZcn5Xl/k2y3HK', 'engineer', 'https://i.ibb.co/DHx72Rm2/Screenshot-2024-12-19-10-57-38.png', 'cs');

-- --------------------------------------------------------

--
-- Table structure for table `Alumni_Certificate`
--

CREATE TABLE `Alumni_Certificate` (
  `Id_Alumni` int(11) NOT NULL,
  `Id_Certificate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Alumni_Contact`
--

CREATE TABLE `Alumni_Contact` (
  `From_Alumni_Id` int(11) NOT NULL,
  `To_Alumni_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Alumni_Event`
--

CREATE TABLE `Alumni_Event` (
  `Id_Alumni` int(11) NOT NULL,
  `Id_Event` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Certificate`
--

CREATE TABLE `Certificate` (
  `Id_Certificate` int(11) NOT NULL,
  `Id_Admin` int(11) DEFAULT NULL,
  `Name_Certificate` varchar(255) DEFAULT NULL,
  `Issued_Date_Certificate` date DEFAULT NULL,
  `Img_Certificate` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Comment`
--

CREATE TABLE `Comment` (
  `Id_Comment` int(11) NOT NULL,
  `Id_Alumni` int(11) DEFAULT NULL,
  `Id_Post` int(11) DEFAULT NULL,
  `Content_Comment` text DEFAULT NULL,
  `Created_At_Comment` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `Comment`
--

INSERT INTO `Comment` (`Id_Comment`, `Id_Alumni`, `Id_Post`, `Content_Comment`, `Created_At_Comment`) VALUES
(1, 3, 10, 'that is great idea', '2025-04-24 14:10:22');

-- --------------------------------------------------------

--
-- Table structure for table `Deleted_Alumni`
--

CREATE TABLE `Deleted_Alumni` (
  `Id_Deleted_Alumni` int(11) NOT NULL,
  `Id_Admin` int(11) DEFAULT NULL,
  `Id_Alumni` int(11) DEFAULT NULL,
  `Reason_Deleted_Alumni` text DEFAULT NULL,
  `Deleted_At_Deleted_Alumni` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Event`
--

CREATE TABLE `Event` (
  `Id_Event` int(11) NOT NULL,
  `Id_Admin` int(11) DEFAULT NULL,
  `Name_Event` varchar(255) DEFAULT NULL,
  `Location_Event` varchar(255) DEFAULT NULL,
  `Event_Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `Event`
--

INSERT INTO `Event` (`Id_Event`, `Id_Admin`, `Name_Event`, `Location_Event`, `Event_Date`) VALUES
(1, 1, 'cdc', 'dcccd', '2005-06-21');

-- --------------------------------------------------------

--
-- Table structure for table `Feedback`
--

CREATE TABLE `Feedback` (
  `Id_Feedback` int(11) NOT NULL,
  `Id_Alumni` int(11) DEFAULT NULL,
  `Id_Admin` int(11) DEFAULT NULL,
  `Content_Feedback` text DEFAULT NULL,
  `Submitted_At_Feedback` datetime DEFAULT NULL,
  `Response_Admin` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `Feedback`
--

INSERT INTO `Feedback` (`Id_Feedback`, `Id_Alumni`, `Id_Admin`, `Content_Feedback`, `Submitted_At_Feedback`, `Response_Admin`) VALUES
(1, 3, 1, 'diddjvndkv', '2025-04-25 08:41:37', 'sounds cool');

-- --------------------------------------------------------

--
-- Table structure for table `Group`
--

CREATE TABLE `Group` (
  `Id_Group` int(11) NOT NULL,
  `Id_Alumni` int(11) DEFAULT NULL,
  `Name_Group` varchar(100) DEFAULT NULL,
  `Type_Group` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `Group`
--

INSERT INTO `Group` (`Id_Group`, `Id_Alumni`, `Name_Group`, `Type_Group`) VALUES
(1, 3, 'AI_Trainee', 'AI'),
(2, 3, 'cs traniee', 'cs');

-- --------------------------------------------------------

--
-- Table structure for table `Mentorship`
--

CREATE TABLE `Mentorship` (
  `Id_Mentorship` int(11) NOT NULL,
  `Id_Alumni` int(11) DEFAULT NULL,
  `Topic_Mentorship` varchar(100) DEFAULT NULL,
  `Description_Mentorship` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `Mentorship`
--

INSERT INTO `Mentorship` (`Id_Mentorship`, `Id_Alumni`, `Topic_Mentorship`, `Description_Mentorship`) VALUES
(1, 3, 'cs', 'fundimental of cs');

-- --------------------------------------------------------

--
-- Table structure for table `News`
--

CREATE TABLE `News` (
  `Id_News` int(11) NOT NULL,
  `Id_Admin` int(11) DEFAULT NULL,
  `Title_News` varchar(255) DEFAULT NULL,
  `Content_News` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Participate`
--

CREATE TABLE `Participate` (
  `Id_Alumni` int(11) NOT NULL,
  `Id_Group` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `Participate`
--

INSERT INTO `Participate` (`Id_Alumni`, `Id_Group`) VALUES
(3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Post`
--

CREATE TABLE `Post` (
  `Id_Post` int(11) NOT NULL,
  `Id_Alumni` int(11) DEFAULT NULL,
  `Id_Group` int(11) DEFAULT NULL,
  `Content_Post` text DEFAULT NULL,
  `Img_Post` text DEFAULT NULL,
  `Created_At_Post` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `Post`
--

INSERT INTO `Post` (`Id_Post`, `Id_Alumni`, `Id_Group`, `Content_Post`, `Img_Post`, `Created_At_Post`) VALUES
(10, 3, 1, 'look to this dude', NULL, '2025-04-24 13:04:33'),
(11, 3, 1, 'look to this dude', NULL, '2025-04-24 13:06:14'),
(12, 3, 1, 'look to this dude', NULL, '2025-04-24 13:08:26'),
(13, 3, 1, 'look to this dudefff', NULL, '2025-04-24 13:11:02'),
(14, 3, 1, 'look to this dudefff', NULL, '2025-04-24 13:18:10'),
(15, 3, 1, 'look to this dudefff', NULL, '2025-04-24 13:21:13'),
(16, 3, 1, 'look to this dudefff', NULL, '2025-04-24 13:23:34');

-- --------------------------------------------------------

--
-- Table structure for table `Story`
--

CREATE TABLE `Story` (
  `Id_Story` int(11) NOT NULL,
  `Id_Alumni` int(11) DEFAULT NULL,
  `Title_Story` varchar(255) DEFAULT NULL,
  `Content_Story` text DEFAULT NULL,
  `Created_At_Story` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `Story`
--

INSERT INTO `Story` (`Id_Story`, `Id_Alumni`, `Title_Story`, `Content_Story`, `Created_At_Story`) VALUES
(3, 3, 'made at work', 'cnsodknvsodnv', '2025-04-24 15:13:59');

-- --------------------------------------------------------

--
-- Table structure for table `Student`
--

CREATE TABLE `Student` (
  `Id_Student` int(11) NOT NULL,
  `Name_Student` varchar(100) NOT NULL,
  `Email_Student` varchar(100) NOT NULL,
  `Passwd_Student` varchar(100) NOT NULL,
  `Img_Student` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Student_Mentorship`
--

CREATE TABLE `Student_Mentorship` (
  `Id_Student` int(11) NOT NULL,
  `Id_Mentorship` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`Id_Admin`);

--
-- Indexes for table `Alumni`
--
ALTER TABLE `Alumni`
  ADD PRIMARY KEY (`Id_Alumni`);

--
-- Indexes for table `Alumni_Certificate`
--
ALTER TABLE `Alumni_Certificate`
  ADD PRIMARY KEY (`Id_Alumni`,`Id_Certificate`),
  ADD KEY `Id_Certificate` (`Id_Certificate`);

--
-- Indexes for table `Alumni_Contact`
--
ALTER TABLE `Alumni_Contact`
  ADD PRIMARY KEY (`From_Alumni_Id`,`To_Alumni_Id`),
  ADD KEY `To_Alumni_Id` (`To_Alumni_Id`);

--
-- Indexes for table `Alumni_Event`
--
ALTER TABLE `Alumni_Event`
  ADD PRIMARY KEY (`Id_Alumni`,`Id_Event`),
  ADD KEY `Id_Event` (`Id_Event`);

--
-- Indexes for table `Certificate`
--
ALTER TABLE `Certificate`
  ADD PRIMARY KEY (`Id_Certificate`),
  ADD KEY `Id_Admin` (`Id_Admin`);

--
-- Indexes for table `Comment`
--
ALTER TABLE `Comment`
  ADD PRIMARY KEY (`Id_Comment`),
  ADD KEY `Id_Alumni` (`Id_Alumni`),
  ADD KEY `Id_Post` (`Id_Post`);

--
-- Indexes for table `Deleted_Alumni`
--
ALTER TABLE `Deleted_Alumni`
  ADD PRIMARY KEY (`Id_Deleted_Alumni`),
  ADD KEY `Id_Admin` (`Id_Admin`),
  ADD KEY `Id_Alumni` (`Id_Alumni`);

--
-- Indexes for table `Event`
--
ALTER TABLE `Event`
  ADD PRIMARY KEY (`Id_Event`),
  ADD KEY `Id_Admin` (`Id_Admin`);

--
-- Indexes for table `Feedback`
--
ALTER TABLE `Feedback`
  ADD PRIMARY KEY (`Id_Feedback`),
  ADD KEY `Id_Alumni` (`Id_Alumni`),
  ADD KEY `Id_Admin` (`Id_Admin`);

--
-- Indexes for table `Group`
--
ALTER TABLE `Group`
  ADD PRIMARY KEY (`Id_Group`),
  ADD KEY `Id_Alumni` (`Id_Alumni`);

--
-- Indexes for table `Mentorship`
--
ALTER TABLE `Mentorship`
  ADD PRIMARY KEY (`Id_Mentorship`),
  ADD KEY `Id_Alumni` (`Id_Alumni`);

--
-- Indexes for table `News`
--
ALTER TABLE `News`
  ADD PRIMARY KEY (`Id_News`),
  ADD KEY `Id_Admin` (`Id_Admin`);

--
-- Indexes for table `Participate`
--
ALTER TABLE `Participate`
  ADD PRIMARY KEY (`Id_Alumni`,`Id_Group`),
  ADD KEY `Id_Group` (`Id_Group`);

--
-- Indexes for table `Post`
--
ALTER TABLE `Post`
  ADD PRIMARY KEY (`Id_Post`),
  ADD KEY `Id_Alumni` (`Id_Alumni`),
  ADD KEY `Id_Group` (`Id_Group`);

--
-- Indexes for table `Story`
--
ALTER TABLE `Story`
  ADD PRIMARY KEY (`Id_Story`),
  ADD KEY `Id_Alumni` (`Id_Alumni`);

--
-- Indexes for table `Student`
--
ALTER TABLE `Student`
  ADD PRIMARY KEY (`Id_Student`);

--
-- Indexes for table `Student_Mentorship`
--
ALTER TABLE `Student_Mentorship`
  ADD PRIMARY KEY (`Id_Student`,`Id_Mentorship`),
  ADD KEY `Id_Mentorship` (`Id_Mentorship`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `Id_Admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Alumni`
--
ALTER TABLE `Alumni`
  MODIFY `Id_Alumni` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Certificate`
--
ALTER TABLE `Certificate`
  MODIFY `Id_Certificate` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Comment`
--
ALTER TABLE `Comment`
  MODIFY `Id_Comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Deleted_Alumni`
--
ALTER TABLE `Deleted_Alumni`
  MODIFY `Id_Deleted_Alumni` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Event`
--
ALTER TABLE `Event`
  MODIFY `Id_Event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Feedback`
--
ALTER TABLE `Feedback`
  MODIFY `Id_Feedback` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Group`
--
ALTER TABLE `Group`
  MODIFY `Id_Group` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Mentorship`
--
ALTER TABLE `Mentorship`
  MODIFY `Id_Mentorship` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `News`
--
ALTER TABLE `News`
  MODIFY `Id_News` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Post`
--
ALTER TABLE `Post`
  MODIFY `Id_Post` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `Story`
--
ALTER TABLE `Story`
  MODIFY `Id_Story` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Student`
--
ALTER TABLE `Student`
  MODIFY `Id_Student` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Alumni_Certificate`
--
ALTER TABLE `Alumni_Certificate`
  ADD CONSTRAINT `Alumni_Certificate_ibfk_1` FOREIGN KEY (`Id_Alumni`) REFERENCES `Alumni` (`Id_Alumni`) ON DELETE CASCADE,
  ADD CONSTRAINT `Alumni_Certificate_ibfk_2` FOREIGN KEY (`Id_Certificate`) REFERENCES `Certificate` (`Id_Certificate`) ON DELETE CASCADE;

--
-- Constraints for table `Alumni_Contact`
--
ALTER TABLE `Alumni_Contact`
  ADD CONSTRAINT `Alumni_Contact_ibfk_1` FOREIGN KEY (`From_Alumni_Id`) REFERENCES `Alumni` (`Id_Alumni`) ON DELETE CASCADE,
  ADD CONSTRAINT `Alumni_Contact_ibfk_2` FOREIGN KEY (`To_Alumni_Id`) REFERENCES `Alumni` (`Id_Alumni`) ON DELETE CASCADE;

--
-- Constraints for table `Alumni_Event`
--
ALTER TABLE `Alumni_Event`
  ADD CONSTRAINT `Alumni_Event_ibfk_1` FOREIGN KEY (`Id_Alumni`) REFERENCES `Alumni` (`Id_Alumni`) ON DELETE CASCADE,
  ADD CONSTRAINT `Alumni_Event_ibfk_2` FOREIGN KEY (`Id_Event`) REFERENCES `Event` (`Id_Event`) ON DELETE CASCADE;

--
-- Constraints for table `Certificate`
--
ALTER TABLE `Certificate`
  ADD CONSTRAINT `Certificate_ibfk_1` FOREIGN KEY (`Id_Admin`) REFERENCES `Admin` (`Id_Admin`) ON DELETE CASCADE;

--
-- Constraints for table `Comment`
--
ALTER TABLE `Comment`
  ADD CONSTRAINT `Comment_ibfk_1` FOREIGN KEY (`Id_Alumni`) REFERENCES `Alumni` (`Id_Alumni`) ON DELETE CASCADE,
  ADD CONSTRAINT `Comment_ibfk_2` FOREIGN KEY (`Id_Post`) REFERENCES `Post` (`Id_Post`) ON DELETE CASCADE;

--
-- Constraints for table `Deleted_Alumni`
--
ALTER TABLE `Deleted_Alumni`
  ADD CONSTRAINT `Deleted_Alumni_ibfk_1` FOREIGN KEY (`Id_Admin`) REFERENCES `Admin` (`Id_Admin`) ON DELETE CASCADE,
  ADD CONSTRAINT `Deleted_Alumni_ibfk_2` FOREIGN KEY (`Id_Alumni`) REFERENCES `Alumni` (`Id_Alumni`) ON DELETE CASCADE;

--
-- Constraints for table `Event`
--
ALTER TABLE `Event`
  ADD CONSTRAINT `Event_ibfk_1` FOREIGN KEY (`Id_Admin`) REFERENCES `Admin` (`Id_Admin`) ON DELETE CASCADE;

--
-- Constraints for table `Feedback`
--
ALTER TABLE `Feedback`
  ADD CONSTRAINT `Feedback_ibfk_1` FOREIGN KEY (`Id_Alumni`) REFERENCES `Alumni` (`Id_Alumni`) ON DELETE CASCADE,
  ADD CONSTRAINT `Feedback_ibfk_2` FOREIGN KEY (`Id_Admin`) REFERENCES `Admin` (`Id_Admin`) ON DELETE CASCADE;

--
-- Constraints for table `Group`
--
ALTER TABLE `Group`
  ADD CONSTRAINT `Group_ibfk_1` FOREIGN KEY (`Id_Alumni`) REFERENCES `Alumni` (`Id_Alumni`) ON DELETE CASCADE;

--
-- Constraints for table `Mentorship`
--
ALTER TABLE `Mentorship`
  ADD CONSTRAINT `Mentorship_ibfk_1` FOREIGN KEY (`Id_Alumni`) REFERENCES `Alumni` (`Id_Alumni`) ON DELETE CASCADE;

--
-- Constraints for table `News`
--
ALTER TABLE `News`
  ADD CONSTRAINT `News_ibfk_1` FOREIGN KEY (`Id_Admin`) REFERENCES `Admin` (`Id_Admin`) ON DELETE CASCADE;

--
-- Constraints for table `Participate`
--
ALTER TABLE `Participate`
  ADD CONSTRAINT `Participate_ibfk_1` FOREIGN KEY (`Id_Alumni`) REFERENCES `Alumni` (`Id_Alumni`) ON DELETE CASCADE,
  ADD CONSTRAINT `Participate_ibfk_2` FOREIGN KEY (`Id_Group`) REFERENCES `Group` (`Id_Group`) ON DELETE CASCADE;

--
-- Constraints for table `Post`
--
ALTER TABLE `Post`
  ADD CONSTRAINT `Post_ibfk_1` FOREIGN KEY (`Id_Alumni`) REFERENCES `Alumni` (`Id_Alumni`) ON DELETE CASCADE,
  ADD CONSTRAINT `Post_ibfk_2` FOREIGN KEY (`Id_Group`) REFERENCES `Group` (`Id_Group`) ON DELETE SET NULL;

--
-- Constraints for table `Story`
--
ALTER TABLE `Story`
  ADD CONSTRAINT `Story_ibfk_1` FOREIGN KEY (`Id_Alumni`) REFERENCES `Alumni` (`Id_Alumni`) ON DELETE CASCADE;

--
-- Constraints for table `Student_Mentorship`
--
ALTER TABLE `Student_Mentorship`
  ADD CONSTRAINT `Student_Mentorship_ibfk_1` FOREIGN KEY (`Id_Student`) REFERENCES `Student` (`Id_Student`) ON DELETE CASCADE,
  ADD CONSTRAINT `Student_Mentorship_ibfk_2` FOREIGN KEY (`Id_Mentorship`) REFERENCES `Mentorship` (`Id_Mentorship`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
