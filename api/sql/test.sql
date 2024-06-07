DROP DATABASE IF EXISTS `test`;
CREATE DATABASE `test`;
USE `test`;

CREATE TABLE `users` (
  `id` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` ENUM('admin', 'subscriber') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'subscriber'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`) VALUES
('user660760c2688ef', 'Phong', 'Nguyen', 'phong123@gmail.com', '$2y$10$4N2fYjVBc2NLy9xwEdHf5e4JLl8KjgVfU1VAAYN9GkubKRGJ7SN5q', 'admin'),
('user660760f561bd0', 'Cuong', 'Le', 'cuongle@gmail.com', '$2y$10$4N2fYjVBc2NLy9xwEdHf5e4JLl8KjgVfU1VAAYN9GkubKRGJ7SN5q', 'subscriber');

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_idx` (`email`);
COMMIT;