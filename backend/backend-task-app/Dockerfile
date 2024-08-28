# Usar una imagen base de Java
FROM openjdk:17-jdk-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo JAR generado a la imagen Docker
COPY target/backend-task-app-0.0.1-SNAPSHOT.jar /app/backend-task-app-0.0.1-SNAPSHOT.jar

# Exponer el puerto en el que la aplicación se ejecuta
EXPOSE 8080

# Comando para ejecutar la aplicación Spring Boot
ENTRYPOINT ["java", "-jar", "backend-task-app-0.0.1-SNAPSHOT.jar"]
