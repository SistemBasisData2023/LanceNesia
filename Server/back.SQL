/* this query for enum table */

CREATE TYPE role_enum AS ENUM ('freelancer', 'client', 'admin');

CREATE TYPE category_enum AS ENUM ('Web Developer', 'Data Analytic', 'Android Developer', 'Designer', 'Video Grapher', 'Article Writing', 'Graphic Design' );

CREATE TYPE level_enum AS ENUM ('Beginner', 'Intermediate', 'Expert');

CREATE TYPE access_enum AS ENUM ('Active', 'Banned');

CREATE TYPE report_status AS ENUM ('ACCEPTED', 'PENDING', 'REJECTED');

CREATE TYPE status_enum AS ENUM ('PENDING', 'DENIED', 'ACCEPTED', 'NOT STARTED', '25%', '50%', '75%', 'DONE');

CREATE TYPE destination_enum AS ENUM ('FREELANCER', 'CLIENT');
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
    status access_enum,
    image_url TEXT
);

CREATE TABLE freelancer (
    user_id BIGINT PRIMARY KEY,
    category category_enum,
    experience level_enum,
    expected_salary VARCHAR(20),
    rating FLOAT DEFAULT 0,
    total_rating FLOAT DEFAULT 0,
    temporary_rate FLOAT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE FREELANCER_EXPERIENCE (
    experience_id SERIAL PRIMARY KEY,
    freelancer_id BIGINT,
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
    image_url TEXT,
    FOREIGN KEY (client_id) REFERENCES CLIENT(user_id)
);

CREATE TABLE PROJECT_FREELANCER (
    project_freelancer_id SERIAL PRIMARY KEY,
    project_id BIGINT,
    freelancer_id BIGINT,
    destination destination_enum,
    FOREIGN KEY (project_id) REFERENCES PROJECT(project_id),
    FOREIGN KEY (freelancer_id) REFERENCES FREELANCER(user_id)
);

CREATE TABLE REPORT (
    report_id SERIAL PRIMARY KEY,
    reporter_id BIGINT,
    username VARCHAR(50),
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

ALTER TABLE REPORT
ADD COLUMN reporter_id TYPE BIGINT,;



/*===========================================================*/

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-06-11 22:12:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 879 (class 1247 OID 335873)
-- Name: access_enum; Type: TYPE; Schema: public; Owner: abdulfikihk
--

CREATE TYPE public.access_enum AS ENUM (
    'Active',
    'Banned'
);


ALTER TYPE public.access_enum OWNER TO abdulfikihk;

--
-- TOC entry 888 (class 1247 OID 368641)
-- Name: category_enum; Type: TYPE; Schema: public; Owner: abdulfikihk
--

CREATE TYPE public.category_enum AS ENUM (
    'Web Developer',
    'Data Analytic',
    'Android Developer',
    'Designer',
    'Video Grapher',
    'Article Writing',
    'Graphic Design'
);


ALTER TYPE public.category_enum OWNER TO abdulfikihk;

--
-- TOC entry 894 (class 1247 OID 442369)
-- Name: destination_enum; Type: TYPE; Schema: public; Owner: abdulfikihk
--

CREATE TYPE public.destination_enum AS ENUM (
    'FREELANCER',
    'CLIENT'
);


ALTER TYPE public.destination_enum OWNER TO abdulfikihk;

--
-- TOC entry 891 (class 1247 OID 368656)
-- Name: level_enum; Type: TYPE; Schema: public; Owner: abdulfikihk
--

CREATE TYPE public.level_enum AS ENUM (
    'Beginner',
    'Intermediate',
    'Expert'
);


ALTER TYPE public.level_enum OWNER TO abdulfikihk;

--
-- TOC entry 882 (class 1247 OID 352257)
-- Name: report_status; Type: TYPE; Schema: public; Owner: abdulfikihk
--

CREATE TYPE public.report_status AS ENUM (
    'ACCEPTED',
    'PENDING',
    'REJECTED'
);


ALTER TYPE public.report_status OWNER TO abdulfikihk;

--
-- TOC entry 855 (class 1247 OID 303105)
-- Name: role_enum; Type: TYPE; Schema: public; Owner: abdulfikihk
--

CREATE TYPE public.role_enum AS ENUM (
    'freelancer',
    'client',
    'admin'
);


ALTER TYPE public.role_enum OWNER TO abdulfikihk;

--
-- TOC entry 858 (class 1247 OID 303161)
-- Name: status_enum; Type: TYPE; Schema: public; Owner: abdulfikihk
--

CREATE TYPE public.status_enum AS ENUM (
    'PENDING',
    'DENIED',
    'ACCEPTED',
    'NOT STARTED',
    '25%',
    '50%',
    '75%',
    'DONE'
);


ALTER TYPE public.status_enum OWNER TO abdulfikihk;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 319526)
-- Name: client; Type: TABLE; Schema: public; Owner: abdulfikihk
--

CREATE TABLE public.client (
    user_id integer NOT NULL,
    company_name character varying(50) NOT NULL
);


ALTER TABLE public.client OWNER TO abdulfikihk;

--
-- TOC entry 221 (class 1259 OID 319525)
-- Name: client_user_id_seq; Type: SEQUENCE; Schema: public; Owner: abdulfikihk
--

CREATE SEQUENCE public.client_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.client_user_id_seq OWNER TO abdulfikihk;

--
-- TOC entry 2653 (class 0 OID 0)
-- Dependencies: 221
-- Name: client_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abdulfikihk
--

ALTER SEQUENCE public.client_user_id_seq OWNED BY public.client.user_id;


--
-- TOC entry 217 (class 1259 OID 319498)
-- Name: freelancer; Type: TABLE; Schema: public; Owner: abdulfikihk
--

CREATE TABLE public.freelancer (
    user_id bigint NOT NULL,
    category public.category_enum,
    experience public.level_enum,
    expected_salary character varying(20),
    rating double precision DEFAULT 0,
    total_rating double precision DEFAULT 0,
    temporary_rate double precision DEFAULT 0
);


ALTER TABLE public.freelancer OWNER TO abdulfikihk;

--
-- TOC entry 220 (class 1259 OID 319511)
-- Name: freelancer_experience; Type: TABLE; Schema: public; Owner: abdulfikihk
--

CREATE TABLE public.freelancer_experience (
    experience_id integer NOT NULL,
    freelancer_id integer NOT NULL,
    project_name character varying(50) NOT NULL,
    date date NOT NULL,
    short_job_description text NOT NULL,
    employer_details text NOT NULL
);


ALTER TABLE public.freelancer_experience OWNER TO abdulfikihk;

--
-- TOC entry 218 (class 1259 OID 319509)
-- Name: freelancer_experience_experience_id_seq; Type: SEQUENCE; Schema: public; Owner: abdulfikihk
--

CREATE SEQUENCE public.freelancer_experience_experience_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.freelancer_experience_experience_id_seq OWNER TO abdulfikihk;

--
-- TOC entry 2654 (class 0 OID 0)
-- Dependencies: 218
-- Name: freelancer_experience_experience_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abdulfikihk
--

ALTER SEQUENCE public.freelancer_experience_experience_id_seq OWNED BY public.freelancer_experience.experience_id;


--
-- TOC entry 219 (class 1259 OID 319510)
-- Name: freelancer_experience_freelancer_id_seq; Type: SEQUENCE; Schema: public; Owner: abdulfikihk
--

CREATE SEQUENCE public.freelancer_experience_freelancer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.freelancer_experience_freelancer_id_seq OWNER TO abdulfikihk;

--
-- TOC entry 2655 (class 0 OID 0)
-- Dependencies: 219
-- Name: freelancer_experience_freelancer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abdulfikihk
--

ALTER SEQUENCE public.freelancer_experience_freelancer_id_seq OWNED BY public.freelancer_experience.freelancer_id;


--
-- TOC entry 216 (class 1259 OID 319497)
-- Name: freelancer_user_id_seq; Type: SEQUENCE; Schema: public; Owner: abdulfikihk
--

CREATE SEQUENCE public.freelancer_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.freelancer_user_id_seq OWNER TO abdulfikihk;

--
-- TOC entry 2656 (class 0 OID 0)
-- Dependencies: 216
-- Name: freelancer_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abdulfikihk
--

ALTER SEQUENCE public.freelancer_user_id_seq OWNED BY public.freelancer.user_id;


--
-- TOC entry 225 (class 1259 OID 319539)
-- Name: project; Type: TABLE; Schema: public; Owner: abdulfikihk
--

CREATE TABLE public.project (
    project_id integer NOT NULL,
    client_id bigint,
    project_name character varying(50) NOT NULL,
    timeline character varying(50) NOT NULL,
    job_description text NOT NULL,
    status public.status_enum DEFAULT 'PENDING'::public.status_enum,
    duration character varying(20),
    price character varying(20),
    image_url text
);


ALTER TABLE public.project OWNER TO abdulfikihk;

--
-- TOC entry 224 (class 1259 OID 319538)
-- Name: project_client_id_seq; Type: SEQUENCE; Schema: public; Owner: abdulfikihk
--

CREATE SEQUENCE public.project_client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_client_id_seq OWNER TO abdulfikihk;

--
-- TOC entry 2657 (class 0 OID 0)
-- Dependencies: 224
-- Name: project_client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abdulfikihk
--

ALTER SEQUENCE public.project_client_id_seq OWNED BY public.project.client_id;


--
-- TOC entry 229 (class 1259 OID 319554)
-- Name: project_freelancer; Type: TABLE; Schema: public; Owner: abdulfikihk
--

CREATE TABLE public.project_freelancer (
    project_freelancer_id integer NOT NULL,
    project_id bigint NOT NULL,
    freelancer_id bigint NOT NULL,
    destination public.destination_enum
);


ALTER TABLE public.project_freelancer OWNER TO abdulfikihk;

--
-- TOC entry 228 (class 1259 OID 319553)
-- Name: project_freelancer_freelancer_id_seq; Type: SEQUENCE; Schema: public; Owner: abdulfikihk
--

CREATE SEQUENCE public.project_freelancer_freelancer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_freelancer_freelancer_id_seq OWNER TO abdulfikihk;

--
-- TOC entry 2658 (class 0 OID 0)
-- Dependencies: 228
-- Name: project_freelancer_freelancer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abdulfikihk
--

ALTER SEQUENCE public.project_freelancer_freelancer_id_seq OWNED BY public.project_freelancer.freelancer_id;


--
-- TOC entry 226 (class 1259 OID 319551)
-- Name: project_freelancer_project_freelancer_id_seq; Type: SEQUENCE; Schema: public; Owner: abdulfikihk
--

CREATE SEQUENCE public.project_freelancer_project_freelancer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_freelancer_project_freelancer_id_seq OWNER TO abdulfikihk;

--
-- TOC entry 2659 (class 0 OID 0)
-- Dependencies: 226
-- Name: project_freelancer_project_freelancer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abdulfikihk
--

ALTER SEQUENCE public.project_freelancer_project_freelancer_id_seq OWNED BY public.project_freelancer.project_freelancer_id;


--
-- TOC entry 227 (class 1259 OID 319552)
-- Name: project_freelancer_project_id_seq; Type: SEQUENCE; Schema: public; Owner: abdulfikihk
--

CREATE SEQUENCE public.project_freelancer_project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_freelancer_project_id_seq OWNER TO abdulfikihk;

--
-- TOC entry 2660 (class 0 OID 0)
-- Dependencies: 227
-- Name: project_freelancer_project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abdulfikihk
--

ALTER SEQUENCE public.project_freelancer_project_id_seq OWNED BY public.project_freelancer.project_id;


--
-- TOC entry 223 (class 1259 OID 319537)
-- Name: project_project_id_seq; Type: SEQUENCE; Schema: public; Owner: abdulfikihk
--

CREATE SEQUENCE public.project_project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_project_id_seq OWNER TO abdulfikihk;

--
-- TOC entry 2661 (class 0 OID 0)
-- Dependencies: 223
-- Name: project_project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abdulfikihk
--

ALTER SEQUENCE public.project_project_id_seq OWNED BY public.project.project_id;


--
-- TOC entry 232 (class 1259 OID 352265)
-- Name: report; Type: TABLE; Schema: public; Owner: abdulfikihk
--

CREATE TABLE public.report (
    report_id integer NOT NULL,
    reporter_id bigint NOT NULL,
    message text NOT NULL,
    status public.report_status DEFAULT 'PENDING'::public.report_status,
    username_report character varying(50)
);


ALTER TABLE public.report OWNER TO abdulfikihk;

--
-- TOC entry 230 (class 1259 OID 352263)
-- Name: report_report_id_seq; Type: SEQUENCE; Schema: public; Owner: abdulfikihk
--

CREATE SEQUENCE public.report_report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.report_report_id_seq OWNER TO abdulfikihk;

--
-- TOC entry 2662 (class 0 OID 0)
-- Dependencies: 230
-- Name: report_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abdulfikihk
--

ALTER SEQUENCE public.report_report_id_seq OWNED BY public.report.report_id;


--
-- TOC entry 231 (class 1259 OID 352264)
-- Name: report_reporter_id_seq; Type: SEQUENCE; Schema: public; Owner: abdulfikihk
--

CREATE SEQUENCE public.report_reporter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.report_reporter_id_seq OWNER TO abdulfikihk;

--
-- TOC entry 2663 (class 0 OID 0)
-- Dependencies: 231
-- Name: report_reporter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abdulfikihk
--

ALTER SEQUENCE public.report_reporter_id_seq OWNED BY public.report.reporter_id;


--
-- TOC entry 215 (class 1259 OID 319489)
-- Name: users; Type: TABLE; Schema: public; Owner: abdulfikihk
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(50) NOT NULL,
    username character varying(50) NOT NULL,
    phone character varying(20) NOT NULL,
    password character varying(255),
    cpassword character varying(20) NOT NULL,
    age character varying(10),
    domicile character varying(30),
    short_profile text,
    role public.role_enum,
    status public.access_enum,
    image_url text
);


ALTER TABLE public.users OWNER TO abdulfikihk;

--
-- TOC entry 214 (class 1259 OID 319488)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: abdulfikihk
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO abdulfikihk;

--
-- TOC entry 2664 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abdulfikihk
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 2454 (class 2604 OID 319529)
-- Name: client user_id; Type: DEFAULT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.client ALTER COLUMN user_id SET DEFAULT nextval('public.client_user_id_seq'::regclass);


--
-- TOC entry 2448 (class 2604 OID 385024)
-- Name: freelancer user_id; Type: DEFAULT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.freelancer ALTER COLUMN user_id SET DEFAULT nextval('public.freelancer_user_id_seq'::regclass);


--
-- TOC entry 2452 (class 2604 OID 319514)
-- Name: freelancer_experience experience_id; Type: DEFAULT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.freelancer_experience ALTER COLUMN experience_id SET DEFAULT nextval('public.freelancer_experience_experience_id_seq'::regclass);


--
-- TOC entry 2453 (class 2604 OID 319515)
-- Name: freelancer_experience freelancer_id; Type: DEFAULT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.freelancer_experience ALTER COLUMN freelancer_id SET DEFAULT nextval('public.freelancer_experience_freelancer_id_seq'::regclass);


--
-- TOC entry 2455 (class 2604 OID 319542)
-- Name: project project_id; Type: DEFAULT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.project ALTER COLUMN project_id SET DEFAULT nextval('public.project_project_id_seq'::regclass);


--
-- TOC entry 2456 (class 2604 OID 393216)
-- Name: project client_id; Type: DEFAULT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.project ALTER COLUMN client_id SET DEFAULT nextval('public.project_client_id_seq'::regclass);


--
-- TOC entry 2458 (class 2604 OID 319557)
-- Name: project_freelancer project_freelancer_id; Type: DEFAULT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.project_freelancer ALTER COLUMN project_freelancer_id SET DEFAULT nextval('public.project_freelancer_project_freelancer_id_seq'::regclass);


--
-- TOC entry 2459 (class 2604 OID 401408)
-- Name: project_freelancer project_id; Type: DEFAULT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.project_freelancer ALTER COLUMN project_id SET DEFAULT nextval('public.project_freelancer_project_id_seq'::regclass);


--
-- TOC entry 2460 (class 2604 OID 401409)
-- Name: project_freelancer freelancer_id; Type: DEFAULT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.project_freelancer ALTER COLUMN freelancer_id SET DEFAULT nextval('public.project_freelancer_freelancer_id_seq'::regclass);


--
-- TOC entry 2461 (class 2604 OID 352268)
-- Name: report report_id; Type: DEFAULT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.report ALTER COLUMN report_id SET DEFAULT nextval('public.report_report_id_seq'::regclass);


--
-- TOC entry 2462 (class 2604 OID 417792)
-- Name: report reporter_id; Type: DEFAULT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.report ALTER COLUMN reporter_id SET DEFAULT nextval('public.report_reporter_id_seq'::regclass);


--
-- TOC entry 2447 (class 2604 OID 319492)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 2637 (class 0 OID 319526)
-- Dependencies: 222
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: abdulfikihk
--

COPY public.client (user_id, company_name) FROM stdin;
1	Company A
2	Company B
25	My Designs
18	Company Coba
11	Cho Designs
44	VTOL
\.


--
-- TOC entry 2632 (class 0 OID 319498)
-- Dependencies: 217
-- Data for Name: freelancer; Type: TABLE DATA; Schema: public; Owner: abdulfikihk
--

COPY public.freelancer (user_id, category, experience, expected_salary, rating, total_rating, temporary_rate) FROM stdin;
20	Data Analytic	Intermediate	2.000.000	4.8	1	0
26	Designer	Expert	6.000.000	4.8	1	0
31	Web Developer	Intermediate	4.000.000	4.8	1	0
35	Web Developer	Intermediate	5.500.000	4.8	1	0
37	Web Developer	Intermediate	5.500.000	4.8	1	0
14	Designer	Expert	4.000.000	4.7	10	47
41	Android Developer	Expert	2.000.000	0	0	0
38	Android Developer	Expert	10.0000.000	0	0	0
42	Android Developer	Intermediate	4.000.000	4.7	3	14
40	Web Developer	Expert	4.000.000	5	1	5
39	Web Developer	Expert	4.000.000	5	1	5
43	Android Developer	Expert	3.000.000	4.7	3	14
\.


--
-- TOC entry 2635 (class 0 OID 319511)
-- Dependencies: 220
-- Data for Name: freelancer_experience; Type: TABLE DATA; Schema: public; Owner: abdulfikihk
--

COPY public.freelancer_experience (experience_id, freelancer_id, project_name, date, short_job_description, employer_details) FROM stdin;
10	14	Project D	2025-10-31	Job description for project D	Employer details for project D
11	14	Project E	2023-01-25	Job description for project E	Employer details for project E
\.


--
-- TOC entry 2640 (class 0 OID 319539)
-- Dependencies: 225
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: abdulfikihk
--

COPY public.project (project_id, client_id, project_name, timeline, job_description, status, duration, price, image_url) FROM stdin;
2	1	Project B	2023-02-01	Job description for Project B	PENDING	\N	\N	\N
4	2	Project D	2023-04-01	Job description for Project D	PENDING	\N	\N	\N
1	1	Project D	2023-05-01	Jobs Description For Project D	75%	\N	\N	\N
3	2	Project C	2023-03-01	Job description for Project C	ACCEPTED	\N	\N	\N
36	\N	Web Development	2023-06-01	Develop a responsive website using modern web technologies.	\N	3 months	5.000.000	\N
37	\N	Mobile App Development	2023-06-02	Build a cross-platform mobile application with a user-friendly interface.	\N	6 months	10.000.000	\N
38	\N	E-commerce Enhancement	2023-06-03	Improve the checkout process and optimize an existing e-commerce platform.	\N	2 months	3.000.000	\N
39	\N	Data Analysis and Visualization	2023-06-04	Analyze large datasets and create insightful visualizations.	\N	4 months	8.000.000	\N
40	\N	Cloud Migration	2023-06-05	Migrate infrastructure to the cloud and ensure smooth operation.	\N	1 month	2.000.000	\N
41	\N	AI Chatbot Development	2023-06-06	Develop an AI-powered chatbot for customer support.	\N	3 months	6.000.000	\N
42	\N	Blockchain Integration	2023-06-07	Integrate blockchain technology into existing systems.	\N	2 months	4.000.000	\N
43	\N	Cybersecurity Audit	2023-06-08	Conduct a comprehensive audit to identify vulnerabilities and implement security measures.	\N	1 month	3.000.000	\N
44	\N	Machine Learning Model Development	2023-06-09	Develop predictive models using machine learning algorithms.	\N	5 months	10.000.000	\N
45	\N	UI/UX Redesign	2023-06-10	Revamp the user interface and user experience of a web application.	\N	2 months	5.000.000	\N
47	\N	Project G	September - December	Design UI	PENDING	2 months	1.500.000	\N
60	11	Android Designer	2023-03-01	Android Designer	PENDING	1 Week	650.000	
53	11	tester5	2023-03-01	cobaaa	DONE	1 Week	650.000	\N
46	11	Tester Project	2023-04-01	Job description for Tester Project	PENDING	2 Month	550.000	\N
52	25	Project J	January - March 2024	Design Poster	DONE	1 month	3.000.000	\N
62	11	Analyst Data	2023-01-26	Analyst Dataaa	PENDING	1 Week	4.000.000	
61	11	Data Analyst	2023-03-01	Data Analyst for beginner	ACCEPTED	2 Weeks	4.000.000	
49	25	Project I (updated)	September - December	Jobdesc	PENDING	2 months	1.500.000	\N
50	11	coba dulu	2023-06-10	coab dulu desc	PENDING	2 Month	4.000.000	\N
55	11	Drone Text	2023-05-01	Text 1.1	DONE	2 Weeks	500.000	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2FDRONE2.PNG9e2bc662-13c0-4246-88c6-212078ef5713?alt=media&token=f30ca9a1-9e0a-49c1-8b61-0213121a8790
66	11	Project COBA	2023-05-01	Joba Hire	PENDING	2 Weeks	4.000.000	
51	11	tesst 2	2023-01-26	desc test 2	DONE	1 Week	500.000	\N
67	11	Android Developer	2023-01-26	Develop Aplication J Sleep	PENDING	6 Month	4.000.000	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2Flogo_JSLEEP.jpg1fcde06b-7979-4bd1-9beb-925006b88ca9?alt=media&token=f62daddb-4f62-4d15-86ad-3cc6b7cfe13a
56	11	VTOL	2023-05-01	kerjaan rubot	DONE	1 Week	650.000	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2FDRONE4.PNG1d96db04-d558-4070-a913-5378e94ca867?alt=media&token=77e9eb5a-c105-4074-a82b-e3b4f05e98ac
58	11	Project Tester	2023-04-01	Project tester job	PENDING	2 Weeks	650.000	
57	11	J SLEEP	2023-01-26	jsleep developer	DONE	2 Month	500.000	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2Flogo_JSLEEP.jpgdbda6c9b-3af4-44b9-a240-2c3021df0a01?alt=media&token=6f5d5472-8829-4427-99bd-aaf236458967
59	11	Web Site	2023-05-01	Develop Website	PENDING	2 Month	4.000.000	
\.


--
-- TOC entry 2644 (class 0 OID 319554)
-- Dependencies: 229
-- Data for Name: project_freelancer; Type: TABLE DATA; Schema: public; Owner: abdulfikihk
--

COPY public.project_freelancer (project_freelancer_id, project_id, freelancer_id, destination) FROM stdin;
9	3	14	FREELANCER
10	3	14	FREELANCER
12	2	14	FREELANCER
15	46	14	FREELANCER
16	46	14	FREELANCER
18	2	14	FREELANCER
21	53	14	FREELANCER
24	50	14	FREELANCER
17	46	20	CLIENT
20	52	26	CLIENT
25	55	42	CLIENT
26	51	43	CLIENT
27	56	40	CLIENT
28	57	39	CLIENT
29	58	41	CLIENT
30	59	38	CLIENT
31	60	43	FREELANCER
32	61	14	CLIENT
33	62	41	CLIENT
34	66	37	CLIENT
\.


--
-- TOC entry 2647 (class 0 OID 352265)
-- Dependencies: 232
-- Data for Name: report; Type: TABLE DATA; Schema: public; Owner: abdulfikihk
--

COPY public.report (report_id, reporter_id, message, status, username_report) FROM stdin;
2	2	Nulla vitae elit libero, a pharetra augue.	PENDING	\N
3	3	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	PENDING	\N
7	11	Tester	PENDING	anne@gmail.com
8	43	Helpp, Gabisa Login	PENDING	muhammadfathan@gmail.com
\.


--
-- TOC entry 2630 (class 0 OID 319489)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: abdulfikihk
--

COPY public.users (user_id, name, username, phone, password, cpassword, age, domicile, short_profile, role, status, image_url) FROM stdin;
2	Jane Smith	jane_smith@gmail.com	087654321	 	securepass	19	Bandung	Consectetur adipiscing elit.	client	\N	\N
3	Admin	admin@gmail.com	08111111111	 	adminpass	18	Surabaya	Nulla vitae elit libero.	admin	\N	\N
8	Abdul Kurnia	abdadmin@gmail.com	089601521190	$2b$10$Cwpbdtf0HVxbVeH54fENPeoNDfrFSNKt9Zwg5KylsaunuxZoz7IjW	F!kihkur	20	undefined	undefined	admin	\N	\N
37	RyanFreelancer	ryanfreelancer@gmail.com	08877665544	$2b$10$WQBIi.9X2U3fWOnlAlWPzOhMFZQ.E4SDkaDx7StGl0LN4RI0/PE9.	ryanryan	23	Bogor	Web Dev yuhhhh	freelancer	Active	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2Frian.jfifcd96fc9d-ff54-4960-a52c-3475f298a4ad?alt=media&token=30605cf6-f9d9-41c3-ba45-7e7ce4b82bdc
9	Abdulllll	abdinnn@gmail.com	089601521190	$2b$10$PlS2Opr9nKN08iHjszDpp.QsYN6YLGM1gBzg38tYpiaNw5m/e2nN2	F!kihkur	20	Tangerang	Seorang Mahasiswa	admin	\N	\N
24	ClientAqil	aqilclient@gmail.com	0123456789	$2b$10$FmMjsp5Wh9g8VHMgp.SfEev4MIUKMsR4b7gmDJ/TK75Y1o.wCH1V2	aqilaqil	 	 	 	client	Active	\N
15	Banned Akun	banned@gmail.com	0821231827311	$2b$10$iMQV1zRdYdu8kGN7SMLbiecmYKKY646C/MoHXG5ghDGDpmPlskvxO	F!kihkur	 19	 Tangerang	 Orang Biasa	client	Active	\N
10	Dinda	dinda@gmail.com	081299112881	$2b$10$c/Ej7SpklyfdatACCaFxROw5dIoPiti03znRwA9tMKCgDMEoTnRVi	F!kihkur	 20	 Tangerang	 	client	Active	\N
25	ClientOne	ClientOne@gmail.com	231321312	$2b$10$0cCexMA1AhDyLMpfJJSJQug749/nDFtU9np6Nsgw97bGskv7KzYwS	clientclient	30	jakartong	lookoing for designers	client	Active	\N
23	ClientFikih	fikihclient@gmail.com	0123456789	$2b$10$SWHSN2wJgCmSXtzaKuKyv.D6.9mSs/I7z/0/rworUiapUh200yD6u	fikihfikih	 	 	 	client	\N	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2F1657244085747.jpg11613732-4be6-495f-a266-00abd26671ac?alt=media&token=c63c0597-f7de-4da4-8608-11a077c5c5b1
20	Mariane Rosalina	annefree@gmail.com	089601521190	$2b$10$p4NUpUEm1EjuepJXEyCSD.khVWz2TLgCu0jfm9.HVDdsAJ5IF.6.a	F!kihkur	 21	 Semarang	 Protect Him	freelancer	\N	\N
12	Anne Rosalina	client@gmail.com	089601521190	$2b$10$3jeWNNyKZye4tHedGcaZiO33E1m2Mgn/9u9jwdyyZgGe4O33bSXZ.	F!kihkur	 21	 Tangerang	 	client	Banned	\N
16	AqilLagi	test@gmail.com	089601521190	$2b$10$..yLH.NNjGj0F7X3aOhCc.SsVJutVqlRijqwIb4aT.LjBap7n31Yq	Admin123	 	 	 	client	Banned	\N
17	Land Mark	mark@gmail.com	081299112881	$2b$10$No921ft2i5t6l8h7tvq1AOgTkF.SKG7.pBkOOH0n0agPp7wJ8Ko9C	Admin123	 	 	 	client	\N	\N
13	Muzakky	freelance@gmail.com	08111211221	$2b$10$0W82YzCmdOFslkAV8pG2G.0vmdh.SMveXwVwIRUXF9GWN1fpYF/eW	F!kihkur	 	 	 	freelancer	Banned	\N
19	coba mulu	cobamulu@gmail.com	089601521190	$2b$10$s070aFvB5NpubpYXX6UdyuS4yV7KUHkrjtFT0SlGfKZnBfAZqgZKO	Admin123	 	 	 	client	\N	\N
1	Abdulllll	abdin@gmail.com	089601521190	 	password123	20	Tangerang	\N	freelancer	Banned	\N
26	IqbalFreelancerBaru	iqbalfreelancer@gmail.com	08877665544	$2b$10$smoewC1gcaHBCIYk2borGeuw3TKxjZcXMbwBZv.1wUx8oNN3u0C7K	iqbaliqbal	25	Jakarta	Designer, expert wooo	freelancer	Active	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2Faqil.jfif534e93fd-fba2-4238-b16f-672064c95138?alt=media&token=034e76c7-a7b1-4f9b-9372-94bade979744
21	ChokiClient	syauqiclient@gmail.com	0213455555	$2b$10$JoWQ8Wh.gGrtvXuVJIiQYOWv4frU2DPb5n6OSMNnM.M2Nqha9dQPe	cokicoki	30	Jakartong	Looking for designers	client	\N	\N
22	ClientCoki	cokiclient@gmail.com	0123456789	$2b$10$X0ZvytoOTXhRPVfSwS2i7OATNoB4vywlcjf46gu1fedNqLYGp8Wru	cokicoki	 	 	 	client	\N	\N
33	LaurenFreelancer	laurenfreelancer@gmail.com	01234567	$2b$10$f12BVJJK0N3tLcYJIy9eBudNvo/Tp2NZwEpU0EDbVAzkdNa.VqEJO	laurenlauren	 	 	 	freelancer	Active	\N
31	TunjungFreelancer	tunjungfreelancer@gmail.com	01234567	$2b$10$YsG9d0uzKJ6/FzoRm6er5uw0v0W.GOkuGsZqM4AG3ZfFGJoSCW7Oa	tunjungtunjung	 18	 Jakarta	Orang Biasa	freelancer	Active	\N
34	RantiFreelancer	rantifreelancer@gmail.com	01234567	$2b$10$G.sKxrVtkY4iaSPGIccZJ.LWsg/2tv3j3O61BEIWRryjiMTS5Ya3q	rantiranti	 	 	 	freelancer	Active	\N
14	ChokiaulBakalFix	syauqido@gmail.com	08877665544	$2b$10$bfPmHlxiYwk7W32UfLsApewEEPwPv.1Oa7G0/00ui9k0VZZs5cbM.	cokicoki	25	Jakarta	Designer, expert wooo	freelancer	Active	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2Fcoki.jfifed07bd3a-dc50-4c89-95b3-9fafaec67315?alt=media&token=ad467eb9-8e9a-479c-8523-a29054e947a3
18	coba coba	cobacoba@gmail.com	089601521190	$2b$10$B2oRa2dP235KRfZYjpoFbuwkus0tGr5mWtZocfuCuEDcaH350hUXK	F!kihkur	 21	 Surabaya	 Orang Biasa	client	\N	\N
41	Muhammad Suhaili	muhammadsuhaili@gmail.com	089601521190	$2a$10$13rHmegr3t09HqB.OQrU3.gmJbO4XhFO81rgZmYnpbYntSIadybT6	freelancer123	 20	 Tangerang Selatan	 Tuan Muda	freelancer	Active	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2Fale.jfif3edee1b1-679c-4116-bc85-70b14a167d55?alt=media&token=450ec1a8-0494-4129-b780-49efb608eda8
35	DitoFreelancerBaru	ditofreelancer@gmail.com	08877665544	$2b$10$7eXywYVzYBp304iZ3imzoeQ9.Jw4YsbkmtM6Z36Vs7tx6m.bqaMN6	ditodito	25	Bogor	Web Dev	freelancer	Active	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2Fdito.jfif017d9f82-ec67-4242-a227-0d66cee5de23?alt=media&token=b7ba89ea-5364-42a2-a74b-b0dbc0ffd4b0
39	Cavan Naufal	cavannaufal@gmail.com	089601521190	$2a$10$ZJVlVSE32hDa.Lq1P7iaBeLe0BSlfDva7Es0juTMnI8vbgn9k0baW	freelancer123	 21	 Bogor Pinggir	 Para Lelaki Tekkom	freelancer	Active	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2Fcavan.jfife10d1eb2-eea9-444c-8db2-9885865f4c54?alt=media&token=8d608404-6f4c-4fe0-aead-14621bc88b64
11	UNSRI	anne@gmail.com	231321312	$2b$10$ck72RqABknjyvlelNc3BcOeJmzjk8HgcKaAlR/K5k.52F0Km0h6aW	F!kihkur	30	jakartong	lookoing for designers	client	Active	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2Flogo_JSLEEP.jpga70c4889-1dd3-444b-be7c-8d801361d37a?alt=media&token=992fd8d3-9f99-4b6d-bff5-0557eb7d2645
7	Abdul Fikih	abdfikih@gmail.com	089601521190	$2b$10$cxnWh7y7/FqARZepG75DmesUAqpl3toNa47iH5xD2ATKPtU6j.5Xm	F!kihkur	20	Tangerang	undefined	admin	\N	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2FCapture1.PNG914a9caf-8740-42d1-8f5c-f8f0490f3579?alt=media&token=d9f195e6-eed8-4ad0-8daf-ce1123299ea6
28	BintangFreelancer	bintangfreelancer@gmail.com	01234567	$2b$10$dGlPT.o58YEuMq6mCVNB.ettiJqm7c0JzfSGKe21z9sqo.weRX.t6	bintangbintang	 	 	 	freelancer	Active	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2Fbintang.jfif770968a8-f908-49ad-b259-c4199635b790?alt=media&token=4fa4f937-02d5-46bf-aa47-eb939dd0e222
40	Albertus Timothy	albertustimothy@gmail.com	089601521190	$2a$10$w5rhn.BvxAJ1uGKesAKdaeFRsEVMn3ONKTKvQyvEtGgNVRw9u3IsO	freelancer123	 20	 Jakarta	 BPH CEO	freelancer	Active	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2Falbert.jfifb360deae-c88d-41b3-8527-b8704badbef9?alt=media&token=61d9cf09-7ec9-4069-b9bd-19bb9c95756e
38	Althaf Nafi	althafnafi@gmail.com	089601521190	$2a$10$WguYqXnaqFDopjVRQSPbe.Xvm0EmmmCFCwKhqO0ZXZkisFPP6b0Y2	freelancer123	 20	 Kebagusan	 Orang OP	freelancer	Active	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2Falthaf.PNGed9c0024-e857-4048-9f9a-bf9a7a71f159?alt=media&token=7ecab0e3-89c0-421b-8135-e6efe13dc28c
42	Stefan Agusto	stefanagusto@gmail.com	089601521190	$2a$10$H9dHy2nAJVuczd0uZVkdIOVklqjtMgI2hXbao0Lq8S7Ws.avp7SaC	freelancer123	 20	 Depok	 Tanoto Foundasi	freelancer	Active	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2Fstefan.jfif9f5377a1-109f-4056-961c-406a14d597d5?alt=media&token=7e983141-ba2d-451a-95cd-c18867de7ad9
43	Muhammad Fathan	muhammadfathan@gmail.com	089601521190	$2a$10$CBhNRUgNkrpZUA0IfhV7KufnGBf.hVeiwF9Oj0VxjOREPn/MZhtnS	freelancer123	 21	 Bogor	 Seorang pencari wanita	freelancer	Active	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2Ffathan.jfif2f69b945-2b31-4f77-90bd-82f624104208?alt=media&token=82fc9104-5fe8-4675-8d2d-4ca546e0266b
44	Abdul Fikih Kurnia	abdulfikihk@gmail.com	0231321312	$2a$10$RQKW1dKwa4V5S52M.2sGeuWzedtAM.eouC7Zy9PA1k86o52J..EN.	client123	 18	 Tangerang	 Orang Biasa	client	Active	https://firebasestorage.googleapis.com/v0/b/cigritous.appspot.com/o/images%2F1657244085747%20(2).jpgafab18cf-047d-4add-ada6-0e966852443a?alt=media&token=cf4fa301-7692-433f-be3d-91f2475f9b0b
\.


--
-- TOC entry 2665 (class 0 OID 0)
-- Dependencies: 221
-- Name: client_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abdulfikihk
--

SELECT pg_catalog.setval('public.client_user_id_seq', 2, true);


--
-- TOC entry 2666 (class 0 OID 0)
-- Dependencies: 218
-- Name: freelancer_experience_experience_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abdulfikihk
--

SELECT pg_catalog.setval('public.freelancer_experience_experience_id_seq', 11, true);


--
-- TOC entry 2667 (class 0 OID 0)
-- Dependencies: 219
-- Name: freelancer_experience_freelancer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abdulfikihk
--

SELECT pg_catalog.setval('public.freelancer_experience_freelancer_id_seq', 1, false);


--
-- TOC entry 2668 (class 0 OID 0)
-- Dependencies: 216
-- Name: freelancer_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abdulfikihk
--

SELECT pg_catalog.setval('public.freelancer_user_id_seq', 1, false);


--
-- TOC entry 2669 (class 0 OID 0)
-- Dependencies: 224
-- Name: project_client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abdulfikihk
--

SELECT pg_catalog.setval('public.project_client_id_seq', 1, false);


--
-- TOC entry 2670 (class 0 OID 0)
-- Dependencies: 228
-- Name: project_freelancer_freelancer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abdulfikihk
--

SELECT pg_catalog.setval('public.project_freelancer_freelancer_id_seq', 1, false);


--
-- TOC entry 2671 (class 0 OID 0)
-- Dependencies: 226
-- Name: project_freelancer_project_freelancer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abdulfikihk
--

SELECT pg_catalog.setval('public.project_freelancer_project_freelancer_id_seq', 34, true);


--
-- TOC entry 2672 (class 0 OID 0)
-- Dependencies: 227
-- Name: project_freelancer_project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abdulfikihk
--

SELECT pg_catalog.setval('public.project_freelancer_project_id_seq', 1, false);


--
-- TOC entry 2673 (class 0 OID 0)
-- Dependencies: 223
-- Name: project_project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abdulfikihk
--

SELECT pg_catalog.setval('public.project_project_id_seq', 67, true);


--
-- TOC entry 2674 (class 0 OID 0)
-- Dependencies: 230
-- Name: report_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abdulfikihk
--

SELECT pg_catalog.setval('public.report_report_id_seq', 8, true);


--
-- TOC entry 2675 (class 0 OID 0)
-- Dependencies: 231
-- Name: report_reporter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abdulfikihk
--

SELECT pg_catalog.setval('public.report_reporter_id_seq', 1, false);


--
-- TOC entry 2676 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abdulfikihk
--

SELECT pg_catalog.setval('public.users_user_id_seq', 44, true);


--
-- TOC entry 2473 (class 2606 OID 319531)
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2471 (class 2606 OID 319519)
-- Name: freelancer_experience freelancer_experience_pkey; Type: CONSTRAINT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.freelancer_experience
    ADD CONSTRAINT freelancer_experience_pkey PRIMARY KEY (experience_id);


--
-- TOC entry 2469 (class 2606 OID 385026)
-- Name: freelancer freelancer_pkey; Type: CONSTRAINT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.freelancer
    ADD CONSTRAINT freelancer_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2477 (class 2606 OID 319561)
-- Name: project_freelancer project_freelancer_pkey; Type: CONSTRAINT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.project_freelancer
    ADD CONSTRAINT project_freelancer_pkey PRIMARY KEY (project_freelancer_id);


--
-- TOC entry 2475 (class 2606 OID 319545)
-- Name: project project_pkey; Type: CONSTRAINT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (project_id);


--
-- TOC entry 2479 (class 2606 OID 352272)
-- Name: report report_pkey; Type: CONSTRAINT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_pkey PRIMARY KEY (report_id);


--
-- TOC entry 2465 (class 2606 OID 327683)
-- Name: users unique_username; Type: CONSTRAINT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- TOC entry 2467 (class 2606 OID 319496)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2482 (class 2606 OID 319532)
-- Name: client client_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 2481 (class 2606 OID 385032)
-- Name: freelancer_experience freelancer_experience_freelancer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.freelancer_experience
    ADD CONSTRAINT freelancer_experience_freelancer_id_fkey FOREIGN KEY (freelancer_id) REFERENCES public.freelancer(user_id);


--
-- TOC entry 2480 (class 2606 OID 385027)
-- Name: freelancer freelancer_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.freelancer
    ADD CONSTRAINT freelancer_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 2483 (class 2606 OID 393217)
-- Name: project project_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(user_id);


--
-- TOC entry 2484 (class 2606 OID 401415)
-- Name: project_freelancer project_freelancer_freelancer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.project_freelancer
    ADD CONSTRAINT project_freelancer_freelancer_id_fkey FOREIGN KEY (freelancer_id) REFERENCES public.freelancer(user_id);


--
-- TOC entry 2485 (class 2606 OID 401410)
-- Name: project_freelancer project_freelancer_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.project_freelancer
    ADD CONSTRAINT project_freelancer_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.project(project_id);


--
-- TOC entry 2486 (class 2606 OID 417793)
-- Name: report report_reporter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abdulfikihk
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_reporter_id_fkey FOREIGN KEY (reporter_id) REFERENCES public.users(user_id);


-- Completed on 2023-06-11 22:13:08

--
-- PostgreSQL database dump complete
--

