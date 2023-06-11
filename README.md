<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">Welcome to LanceNesia</h1>
</div>

![LanceNesia Logo](https://ik.imagekit.io/abdfikih/lancenesia-high-resolution-logo-color-on-transparent-background__1_.png?updatedAt=1685162869863)

Are you a freelancer looking for exciting projects to work on? Or are you a business in need of talented individuals to help you bring your ideas to life? Look no further! The LanceNesia is the perfect platform to connect freelancers and clients, providing a seamless experience for both parties.

## Contributors

This is a final Database Management System project made by Group V22:

- [Abdul Fikih Kurnia](https://www.github.com/abdfikih) - 2106731200
- [Muhammad Aqil Muzakky](https://www.github.com/muzakkyaqil) - 2106731604
- [Syauqi Aulia](https://www.github.com/Chokode) - 2106707201

## Installation

This project utilizes Node Package Manager, To install the project, run the following commands:

```bash
https://github.com/SistemBasisData2023/LanceNesia.git
cd LanceNesia
```

## Usage Frontend

To run the project, run the following commands:

```bash
cd Client
npm install
npm start
```

## Usage Backend

To run the project, run the following commands:

```bash
cd Server
npm install
node server.js
```

It should run the website on `localhost:3000`, while the backend runs on `localhost:5000`, On Proxy, If you have website deployment, you can create env variabel HOST=joinweb.com.

## Features

### Freelancer Registration

Freelancers can easily create an account on the platform, providing their relevant details, skills, and portfolio. This registration process ensures that freelancers have a comprehensive profile that showcases their expertise and helps clients make informed hiring decisions.

### Client Registration

Clients can register on the platform to post their projects and connect with freelancers. The registration process allows clients to provide project details, budget, and other essential information to attract suitable freelancers.

### Project Listings

Clients can create detailed project listings, outlining their requirements, project scope, and desired skills. These listings help freelancers understand the project's nature and decide if they are the right fit.

### Search and Filter

Freelancers can easily search and filter through the available projects based on various criteria such as project category, budget range, and location. This feature ensures that freelancers can find projects that align with their skills and interests.

## Technologies

The Freelancer Marketplace is built using the following technologies:

### Frontend

Node.js
Tailwind CSS
JavaScript
HTML
CSS
SCSS

### Backend

PostgreSQL
Node.js
Express.js
JavaScript

## Diagrams

### UML

<img width="7634" alt="LanceNesia-9" src="https://github.com/SistemBasisData2023/LanceNesia/assets/134858335/a3cca03c-238f-4035-80e9-4554ab823a91">

### Entity-Relation Diagram (ERD)

<img width="5677" alt="LanceNesia-2" src="https://github.com/SistemBasisData2023/LanceNesia/assets/134858335/e9d4d9e4-6255-4f1c-991c-4e05af7c4215">

### Flowchart

<img width="4144" alt="LanceNesia-8" src="https://github.com/SistemBasisData2023/LanceNesia/assets/134858335/bdcd71f3-75d9-445c-9ebc-d9ff89067104">

## Tables

The following are tables that is used in LanceNesia's database.

### 1. `Report`

```
1. report_id
2. reporter_id
3. username
4. message
5. status
```

### 2. `Users`

```
1. user_id
2. name
3. username
4. phone
5. password
6. cpassword
7. age
8. domicile
9. short_profile
10. role
11. status
<<<<<<< HEAD
12.image_url
=======
12. image_url
>>>>>>> 988d6833a73181b0a9d8113f3313ccfbec34c0ed
```

### 3. `Freelancer`

```
1. user_id
2. category
3. experience
4. expected_salary
5. rating
6. total_rating
7. temporary_rate
```

### 4. `Client`

```
1. id
2. company_name
```

### 5. `Project`

```
1. project_id
2. client_id
3. project_name
4. timeline
5. job_desc
6. status
7. duration
8. price
9. image_url
```

### 6. `Freelancer_experience`

```
1. experience_id
2. freelancer_id
3. project_name
4. date
5. short_job_desc
6. employer_details
```

### 7. `Project_freelancer`

```
1. project_freelancer_id
2. project_id
3. freelancer_id
<<<<<<< HEAD
4. destination_enum
=======
4. destination
>>>>>>> 988d6833a73181b0a9d8113f3313ccfbec34c0ed
```
