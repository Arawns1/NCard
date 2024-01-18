FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-17-jdk -y

COPY . .

ENV APP_PROFILE=prod

RUN apt-get install maven -y
RUN mvn clean install

FROM openjdk:17-jdk-slim

EXPOSE 8080

COPY --from=build /target/nekicard-api.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]