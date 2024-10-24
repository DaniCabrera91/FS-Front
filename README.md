# Kutxabank Crews 2024 WebAPP

**Kutxabank Crews 2024** is a mobile banking application that offers a robust solution for debt management, with an emphasis on providing useful tools to help users manage their debt efficiently. The platform stands out for its focus on **security**, **scalability**, and a **smooth, agile user experience**.

The app is integrated within the Kutxabank app, optimized for mobile devices, and uses a **Single Page Application** (SPA) architecture to deliver fast and efficient navigation.

### Technologies

- **Backend:** Node.js, Express, MongoDB, JWT, Bcrypt
- **Frontend:** React, Redux, Ant Design, Axios, Sass, TailwindCSS

#

**Kutxabank Crews 2024** es una aplicación de banca móvil diseñada para facilitar la gestión de la deuda, proporcionando herramientas útiles para que los usuarios administren sus finanzas de manera eficiente. La plataforma destaca por su enfoque en **seguridad**, **escalabilidad**, y una **experiencia de usuario fluida y ágil**.

La aplicación está integrada dentro de la app principal de Kutxabank, optimizada para dispositivos móviles, utilizando una arquitectura **SPA** (Single Page Application) que garantiza una navegación rápida y eficiente.

### Tecnologías

- **Backend:** Node.js, Express, MongoDB, JWT, Bcrypt
- **Frontend:** React, Redux, Ant Design, Axios, Sass, TailwindCSS

## Índice

1. [Variables de Entorno](#variables-de-entorno)
2. [Capturas de Pantalla](#screenshots)
3. [Frontend](#3-frontend)
   - [Arquitectura](#31-arquitectura)
   - [Redux](#32-redux)
   - [Autenticación y Sesiones](#33-autenticación-y-sesiones)
   - [Usabilidad y Validación](#34-usabilidad-y-validación)
   - [Estilos](#35-estilos)
4. [Backend](#4-backend)
   - [Arquitectura General](#41-arquitectura-general)
   - [Seguridad y Autenticación](#42-seguridad-y-autenticación)
   - [Manejo de Errores](#43-manejo-de-errores)
   - [Modelos de Datos](#44-modelos-de-datos)
   - [Controladores](#45-controladores)
5. [Autores](#autores)

## Variables de Entorno

Para ejecutar este proyecto, será necesario añadir las siguientes variables de entorno a un archivo `.env`:

- `REACT_APP_PORT`
- `REACT_APP_MONGO_URI`
- `REACT_APP_JWT_SECRET`
- `REACT_APP_MONGO_USER`
- `REACT_APP_MONGO_PASSWORD`
- `REACT_APP_MONGO_DATABASE`

## Capturas de Pantalla

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## 3. Frontend

### 3.1 Arquitectura

- **React:** Componentes reutilizables para una interfaz de usuario flexible y dinámica.
- **Redux:** Manejo global del estado para gestionar usuarios y transacciones.
- **Ant Design:** Conjunto de componentes UI para mantener un diseño visual uniforme.
- **Axios:** Librería para realizar peticiones HTTP al backend.

### 3.2 Redux

- **Slices (admin, user, trans):** Reducers y acciones para gestionar autenticación, usuarios y transacciones.

### 3.3 Autenticación y Sesiones

- **JWT:** Tokens almacenados en `localStorage` para autenticación sin estado.
- **isLoggedIn (Redux):** Gestión de acceso a rutas protegidas según el estado de autenticación del usuario.

### 3.4 Usabilidad y Validación

- **Formularios:** Implementación de validaciones en formularios.
- **Redirecciones:** Basadas en el estado de autenticación del usuario.

### 3.5 Estilos

- **Sass/TailwindCSS:** Uso de preprocesadores CSS y utilidades para flexibilidad y personalización en el diseño.

## 4. Backend

### 4.1 Arquitectura General

- **Base de Datos:** MongoDB para gestionar datos complejos como usuarios y transacciones.
- **Servidor:** Node.js + Express para manejar rutas y peticiones HTTP.

### 4.2 Seguridad y Autenticación

- **JWT (JSON Web Token):** Autenticación basada en tokens sin necesidad de almacenar sesiones.
- **Bcrypt:** Cifrado de contraseñas para garantizar la seguridad de las credenciales de los usuarios.
- **CORS:** Control de acceso a recursos permitiendo solo solicitudes autorizadas.
- **dotenv:** Manejo de configuraciones sensibles a través de variables de entorno.

### 4.3 Manejo de Errores

- **Middleware Centralizado:** Gestión coherente de errores para una experiencia de desarrollo más clara y eficiente.

### 4.4 Modelos de Datos

- **Admin:** Gestión de usuarios y el sistema.
- **User:** Administración de la información financiera de los usuarios.
- **Trans:** Gestión de transacciones financieras.

### 4.5 Controladores

- **AdminController:** Maneja la gestión de administradores, usuarios y transacciones.
- **UserController:** Autenticación y gestión de usuarios.
- **TransController:** Gestión de transacciones.

## Autores

- [@DaniCabrera91](https://www.github.com/DaniCabrera91)
- [@CarBlank](https://www.github.com/CarBlank)
- [@adoptajunior](https://www.github.com/adoptajunior)
- [@aitziberE](https://www.github.com/aitziberE)
