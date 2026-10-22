# syntax=docker/dockerfile:1
FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /workspace
RUN apk add --no-cache bash

COPY hok-wiki-backend/gradlew hok-wiki-backend/build.gradle hok-wiki-backend/settings.gradle ./
COPY hok-wiki-backend/gradle ./gradle
RUN sed -i 's/\r$//' gradlew

COPY hok-wiki-backend/src ./src
RUN --mount=type=cache,target=/root/.gradle \
    bash ./gradlew --no-daemon bootJar -x test

FROM eclipse-temurin:21-jre-alpine AS runtime

RUN addgroup -S app && adduser -S app -G app
WORKDIR /app

COPY --from=build --chown=app:app /workspace/build/libs/*.jar ./app.jar

ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75.0"
USER app
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
