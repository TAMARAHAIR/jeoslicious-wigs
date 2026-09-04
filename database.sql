CREATE DATABASE IF NOT EXISTS jeolisious;

USE jeolisious;


CREATE TABLE services (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(120) NOT NULL UNIQUE,

    category VARCHAR(50) NOT NULL,

    description VARCHAR(500) NOT NULL,

    price_from DECIMAL(10,2),

    active BOOLEAN DEFAULT TRUE,

    created_at
        TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


CREATE TABLE bookings (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(80) NOT NULL,

    phone VARCHAR(25) NOT NULL,

    service_id INT NOT NULL,

    preferred_date DATE NOT NULL,

    notes VARCHAR(500),

    status
        ENUM(
            'pending',
            'confirmed',
            'completed',
            'cancelled'
        )
        DEFAULT 'pending',

    created_at
        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (service_id)
        REFERENCES services(id)

);
