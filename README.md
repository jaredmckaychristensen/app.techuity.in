# app.techuity.in
## Introduction
This project is a web portal for Founders to pitch their business/idea in search of a technical co-founder (i.e. CTO - Techuity Investor) and potential seed capital.  This portal is intended to simplify and streamline the screening Pitch screening process to efficiently refine the accuracy and scope of data collected by Techuity regarding the Founder's Pitch.


## Glossary / Key Terminology
* **Founder**: The user who would find or be directed to the Techuity app in order to submit their business idea (“pitch”) for review.  These may be entrepreneurs, somebody passionate about an idea, and inventor of a technology, or an existing business looking to start up a new venture.
* **TI**: The TI (Techuity Investor) is the Techuity representative who has access to review business ideas (“pitches”) / applications that have been submitted.  _A.K.A_: CTO (Chief Technology Officer).
* **TI Admin**: The TI Admin is a user who has extra administrative abilities such as defining new screening questions and administrative control over system objects, such as the ability to create / update / remove documents / business ideas (“pitches”) etc.
* **Pitch**: a pitch represents a business idea or plan that has been submitted by a Founder to be reviewed.
* **MVP**: See "Minimum viable product"
* **Minimum Viable Product**: When Techuity engages with a Founder, this is most frequently with the purpose of building a Minimum Viable Product.  This is a project that represents the desired technology / idea well enough that it can begin supporting a customer or end-user in a production (live) environment.  It intentionally elimintes any miscellaneous or added features / requirements that are not required for securing the first round of early-adopting customers.  See also https://en.wikipedia.org/wiki/Minimum_viable_product
* **Early-Adopters**: Users who adopt a technology (MVP) first, or early in the technology's development.  These users are typically anxious to find a solution to their problem and are willing to deal with bugs / issues that are common in early-stage technologies.

## Setting up a Development Environment
These instructions are specific to a Linux environment, as this project uses a standard LAMP (Linux, Apache2, MySQL5, PHP5) technology stack.
1. Install Composer using the [instructions found here](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)
2. Install Laravel 5 using the [instructions found here](http://laravel.com/docs/5.0)
2. Clone the repositoy from GitHub:  `git clone https://github.com/StrettoConsulting/app.techuity.in.git`
3. Within the cloned repository directory, update all package files: `/path/to/composer.phar update`
4. Create an environment file for your repository (these files should NEVER be checked in) by copying the example file: `cp .env.example .env`
5. Create an application key (for security): `php artisan key:generate`

## Code Structure
This site was built using the [Laravel 5 framework](http://laravel.com/docs/5.0).  Please review the online documentation for information on how to develop/maintain this site, as all necessary documentation may be found online.

### Changing Front-end Files
As standard with Laravel 5 applications, all view files are stored in the `resources/views` directory.  All front-end content should be contained in these files.  If layout/structural changes are required, be sure to read the documentation on the Blade templating engine used by Laravel.  Layouts are found in the `resources/layouts` directory and commonly included segments of front-end code can be found in `resources/includes`.

#### Javascript / CSS / Media
All JS/CSS or media files are contained directly in the `public` directory.  This directory is where the web server should point to as all other files should reside outside of the web space.

## Database / Data
Review the Laravel documentation on database migrations and database seeding, as all Laravel best-practices have been followed for this site.  Migrations can be found in `database/migrations` while seed files/scripts are found in `database/seeds`.  Database credentials are stored in the `.env` file at the root of the application.

## Models / Controllers / Requests
All models can be found in `app/Models` and controllers are stored in `app/Http/Controllers`.  Some custom "request" files can be found in `app/Http/Requests`, which handle some basic authentication and validation for several controller methods.

## Routing
All routing may be found in `app/Http/routes.php` and most routes are defined as resources to manipulate models (e.g. centers, resources, users, categories, etc).

## Configuration
Custom configurations should be made in the `.env` file which may not be checked into the repository.  For an example file, see `.env.example`.  If deploying a new site, be sure to generate a new `APP_KEY` for the `.env` file.
