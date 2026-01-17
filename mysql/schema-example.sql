-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: express_mysql:3306
-- Generation Time: Jan 16, 2026 at 07:27 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.26

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
-- Table structure for table `blockchain`
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
-- Table structure for table `device_data`
--

CREATE TABLE `device_data` (
  `id` int NOT NULL,
  `humidity` float DEFAULT NULL,
  `brightness` float DEFAULT NULL,
  `temperature` float DEFAULT NULL,
  `longitude` float NOT NULL,
  `latitude` float NOT NULL,
  `time` datetime NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `hive`
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

-- --------------------------------------------------------

--
-- Table structure for table `hive_weight`
--

CREATE TABLE `hive_weight` (
  `id` int NOT NULL,
  `weight` float NOT NULL,
  `time_weight` datetime NOT NULL,
  `id_hive` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Triggers `hive_weight`
--
DELIMITER $$
CREATE TRIGGER `after_hive_weight_insert_check_loss` AFTER INSERT ON `hive_weight` FOR EACH ROW BEGIN
    DECLARE consecutive_days_threshold INT DEFAULT 3;

    DECLARE weight_today FLOAT;
    DECLARE weight_yesterday FLOAT;
    DECLARE weight_day_before FLOAT;
    DECLARE hive_owner_id INT;
    DECLARE hive_name_var VARCHAR(45);
    DECLARE summary_text VARCHAR(255);
    DECLARE href_link VARCHAR(255);

    SET weight_today = NEW.weight;

    SELECT MAX(weight) INTO weight_yesterday
    FROM hive_weight
    WHERE id_hive = NEW.id_hive
      AND DATE(time_weight) = DATE_SUB(DATE(NEW.time_weight), INTERVAL 1 DAY);

    SELECT MAX(weight) INTO weight_day_before
    FROM hive_weight
    WHERE id_hive = NEW.id_hive
      AND DATE(time_weight) = DATE_SUB(DATE(NEW.time_weight), INTERVAL 2 DAY);

    IF weight_yesterday IS NOT NULL AND
       weight_day_before IS NOT NULL AND
       weight_today < weight_yesterday AND
       weight_yesterday < weight_day_before
    THEN
        SELECT name, id_user INTO hive_name_var, hive_owner_id
        FROM hive
        WHERE id = NEW.id_hive;

        SET summary_text = CONCAT('Stalna zguba teže na panju ', hive_name_var, '');
        SET href_link = CONCAT('/hives/', NEW.id_hive);

        IF NOT EXISTS (
            SELECT 1 FROM notification
            WHERE id_user = hive_owner_id
              AND summary = summary_text
              AND DATE(time_weight) = DATE(NEW.time_weight)
        ) THEN
            INSERT INTO notification (summary, description, href, severity, id_user)
            VALUES (
                summary_text,
                CONCAT('Panj ', hive_name_var, ' je stalno zgublal težo za ', consecutive_days_threshold, ' zaporednih dni. ',
                       'Trenutna teža: ', ROUND(weight_today, 2), ' kg. ',
                       'Prejšne teže : ', ROUND(weight_yesterday, 2), ' kg, ', ROUND(weight_day_before, 2), ' kg. ',
                       'To je morda posledica roja al slabe paše'),
                href_link,
                3,
                hive_owner_id
            );
        END IF;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int NOT NULL,
  `longitude` float NOT NULL,
  `latitude` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int NOT NULL,
  `content` varchar(500) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `id_hive` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int NOT NULL,
  `summary` varchar(255) NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `href` varchar(255) DEFAULT NULL,
  `severity` int NOT NULL DEFAULT '1',
  `id_user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `settings` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `weather`
--

CREATE TABLE `weather` (
  `id` int NOT NULL,
  `report_date` date NOT NULL,
  `location_x` float NOT NULL,
  `location_y` float NOT NULL,
  `temperature` int DEFAULT NULL,
  `air_pressure` int DEFAULT NULL,
  `humidity` int DEFAULT NULL,
  `wind_speed` int DEFAULT NULL,
  `precipitation` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Triggers `weather`
--
DELIMITER $$
CREATE TRIGGER `after_weather_insert_create_notification` AFTER INSERT ON `weather` FOR EACH ROW BEGIN

    DECLARE distance_threshold INT;
    SET distance_threshold = 20000;

    IF NEW.temperature IS NOT NULL AND NEW.temperature < 10 THEN
        INSERT INTO notification (summary, description, href, severity, id_user)
        SELECT
            'Low Temperature Alert' AS summary,
            CONCAT('Napovedana temperatura ', NEW.temperature, 'Â°C blizu panja ', h.name, '. Preveri izolacija panja') AS description,
            CONCAT('/hives/', h.id) AS href,
            2 AS severity, 
            h.id_user
        FROM
            hive h
        JOIN
            location l ON h.id_location = l.id
        WHERE
         
            ST_Distance_Sphere(
                POINT(NEW.location_x, NEW.location_y),
                POINT(l.longitude, l.latitude)
            ) <= distance_threshold;
    END IF;

    IF NEW.temperature IS NOT NULL AND NEW.temperature > 35 THEN
        INSERT INTO notification (summary, description, href, severity, id_user)
        SELECT
            'Opozorilo: Visoka temperatura' AS summary,
            CONCAT('Napoved temperature ', NEW.temperature, 'Â°C blizu panja ', h.name, '. Zagotovi dovolj vode Äebelam.') AS description,
            CONCAT('/hives/', h.id) AS href,
            2 AS severity, 
            h.id_user
        FROM
            hive h
        JOIN
            location l ON h.id_location = l.id
        WHERE
            ST_Distance_Sphere(
                POINT(NEW.location_x, NEW.location_y),
                POINT(l.longitude, l.latitude)
            ) <= distance_threshold;
    END IF;


    IF NEW.wind_speed IS NOT NULL AND NEW.wind_speed > 35 THEN
        INSERT INTO notification (summary, description, href, severity, id_user)
        SELECT
            'Opozorilo: MoÄni veter ' AS summary,
            CONCAT('Veter s hitrostjo', NEW.wind_speed, ' km/h je napovoden blizu panja ', h.name, '. To lahko vpliva na paÅ¡o.') AS description,
            CONCAT('/hives/', h.id) AS href,
            2 AS severity,
            h.id_user
        FROM
            hive h
        JOIN
            location l ON h.id_location = l.id
        WHERE
            ST_Distance_Sphere(
                POINT(NEW.location_x, NEW.location_y),
                POINT(l.longitude, l.latitude)
            ) <= distance_threshold;
    END IF;

    IF NEW.precipitation IS NOT NULL AND NEW.precipitation > 5 THEN
        INSERT INTO notification (summary, description, href, severity, id_user)
        SELECT
            'Opozorilo: DeÅ¾' AS summary,
            CONCAT('Veliko deÅ¾a (', NEW.precipitation, ' mm/h) je napovedano blizu panja ', h.name, '. ÄŒebela najverjetne nebodo letele :) .') AS description,
            CONCAT('/hives/', h.id) AS href,
            1 AS severity, 
            h.id_user
        FROM
            hive h
        JOIN
            location l ON h.id_location = l.id
        WHERE
            ST_Distance_Sphere(
                POINT(NEW.location_x, NEW.location_y),
                POINT(l.longitude, l.latitude)
            ) <= distance_threshold;
    END IF;

END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `device_data`
--
ALTER TABLE `device_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_device_data_user1` (`user_id`);

--
-- Indexes for table `esp_secret`
--
ALTER TABLE `esp_secret`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_hive` (`id_hive`);

--
-- Indexes for table `hive`
--
ALTER TABLE `hive`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_hive_location1_idx` (`id_location`),
  ADD KEY `fk_hive_user1_idx` (`id_user`);

--
-- Indexes for table `hive_weight`
--
ALTER TABLE `hive_weight`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_hive_weight_hive1_idx` (`id_hive`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notes_hive1` (`id_hive`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `weather`
--
ALTER TABLE `weather`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `device_data`
--
ALTER TABLE `device_data`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hive`
--
ALTER TABLE `hive`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hive_weight`
--
ALTER TABLE `hive_weight`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `weather`
--
ALTER TABLE `weather`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `device_data`
--
ALTER TABLE `device_data`
  ADD CONSTRAINT `fk_device_data_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `esp_secret`
--
ALTER TABLE `esp_secret`
  ADD CONSTRAINT `esp_secret_ibfk_1` FOREIGN KEY (`id_hive`) REFERENCES `hive` (`id`);

--
-- Constraints for table `hive`
--
ALTER TABLE `hive`
  ADD CONSTRAINT `fk_hive_location1` FOREIGN KEY (`id_location`) REFERENCES `location` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_hive_user1_idx` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `hive_weight`
--
ALTER TABLE `hive_weight`
  ADD CONSTRAINT `fk_hive_weight_hive1` FOREIGN KEY (`id_hive`) REFERENCES `hive` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `fk_notes_hive1` FOREIGN KEY (`id_hive`) REFERENCES `hive` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
