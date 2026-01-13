# SightStatusJr

## Descripción

**SightStatusJr** es un sistema de gestión y monitoreo empresarial desarrollado como un **monolito Node.js + React**, orientado a la administración técnica de infraestructura, usuarios y operaciones internas. El sistema fue diseñado, implementado y mantenido íntegramente por **Juan Ramón Madrid Medina**.

Actualmente, el sistema **no está enfocado en diseño responsive**. La interfaz está pensada para uso en entornos de escritorio, priorizando funcionalidad, estabilidad y control administrativo.

---

## Características principales

* Arquitectura monolítica (frontend integrado al backend)
* Gestión de usuarios y roles
* Administración de sucursales
* Gestión y monitoreo de dispositivos
* Control de mantenimientos
* Generación y consulta de informes
* Manejo de manuales técnicos
* Autenticación y sesiones
* Entorno preparado para producción con PM2

---

## Arquitectura del sistema

SightStatusJr utiliza un **monolito moderno**:

* El frontend se construye con React y Vite
* El resultado de la build del cliente se sirve directamente desde el backend
* No es necesario ejecutar un servidor de frontend en producción

En producción, **solo se ejecuta el backend**, el cual expone la API y sirve los archivos estáticos del cliente.

---

## Tecnologías

### Frontend

* React 18
* Vite
* JavaScript (ESM)

### Backend

* Node.js
* Express.js
* SQL Server
* Sequelize ORM
* PM2 (entorno productivo)

---

## Instalación y ejecución

### Requisitos

* Node.js 18 o superior
* SQL Server 2019 o superior
* npm

---

### Instalación

```bash
git clone https://github.com/JrMadrid/SightStatusJr.git
cd SightStatusJr/server
npm install
```

---

### Configuración

```bash
cp server/.env.production server/.env
```

Editar el archivo `.env` con las credenciales de base de datos y variables necesarias siguiendo el ejemplo de .env.example.

---

### Ejecución

#### Desarrollo

```bash
cd server
npm run dev
```

> En desarrollo puede ejecutarse el cliente de forma independiente, pero **no es obligatorio** para comprender o evaluar el sistema.

---

#### Producción

```bash
cd client
npm run build

cp -r client/dist server/public/

cd server
npm run pro
```

En producción **no se ejecuta el cliente**, únicamente el servidor.

---

## Estructura general del proyecto

* `server/` Backend, API, lógica de negocio y servicio de archivos estáticos
* `client/` Frontend React (solo se utiliza la build en producción)
* `db/` Scripts SQL para la creación y mantenimiento de la base de datos SightStatusJr
* `docs/` Documentación del proyecto
   * `imgs/` Capturas del sistema en ejecución con datos de ejemplo
   * `manuals/` Manuales de usuario (usuario estándar y administrador)


---

## Guía de desarrollo

### Convenciones

* Componentes React en PascalCase
* Hooks personalizados con prefijo `use`
* Variables y funciones en camelCase
* Estructura modular orientada a mantenibilidad

El código prioriza claridad y separación de responsabilidades por encima de optimizaciones prematuras.

---

## Estado del diseño responsive

El sistema **no implementa diseño responsive completo**.

Esto es una decisión consciente: el proyecto se centra en entornos administrativos de escritorio. La adaptación responsive queda planteada como una mejora futura.

---

## Licencia

Este proyecto está licenciado bajo la **Licencia MIT**.

Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## Aviso legal

Este software se proporciona bajo la Licencia MIT.

La eliminación de avisos de copyright o la atribución falsa de autoría constituye una violación de la licencia.

El nombre del proyecto, su identidad visual y su documentación **no están licenciados para uso comercial**.

---

## Autor

**Juan Ramón Madrid Medina**
Ingeniero en Sistemas

© 2024 – 2026 Juan Ramón Madrid Medina