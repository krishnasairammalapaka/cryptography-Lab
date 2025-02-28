-- Drop existing tables if they exist
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS user_role;

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('admin', 'faculty', 'student');

-- Create users table with all necessary fields
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    contact_number VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create index for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);

-- Insert sample users
INSERT INTO users (
    id, email, username, password, role, 
    first_name, last_name, department
) VALUES 
-- Admin user (password: admin123)
(
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'admin@cryptolab.com',
    'admin',
    '$2b$10$rMbqJhqjBgn6EfQoF1UcXeYZ5nEVxJ4LF9KrWFNSqEzR9CmDqFtXi',
    'admin',
    'System',
    'Administrator',
    'Administration'
),
-- Faculty user (password: faculty123)
(
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'faculty@cryptolab.com',
    'faculty1',
    '$2b$10$rMbqJhqjBgn6EfQoF1UcXeYZ5nEVxJ4LF9KrWFNSqEzR9CmDqFtXi',
    'faculty',
    'John',
    'Doe',
    'Computer Science'
),
-- Student user (password: student123)
(
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    'student@cryptolab.com',
    'student1',
    '$2b$10$rMbqJhqjBgn6EfQoF1UcXeYZ5nEVxJ4LF9KrWFNSqEzR9CmDqFtXi',
    'student',
    'Jane',
    'Smith',
    'Computer Science'
);