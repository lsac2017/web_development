# syntax=docker/dockerfile:1

# ---- Build stage ----
# Use Java 21 to match pom.xml <java.version>21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Pre-copy dependencies to leverage Docker layer caching
COPY pom.xml .
RUN mvn -B -q -e -DskipTests dependency:go-offline

# Copy source and build
COPY src ./src
RUN mvn -B -q -DskipTests package

# ---- Runtime stage ----
# Use Java 21 runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Environment
ENV JAVA_OPTS="" \
    PORT=8080 \
    SPRING_PROFILES_ACTIVE=prod

# Copy the built jar
COPY --from=build /app/target/*.jar /app/app.jar

# Expose default port (Render sets PORT env var)
EXPOSE 8080

# Run the app; use the PORT provided by Render
CMD ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT} -jar /app/app.jar"]
