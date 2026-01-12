-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Gostitelj: express_mysql:3306
-- Čas nastanka: 09. jan 2026 ob 14.31
-- Različica strežnika: 9.1.0
-- Različica PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_bkeep`
--

-- --------------------------------------------------------

--
-- Table structure for table `esp_secret`
--

CREATE TABLE `esp_secret` (
  `id` int NOT NULL,
  `secret` char(32) DEFAULT NULL,
  `id_hive` int NOT NULL,
  `date_registered` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- Struktura tabele `blockchain`
--

CREATE TABLE `blockchain` (
  `index` int NOT NULL,
  `previousHash` varchar(500) DEFAULT NULL,
  `timestamp` int NOT NULL,
  `data` varchar(500) NOT NULL,
  `difficulty` int NOT NULL,
  `token` int NOT NULL,
  `hash` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktura tabele `hive`
--

CREATE TABLE `hive` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  `type` enum('lr','az','db') NOT NULL,
  `status` enum('offline','online') NOT NULL,
  `id_location` int NOT NULL,
  `id_user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Struktura tabele `hive_weight`
--

CREATE TABLE `hive_weight` (
  `id` int NOT NULL,
  `weight` float NOT NULL,
  `time_weight` datetime NOT NULL,
  `id_hive` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Odloži podatke za tabelo `hive_weight`


-- --------------------------------------------------------

--
-- Struktura tabele `location`
--

CREATE TABLE `location` (
  `id` int NOT NULL,
  `longitude` float NOT NULL,
  `latitude` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktura tabele `notes`
--

CREATE TABLE `notes` (
  `id` int NOT NULL,
  `content` varchar(500) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `id_hive` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Odloži podatke za tabelo `notes`
--

INSERT INTO `notes` (`id`, `content`, `time`, `id_hive`) VALUES
(1, 'Opazili smo veliko cvetnega prahu. Stanje matice dobro.', '2025-09-29 10:30:00', 1),
(2, 'Veliko dezja.. morda slabo za med!', '2025-09-30 16:26:57', 2);

-- --------------------------------------------------------

--
-- Struktura tabele `notification`
--

CREATE TABLE `notification` (
  `id` int NOT NULL,
  `summary` varchar(255) NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `href` varchar(255) DEFAULT NULL,
  `severity` int NOT NULL DEFAULT '1',
  `id_user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Odloži podatke za tabelo `notification`
--

INSERT INTO `notification` (`id`, `summary`, `description`, `href`, `severity`, `id_user`) VALUES
(7, 'Panj 1: Opozorilo o teži', 'Panj Mariborski roj 1 je v zadnji uri pridobil nenavadno veliko teže.', '/hive/1', 3, 5);

-- --------------------------------------------------------

--
-- Struktura tabele `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `settings` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Odloži podatke za tabelo `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `mail`, `settings`) VALUES
(5, 'jernej', '$2b$10$SNAm2A4HtC3tm2ZKqp/Q9e/CQNWq8NnvLjp9FeCn3EsYPzpLyZNP', 'jernej.lobnik@gmail.com', '{}'),
(6, 'test', '$2b$10$ebdz5TV1SErX7N23iuvze.1AjliAFyCh5S3HhHXXrkhCAQK9yo/K2', 'test', '{}'),
(7, 'David', '$2b$10$GEwpKhdzsPVXVHjxI0TjO.gvKtmOJwhgPplR4a7C3cW5ipn12ZqMa', 'david.repolusk@gmail.com', '{}'),
(8, 'android', '$2b$10$zlYGfE.REhW59JF.vlkx3ui00A0.baQTMZIamskPpAeRTxxgO4m7i', 'andorid.android@gmail.com', '{}');

-- --------------------------------------------------------

--
-- Struktura tabele `weather`
--

CREATE TABLE `weather` (
  `id` int NOT NULL,
  `report_date` date NOT NULL,
  `location` varchar(255) NOT NULL,
  `temperature` int NOT NULL,
  `air_pressure` int NOT NULL,
  `humidity` int NOT NULL,
  `wind_speed` int NOT NULL,
  `precipitation` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Odloži podatke za tabelo `weather`
--

INSERT INTO `weather` (`id`, `report_date`, `location`, `temperature`, `air_pressure`, `humidity`, `wind_speed`, `precipitation`) VALUES
(1, '2025-09-30', 'Maribor', 18, 1015, 65, 5, 0);

--
-- Indeksi zavrženih tabel
--

--
-- Indeksi tabele `blockchain`
--
ALTER TABLE `blockchain`
  ADD PRIMARY KEY (`index`);

--
-- Indeksi tabele `hive`
--
ALTER TABLE `hive`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_hive_location1_idx` (`id_location`),
  ADD KEY `fk_hive_user1_idx` (`id_user`);

--
-- Indeksi tabele `hive_weight`
--
ALTER TABLE `hive_weight`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_hive_weight_hive1_idx` (`id_hive`);

--
-- Indeksi tabele `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indeksi tabele `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notes_hive1` (`id_hive`);

--
-- Indeksi tabele `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeksi tabele `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indeksi tabele `weather`
--
ALTER TABLE `weather`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT zavrženih tabel
--

--
-- AUTO_INCREMENT tabele `hive`
--
ALTER TABLE `hive`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT tabele `hive_weight`
--
ALTER TABLE `hive_weight`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT tabele `location`
--
ALTER TABLE `location`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT tabele `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT tabele `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT tabele `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT tabele `weather`
--
ALTER TABLE `weather`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Omejitve tabel za povzetek stanja
--

--
-- Constraints for table `esp_secret`
--
ALTER TABLE `esp_secret`
  ADD CONSTRAINT `esp_secret_ibfk_1` FOREIGN KEY (`id_hive`) REFERENCES `hive` (`id`);

--

-- Omejitve za tabelo `hive`
--
ALTER TABLE `hive`
  ADD CONSTRAINT `fk_hive_location1` FOREIGN KEY (`id_location`) REFERENCES `location` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_hive_user1_idx` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Omejitve za tabelo `hive_weight`
--
ALTER TABLE `hive_weight`
  ADD CONSTRAINT `fk_hive_weight_hive1` FOREIGN KEY (`id_hive`) REFERENCES `hive` (`id`) ON DELETE CASCADE;

--
-- Omejitve za tabelo `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `fk_notes_hive1` FOREIGN KEY (`id_hive`) REFERENCES `hive` (`id`) ON DELETE CASCADE;

--
-- Omejitve za tabelo `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
