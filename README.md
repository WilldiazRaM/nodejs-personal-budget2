# Aplicación de Envelopes

Esta aplicación es un servidor RESTful que maneja sobres (envelopes) con presupuestos asignados. Permite realizar las siguientes operaciones:

- Crear nuevos sobres.
- Obtener la lista de todos los sobres.
- Actualizar un sobre específico.
- Eliminar un sobre específico.
- Transferir presupuesto de un sobre a otro.

## Uso de la aplicación

### Rutas disponibles

1. **Crear un nuevo sobre** (`POST /envelopes`):
    - Crea un nuevo sobre con los datos proporcionados en el cuerpo de la solicitud.
    - El cuerpo debe contener un objeto JSON con la siguiente estructura:

    ```json
    {
        "name": "Nombre del sobre",
        "amount": Cantidad asignada
    }
    ```

2. **Obtener la lista de todos los sobres** (`GET /envelopes`):
    - Retorna un arreglo con todos los sobres existentes.

3. **Actualizar un sobre específico** (`PUT /envelopes/:name`):
    - Actualiza los datos de un sobre específico. `:name` representa el nombre del sobre a actualizar.
    - El cuerpo debe contener un objeto JSON con los campos que deseas actualizar:

    ```json
    {
        "name": "Nuevo nombre del sobre (opcional)",
        "amount": Nueva cantidad asignada (opcional)
    }
    ```

4. **Eliminar un sobre específico** (`DELETE /envelopes/:name`):
    - Elimina un sobre específico por su nombre (`:name`).

5. **Transferir presupuesto de un sobre a otro** (`POST /envelopes/transfer/:from/:to`):
    - Transfiere presupuesto de un sobre (`:from`) a otro (`:to`).
    - El cuerpo de la solicitud debe contener un objeto JSON con la cantidad a transferir:

    ```json
    {
        "amount": Cantidad a transferir
    }
    ```

### Ejemplos de solicitudes

Puedes realizar estas solicitudes utilizando herramientas como [Postman](https://www.postman.com/), CURL, u otras.

- **Crear un nuevo sobre**:
    - URL: `POST /envelopes`
    - Ejemplo de cuerpo JSON:
    ```json
    {
        "name": "Salud",
        "amount": 5000
    }
    ```

- **Obtener la lista de todos los sobres**:
    - URL: `GET /envelopes`
    - No requiere un cuerpo JSON.

- **Actualizar un sobre específico**:
    - URL: `PUT /envelopes/Salud`
    - Ejemplo de cuerpo JSON:
    ```json
    {
        "amount": 6000
    }
    ```

- **Eliminar un sobre específico**:
    - URL: `DELETE /envelopes/Salud`
    - No requiere un cuerpo JSON.

- **Transferir presupuesto de un sobre a otro**:
    - URL: `POST /envelopes/transfer/Alimentacion/Transporte`
    - Ejemplo de cuerpo JSON:
    ```json
    {
        "amount": 500
    }
    ```

Espero que esta documentación te ayude a comprender cómo usar la aplicación de sobres con presupuestos.
