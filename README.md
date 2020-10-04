# FoodFinder
FoodFinder is an API helping the users to find their preferred food-truck options near by.

# Contributing
## Source control
`master` branch is protected to allow merges only via pull requests.  
When working on a new feature: 
1. branch off `master`
2. make required changes
3. add/update unit tests
4. run linter to ensure code quality
5. create PR into `master`
  
## Setup
**NOTE** VS Code is the preferred code editor, as it allows to make use of devcontainer. 
1. Open solution folder in VS Code
2. Select "Reopen in Devcontainer" popup in the right bottom corner
3. Ready for action!

## Local run
To run the solution locally, execute 
```sh
serverless offline
```
## Test endpoint
Postman:
```
GET http://localhost:7071/api/foodtrucks/nearest?lat=37.753080&long= -122.449102
```
Use curl to hit:
```
curl --request GET 'http://localhost:7071/api/foodtrucks/nearest?lat=37.753080&long=%20-122.449102'
```

## Linter
To run linter, execute 
```sh
npm run lint
```

## Unit tests
To run unit tests, execute
```sh
npm run test
```

# Assumptions
* API will be accessed by users in San Francisco only, so we don't need to worry about global availability.
* Endpoint is publicly available (as source data is publicly available).

# Decisions
**Use Azure Functions to build API endpoint**  
Getting the following out of the box:
* reliability
* scalability
* monitoring (with AppInsights enabled)
* flexible cost model

**Use serverless framework to build, configure and deploy**  
Simplifies build and deployment of serverless architectures  
(As a side note, previously I've used serverless to work with AWS lambdas, so this time wanted to try it with Azure Functions)

**Use devcontainer**
Streamline dev environment setup to simplify onboarding process for the project new comers. (also wanted to play with it)

**Use javascript built-in `sort()` method to sort foodtrucks by distance**  
Investigation showed that it uses quicksort algorithm behind the scenes.  
Additional testing against custom built quicksort function showed that javascript `sort()` performs better.  

# Further improvements
* Improve performance. Spike - implement BST in-order traversal.
* Currently we are calling actual data endpoint every time our API is called.  
Looking around the page with the source data, I found that it is updated on daily basis. In the future we could introduce some caching mechanism to avoid hitting the third party endpoint every time. 
This could also serve as a "backup plan" when the third party endpoint is unavailable.
* Configure https endpoint
* Configure additioanl monitoring and configure alerts for API issues.
* Finish setting up CI/CD  
  * Setup versioning
  * Setup branch policies
  * Add release gates
  * Consider multistage pipeline 
  * use of githooks for linting, testing and inspecting before pushing
* Enhance testing
  * Improve test coverage
  * Setup load, penetration, performance tests
* Consider configuring APIM:
  * centralized API management 
  * security 
  * manage consumption
  * test
  * backward compatibility 