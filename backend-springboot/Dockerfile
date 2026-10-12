FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Pre-packaged jar builder
RUN echo "Building Spring Boot Application..."

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
EXPOSE 8080
ENV SERVER_PORT=8080
CMD ["java", "-version"]
