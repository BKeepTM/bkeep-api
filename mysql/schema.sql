-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gostitelj: express_mysql:3306
-- Čas nastanka: 16. maj 2025 ob 16.12
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
-- Zbirka podatkov: `db_bkeep`
--

-- --------------------------------------------------------

--
-- Struktura tabele `hive`
--
CREATE DATABASE IF NOT EXISTS `db_bkeep` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `db_bkeep`;

CREATE TABLE `hive` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  `type` enum('lr','az','db') NOT NULL,
  `status` enum('offline','online') NOT NULL,
  `id_location` int NOT NULL,
  `id_user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktura tabele `hive_weight`
--

CREATE TABLE `hive_weight` (
  `id` int NOT NULL,
  `weight` float NOT NULL,
  `time_weight` datetime NOT NULL,
  `id_hive` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
-- Indeksi zavrženih tabel
--

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
-- Indeksi tabele `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT zavrženih tabel
--

--
-- AUTO_INCREMENT tabele `hive`
--
ALTER TABLE `hive`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT tabele `hive_weight`
--
ALTER TABLE `hive_weight`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT tabele `location`
--
ALTER TABLE `location`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT tabele `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT tabele `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Omejitve tabel za povzetek stanja
--

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
