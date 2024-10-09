# Serverless

Este repositorio contiene los archivos de una función aws lambda que recibe información de una compra y genera una boleta que es almacenada en un bucket S3 con el nombre "receipts-123456879". 

Para deployar este servicio se debe tener ```serverless``` version <= 3.38.0 instalada, ya que la última versión (4.0 o superior) al momento de esta documentación no funciona sin la necesidad de una cuenta del servicio.

Para instalar serverless:

```
npm install -g serverless@3.38.0
```

Luego se genera el servicio


```
serverless create -n receipt-lambda -t aws-nodejs
```

Se crearán los siguientes archivos:
- ```serverless.yml``` Que contiene la configuración del servicio. En este archivo se declaró que se creará un *bucket S3* para almacenar los archivos generados.
- ```handler.js``` Que contiene la función que será llamada.

Además, se ejecutó:

```
npm init -y
npm install aws-sdk
npm install pdfkit
```

Para agregar los paquetes que serán utilizados en la función.

Para hacer deploy primero se tiene que configurar las credenciales de aws:
```
serverless config credentials --provider aws --key {ACCES_KEY} --secret {SECRET_KEY} --overwrite
```
Y luego simplemente se ejecuta:
```
serverless deploy
```

Luego se configuraron las políticas del bucket y el endpoint que actúa como gatillo de la función lambda desde la api-gateway.

