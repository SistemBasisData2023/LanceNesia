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

## Features

### Freelancer Registration
Freelancers can easily create an account on the platform, providing their relevant details, skills, and portfolio. This registration process ensures that freelancers have a comprehensive profile that showcases their expertise and helps clients make informed hiring decisions.

### Client Registration
Clients can register on the platform to post their projects and connect with freelancers. The registration process allows clients to provide project details, budget, and other essential information to attract suitable freelancers.

### Project Listings
Clients can create detailed project listings, outlining their requirements, project scope, and desired skills. These listings help freelancers understand the project's nature and decide if they are the right fit.

### Search and Filter
Freelancers can easily search and filter through the available projects based on various criteria such as project category, budget range, and location. This feature ensures that freelancers can find projects that align with their skills and interests.

### Transaction Processing
The Freelancer Marketplace offers a secure transaction processing system, allowing clients to make transactions to freelancers upon successful completion of the project. This feature ensures a smooth and transparent transaction process, giving both parties peace of mind.

### Technologies
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

## Tables
The following are tables that is used in LanceNesia's database.

### 1.  ```Report```


```
1. report_id
2. reporter_id
3. message
4. status
```

### 2.  ```Users```


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
11. access
```

### 3.  ```Freelancer```


```
1. user_id
2. category
3. experience
```

### 4.  ```Client```


```
1. id
2. username
3. password
4. email
```

### 5.  ```Project```


```
1. project_id
2. client_id
3. project_name
4. timeline
5. job_desc
6. status
```


### 6.  ```Freelancer_experience```


```
1. experience_id
2. freelancer_id
3. project_name
4. date
5. short_job_desc
6. employer_details
```

### 7.  ```Project_freelancer```


```
1. project_freelancer_id
2. project_id
3. freelancer_id
```