-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2026 at 09:26 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_service_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `mechanic_id` int(11) DEFAULT NULL,
  `appointment_status` enum('pending','accepted','rejected','cancelled') DEFAULT 'pending',
  `appointment_date` datetime NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `user_id`, `service_id`, `mechanic_id`, `appointment_status`, `appointment_date`, `is_deleted`, `created_at`) VALUES
(2, 1, 1, 6, 'pending', '2025-12-09 00:00:00', 0, '2025-12-08 19:04:25'),
(3, 2, 3, 7, 'accepted', '2025-12-12 00:00:00', 0, '2025-12-08 19:04:25'),
(4, 3, 5, 8, 'pending', '2025-12-15 00:00:00', 0, '2025-12-08 19:04:25'),
(5, 4, 6, 9, 'rejected', '2025-12-18 00:00:00', 0, '2025-12-08 19:04:25'),
(6, 5, 2, 10, 'cancelled', '2025-12-22 00:00:00', 0, '2025-12-08 19:04:25'),
(7, 6, 8, 6, 'pending', '2025-12-25 00:00:00', 0, '2025-12-08 19:04:25'),
(8, 7, 4, 7, 'accepted', '2025-12-28 00:00:00', 0, '2025-12-08 19:04:25'),
(9, 8, 3, NULL, 'pending', '2025-12-30 00:00:00', 0, '2025-12-08 19:04:25'),
(10, 9, 9, 8, 'pending', '2026-01-02 00:00:00', 0, '2025-12-08 19:04:25'),
(11, 9, 4, NULL, 'pending', '2025-12-10 15:02:00', 0, '2025-12-08 23:02:45'),
(12, 9, 8, NULL, 'pending', '2025-12-18 18:51:00', 1, '2025-12-09 16:51:33');

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `year` int(11) NOT NULL,
  `car_image` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `user_id`, `brand`, `model`, `year`, `car_image`, `is_deleted`) VALUES
(1, 1, 'Mercedes', 'C-Class', 2021, 'https://pngimg.com/d/mercedes_PNG80146.png', 1),
(2, 2, 'BMW', 'X5', 2020, 'https://www.pngall.com/wp-content/uploads/2016/07/Car-Free-Download-PNG.png', 0),
(3, 3, 'BMW', 'M3', 2019, 'https://pngimg.com/d/bmw_PNG99558.png', 0),
(4, 4, 'BMW', 'i8', 2022, 'https://pngimg.com/uploads/bmw/bmw_PNG1692.png', 0),
(5, 9, 'Nissan', 'Qashqai', 2025, 'https://pngimg.com/uploads/nissan/nissan_PNG91.png', 1),
(6, 9, 'Peugeot', '408', 2024, 'https://www.ttcar.com/bases/ttcar_range_cars_image/grande/30/408.png', 1),
(7, 9, 'peugeot', '408', 2025, 'https://www.ttcar.com/bases/ttcar_range_cars_image/grande/30/408.png', 1),
(8, 9, 'Peugeot ', '408', 2025, 'https://www.ttcar.com/bases/ttcar_range_cars_image/grande/30/408.png', 1),
(9, 9, 'Huynadi', 'Tosan 1', 2024, 'https://cka-dash.s3.amazonaws.com/140-1120-CH146/model1.png', 1),
(10, 7, 'BMW', 'X6 M Competition', 2024, 'https://images.ctfassets.net/90a0xfzm8yw3/7rG10wXmDfCmm4vTmEE4IM/7c9311020bb7a3d7f7cbf9ae7e752d93/X6M__F96_3quater_Frozen_Grey_.png', 0);

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `question`, `answer`) VALUES
(1, 'How do I book a service?', 'Go to the Services page, choose the service you want, and click the Apply button.'),
(2, 'Can I edit my service request?', 'Yes, you can edit any pending request from your profile under the Appointments section.'),
(3, 'How long does a typical repair take?', 'Most repairs take between 1–3 hours depending on the type of service.'),
(4, 'Do you offer emergency assistance?', 'Yes, we offer 24/7 emergency roadside assistance for registered users.'),
(5, 'What payment methods do you accept?', 'We accept cash, Visa, MasterCard, and digital wallets.'),
(6, 'How can I update my personal information?', 'You can update your info from your Profile section → Update Details.'),
(7, 'Is my data safe on this platform?', 'Yes, all your information is protected and stored securely.'),
(8, 'Can I add multiple cars to my account?', 'Yes, you can add and manage multiple vehicles through the My Cars section.'),
(9, 'What should I do if I forget my password?', 'Click the Forgot Password link on the login page and follow the steps.'),
(10, 'Do you provide warranty for repairs?', 'Yes, all repairs come with a 30-day service warranty.');

-- --------------------------------------------------------

--
-- Table structure for table `mechanics`
--

CREATE TABLE `mechanics` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `specialization` varchar(150) NOT NULL,
  `rating` decimal(3,2) DEFAULT 0.00,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mechanics`
--

INSERT INTO `mechanics` (`id`, `name`, `email`, `phone`, `password`, `specialization`, `rating`, `is_deleted`) VALUES
(6, 'Omar Farouk', 'omar.farouk@example.com', '01076543211', 'B5s98iddi', 'Engine Repair', '4.60', 0),
(7, 'Mahmoud Essam', 'mahmoud.essam@example.com', '01144332255', 'Bd8Xn1PwQk', 'Air Conditioning', '4.30', 0),
(8, 'Noura Samir', 'noura.samir@example.com', '01277889944', 'Fg3Ks8LmZp', 'Diagnostics', '4.90', 0),
(9, 'Hassan Yasser', 'hassan.yasser@example.com', '01011223344', 'Rt6Vb2NcQw', 'Suspension & Brakes', '4.20', 0),
(10, 'Karim Tarek', 'karim.tarek@example.com', '01166554422', 'Wm7Hd5XpR1', 'Electrical Systems', '4.70', 0),
(11, 'Mostafa ElShenawy', 'mostafa.shenawy@example.com', '01099887766', 'Ab7Xk32PqL', 'Transmission Repair', '5.00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `user_id`, `subject`, `content`, `created_at`) VALUES
(5, 9, 'Need Help', 'No mechanics available in my area!\n', '2025-12-09 05:49:02');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `is_deleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `price`, `image`, `is_deleted`) VALUES
(1, 'AC Maintenance', 'Clean system, refill Freon, and check cooling efficiency', '600.00', 'https://www.spacecenterautomotive.com/Files/EmailCampaigns/AdobeStock_584545288.jpeg', 0),
(2, 'Battery Replacement', 'Replace old battery and test charging system', '950.00', 'https://www.meineke.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2Fdkq07unc94tv%2F5H6uPhUjfcZZnU59h4pL3E%2F8e3082ec9a856f7826fee774335a924d%2Fcar-battery-replacement.webp&w=3840&q=75', 0),
(3, 'Brake Inspection', 'Check brake system and replace pads if needed', '300.00', 'https://dmlauto.com/wp-content/uploads/2013/03/brake-repair_DML.jpg', 0),
(4, 'Car Wash', 'Full exterior and interior cleaning with light polish', '150.00', 'https://theragcompany.eu/cdn/shop/articles/DSC08500.jpg?v=1715157054&width=1100', 0),
(5, 'Engine Diagnostic', 'Full computer scan to detect engine issues', '500.00', 'https://www.transmico.com/wp-content/uploads/diagnostic-auto-opt-scaled.jpg', 0),
(6, 'Full Service', 'Comprehensive maintenance: oil, filters, brakes, and more', '1200.00', 'https://www.mrclutch.com/blog/wp-content/uploads/2023/01/Photo-of-a-mechanic-completing-a-full-service-on-a-car.jpg', 0),
(7, 'Oil Change', 'Change engine oil and filter completely', '400.00', 'https://www.sansoneauto.com/blogs/3504/wp-content/uploads/2018/07/Oil_Change.jpg', 0),
(8, 'Suspension Check', 'Inspect shocks and suspension, replace worn parts', '700.00', 'https://images.squarespace-cdn.com/content/v1/6272a0b780aaa64e2c7f1d3e/16d6a797-cc0b-4d35-bd3f-e147d59c33f2/Car+Suspension+Check%2C+Repair+%26+Replacement', 0),
(9, 'Tire Rotation', 'Rotate tire positions to maintain balance', '250.00', 'https://i0.wp.com/allmakescollision.ca/wp-content/uploads/2022/04/heveAdeZhFtnsUOwTf1tUf08fFeRMxMTRuX3IqlD.jpg?fit=1400%2C935&ssl=1', 0),
(10, 'Wheel Alignment', 'Adjust wheel alignment and balance for smoother ride', '350.00', 'https://images.ctfassets.net/dkq07unc94tv/7gC72BSpUMF7h8oX3yG4sz/aa01d6ef3c1e2183ce550e6f1b61cf5b/wheel-alignment-vs-front-end-alignment-is-there-a-difference.jpg', 0),
(21, 'Interior Detailing', 'Deep cleaning of seats, dashboard, carpets, and interior surfaces.', '400.00', 'https://cdn.shopify.com/s/files/1/0797/2968/8869/files/spJnSTldAQfhvwo5aE4VYCw060rUDmfTb5Ngx5vI.jpg?v=1737641076&width=1620&height=1080', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `address`, `email`, `password`, `phone`, `is_deleted`) VALUES
(1, 'Ahmed', 'Hassan', 'Cairo, Nasr City', 'ahmed.hassan@example.com', 'Ahmed123!', '01012345678', 0),
(2, 'Sara', 'Ali', 'Giza, Dokki', 'sara.ali@example.com', 'Sara2025@', '01198765432', 1),
(3, 'Omar', 'Khaled', '6th October', 'omar@example.com', '123456', '01099887766', 0),
(4, 'Mariam', 'Samir', 'Cairo, Maadi', 'mariam.samir@example.com', 'Mariam$$55', '01511223344', 0),
(5, 'Youssef', 'Tarek', 'Mansoura', 'youssef.tarek@example.com', 'YTarek77!', '01099887766', 0),
(6, 'Seif', 'Mamdouh', 'New Cairo, Cairo', 'seif@example.com', '123456', '01018006567', 0),
(7, 'Aser', 'Mohamed', 'Ammar Ebn Yasser, Cairo', 'Aser@example.com', '123A21456', '01205897546', 0),
(8, 'Mariam', 'Hany', 'Nasr City, Cairo', 'mariam@example.com', '123456', '01055667788', 1),
(9, 'Seif Eldin', 'Mamdouh', 'New Cairo , Cairo', 'seifmamdouh@yahoo.com', 'seif', '01018006567', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_appointments_service` (`service_id`),
  ADD KEY `fk_appointments_mechanic` (`mechanic_id`),
  ADD KEY `fk_appointments_user` (`user_id`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mechanics`
--
ALTER TABLE `mechanics`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `mechanics`
--
ALTER TABLE `mechanics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `fk_appointments_mechanic` FOREIGN KEY (`mechanic_id`) REFERENCES `mechanics` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_appointments_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_appointments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
