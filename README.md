# ACCOUNT BOT
Este servicio te permite controlar tus movimientos financieros utilizando un bot de telegram.
Stack: Firebase + Google Sheets + Botfather + Node JS

## Configuración
* Crear proyecto en firebase, cambiar a plan **Blaze** para poder realizar deploy al servicio de functions (Se solicita ingresar informacion de TDC pero para el tamaño y uso de proyecto no se realizaran cobros adicionales ya que ofrecen algunos servicios gratuitos hasta sobrepasar unos limites definidos, puedes saber mas sobre estos limites en el modulo de **Uso y Facturacion** de la configuración del proyecto de firebase)
* Se debe utilizar la misma cuenta para firebase y google sheets
* Activar el API en Google Sheets en el proyecto de firebase creado
* Crear cuenta de servicio en la consola de Google Developers https://console.cloud.google.com/apis/dashboard dentro la aplicacion de firebase creada

## Conexion Webhook a URL de aplicacion
Para activar a conexion se deben reemplazar los valores y realizar una peticion GET
https://api.telegram.org/bot{TOKEN_BOT}/setWebHook?url={BACKEND_URL}/

## Verificar conexion
El resultado de esta peticion te informara si la URL brindada con atenrioridad se agrego correctamente
https://api.telegram.org/bot{TOKEN_BOT}/getWebhookInfo

## Configuracion cuenta de servicio
https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account

## Importante
Compartir Hoja de calculo con cuenta de servicio
https://theoephraim.github.io/node-google-spreadsheet/#/
Autenticacion Google Sheets

# Creditos
https://telegrafjs.org


