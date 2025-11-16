CREATE TABLE Users (
    UID INT IDENTITY(1,1) PRIMARY KEY,  -- Auto-incrementing unique ID
    Username NVARCHAR(50) NOT NULL UNIQUE,  -- Username, max 50 chars, must be unique
    Password NVARCHAR(255) NOT NULL,       -- Password, stored as hashed string
    Email NVARCHAR(100) NOT NULL UNIQUE,   -- Email, must be unique
    CreatedAt DATETIME2 DEFAULT GETDATE()  -- Optional: record creation timestamp
);
