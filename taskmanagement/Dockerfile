# Stage 1: Build the application
FROM eclipse-temurin:21-jdk-jammy AS build

# 1. Simplify the working directory
WORKDIR /app

# 2. Copy the Maven wrapper and pom.xml 
# (Since Root Directory is 'taskmanagement', these are in the current context)
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# 3. Fix line endings and permissions
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw

# 4. Copy the source code and build
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Create the runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# 5. Copy the jar from the build stage
# Note the path change here to match Stage 1's WORKDIR
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
