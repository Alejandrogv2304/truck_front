# 🐳 Guía de Docker para Truck App Frontend

## 📋 Prerrequisitos

- Docker instalado
- Docker Compose instalado (opcional, para correr frontend y backend juntos)

## 🚀 Opción 1: Solo Frontend

### Construir la imagen
```bash
docker build -t truck-frontend .
```

### Ejecutar el contenedor
```bash
docker run -d -p 80:80 --name truck-frontend truck-frontend
```

Acceder en: http://localhost

### Detener y eliminar
```bash
docker stop truck-frontend
docker rm truck-frontend
```

---

## 🔗 Opción 2: Frontend + Backend con Docker Compose

### Preparación

1. **Asegúrate de tener la estructura correcta:**
```
/PROYECTOS_WEB_LOCAL/
├── truck_front/      (este proyecto)
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── ...
└── truck_back/       (tu backend)
    ├── Dockerfile
    └── ...
```

2. **Ajustar docker-compose.yml:**
   - Verifica la ruta de `context` del backend (línea 23)
   - Agrega las variables de entorno del backend

3. **Configurar URL del backend:**
   
   **Para comunicación interna entre contenedores:**
   - Editar `.env` o crear `.env.production`:
   ```bash
   VITE_API_URL=http://backend:3000
   ```

   **Para acceso desde el navegador:**
   - Si frontend y backend están en el mismo servidor:
   ```bash
   VITE_API_URL=http://localhost:3000
   ```
   
   - Si están en servidores diferentes:
   ```bash
   VITE_API_URL=https://tu-backend.com
   ```

### Construir y ejecutar ambos servicios
```bash
docker-compose up -d --build
```

### Ver logs
```bash
# Todos los servicios
docker-compose logs -f

# Solo frontend
docker-compose logs -f frontend

# Solo backend
docker-compose logs -f backend
```

### Detener todo
```bash
docker-compose down
```

### Reconstruir después de cambios
```bash
docker-compose up -d --build
```

---

## 🔧 Configuración de Variables de Entorno

### Desarrollo Local con Docker
Crear archivo `.env.production` en la raíz:
```env
VITE_API_URL=http://localhost:3000
```

### Producción
Editar `.env` o pasar variables al construir:
```bash
docker build --build-arg VITE_API_URL=https://api.tudominio.com -t truck-frontend .
```

**Nota:** Las variables VITE_* se embeben durante el build, no en runtime.

---

## 📝 Comandos Útiles

### Listar contenedores
```bash
docker ps
```

### Ver imágenes
```bash
docker images
```

### Entrar a un contenedor
```bash
docker exec -it truck-frontend sh
```

### Limpiar todo Docker
```bash
# Detener todos los contenedores
docker stop $(docker ps -aq)

# Eliminar todos los contenedores
docker rm $(docker ps -aq)

# Eliminar imágenes sin usar
docker image prune -a
```

---

## 🌐 Acceso a la Aplicación

### Con Docker Run (solo frontend)
- Frontend: http://localhost
- Backend: http://localhost:3000 (si corre separado)

### Con Docker Compose
- Frontend: http://localhost
- Backend: http://localhost:3000

---

## 🔒 Configuración de CORS en Backend

Asegúrate de que el backend permita peticiones desde el frontend:

```javascript
// Ejemplo Node.js/Express
app.use(cors({
  origin: [
    'http://localhost',        // Docker frontend
    'http://localhost:5173',   // Dev local
    'https://tu-dominio.com'   // Producción
  ],
  credentials: true
}));
```

---

## 📦 Despliegue en Producción con Docker

### 1. En un VPS (DigitalOcean, AWS, etc.)

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/truck_front.git
cd truck_front

# Crear .env con variables de producción
echo "VITE_API_URL=https://api.tudominio.com" > .env

# Construir y ejecutar
docker-compose up -d --build
```

### 2. Nginx como Reverse Proxy
Si usas un dominio, configura Nginx en el servidor:

```nginx
server {
    listen 80;
    server_name tudominio.com;

    location / {
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## ⚠️ Troubleshooting

### El frontend no se conecta al backend
1. Verificar que `VITE_API_URL` esté correctamente configurado
2. Verificar CORS en el backend
3. Verificar que ambos contenedores estén en la misma red
4. Usar `docker-compose logs backend` para ver errores

### Cambios no se reflejan
- Reconstruir la imagen: `docker-compose up -d --build`
- Las variables VITE_* solo se actualizan en build time

### Puerto 80 ya en uso
Cambiar el puerto en docker-compose.yml:
```yaml
ports:
  - "8080:80"  # Usar puerto 8080 en lugar de 80
```

---

## 📚 Recursos Adicionales

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
