# Stage 1: Build the application
FROM eclipse-temurin:21-jdk-jammy AS build

# 1. Set working directory to your backend folder
WORKDIR /app/taskmanagement

# 2. Copy the Maven wrapper and pom.xml first to leverage Docker caching
COPY taskmanagement/.mvn/ .mvn
COPY taskmanagement/mvnw taskmanagement/pom.xml ./

# 3. Fix line endings and permissions for the Maven wrapper (crucial for Windows users)
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw

# 4. Copy the source code and build the application
COPY taskmanagement/src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Create the final lightweight runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# 5. Copy the jar from the correct build path
COPY --from=build /app/taskmanagement/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
