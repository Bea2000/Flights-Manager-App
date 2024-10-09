# IIC2173 Arquitectura de Sistemas de Software: E1

Estudiantes:

* Beatriz Errázuriz
* Daniel Sebastián
* Diego Sfeir
* Joaquín Viñuela

## Instrucciones para Ejecutar Localmente

Para ejecutar localmente el proyecto, se debe tener sistema operativo Linux o MacOS, con Node.js y Postgresql instalados. Luego, se debe clonar el repositorio del proyecto y abrir una consola en el directorio de la API y otra en el directorio del Broker. En cada consola se debe ejecutar el comando `npm install` para actualizar las dependencias de cada una de las partes del proyecto. En el directorio de la API, se debe crear un archivo `.env` con las siguientes variables de entorno:

```[.env]
AUTH0_ISSUER_URL=https://dev-lqyab7kegcbrfeto.us.auth0.com

API_PORT=5000

MQTT_HOST=broker.iic2173.org
MQTT_PORT=9000
MQTT_USERNAME=students
MQTT_PASSWORD=iic2173-2024-1-students
MQTT_CHANNEL=flights

WEBPAY_PLUS_COMMERCIAL_CODE=597055555532
TRANSBANK_API_KEY_SECRET=579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C
TRANSBANK_BASE_URL=https://webpay3gint.transbank.cl

REDIS_URL=http://{producer_host}:8000
```

Donde {producer_host} debe ser reemplazado por el host del Worker

En la base del directorio se debe agregar el siguiente `.env`

```[.env]
DATABASE_USER={user}
DATABASE_PASSWORD={password}
DATABASE_PORT=5432
DATABASE_NAME={db_name}
DATABASE_HOST=db

CELERY_BROKER_URL=redis://redis-broker:6379/0
CELERY_RESULT_BACKEND=redis://redis-broker:6379/0
REDIS_PORT=8000
FLOWER_PORT=5555

API_PORT=5000
```

donde `{user}` y `{password}` son las credenciales de acceso a la base de datos, y `{db_name}` es el nombre de la base de datos. A continuación, se debe crear un usuario de postgres con el nombre de usuario y contraseña especificados, el cual a su vez debe tener una base de datos creada con el nombre especificado en el archivo `.env`.
Para ejecutar el proyecto se debe asegurar que Postgres se esté corriendo. Para ejecutar Postgres se puede usar el comando `sudo service postgresql start`. Luego, en la consola de la API se debe ejecutar el comando `npm run start:dev` para correr la API en modo desarrollo. Al hacerlo, se migrará la base de datos de manera automática, creando las tablas necearias para ejecutar el proyecto. A menos que se especifique en el archivo `.env`, la API correrá en el puerto 3000, de modo que si se quiere correr la API con el frontend al mismo tiempo, se debe asegurar la consistencia entre los puertos de front y back, y los archivos `.env` correspondientes.

En el directorio del Broker, se debe crear un archivo `.env` con las siguientes variables de entorno:

```[.env]
HOST=broker.iic2173.org
PORT=9000
USERNAME=students
PASSWORD=iic2173-2024-1-students
API_URL=http://{api_host}:5000
```

Donde el {api_host} debe corresponder al host de la API.
Para ejecutar el broker, se debe usar el comando `npm run dev`. Si la API no está corriendo cuando se escucha algún mensaje de parte del broker, el broker informará un error a la hora de tratar de redirigir la información a la API.

## Pipeline CI

Se implementó un *pipeline* de CI muy simple para esta entrega, el cual fue desarrollado con Github Actions y ejecuta un chequeo de estilo de código con ESLint. El archivo de configuración del *pipeline* se encuentra en `.github/workflows/main.yml`.

## Diagrama UML

El diagrama UML de componentes de la aplicación se encuentra en el archivo `UML-E1.jpg`. En este se puede observar que se tomó como punto de partida el diagrama de la E0 y se agregaron los nuevos componentes. Estos son el *bucket* S3 de AWS, el servicio de autenticación y la API Gateway. El diagrama está estructurado de manera que el usuario solamente interactúa con el frontend alojado en la instancia S3 de AWS, a partir de la cual debe consumir los servicios de la API mediante la API Gateway, pero asegurando tener una conexión válida, la cual realiza mediante el servicio externo de Auth0, el cual a su vez debe validar los tokens con la API Gateway, la cual comprueba si el token es válido.