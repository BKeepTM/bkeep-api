-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gostitelj: express_mysql:3306
-- Čas nastanka: 23. apr 2025 ob 09.48
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
-- Zbirka podatkov: `bkeep`
--

-- --------------------------------------------------------

--
-- Struktura tabele `hive`
--

CREATE TABLE `hive` (
  `id_hive` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  `type` enum('lr','az','db') NOT NULL,
  `status` enum('offline','online') NOT NULL,
  `TK_location` int NOT NULL,
  `TK_notes` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktura tabele `hive_weight`
--

CREATE TABLE `hive_weight` (
  `id_hive_weight` int NOT NULL,
  `weight` float NOT NULL,
  `time_weight` datetime NOT NULL,
  `TK_hive` int NOT NULL,
  `TK_hive1` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktura tabele `location`
--

CREATE TABLE `location` (
  `id_location` int NOT NULL,
  `longitude` float NOT NULL,
  `latitude` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktura tabele `notes`
--

CREATE TABLE `notes` (
  `id_notes` int NOT NULL,
  `content` varchar(500) DEFAULT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktura tabele `user`
--

CREATE TABLE `user` (
  `id_user` int NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `settings` json DEFAULT NULL,
  `TK_hive` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indeksi zavrženih tabel
--

--
-- Indeksi tabele `hive`
--
ALTER TABLE `hive`
  ADD PRIMARY KEY (`id_hive`),
  ADD KEY `TK_hive_location1_idx` (`TK_location`),
  ADD KEY `TK_hive_notes1_idx` (`TK_notes`);

--
-- Indeksi tabele `hive_weight`
--
ALTER TABLE `hive_weight`
  ADD PRIMARY KEY (`id_hive_weight`),
  ADD KEY `TK_hive_weight_hive1_idx` (`TK_hive`,`TK_hive1`);

--
-- Indeksi tabele `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id_location`);

--
-- Indeksi tabele `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id_notes`);

--
-- Indeksi tabele `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `TK_user_hive1_idx` (`TK_hive`);

--
-- Omejitve tabel za povzetek stanja
--

--
-- Omejitve za tabelo `hive`
--
ALTER TABLE `hive`
  ADD CONSTRAINT `TK_hive_location1` FOREIGN KEY (`TK_location`) REFERENCES `location` (`id_location`),
  ADD CONSTRAINT `TK_hive_notes1` FOREIGN KEY (`TK_notes`) REFERENCES `notes` (`id_notes`);

--
-- Omejitve za tabelo `hive_weight`
--
ALTER TABLE `hive_weight`
  ADD CONSTRAINT `TK_hive_weight_hive1` FOREIGN KEY (`TK_hive`) REFERENCES `hive` (`id_hive`);

--
-- Omejitve za tabelo `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `TK_user_hive1` FOREIGN KEY (`TK_hive`) REFERENCES `hive` (`id_hive`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
