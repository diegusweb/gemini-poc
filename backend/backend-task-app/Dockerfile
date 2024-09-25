# Usa una imagen de Maven para compilar el proyecto
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copia el archivo pom.xml y descarga las dependencias
COPY pom.xml ./
RUN mvn dependency:go-offline

# Copia el código fuente y compila la aplicación
COPY src ./src
RUN mvn clean package -DskipTests

# Usar una imagen base de Java
FROM openjdk:17-jdk-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo JAR generado a la imagen Docker
COPY --from=build /app/target/backend-task-app-0.0.1-SNAPSHOT.jar /app/backend-task-app-0.0.1-SNAPSHOT.jar
#COPY --from=build /app/target/backend-task-app.jar /app/backend-task-app.jar
# Exponer el puerto en el que la aplicación se ejecuta
EXPOSE 8080

# Comando para ejecutar la aplicación Spring Boot
ENTRYPOINT ["java", "-jar", "backend-task-app-0.0.1-SNAPSHOT.jar"]
