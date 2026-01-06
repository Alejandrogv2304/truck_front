# 🚛 Truck App - Sistema de Gestión de Camiones

Sistema para gestión de camiones, conductores, viajes y gastos.

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Backend API ejecutándose

## 🚀 Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Editar `.env` con la URL de tu backend:
```
VITE_API_URL=https://tu-backend-url.com
```

## 💻 Desarrollo

```bash
npm run dev
```

## 🏗️ Compilar para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

## 📦 Despliegue

### Opción 1: Servidor Estático (Nginx, Apache)
1. Compilar: `npm run build`
2. Subir contenido de `dist/` a tu servidor
3. Configurar rewrite rules para SPA:

**Nginx:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Opción 2: Vercel/Netlify
1. Conectar repositorio
2. Build command: `npm run build`
3. Output directory: `dist`
4. Agregar variable de entorno `VITE_API_URL`

## 🔐 Seguridad

- ✅ Tokens JWT en localStorage
- ✅ Interceptor de Axios para autorización
- ✅ Rutas protegidas
- ✅ Manejo de tokens expirados
- ✅ Redirección automática en 401

## ⚠️ Importante para Producción

1. **Variables de Entorno**: Cambiar `VITE_API_URL` a la URL de producción
2. **HTTPS**: Usar siempre HTTPS en producción
3. **CORS**: Configurar CORS en el backend para permitir el dominio del frontend
4. **Optimización**: El build de producción minifica y optimiza automáticamente

## 📱 Funcionalidades

- 🚛 Gestión de camiones
- 👨‍✈️ Gestión de conductores
- 🗺️ Gestión de viajes
- 💰 Gestión de gastos
- 📊 Dashboard con estadísticas
- 📄 Generación de informes PDF
- 🔒 Autenticación y autorización

## 🛠️ Tecnologías

- React 19
- TypeScript
- TailwindCSS
- React Router
- React Query (TanStack Query)
- Axios
- React Hook Form
- React PDF Renderer
- Recharts

## 📞 Soporte

Para problemas o consultas, contactar al administrador del sistema.
