## This project is a work in progress (06/11/2023)

# Air Miles API

This project provides a REST API that enables users to unlock the potential of their accrued air miles/points.

The API interacts with a database that holds information regarding how many air miles/points are required to travel to all destinations served by British Airways from London, in multiple classes of travel.

The project is currently focussed on UK airlines, and support for Virgin Atlantic flights will be added once an MVP for the full project is complete (using British Airways' pricing data).

## Hosted API

The hosted API in its current form can be accessed [here](https://airmiles-api.onrender.com/api).

## Endpoints

### GET /api

- Serves up a list of all endpoints and their queries

### GET /api/destinations

- Serves up an array of all destination objects
  - Queries (example query: "/api/destinations?points_balance=30000&travel_class=business")
    - **points_balance** : Can be queried with integers. Will serve up destinations where an economy off-peak ticket costs less than the points balance queried.
    - **travel_class**: Can be queried with 'economy', 'p_economy' and 'business'. Returns destinations with fares available in queried class. Combine with a points_balance query to return destinations where points balance can afford a seat in queried class.
    - **limit**: Can be queried with integers. Limits amount of results served to the queried number - defaults to 20 results.
    - **page** - Can be queried with integers. Specifies page of results to return; default page size is 20 results, but this can be modified using limit query.

## Running the API locally

### Cloning the repository

The repository can be cloned via [GitHub](https://github.com/msmi1433/airmiles-api).

Once cloned on GitHub, run the following terminal commands in your desired directory:

- `git clone https://github.com/msmi1433/airmiles-api`
- `cd airmiles-api`
- `code .` (to open the directory in VSCode)

### Dependencies

The app has several dependencies that can be installed by executing `npm i` in the terminal (within the project's directory).

For details regarding what these dependencies are, please refer to the package.json file.

### Seeding the database

To seed the database locally, ensure that you have PostgreSQL installed and execute the following scripts in the terminal:

1. `npm run setup-dbs`
2. `npm run seed`

### Running the API

To host the API locally, execute the script `npm start`. This will host the API on Port 9090 by default. The port can be amended by changing line 2 in the `listen.js` file to your desired port.

Once the API is running, HTTP requests can be made using an API client such as [Insomnia](https://insomnia.rest/).

## Environment variables

You will need to create environment variables (.env) for the test and development databases in order to connect to them.

They should be formatted as:

- .env.development
- .env.test

Please contact me for guidance on how to set these files up if required.

## Minimum requirements

Please ensure that you are running the below versions or higher:

- Node: v20.3.1
- PSQL: v15.3

## Future

Once the API is complete, I will be building a frontend that allows users to enter the amount of air miles/points they have, and see a recommended list of places they can travel to using their points.

The frontend will also contain a chatbot that gives users tips on how to best secure reward/air miles seats with airlines, and an accounts feature that allows users to track their progress towards a points goal for a given trip.
