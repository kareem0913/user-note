<p align="center">
    <a href="https://laravel.com" target="_blank">
        <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
    </a>
</p>

<p align="center">
    <a href="https://github.com/laravel/framework/actions">
        <img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status">
    </a>
    <a href="https://packagist.org/packages/laravel/framework">
        <img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads">
    </a>
    <a href="https://packagist.org/packages/laravel/framework">
        <img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version">
    </a>
    <a href="https://packagist.org/packages/laravel/framework">
        <img src="https://img.shields.io/packagist/l/laravel/framework" alt="License">
    </a>
</p>

## About This Project

This project is a user authentication system with APIs and a CRUD note application, built using the Laravel framework. It allows users to register, log in, log out, manage their profiles, and manage their notes. Additionally, it includes an email verification feature for user registration and a "Forgot Password" feature to reset passwords via email.

## Features

- User Registration with email verification
- User Login and Logout
- Profile Management (update name, email, password)
- CRUD operations for managing notes
- RESTful API endpoints for all features
- Secure password hashing
- CSRF protection for web interfaces
- Input sanitization and validation to prevent SQL injection and XSS attacks

## Requirements

- PHP >= 10
- Composer
- Node.js & npm
- A web server (e.g., Apache, Nginx)
- A database (e.g., MySQL, PostgreSQL)

## Setup Instructions


## Getting Started

To get a copy of the backend up and running on your local machine for development and testing purposes, follow these steps:

1. Clone this repository.
2. Install dependencies using `composer install`.
3. Configure your `.env` file with necessary environment variables.
4. Run database migrations with `php artisan migrate`.
5. Start the development server with `php artisan serve`.
