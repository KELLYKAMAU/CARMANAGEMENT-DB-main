-- Car Management System - SQL Server Schema
-- Create database (run once)
-- CREATE DATABASE CarManagementDB;
-- GO
USE CarManagementDB;
GO

-- Users (for authentication/authorization)
CREATE TABLE dbo.Users(
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    user_name  VARCHAR(50) UNIQUE NOT NULL,
    email_address VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(13) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT('user')
    
);

-- CARS
IF OBJECT_ID('dbo.Cars', 'U') IS NOT NULL DROP TABLE dbo.Cars;
CREATE TABLE dbo.Cars (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Model NVARCHAR(100) NOT NULL,
    Manufacturer NVARCHAR(100) NOT NULL,
    [Year] INT NOT NULL CHECK ([Year] BETWEEN 1980 AND YEAR(GETDATE()) + 1),
    Color NVARCHAR(50) NULL,
    RentalRate DECIMAL(10,2) NOT NULL CHECK (RentalRate >= 0),
    Availability BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL
);

-- CUSTOMERS
IF OBJECT_ID('dbo.Customers', 'U') IS NOT NULL DROP TABLE dbo.Customers;
CREATE TABLE dbo.Customers (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    first_name NVARCHAR(100) NOT NULL,
    last_name NVARCHAR(100) NOT NULL,
    email NVARCHAR(256) NOT NULL UNIQUE,
    phone_number NVARCHAR(30) NULL,
    address NVARCHAR(255) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL
);

-- LOCATIONS
IF OBJECT_ID('dbo.Locations', 'U') IS NOT NULL DROP TABLE dbo.Locations;
CREATE TABLE dbo.Locations (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    address NVARCHAR(255) NOT NULL,
    ContactNumber NVARCHAR(30) NULL
);

-- BOOKINGS
IF OBJECT_ID('dbo.Bookings', 'U') IS NOT NULL DROP TABLE dbo.Bookings;
CREATE TABLE dbo.Bookings (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CarId INT NOT NULL,
    CustomerId INT NOT NULL,
    PickupLocationId INT NOT NULL,
    DropoffLocationId INT NOT NULL,
    RentalStartDate DATE NOT NULL,
    RentalEndDate DATE NOT NULL,
    TotalAmount DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (TotalAmount >= 0),
    Status NVARCHAR(30) NOT NULL DEFAULT 'CONFIRMED',
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Bookings_Car FOREIGN KEY (CarId) REFERENCES dbo.Cars(Id),
    CONSTRAINT FK_Bookings_Customer FOREIGN KEY (CustomerId) REFERENCES dbo.Customers(Id),
    CONSTRAINT FK_Bookings_Pickup FOREIGN KEY (PickupLocationId) REFERENCES dbo.Locations(Id),
    CONSTRAINT FK_Bookings_Dropoff FOREIGN KEY (DropoffLocationId) REFERENCES dbo.Locations(Id),
    CONSTRAINT CK_Booking_Date CHECK (RentalEndDate >= RentalStartDate)
);

-- Seed minimal data
INSERT INTO dbo.Cars (Model, Manufacturer, [Year], Color, RentalRate, Availability)
VALUES ('Civic','Honda',2022,'Blue',45.50,1),
       ('Corolla','Toyota',2021,'White',40.00,1),
       ('Model 3','Tesla',2023,'Red',85.00,1),
       ('CX-5','Mazda',2020,'Black',60.00,1),
       ('A4','Audi',2019,'Grey',70.00,1);

INSERT INTO dbo.Customers (first_name, last_name, email, phone_number, address)
VALUES ('Jane','Doe','jane.doe@example.com','+254700000000','Nairobi'),
       ('John','Smith','john.smith@example.com','+254711111111','Thika'),
       ('Mary','Wanjiru','mary.w@example.com','+254722222222','Nyeri'),
       ('Paul','Otieno','paul.o@example.com','+254733333333','Kisumu'),
       ('Amina','Hassan','amina.h@example.com','+254744444444','Mombasa');

INSERT INTO dbo.Locations (Name, address, ContactNumber)
VALUES ('CBD Branch','Kenyatta Ave, Nairobi','+254722222222'),
       ('Westlands Branch','Waiyaki Way, Nairobi','+254733333333');

-- Example booking
INSERT INTO dbo.Bookings (CarId, CustomerId, PickupLocationId, DropoffLocationId, RentalStartDate, RentalEndDate, TotalAmount)
VALUES (1,1,1,1,'2025-10-10','2025-10-12', 45.50*2);
GO
