# ng-ui-composition
A sample ng implementation of [client-side UI composition](http://microservices.io/patterns/ui/client-side-ui-composition.html).

## Monolithic frontend
It's quite common when people talking microservices, they just talking about services only. A common microservices architecture many be discrete API services + a gateway + a monolithic frontend. This is not ideal - "[With a monolithic frontend you never get the flexibility to scale across teams as promised by microservices.](http://blog.xebia.com/the-monolithic-frontend-in-the-microservices-architecture/)".

## Dashboard page
A dashboard can provide users a comprehensive overview of the entities they are working on. For example, in the Customer Care solution, the dashboard show different pieces of information from different services. 

## build
# build client
```
npm run gulp
```
# build client-proxy
```
cd client-proxy
mvnw clean install
```
# build dockers
```
docker compose
```