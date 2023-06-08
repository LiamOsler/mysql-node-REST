# Background
**Author:** Liam Osler
**Date:** 2023-06-08

This project is a RESTful API that allows users to create, read, update and delete (CRUD) data from a Purchase Order database.

## Quick Start:
Repository:
https://github.com/LiamOsler/postgres-express-REST.git

Replit deploy (includes documentation and GUI):
https://postgres-express-rest.liamo2.repl.co/


### Run Locally:

1. Clone the repository: 
    `git clone https://github.com/LiamOsler/postgres-express-REST.git`
2. Import the postgres database dump from `dump.sql` to your postgres database
3. Set the .env file to the correct database url and password
4. Install dependencies: 
   `npm install`
5. Start the server: `npm start`
6. Navigate to 
   [`http://localhost:4000`](http://localhost:4000)
7. Use the API and GUI to interact with the database with the base URL [`http://localhost:4000`](http://localhost:4000), e.g. [http://localhost:4000/parts](http://localhost:4000/parts)

.env file (if your database is on localhost and the password is postgres)
```
DATABASE_URL=localhost
DATABASE_PASSWORD=postgres
```

You can also change the db connection string in `database/db.js` to connect to your database.

```javascript

const dbPass = process.env.DB_PASS;
const dbUrl = process.env.DB_URL;

var db = pgp(`postgres://postgres:${dbPass}@${dbUrl}:5432/postgres`)
```

Modifying the port in `/bin/www` will allow you to change the port the server runs on.

```javascript
var port = normalizePort(process.env.PORT || '4000');
app.set('port', port);
```


### Run on Repl.it:

1. Navigate to [https://repl.it/github/liamo2/postgres-express-rest](https://repl.it/github/liamo2/postgres-express-rest)
2. Wait for the repl to start
3. Use the REPLIT webview URL as the base URL for the REST API (See examples with CURL below), or visit the index page to interact with the database using the database.


## Description:
Create a web application that allows users to create, read, update and delete (CRUD) data from a Purchase Order database.

Clients are able to 
- List parts
- Prepare a purchase order
- Submit a purchase order for a number of parts
- Query the status of a purchase order

Functionality:
- Lists parts for sale
  - Returns list of parts, including part number, description, etc
  - Excludes quantity on hand, etc
- Find information about a specific part given the part number
- List information about purchase orders
- Prepare a purchase order
    - User enters information about the purchase order, including part number, quantity, etc.
- Submit a purchase order by invocation of a method that takes the purchase order number as a parameter.

### Technical Inventory
* **Node.js**: A JavaScript runtime engine.
* **Express**: A web application framework for Node.js.
* **PostgreSQL**: An open-source relational database management system.


## API Endpoints

### Index:
#### path: '/', 
methods: [ 'GET' ]

**GET:** Returns the API documentation/GUI


### Clients:

#### path: '/clients'
methods: [ 'GET', 'POST' ]

**GET:** Returns a list of clients

```bash
curl --request GET \
  --url http://localhost:4000/clients
```

```bash
curl --request GET \
  --url https://postgres-express-rest.liamo2.repl.co/clients
```

**POST:**   Create a new client

POST body: 
|Key|Value|
|---|---|
|`client_name`   | text |
|`client_city` | text  |

client_id is automatically generated.

```bash
curl --request POST \
  --url http://localhost:4000/clients \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_name="John Doe"&client_city="New York"'
```

```bash
curl --request POST \
  --url https://postgres-express-rest.liamo2.repl.co/clients \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_name="John Doe"&client_city="New York"'
```


#### path: '/clients/id/:id',
methods: [ 'GET', 'PUT', 'DELETE' ]

**GET:** Returns a client given the client id

```bash
curl --request GET \
  --url http://localhost:4000/clients/id/1
```

```bash
curl --request GET \
  --url https://postgres-express-rest.liamo2.repl.co/clients/id/1
```


**PUT:** Update a client given the client id

PUT body:
|Key|Value|
|---|---|
|`client_id`   | int |
|`client_name`   | text |
|`client_city` | text  |

```bash
curl --request PUT \
  --url http://localhost:4000/clients/id/1 \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=1&client_name=John Doe&client_city=New York'
```

```bash
curl --request PUT \
  --url https://postgres-express-rest.liamo2.repl.co/clients/id/1 \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=1&client_name=John Doe&client_city=New York'
```


### Parts:

#### path: '/parts',
methods: [ 'GET', 'POST' ]

**GET:** Returns a list of parts

```bash
curl --request GET \
  --url http://localhost:4000/parts
```

```bash
curl --request GET \
  --url https://postgres-express-rest.liamo2.repl.co/parts
```

**POST:** Create a new part

POST body:
|Key|Value|
|---|---|
|`part_name`   | text |
|`part_description` | text  |
|`quantity_on_hand` | int  |

part_number is automatically generated and the new part or error is returned.

```bash
curl --request POST \
  --url http://localhost:4000/parts \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'part_name=Ryzen 3600x&part_description=Ryzen 5 Processor&quantity_on_hand=10'
```

```bash
curl --request POST \
  --url https://postgres-express-rest.liamo2.repl.co/parts \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'part_name=Ryzen 3600x&part_description=Ryzen 5 Processor&quantity_on_hand=10'
```

#### path: '/parts/number/:number'
methods: [ 'GET', 'PUT', 'DELETE' ]

**GET:** Returns a part given the part number

```bash
curl --request GET \
  --url http://localhost:4000/parts/number/1
```

```bash
curl --request GET \
  --url https://postgres-express-rest.liamo2.repl.co/parts/number/1
```

**PUT:** Update a part given the part number

PUT body:
|Key|Value|
|---|---|
|`part_number`   | int |
|`part_name`   | text |
|`part_description` | text  |
|`quantity_on_hand` | int  |

```bash
curl --request PUT \
  --url http://localhost:4000/parts/number/1 \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'part_number=1&part_name=Ryzen 3600x&part_description=Ryzen 5 Processor&quantity_on_hand=20'
```

```bash
curl --request PUT \
  --url https://postgres-express-rest.liamo2.repl.co/parts/number/1 \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'part_number=1&part_name=Ryzen 3600x&part_description=Ryzen 5 Processor&quantity_on_hand=20'
```


**DELETE:** Delete a part given the part number

### Purchase Orders:

#### path: '/pos',
methods: [ 'GET', 'POST' ]

**GET:** Returns a list of purchase orders

```bash
curl --request GET \
  --url http://localhost:4000/pos
```

```bash
curl --request GET \
  --url https://postgres-express-rest.liamo2.repl.co/pos
```

**POST:** Create a new purchase order

POST body:
|Key|Value|
|---|---|
|`client_id`   | int |
|`po_date` | date  |

po_number is automatically generated.

```bash
curl --request POST \
  --url http://localhost:4000/pos \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=1&po_date=2021-01-01'
```

```bash
curl --request POST \
  --url https://postgres-express-rest.liamo2.repl.co/pos \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=1&po_date=2021-01-01'
```

#### path: '/pos/number/:number',
methods: [ 'GET', 'PUT', 'DELETE' ],

**GET:** Returns a purchase order given the purchase order number

**PUT:** Update a purchase order given the purchase order number

PUT body:
|Key|Value|
|---|---|
|`po_number`   | int |
|`client_id`   | int |
|`po_date` | date  |

**DELETE:** Delete a purchase order given the purchase order number


#### path: '/pos/number/:number/report',
methods: [ 'GET' ],

**GET:** Returns a report of a purchase order given the purchase order number


### Purchase Order Lines:

#### path: '/pos/number/:number/lines',
methods: [ 'GET' ],

**GET:** Returns a list of purchase order lines given the purchase order number


#### path: '/lines',
methods: [ 'GET', 'POST' ],

**GET:** Returns a list of purchase order lines

**POST:** Create a new purchase order line

POST body:

|Key|Value|
|---|---|
|`po_number`   | int |
|`part_number`   | int |
|`quantity` | int  |
|`line_price` | numeric  |

line_number is automatically generated.


#### path: '/lines/number/:number',
methods: [ 'GET', 'DELETE' ],

**GET:** Returns a purchase order line given the purchase order line number

**DELETE:** Delete a purchase order line given the purchase order line number


path: '/lines/po/:poNumber',
methods: [ 'GET' ],

**GET:** Returns a list of purchase order lines given the purchase order number


## Defining the REST middleware:

Middleware is defined in `app.js`. The middleware is used to parse the request body and to set up the routes. The routes are defined in:
`routes/clients.js`.
`routes/parts.js` 
`routes/purchase_orders.js`.
`routes/lines.js`.

A simple example of a REST route is retrieving all of the data from the `parts925` table. This can be done by specifying the route and the query in `routes/parts.js`:
```js
var express = require('express');
var router = express.Router();

var db = require('../database/db');

/* GET all parts */
router.get('/', function(req, res, next) {
    db.any(`SELECT part_number, part_name, part_description FROM public.parts925`, [true])
        .then(function(data) {
            res.json(data);
        })
        .catch(function(error) {
            res.send(error);
        });
});

module.exports = router;
```

This file is referenced in `app.js`:
```js
var partsRouter = require('./routes/parts');

app.use('/parts', partsRouter);
```

This loads the data from the `parts925` table and displays it in JSON format at the `/parts` route.

So, if you are to visit the base URL of the project (by default runs on port 4000), you will see the data from the `parts925` table displayed in JSON format:

[http://localhost:4000/parts](http://localhost:4000/parts)

[https://postgres-express-rest.liamo2.repl.co/parts](https://postgres-express-rest.liamo2.repl.co/parts)

Say for instance you wanted to retrieve the data from the `parts925` table where the `id` is equal to 1. You can do this by specifying the route and the query in `routes/parts.js`:
```js
/* GET parts by part number */
router.get('/number/:number', function(req, res, next) {
    var partNumber = req.params.number;

    db.any(`SELECT part_name, part_number, part_number_cpu, part_description FROM public.parts925 WHERE "part_number" = $1 `, [partNumber])
        .then(function(data) {
            res.json(data);
        })
        .catch(function(error) {
            res.status(500);
            res.send(error);
        });
});
```

`/number/:number` corresponds to the route `parts/number/` followed by a part number. So, if you are to visit the following URL, you will see the data from the `Parts925` table where the `part_number` is equal to the part number specified in the URL:

[http://localhost:4000/parts/number/1](http://localhost:4000/parts/number/1)

[https://postgres-express-rest.liamo2.repl.co/parts/number/1](https://postgres-express-rest.liamo2.repl.co/parts/number/1)

This will provide a JSON response with the data from the `Parts925` table where the `part_number` is equal to 1:

```json
[
    {
        "part_name": "Ryzen 3600x",
        "part_number": 1,
        "part_description": "Ryzen 5 Processors"
    }
]
```

### Creating a new part:

To create a new part, you will need to create a new route in `routes/parts.js`. This route will be a POST request to the `/` route. This route will accept the following parameters:

| Key | Value |
| --- | --- |
| `part_name` | string |
| `part_description` | string |
| `quantity_on_hand` | integer |

```js
router.post('/', function(req, res, next) {
    var partName = req.body.part_name;
    var partDescription = req.body.part_description;
    var quantityOnHand = req.body.quantity_on_hand;

    console.log(partName, partDescription, quantityOnHand);

    db.any(`
        INSERT INTO public.parts925
            (created_at, part_name, part_description, quantity_on_hand)
        VALUES(now(), $1, $2, $3);
        `, [partName, partDescription, quantityOnHand])
        .then(function(data) {
            console.log(data);
            res.json(data);
        })
        .catch(function(error) {
            console.log(error);
            res.send(error);
        });
});
```

### Updating a part:

To update a part, you will need to create a new route in `routes/parts.js`. This route will be a PUT request to the `/parts/number` route.

Example: submit a **PUT** request to `/parts/number/1` with the following parameters:
|  Key | Value  |
|---|---|
|  part_name | text |
|  part_description | text |
|  quantity_on_hand | int |

```bash
curl --location --request PUT 'http://localhost:4000/parts/number/1' \

```


```js
router.put('/number/:number', function(req, res, next) {
    var partNumber = req.params.number;
    var partName = req.body.part_name;
    var partDescription = req.body.part_description;
    var quantityOnHand = req.body.quantity_on_hand;

    db.any(`
        UPDATE public.parts925
        SET part_name=$2, part_description=$3, quantity_on_hand=$4
        WHERE part_number=$1;
    `, [partNumber, partName, partDescription, quantityOnHand])
    .then(function(data) {
        res.json(data);
    })
    .catch(function(error) {
        res.status(500);
        res.send(error);
    });
});
```

This can be called from the front-end using the following code:

```js
var getParts = document.getElementById('get-parts');
getParts.addEventListener('submit', function(e) {
  e.preventDefault();

  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/parts/', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
        alert('Parts Found:' + xhr.responseText);
    } else {
        alert('Error: ' + xhr.responseText);
    }
  };
  xhr.send();
});
```
Which references a form in the HTML called `get-parts`:
```html
<form id = "get-parts">
    <h2>Get all parts:</h2>
    <input type="submit" value="Get">
</form>
```

You could also call this route using curl from the command line:

```bash
curl --request GET \
  --url http://localhost:4000/parts
```

```bash
curl --request GET \
  --url https://postgres-express-rest.liamo2.repl.co/parts
```

### Retrieving a purchase order:

```js
/* GET parts by part number */
router.get('/number/:number', function(req, res, next) {
    var partNumber = req.params.number;

    db.any(`
        SELECT * 
        FROM public.pos925 
        WHERE "po_number" = $1
        `, [partNumber])
        .then(function(data) {
            res.json(data);
        })
        .catch(function(error) {
            res.status(500);
            res.send(error);
        });
});
```

Deleting a part:

```js
router.delete('/number/:number', function(req, res, next) {
    var partNumber = req.params.number;

    db.any(`
        DELETE FROM public.parts925
        WHERE part_number=$1;
    `, [partNumber])
    .then(function(data) {
        res.json(data);
    })
    .catch(function(error) {
        res.status(500);
        res.json(error);
    }); 
});
```

Deleting a purchase order:

```js
router.delete('/number/:number', function(req, res, next) {
    var poNumber = req.params.number;
    
    db.any(`
        DELETE FROM public.pos925
        WHERE po_number=$1;
        `, [poNumber])
        .then(function(data) {
            res.json(data);
        })
        .catch(function(error) {
            res.status(500);
            res.json(error);
        }
    );
});
```

### Generating a purchase order:
On the server, a function called purchaseorder is defined using the following code:

```sql

```



### Deployment:

#### Github

For ease of integration with Repl.it, I am mirroring the application on Github. You can view the public repository [here](https://github.com/LiamOsler/postgres-express-REST)

#### Repl.it

For ease of access, I have deployed the application on the online IDE/deployment platform Repl.it. You can view the application [here](https://postgres-express-rest.liamo2.repl.co/) and you can view the IDE with the code [here](https://replit.com/@LiamO2/postgres-express-REST). Note, if the application is not dormant, it may take a second to start running.

# References

Net Ninja Express Tutorials:
https://www.youtube.com/watch?v=yXEesONd_54

