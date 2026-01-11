# CoreSightJr

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)   
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)  
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)  
![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=flat&logo=microsoft-sql-server&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

---

## 📑 Índice
1. [Descripción](#-descripción)  
2. [Características Principales](#-características-principales)  
3. [Arquitectura Moderna](#-arquitectura-moderna)  
4. [Tecnologías](#-tecnologías)  
5. [Instalación y Ejecución](#-instalación-y-ejecución)  
6. [Estructura del Proyecto](#-estructura-del-proyecto)  
7. [Guía de Desarrollo](#-guía-de-desarrollo)  
8. [Deploy y Producción](#-deploy-y-producción)

---

## 📝 Descripción
**CoreSightJr** es una plataforma moderna de gestión empresarial construida con React 18 y Vite. Diseñada para administrar usuarios, sucursales, dispositivos, mantenimientos, manuales e informes con una arquitectura responsive y escalable.

### 🎯 **Características Destacadas**
- ✅ **Responsive Design**: Mobile-first approach con breakpoints optimizados
- ✅ **Sistema de Diseño**: Variables CSS consistentes y tema unificado
- ✅ **Estado Global**: Hooks personalizados para manejo de aplicación
- ✅ **SEO Optimizado**: Meta tags, robots.txt y manifest.json configurados
- ✅ **Componentes UI**: Biblioteca de componentes reutilizables
- ✅ **Manejo de Errores**: Sistema robusto de errores y loading states
- ✅ **Build Optimizado**: Code splitting y lazy loading con Vite

---

## 🏗️ **Arquitectura Moderna**

### **Frontend (React + Vite)**
```
client/
├── src/
│   ├── components/          # Componentes UI reutilizables
│   │   ├── ui/             # Componentes base (Button, Modal, etc.)
│   │   └── Elementos/      # Componentes específicos del negocio
│   ├── pages/              # Páginas de la aplicación
│   ├── hooks/              # Custom hooks (useApi, useApplication)
│   ├── styles/             # Sistema de diseño CSS
│   │   ├── variables.css  # Variables CSS y tema
│   │   ├── globals.css    # Estilos globales
│   │   ├── components.css # Componentes UI
│   │   └── layout.css     # Layout responsive
│   ├── context/            # Context API
│   ├── api/               # Configuración de API
│   └── utils/             # Utilidades
├── public/                # Assets estáticos
└── dist/                  # Build de producción
```

### **Backend (Node.js + Express)**
```
server/
├── src/
│   ├── api/               # Endpoints y rutas
│   ├── configs/           # Configuración
│   ├── connection/        # Conexión a BD
│   ├── middlewares/       # Middlewares
│   └── services/          # Lógica de negocio
└── ecosystem.config.cjs   # Configuración PM2
```

---

## 🛠️ **Tecnologías**

### **Frontend**
- **React 18.3.1** - UI library con hooks modernos
- **Vite 7.2.7** - Build tool ultra rápido
- **React Router 6** - Enrutamiento declarativo
- **CSS Variables** - Sistema de diseño moderno
- **React Hot Toast** - Notificaciones elegantes
- **React Icons** - Iconos vectoriales

### **Backend**
- **Express.js** - Framework web minimalista
- **SQL Server** - Base de datos empresarial
- **Sequelize** - ORM para SQL Server
- **PM2** - Process manager para producción
- **JWT** - Autenticación segura

### **DevOps**
- **ESLint** - Linting de código
- **Jest** - Testing framework
- **PM2** - Gestión de procesos
- **Vite PWA** - Progressive Web App

---

## 🚀 **Instalación y Ejecución**

### **Prerrequisitos**
- Node.js 18+ 
- SQL Server 2019+
- npm o yarn

### **Instalación**
```bash
# Clonar repositorio
git clone https://github.com/JrMadrid/CoreSightJr.git
cd CoreSightJr

# Instalar dependencias del clientecd client && npm install

# Instalar dependencias del servercd ../server && npm install
```

### **Configuración**
```bash
# Configurar variables de entornocp client/.env.example client/.env
cp server/.env.example server/.env

# Editar archivos .env con tus credenciales
```

### **Ejecución**

#### **Modo Desarrollo**
```bash
# Iniciar servidor (terminal 1)cd server && npm run dev

# Iniciar cliente (terminal 2)cd client && npm run dev
```

#### **Modo Producción**
```bash
# Build del clientecd client && npm run build

# Mover build al servercp -r client/dist server/public/

# Iniciar en produccióncd server && npm run pro
```

---

## 📁 **Estructura del Proyecto**

### **Aliases de Importación**
```javascript
// Nuevos aliases modernos
import Component from '@components/ui/Button';
import styles from '@styles/components.css';
import useApi from '@hooks/useApi';

// Legacy compatibility (temporal)
import Component from '@elementos/Button';
```

### **Sistema de Diseño**
```css
/* Variables CSS */
:root {
  --color-primary: #0d215c;
  --color-secondary: #c59e75;
  --spacing-md: 1rem;
  --border-radius-md: 8px;
}
```

### **Breakpoints Responsive**
```css
/* Mobile-first approach */
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
```

---

## 👨‍💻 **Guía de Desarrollo**

### **Estándares de Código**
- **Componentes**: PascalCase
- **Hooks**: camelCase con prefijo `use`
- **CSS**: BEM methodology + CSS Variables
- **Archivos**: kebab-case

### **Custom Hooks**
```javascript
// Hook para peticiones API
const { data, loading, error } = useApi('/api/users');

// Hook de aplicación
const { state, actions, permissions } = useApplication();

// Hook para CRUD
const { create, update, remove } = useCrudApi('/api/users');
```

### **Componentes UI**
```javascript
// Sistema de componentes consistente
import { Button, Modal, LoadingSpinner } from '@components/ui';

// Con variantes y estados<Button variant="primary" size="lg" loading={isLoading}>
  Guardar
</Button>
```

### **Manejo de Errores**
```javascript
// Componentes de error consistentes
<ErrorMessage 
  error={error} 
  onRetry={handleRetry}
  variant="card" 
/>

// Loading states<LoadingSpinner 
  size="lg" 
  text="Cargando usuarios..." 
  fullScreen 
/>
```

---

## 🌐 **Deploy y Producción**

### **Build Optimizado**
```bash
# Producción con optimizacionesnpm run build

# Análisis de bundlenpm run build -- --analyze
```

### **Variables de Entorno**
```bash
# ProducciónNODE_ENV=production
VITE_API_URL=https://api.coresightjr.com
VITE_APP_VERSION=1.0.0
```

### **PM2 Configuration**
```javascript
// ecosystem.config.cjsmodule.exports = {
  apps: [{
    name: 'coresightjr',
    script: './src/index.js',
    instances: 'max',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
```

### **SEO y PWA**
- ✅ Meta tags optimizados
- ✅ Open Graph para redes sociales
- ✅ Manifest.json para PWA
- ✅ Robots.txt configurado
- ✅ Sitemap (cuando exista)

---

## 🔄 **Migración desde StatusApp**

### **Cambios Principales**
1. **Nombre**: StatusApp → CoreSightJr
2. **Build Tool**: Webpack → Vite
3. **CSS**: Hardcoded → CSS Variables
4. **Responsive**: Ninguno → Mobile-first
5. **Estado**: Context básico → Hooks avanzados
6. **SEO**: Bloqueado → Optimizado

### **Compatibilidad**
- ✅ **Endpoints**: Sin cambios
- ✅ **Base de datos**: Sin cambios
- ✅ **Autenticación**: Sin cambios
- ✅ **npm run dev**: Funciona igual

---

## 🤝 **Contribuir**

1. Fork del proyecto
2. Feature branch: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Add nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Pull Request

---

## 📄 **Licencia**

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

## 📞 **Soporte**

- **Issues**: [GitHub Issues](https://github.com/JrMadrid/CoreSightJr/issues)
- **Documentación**: [Wiki del Proyecto](https://github.com/JrMadrid/CoreSightJr/wiki)
- **Email**: soporte@coresightjr.com

---

**CoreSightJr** © 2024 - Sistema de Gestión Empresarial Moderno
