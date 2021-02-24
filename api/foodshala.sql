-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 09, 2020 at 11:52 PM
-- Server version: 5.7.30-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foodshala`
--

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE TABLE `Customers` (
  `username` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `isVeg` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Customers`
--

INSERT INTO `Customers` (`username`, `first_name`, `last_name`, `email`, `password`, `isVeg`) VALUES
('ak01', 'Akash', 'Sharma', 'test@test.com', '$2b$12$zxDCudrYB36If.Bgsvnm3.olpUbGc8LChQhukt4QTivgmlUo5giBS', 1),
('hr01', 'Hrithik', 'Dalal', 'hr@gmail.com', '$2b$12$mwOOerjSVxAhuNO9Kmmzlut.5mAQsRzdPOha1PMcMD7u6.tRmBalG', 0);

-- --------------------------------------------------------

--
-- Table structure for table `MenuItem`
--

CREATE TABLE `MenuItem` (
  `Id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(150) NOT NULL,
  `isVeg` tinyint(1) NOT NULL,
  `restaurantId` varchar(50) NOT NULL,
  `price` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `MenuItem`
--

INSERT INTO `MenuItem` (`Id`, `name`, `description`, `isVeg`, `restaurantId`, `price`) VALUES
(1, 'Honey Chilli Potato', 'lorem ipsum dolot amter with honey and chilli', 1, 'hwk01', '150'),
(2, 'Veg Manchurian Dry', 'Dry Manchurian with lorem ipsum taste like lorem ipsum', 1, 'hwk01', '150'),
(14, 'Non Veg Dry Manchurian', '', 0, 'hwk01', '250'),
(15, 'Veg Whopper', 'Veg Whopper delicious lorem ipsum dolot amet', 1, 'bk01', '180'),
(16, 'Non Veg Whopper', 'Non Veg Whopper lorem ispum dolot amet ad', 0, 'bk01', '230'),
(20, 'Rocketman Pizza', 'Paneer 65,Fried Onions,Golden Corn,Mozzarella', 1, 'pomp01', '445'),
(21, 'New York Alfreddo Pizza', 'Penne,In House Cheesy Creamy Sauce', 1, 'pomp01', '265'),
(22, 'Rockstar Pizza', 'Pepporoni,Bacon Chunks,Bacon Jam,Mozarrela', 0, 'pomp01', '562'),
(23, 'Nutella Ferrero Rocher Jar', 'Dessert and Beverage', 0, 'pomp01', '215'),
(24, 'Red Velvet Jar', 'Dessert', 0, 'pomp01', '215'),
(25, 'Humble Pizza', 'Artichoke.Sundried Tomatoes,Spring Onions and Black Olives', 1, 'pomp01', '400'),
(26, 'Amesterdam Pasta', 'Mushroom Sauce,Penne,Brocolli,Olives', 1, 'pomp01', '265'),
(27, 'Classic Cold COffee', 'Sweet(200ml)', 1, 'Slc01', '124'),
(28, 'Barbeque Chicken Wrap', 'Tender Chicken lathered in Babeque Sauce and mint mayonise wrapped in a soft Roti.', 0, 'Slc01', '140'),
(29, 'Falafel Nugget with Mayo', 'Mediterranean inspired crsipy falafel made from the finest soaked chickpeas and spices', 1, 'Slc01', '90'),
(30, 'Hazelnut Brownie', 'Gooey & fudgy on the inside, nutty on the outside and amazingly delicious on the inside', 0, 'Slc01', '105'),
(31, 'Hazelnut Latte Love (Hot)', 'Mildly Sweet(200ml)', 1, 'Slc01', '114'),
(32, 'Iced Peppermint Mocha (Cold)', 'Sweet(200ml)', 1, 'Slc01', '175'),
(33, 'Long Black Java (Hot)', 'Unsweetened(200ml)', 1, 'Slc01', '150'),
(34, 'Crispy Chicken', 'Chicken out with delicious crispy chicken loaded with delicious spices.', 0, 'bk01', '65'),
(35, 'Paneer melt', 'Delicious paneer wrapped in mayo and in house cheese sauce', 1, 'bk01', '75'),
(36, 'Veg chilli cheese', 'Got a cheesy side? Here is a lipsmacking burger.', 1, 'bk01', '120'),
(37, 'Chatpata Chana Sub', 'Sub with chana fillings', 1, 'sub01', '150'),
(38, 'Ham and Cheese Sub', 'Sub with cripy ham and melted cheese', 0, 'sub01', '185');

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `orderId` int(11) NOT NULL,
  `customerId` varchar(50) NOT NULL,
  `price` varchar(50) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `menuItems` varchar(250) DEFAULT NULL,
  `restaurantId` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`orderId`, `customerId`, `price`, `Date`, `menuItems`, `restaurantId`) VALUES
(3, 'ak01', '820', '2020-05-09 15:06:27', 'Veg WhopperX2,Non Veg WhopperX2,', 'bk01'),
(4, 'ak01', '640', '2020-05-09 15:59:16', 'Veg WhopperX1,Non Veg WhopperX2,', 'bk01'),
(5, 'ak01', '540', '2020-05-09 16:02:24', 'Veg WhopperX3,', 'bk01'),
(6, 'ak01', '690', '2020-05-09 16:03:10', 'Non Veg WhopperX3,', 'bk01'),
(7, 'ak01', '550', '2020-05-09 16:04:28', 'Veg Manchurian DryX1,Honey Chilli PotatoX1,Non Veg Dry ManchurianX1,', 'hwk01'),
(8, 'ak01', '1550', '2020-05-09 16:08:37', 'Honey Chilli PotatoX2,Non Veg Dry ManchurianX5,', 'hwk01'),
(9, 'hr01', '750', '2020-05-09 16:11:50', 'Non Veg Dry ManchurianX3,', 'hwk01'),
(10, 'hr01', '500', '2020-05-09 16:12:51', 'Non Veg Dry ManchurianX2,', 'hwk01'),
(11, 'hr01', '500', '2020-05-09 16:12:53', 'Non Veg Dry ManchurianX2,', 'hwk01'),
(12, 'hr01', '400', '2020-05-09 16:13:24', 'Veg Manchurian DryX1,Non Veg Dry ManchurianX1,', 'hwk01'),
(13, 'ak01', '410', '2020-05-09 16:14:17', 'Veg WhopperX1,Non Veg WhopperX1,', 'bk01'),
(14, 'hr01', '550', '2020-05-09 16:16:35', 'Non Veg Dry ManchurianX1,Veg Manchurian DryX1,Honey Chilli PotatoX1,', 'hwk01'),
(15, 'hr01', '1550', '2020-05-09 16:17:55', 'Honey Chilli PotatoX2,Non Veg Dry ManchurianX5,', 'hwk01'),
(16, 'hr01', '360', '2020-05-09 16:18:44', 'Veg WhopperX2,', 'bk01'),
(17, 'hr01', '650', '2020-05-09 16:24:11', 'Non Veg Dry ManchurianX2,Honey Chilli PotatoX1,', 'hwk01'),
(18, 'hr01', '410', '2020-05-09 16:24:27', 'Veg WhopperX1,Non Veg WhopperX1,', 'bk01'),
(19, 'hr01', '410', '2020-05-09 16:24:28', 'Veg WhopperX1,Non Veg WhopperX1,', 'bk01'),
(20, 'hr01', '450', '2020-05-09 16:26:21', 'Veg Manchurian DryX3,', 'hwk01'),
(21, 'hr01', '180', '2020-05-09 16:26:34', 'Veg WhopperX1,', 'bk01'),
(22, 'hr01', '150', '2020-05-09 16:26:52', 'Honey Chilli PotatoX1,', 'hwk01'),
(23, 'hr01', '300', '2020-05-09 16:27:56', 'Honey Chilli PotatoX2,', 'hwk01'),
(24, 'hr01', '180', '2020-05-09 16:28:09', 'Veg WhopperX1,', 'bk01'),
(25, 'hr01', '230', '2020-05-09 16:28:24', 'Non Veg WhopperX1,', 'bk01'),
(26, 'hr01', '400', '2020-05-09 16:28:41', 'Non Veg Dry ManchurianX1,Veg Manchurian DryX1,', 'hwk01'),
(27, 'ak01', '600', '2020-05-09 17:23:46', 'Honey Chilli PotatoX2,Veg Manchurian DryX2,', 'hwk01'),
(28, 'ak01', '1155', '2020-05-09 18:09:29', 'Rocketman PizzaX2,New York Alfreddo PizzaX1,', 'pomp01'),
(29, 'ak01', '124', '2020-05-09 18:17:14', 'Classic Cold COffeeX1,', 'Slc01'),
(30, 'hr01', '300', '2020-05-09 18:17:38', 'Chatpata Chana SubX2,', 'sub01');

-- --------------------------------------------------------

--
-- Table structure for table `Restaurants`
--

CREATE TABLE `Restaurants` (
  `username` varchar(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `cusine` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Restaurants`
--

INSERT INTO `Restaurants` (`username`, `Name`, `email`, `password`, `cusine`) VALUES
('bk01', 'Burger King', 'burger@burger.com', '$2b$12$y6p4m.7BvFoTVIoFUj1GIOBOsmfS08Q1ATHMIi8b5rKC9aZwEBUG2', 'Burgers,Fries,Fast Food, Shakes'),
('hwk01', 'Hawkers', 'test@test.com', '$2b$12$sqc64R9jm7x93D7C4RQEY.jatqL1Ri/W9Vw1xfyqNAserRd4Qqy0S', 'Chinese,Thai,Continentinal'),
('pomp01', 'POMP-Pizza on my plate', 'pizzaonmyplate@gmail.com', '$2b$12$0QchkAOGyxZR10FDuoso5uWz2JB2flr6qKDIZSM2P.2uEjDYG8nli', 'Pizza,Italian,Burger,Desserts,Beverages'),
('Slc01', 'Slay Coffee', 'slay@coffee.com', '$2b$12$YyR1yMtYneSCjNbZqjiSP.fUE8xyI56tGrcjSnuSEVDZDBxyX7P7K', 'Coffee'),
('sub01', 'Subway', 'sub@way.com', '$2b$12$De8qW7Co84spVHEPayHSG.L/DkS6lHihRwhlkgHrKBGaG8fBl7bgW', 'Subs,Salads,Wraps');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `MenuItem`
--
ALTER TABLE `MenuItem`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `restaurantId` (`restaurantId`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`orderId`);

--
-- Indexes for table `Restaurants`
--
ALTER TABLE `Restaurants`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `MenuItem`
--
ALTER TABLE `MenuItem`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `MenuItem`
--
ALTER TABLE `MenuItem`
  ADD CONSTRAINT `MenuItem_ibfk_1` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurants` (`username`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
