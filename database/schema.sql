-- Create database
CREATE DATABASE IF NOT EXISTS genesis_portal;
USE genesis_portal;

-- Users table (authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usn VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    login_count INT DEFAULT 0
);

-- Student profiles table
CREATE TABLE IF NOT EXISTS student_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usn VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    dob DATE,
    mobile VARCHAR(15),
    email VARCHAR(100),
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    skillsboost_url VARCHAR(255),
    father_mobile VARCHAR(15),
    mother_mobile VARCHAR(15),
    hobbies TEXT,
    category VARCHAR(50),
    achievements TEXT,
    profile_image LONGTEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usn) REFERENCES users(usn) ON DELETE CASCADE
);

-- MOOC Courses table
CREATE TABLE IF NOT EXISTS mooc_courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usn VARCHAR(20) NOT NULL,
    course_name VARCHAR(200) NOT NULL,
    provider VARCHAR(100),
    enrollment_date DATE,
    status ENUM('ongoing', 'completed', 'dropped') DEFAULT 'ongoing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usn) REFERENCES users(usn) ON DELETE CASCADE,
    INDEX idx_usn (usn)
);

-- Extra Curricular Activities table
CREATE TABLE IF NOT EXISTS activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usn VARCHAR(20) NOT NULL,
    activity_name VARCHAR(200) NOT NULL,
    activity_date DATE,
    category VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usn) REFERENCES users(usn) ON DELETE CASCADE,
    INDEX idx_usn (usn)
);

-- Late coming records
CREATE TABLE IF NOT EXISTS late_coming_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usn VARCHAR(20) NOT NULL,
    late_date DATE NOT NULL,
    entry_time TIME NOT NULL,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usn) REFERENCES users(usn) ON DELETE CASCADE,
    INDEX idx_usn_date (usn, late_date)
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usn VARCHAR(20) NOT NULL,
    project_title VARCHAR(200) NOT NULL,
    description TEXT,
    technologies VARCHAR(255),
    project_url VARCHAR(255),
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usn) REFERENCES users(usn) ON DELETE CASCADE,
    INDEX idx_usn (usn)
);

-- Course materials table
CREATE TABLE IF NOT EXISTS course_materials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    file_url VARCHAR(255),
    uploaded_by VARCHAR(20),
    subject VARCHAR(100),
    semester INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(usn) ON DELETE SET NULL
);

-- Login history table
CREATE TABLE IF NOT EXISTS login_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usn VARCHAR(20) NOT NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    FOREIGN KEY (usn) REFERENCES users(usn) ON DELETE CASCADE,
    INDEX idx_usn_time (usn, login_time)
);

-- Insert sample users (password: student123)
-- Note: In production, use bcrypt to hash passwords
-- For demo, we'll insert with plain text but the code will handle comparison
INSERT INTO users (usn, password, login_count) 
VALUES ('4GW24CI042', 'student123', 0);

INSERT INTO users (usn, password, login_count) 
VALUES ('4GW24CI001', 'student123', 0);

INSERT INTO users (usn, password, login_count) 
VALUES ('4GW24CI002', 'student123', 0);

-- Insert sample profile
INSERT INTO student_profiles (usn, full_name, mobile, email, category) 
VALUES ('4GW24CI042', 'John Doe', '9876543210', 'john@example.com', 'Technology');

-- Insert sample MOOC courses
INSERT INTO mooc_courses (usn, course_name, provider, status) 
VALUES ('4GW24CI042', 'Web Development Bootcamp', 'Coursera', 'ongoing');

INSERT INTO mooc_courses (usn, course_name, provider, status) 
VALUES ('4GW24CI042', 'Python Programming', 'NPTEL', 'completed');

-- Insert sample activities
INSERT INTO activities (usn, activity_name, activity_date, category) 
VALUES ('4GW24CI042', 'Hackathon 2024', '2024-01-15', 'Technology');

INSERT INTO activities (usn, activity_name, activity_date, category) 
VALUES ('4GW24CI042', 'Cultural Fest', '2024-02-10', 'Cultural');

SELECT * FROM users;
SELECT * FROM student_profiles;
SELECT * FROM mooc_courses;
SELECT * FROM activities;