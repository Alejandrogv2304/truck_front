# ✅ Checklist de Producción

## Antes de Desplegar

### Configuración
- [ ] Actualizar `VITE_API_URL` en `.env` con la URL de producción
- [ ] Verificar que `.env` esté en `.gitignore`
- [ ] Verificar que la URL del backend use HTTPS
- [ ] Configurar CORS en el backend para permitir el dominio del frontend

### Seguridad
- [ ] Verificar que todas las rutas estén protegidas
- [ ] Confirmar que el token JWT se invalida correctamente
- [ ] Verificar que no hay console.logs con información sensible
- [ ] Confirmar que el interceptor de Axios maneja errores 401

### Testing
- [ ] Probar login y logout
- [ ] Verificar que rutas protegidas redirijan al login sin token
- [ ] Probar todas las funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar)
- [ ] Verificar generación de informes PDF
- [ ] Probar en diferentes navegadores (Chrome, Firefox, Edge)
- [ ] Probar en dispositivos móviles

### Performance
- [ ] Ejecutar `npm run build` sin errores
- [ ] Verificar que el bundle size sea razonable
- [ ] Confirmar que las imágenes estén optimizadas
- [ ] React Query Devtools deshabilitado en producción

### SEO y Metadata
- [ ] Título de la página actualizado
- [ ] Favicon personalizado (opcional)
- [ ] Meta tags apropiados

## Después del Despliegue

### Verificación
- [ ] El sitio carga correctamente
- [ ] El login funciona
- [ ] Las rutas protegidas funcionan
- [ ] Los datos se cargan desde el backend
- [ ] Los informes PDF se generan correctamente
- [ ] No hay errores en la consola del navegador

### Monitoreo
- [ ] Verificar logs del servidor (si aplica)
- [ ] Monitorear errores de red
- [ ] Verificar que no haya fugas de memoria

## Mantenimiento Continuo

- [ ] Actualizar dependencias periódicamente
- [ ] Revisar logs de errores
- [ ] Hacer backups de la base de datos
- [ ] Documentar cambios importantes

## Contacto de Emergencia

- Backend: [URL del backend]
- Hosting: [Proveedor de hosting]
- Admin: [Email del administrador]
