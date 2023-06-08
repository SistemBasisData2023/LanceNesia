/* this query for enum table */

CREATE TYPE role_enum AS ENUM ('freelancer', 'client', 'admin');

CREATE TYPE category_enum AS ENUM ('Web Developer', 'Data Analytic', 'Android Developer', 'Designer', 'Video Grapher', 'Article Writing', 'Graphic Design' );

CREATE TYPE level_enum AS ENUM ('Beginner', 'Intermediate', 'Expert');

CREATE TYPE access_enum AS ENUM ('Active', 'Banned');

CREATE TYPE report_status AS ENUM ('ACCEPTED', 'PENDING', 'REJECTED');

CREATE TYPE status_enum AS ENUM ('PENDING', 'DENIED', 'ACCEPTED', 'NOT STARTED', '25%', '50%', '75%', 'DONE');

/* This query for create table */

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255),
    cpassword VARCHAR(20) NOT NULL,
    age VARCHAR(10),
    domicile VARCHAR(30) ,
    short_profile TEXT,
    role role_enum,
    status access_enum
);

CREATE TABLE FREELANCER (
    user_id BIGINT PRIMARY KEY,
    category category_enum,
    experience level_enum,
    expected_salary VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

CREATE TABLE FREELANCER_EXPERIENCE (
    experience_id SERIAL PRIMARY KEY,
    freelancer_id SERIAL,
    project_name VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    short_job_description TEXT NOT NULL,
    employer_details TEXT NOT NULL,
    FOREIGN KEY (freelancer_id) REFERENCES FREELANCER(user_id)
);

CREATE TABLE CLIENT (
    user_id BIGINT PRIMARY KEY,
    company_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

CREATE TABLE PROJECT (
    project_id SERIAL PRIMARY KEY,
    client_id BIGINT,
    project_name VARCHAR(50) NOT NULL,
    timeline VARCHAR(50) NOT NULL,
    job_description TEXT NOT NULL,
    status status_enum,
    duration VARCHAR(20),
    price VARCHAR(20),
    FOREIGN KEY (client_id) REFERENCES CLIENT(user_id)
);

CREATE TABLE PROJECT_FREELANCER (
    project_freelancer_id SERIAL PRIMARY KEY,
    project_id BIGINT,
    freelancer_id BIGINT,
    FOREIGN KEY (project_id) REFERENCES PROJECT(project_id),
    FOREIGN KEY (freelancer_id) REFERENCES FREELANCER(user_id)
);

CREATE TABLE REPORT (
    report_id SERIAL PRIMARY KEY,
    reporter_id SERIAL,
    message TEXT NOT NULL,
    status report_status DEFAULT 'PENDING',
    FOREIGN KEY (reporter_id) REFERENCES USERS(user_id)
);

/* This query for insert data */
INSERT INTO USERS (name, username, phone, password, cpassword, age, domicile, Short_profile, role)
VALUES ('John Doe','john_doe@gmail.com', '08123456789', ' ', 'password123', 20, 'Jakarta', 'Lorem ipsum dolor sit amet.', 'freelancer'),
       ('Jane Smith', 'jane_smith@gmail.com', '087654321', ' ', 'securepass', 19, 'Bandung', 'Consectetur adipiscing elit.', 'client'),
       ('Admin', 'admin@gmail.com', '08111111111', ' ', 'adminpass', 18, 'Surabaya', 'Nulla vitae elit libero.', 'admin');


INSERT INTO FREELANCER_EXPERIENCE (freelancer_id, project_name, date, short_job_description, employer_details)
VALUES 
    (1, 'Project A', '2023-01-01', 'Job description for Project A', 'Employer details for Project A'),
    (1, 'Project B', '2023-02-01', 'Job description for Project B', 'Employer details for Project B'),
    (2, 'Project C', '2023-03-01', 'Job description for Project C', 'Employer details for Project C'),
    (2, 'Project D', '2023-04-01', 'Job description for Project D', 'Employer details for Project D');

INSERT INTO CLIENT (company_name) VALUES ('Company A'), ('Company B');

INSERT INTO PROJECT (client_id, project_name, timeline, job_description, status)
VALUES 
    (11, 'Tester Project', '2023-04-01', 'Job description for Tester Project', 'PENDING');

INSERT INTO PROJECT_FREELANCER (project_id, freelancer_id)
VALUES 
    (1, 1),
    (2, 1),
    (3, 2),
    (4, 2);

INSERT INTO REPORT (reporter_id, message)
VALUES 
    (1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    (2, 'Nulla vitae elit libero, a pharetra augue.'),
    (3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    (1, 'Nulla vitae elit libero, a pharetra augue.'),
    (2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    (3, 'Nulla vitae elit libero, a pharetra augue.');



/* This query for alter table */

ALTER TABLE users
  ALTER COLUMN username SET NOT NULL,
  ADD CONSTRAINT unique_username UNIQUE (username);

ALTER TABLE freelancer
ADD COLUMN expected_salary VARCHAR(20);