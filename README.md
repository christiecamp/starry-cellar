<p align="center">
<img src="./aurora-lights/branding/header.png"/>
</p>

[![License: mit](https://img.shields.io/badge/license-mit-lightblue?)](https://opensource.org/licenses/MIT)
[![Node.js Badge](https://img.shields.io/badge/node-blue?logo=nodedotjs&logoColor=fff&style=flat)](https://nodejs.org/en)
[![MySql Badge](https://img.shields.io/badge/mysql-blue.svg?&logo=Mysql&logoColor=white)](https://www.mysql.com)
[![Express.js Badge](https://img.shields.io/badge/express-lightgreen.svg?&logo=Express&logoColor=white)](https://expressjs.com/)
[![Sequelize Badge](https://img.shields.io/badge/sequelize-darkgreen.svg?&logo=Sequelize&logoColor=white)](https://canva.com)

[![Dotenv Badge](https://img.shields.io/badge/dotenv-lightgrey.svg?&logo=Dotenv&logoColor=white)](https://canva.com)
[![Nodemon Badge](https://img.shields.io/badge/nodemon-lightgrey.svg?&logo=Nodemon&logoColor=white)](https://www.npmjs.com/package/nodemon)
[![Insomnia Badge](https://img.shields.io/badge/insomnia-grey.svg?&logo=Insomnia&logoColor=white)](https://canva.com/) 
[![Canva Badge](https://img.shields.io/badge/canva-lavender.svg?&logo=Canva&logoColor=white)](https://canva.com/) 

[![View Badge](https://img.shields.io/badge/view-darkmode-black.svg?&logo=Github&logoColor=white)](https://canva.com/) 


### ![table-of-contents](./aurora-lights/branding/toc.png)

  - [OVERVIEW](#overview)
    - [*user story*](#user-story)
    - [*acceptance criteria*](#acceptance-criteria)
    - [*aurora borea-list*](#borea-list)
  - [INSTALLATION](#installation)
  - [USAGE](#usage)
    - [*screenshot*](#screenshot)
    - [*demo*](#demo)
  - [TESTING](#testing)
  - [SOURCES](#sources)
  - [LICENSE](#license)
  - [LINKS](#links)
  - [CONNECT](#connect)

  ### ![overview](./aurora-lights/branding/1.png)

`STARRY CELLAR STUFF` is an e-commerce site that utilizes an [Express.js](https://expressjs.com/) RESTful API which uses [Sequelize](https://www.npmjs.com/package/sequelize) ORM to handle data storage and retriveal.
* [MySQL2](https://www.npmjs.com/package/mysql2) and [Sequelize](https://www.npmjs.com/package/sequelize) packages to connect `STARRY CELLAR STUFF's` Express RESTful API to a MySQL *database*.
* [dotenv](https://www.npmjs.com/package/dotenv) package to use environment variables to store sensitive data.

### ![user-story](./aurora-lights/branding/9.png)
<p align="center">
  <img src="./aurora-lights/branding/user-story.png"/>
</p>

### ![acceptance-criteria](./aurora-lights/branding/10.png)
<p align="center">
  <img src="./aurora-lights/branding/ac.png"/>
</p>

### ![borea-list](./aurora-lights/branding/11.png)
<p align="center">
  <img src="./aurora-lights/branding/borea-list.png"/>
</p>

#

### ![installation](./aurora-lights/branding/2.png)

The application is invoked using the following commands:

##### *Clone the repository in your local development enviornment.*

```
git clone https://github.com/christiecamp/starry-cellar.git
```
##### **Update *.env* with your information**

##### *Navigate to the command line and input:*

```javascript
npm i :: express, mysql2, dotenv --save, sequelize, -g nodemon --save-dev,
```
```javascript
mysql -u root -p
```
```mysql
SOURCE lib/db/schema.sql;
quit
```
```javascript
npm run seed
```
```javascript
nodemon server
```

### ![usage](./aurora-lights/branding/3.png)

**INSTRUCTIONS:**

1. Open the Integrated Terminal and follow the [installation](#installation) guidelines

2. Interact with STARRY CELLAR STUFF's back end with [Insomnia](https://www.npmjs.com/package/inquirer/v/8.2.4) by testing the below:
      * GET all categories, products, tags
      * GET category, product, tag by id
      * CREATE category, product, tag
      * UPDATE category, product, tag
      * DELETE category, product, tag

      ##### view [demo videos](#demo) and [testing](#testing) 


### ![screenshot](./aurora-lights/branding/12.png)
        
        
##### *Screenshot demonstrates testing with Insomnia*

<p align="center">
<img src="./aurora-lights/demos/ss.png"/>
</p>


### ![demo](./aurora-lights/branding/13.png)

##### **categories**

<p align="left">
<img src="./aurora-lights/demos/categories.gif"/>
</p>

##### **products**

<p align="left">
<img src="./aurora-lights/demos/products.gif"/>
</p>


##### **tags**

<p align="left">
<img src="./aurora-lights/demos/tags.gif"/>
</p>


<!-- ![demo](./aurora-lights/demos/demo.gif) -->

### ![testing](./aurora-lights/branding/8.png)

**TESTING WITH INSOMNIA:**

There are different tools available that can test reading/writing operations in a web browser - in this application we use [Insomnia](https://insomnia.rest/), a *REST client* that makes it easy to send **HTTP requests** to an API and view response details. 

1. After installing Insomnia, open a new document.

2. Interact with `STARRY CELLAR STUFF's` back end  by testing the below commands:

##### **GET** all categories, products, tags
```json
http://localhost:3013/api/categories
```
```json
http://localhost:3013/api/tags
```
```json
http://localhost:3013/api/products
```


##### **GET** category by *id*
```json
http://localhost:3013/api/categories/1
```

##### **CREATE** product
```json
http://localhost:3013/api/products/
```
```json
{
	"product_name": "",
	"price": 1.00,
	"stock": 1,
	"tag_id": [1, 2, 3]
}
```

##### **UPDATE** tag
```json
http://localhost:3013/api/tags/6
```
```json
{
  "tag_name": ""
}
```
##### **DELETE** category
```json
http://localhost:3013/api/categories/8
```


### ![sources](./aurora-lights/branding/4.png)

Here's a list of technologies used:

1. [Node.js](https://nodejs.org/en) - is an open-source, cross-platform JavaScript runtime environment.

2. [Express.js]((https://expressjs.com)) - a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

3. [MySQL2](https://www.npmjs.com/package/mysql2) - MySQL is a relational database management system based on SQL – Structured Query Language.

4. [Dotenv](https://www.npmjs.com/package/dotenv) - a zero-dependency module that loads environment variables from a .env file into `process.env`.

5. [Sequelize](https://sequelize.org/) - a Node.js based `Object Relational Mapper` that makes it easy to work with **MySQL databases**. An *Object Relational Mapper* performs functions like handling database records by representing the data as objects.

6. [Nodemon](https://www.npmjs.com/package/nodemon) - a Node.js tool that helps develop applications by automatically restarting the node application when file changes in the directory are detected.

7. [Insomnia](https://insomnia.rest/) - an open source desktop application that assists in designing, debugging, and testing APIs (specifically in this instance, HTTP-based RESTful APIs).


### ![license](./aurora-lights/branding/5.png)

##### [mit license](./LICENSE)


### ![links](./aurora-lights/branding/6.png)

##### [*github repo*](https://github.com/christiecamp/starry-cellar)

##### **video demos**:
  * ##### [*full walkthrough*](https://drive.google.com/file/d/1g4kHC71UIPWrqOLdvLXGxl3Hohcrk7Vx/view)

  * ##### [*categories*](https://drive.google.com/file/d/1HW-IlwHodN4TjmZKsEg3YV_62NnA-n8R/view)

  * ##### [*products*](https://drive.google.com/file/d/1H2kOvExLJXJf2mxxH1CXzl1H49B9S1CJ/view) 

  * ##### [*tags*](https://drive.google.com/file/d/1O_VBx2V3qEoQv9pL0cAXOqN_yIqCZX2E/view)

### ![connect](./aurora-lights/branding/7.png)

[![Github Badge](https://img.shields.io/badge/christiecamp-purple.svg?&logo=Github&logoColor=white)](https://github.com/christiecamp/bear-taker)

<a href="mailto:christiecamphoto@gmail.com">
<img src="https://img.shields.io/badge/gmail-lightblue.svg?&logo=Gmail&logoColor=white" />
</a>

<p align="center">
<a href="https://www.christiecamp.com"><img height= 200px src ="./aurora-lights/branding/starry-globe.png"></a>
</p>
