# FoodFinder
FoodFinder is an API helping the users to find their preferred food options near by.

# Contributing
## Source control
`master` branch is protected to allow merges only via pull requests.  
When working on a new feature: 
1. branch off `master`
2. make required changes
3. add/update unit tests
4. run linter to ensure code quality
5. prepare PR into `master`

## Setup

## Code quality
To run linter, execute 
```sh
npm run lint
```

## Testing
To run unit tests, execute
```sh
npm test
```

# Assumptions

# Decisions
**Use Azure Functions to build API endpoint**  
Getting the following out of the box:
* reliability
* scalability
* monitoring (with AppInsights enabled)
* flexible cost model

**Use serverless framework to build, configure and deploy**  
Simplifies build and deployment of serverless architectures  
(As a side note, previously I've only used it to work with AWS lambdas, so this time wanted to try it with Azure Functions)

**Use javascript built-in `sort()` method to sort foodtrucks by distance**  
Investigation showed that it uses quicksort algorithm behind the scenes.  
Additional testing against custom built quicksort function showed that javascript `sort()` performs better.  

# Further improvements
* Currently we are calling actual data endpoint every time our API is called.  
Looking around the page with the source data, I found that it is updated on daily basis. In the future we could introduce some caching mechanism to avoid hitting the third party endpoint every time. 
This could also serve as a "backup plan" when the third party endpoint is unavailable.
* Configure monitoring to get alerts when there are issues with API.