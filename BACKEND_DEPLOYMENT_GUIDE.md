# 🚀 Guía de Deployment - Backend API Leaderboard

## 📋 Pasos para Configurar el Backend en Google Cloud VM

### 1. Conectar a la VM

```bash
# SSH a tu VM de Google Cloud
ssh web3trustx@<IP-DE-TU-VM>
```

### 2. Crear Directorio para la API

```bash
# Crear directorio para la API
mkdir -p /home/web3trustx/web3trustx-api
cd /home/web3trustx/web3trustx-api
```

### 3. Copiar el Archivo server.js

Copia el contenido del archivo `BACKEND_SERVER_EXAMPLE.js` desde este repositorio a tu VM.

**Opción A: Usando nano directamente en la VM**
```bash
nano server.js
# Pega el contenido completo de BACKEND_SERVER_EXAMPLE.js
# Ctrl+X, Y, Enter para guardar
```

**Opción B: Usando SCP desde tu máquina local**
```bash
# Desde tu máquina local (Windows PowerShell)
scp "c:\Users\SANTOS\Desktop\Proyecto Crypto\3.0.- Desarrollo App\web3trustx-website\BACKEND_SERVER_EXAMPLE.js" web3trustx@<IP-VM>:/home/web3trustx/web3trustx-api/server.js
```

### 4. Inicializar Proyecto Node.js

```bash
cd /home/web3trustx/web3trustx-api

# Crear package.json
npm init -y

# Instalar dependencias
npm install express cors
```

### 5. Verificar Estructura de Archivos

```bash
# Verificar que los archivos de datos existen
ls -la /home/web3trustx/web3trustx-bot/

# Deberías ver:
# - scores.json
# - referrals.json
# - users.json (opcional)
# - x_users.json (opcional)
```

### 6. Probar el Servidor Localmente

```bash
# Iniciar el servidor
node server.js

# Deberías ver:
# ============================================================
# 🚀 LEADERBOARD API - Web3TrustX
# ============================================================
# ✅ Servidor corriendo en puerto 8080
# ...
```

### 7. Probar los Endpoints

**Desde otra terminal en la VM:**

```bash
# Health check
curl http://localhost:8080/health

# Debug endpoint
curl http://localhost:8080/api/debug

# Leaderboard
curl "http://localhost:8080/api/leaderboard?type=participant&page=1&pageSize=20"

# Buscar usuario específico
curl "http://localhost:8080/api/leaderboard?userId=8494774001"
```

### 8. Configurar PM2 para Mantener el Servidor Corriendo

```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

# Iniciar el servidor con PM2
pm2 start server.js --name "leaderboard-api"

# Guardar configuración
pm2 save

# Configurar PM2 para iniciarse al arranque
pm2 startup
# Ejecuta el comando que PM2 te muestre

# Ver logs
pm2 logs leaderboard-api

# Ver status
pm2 status
```

### 9. Configurar Nginx como Proxy Reverso

Edita la configuración de Nginx:

```bash
sudo nano /etc/nginx/sites-available/api.web3trustx.com
```

Contenido:

```nginx
server {
    listen 80;
    server_name api.web3trustx.com;

    # Redirigir HTTP a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.web3trustx.com;

    # Certificado SSL (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/api.web3trustx.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.web3trustx.com/privkey.pem;

    # Configuración SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    # Logs
    access_log /var/log/nginx/api.web3trustx.com.access.log;
    error_log /var/log/nginx/api.web3trustx.com.error.log;

    # Proxy a la API
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # CORS headers (adicionales por si acaso)
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept' always;

        # Timeout
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

Habilitar el sitio:

```bash
# Crear enlace simbólico
sudo ln -s /etc/nginx/sites-available/api.web3trustx.com /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Recargar Nginx
sudo systemctl reload nginx
```

### 10. Configurar Certificado SSL con Let's Encrypt

```bash
# Instalar certbot si no está instalado
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtener certificado
sudo certbot --nginx -d api.web3trustx.com

# Certbot configurará automáticamente Nginx para HTTPS
```

### 11. Configurar Firewall

```bash
# Abrir puertos en el firewall de GCP
# En la consola de Google Cloud:
# VPC Network > Firewall > Create Firewall Rule

# Nombre: allow-http-https-api
# Targets: All instances in the network
# Source IP ranges: 0.0.0.0/0
# Protocols and ports: tcp:80,443
```

### 12. Verificar desde Internet

```bash
# Desde tu máquina local
curl https://api.web3trustx.com/health

# Debería devolver:
# {"status":"ok","timestamp":"2025-11-07T..."}
```

## 🔍 Diagnóstico de Problemas

### Problema: "userId": "undefined"

**Solución:** El servidor actualizado lee correctamente scores.json como objeto.

Verifica con:
```bash
curl https://api.web3trustx.com/api/debug
```

### Problema: CORS Errors

**Solución:** El servidor incluye CORS configurado para todos los dominios necesarios.

Verifica los logs:
```bash
pm2 logs leaderboard-api
```

Deberías ver:
```
[CORS] ✅ Permitido: https://web3trustx.com
```

### Problema: No se muestran datos

**Verifica el formato de scores.json:**

```bash
# Ver primeras líneas
head -20 /home/web3trustx/web3trustx-bot/scores.json

# Debe ser un objeto JSON:
{
  "8494774001": {
    "username": "...",
    "points": 20,
    ...
  }
}
```

### Ver logs en tiempo real

```bash
# Logs de PM2
pm2 logs leaderboard-api --lines 100

# Logs de Nginx
sudo tail -f /var/log/nginx/api.web3trustx.com.error.log
sudo tail -f /var/log/nginx/api.web3trustx.com.access.log
```

## 🧪 Testing Checklist

- [ ] `curl https://api.web3trustx.com/health` devuelve 200 OK
- [ ] `curl https://api.web3trustx.com/api/debug` muestra conteo correcto
- [ ] `curl https://api.web3trustx.com/api/leaderboard?type=participant` devuelve datos
- [ ] Los `userId` no son "undefined"
- [ ] Los `totalPoints` se calculan correctamente
- [ ] CORS permite requests desde web3trustx.com
- [ ] Frontend en http://localhost:3000/leaderboard carga datos

## 📝 Comandos Útiles PM2

```bash
# Ver status
pm2 status

# Reiniciar
pm2 restart leaderboard-api

# Detener
pm2 stop leaderboard-api

# Ver logs
pm2 logs leaderboard-api

# Limpiar logs
pm2 flush

# Ver métricas
pm2 monit
```

## 🔄 Actualizar el Código

Si necesitas actualizar server.js:

```bash
# Editar archivo
nano /home/web3trustx/web3trustx-api/server.js

# Reiniciar con PM2
pm2 restart leaderboard-api

# Ver logs para verificar
pm2 logs leaderboard-api --lines 50
```

## 🎯 Endpoints Finales

Una vez configurado, tendrás:

- **Health Check:** `https://api.web3trustx.com/health`
- **Debug:** `https://api.web3trustx.com/api/debug`
- **Leaderboard:** `https://api.web3trustx.com/api/leaderboard`
  - `?type=participant` o `?type=influencer`
  - `?page=1&pageSize=20`
  - `?userId=123456789`

## ✅ Verificación Final

Desde el frontend en tu máquina local:

1. Abre http://localhost:3000/leaderboard
2. Deberías ver la tabla con datos reales
3. Prueba cambiar entre "Participants" e "Influencers"
4. Prueba buscar un userId
5. Verifica que la paginación funciona

---

**¿Problemas?** Revisa los logs con `pm2 logs leaderboard-api`
