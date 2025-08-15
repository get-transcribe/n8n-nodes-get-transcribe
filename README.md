# n8n-nodes-get-transcribe

Este es un nodo de n8n para integrar con la API de GetTranscribe, que permite transcribir videos de plataformas de redes sociales como Instagram, TikTok, YouTube y más.

## Funcionalidades

### Transcripciones
- **Crear**: Crear una nueva transcripción a partir de una URL de video
- **Obtener**: Obtener una transcripción específica por ID
- **Listar**: Listar todas las transcripciones con filtros opcionales

### Carpetas
- **Crear**: Crear nuevas carpetas para organizar transcripciones
- **Listar**: Listar todas las carpetas
- **Actualizar**: Actualizar propiedades de carpetas existentes

### Usuario
- **Obtener**: Obtener información del usuario y estadísticas de la cuenta

## Instalación

### Instalación en n8n Cloud

1. Ve a **Settings** > **Community Nodes**
2. Busca `n8n-nodes-get-transcribe`
3. Haz clic en **Install**

### Instalación en n8n auto-hospedado

1. Ve al directorio raíz de tu instalación de n8n
2. Ejecuta: `npm install n8n-nodes-get-transcribe`
3. Reinicia n8n

## Configuración

### Credenciales

Para usar este nodo, necesitas configurar tus credenciales de GetTranscribe:

1. En n8n, ve a **Credentials** y crea nuevas credenciales de tipo **GetTranscribe API**
2. Ingresa tu **API Key** de GetTranscribe
   - Puedes encontrar tu API Key en tu cuenta de GetTranscribe en la sección de configuración
   - La API Key debe tener el formato: `gt_...`

### URL de prueba de credenciales

El nodo verificará automáticamente tus credenciales haciendo una petición a `/users/me` en la API de GetTranscribe.

## Uso

### Crear una Transcripción

1. Agrega el nodo **GetTranscribe** a tu flujo de trabajo
2. Selecciona **Transcription** como recurso
3. Selecciona **Create** como operación
4. Ingresa la URL del video que quieres transcribir
5. Opcionalmente, selecciona un ID de carpeta para organizar la transcripción

Ejemplo de URLs soportadas:
- Instagram: `https://www.instagram.com/p/ABC123/`
- TikTok: `https://www.tiktok.com/@user/video/123456789`
- YouTube: `https://www.youtube.com/watch?v=ABC123`

### Listar Transcripciones

1. Selecciona **Transcription** como recurso
2. Selecciona **List** como operación
3. Configura los filtros opcionales:
   - **Límite**: Número máximo de resultados
   - **Saltar**: Número de resultados a omitir (para paginación)
   - **ID de Carpeta**: Filtrar por carpeta específica
   - **Plataforma**: Filtrar por plataforma (Instagram, TikTok, YouTube)

### Gestión de Carpetas

#### Crear Carpeta
1. Selecciona **Folder** como recurso
2. Selecciona **Create** como operación
3. Ingresa el nombre de la carpeta
4. Opcionalmente, especifica un ID de carpeta padre para crear subcarpetas

#### Listar Carpetas
1. Selecciona **Folder** como recurso
2. Selecciona **List** como operación
3. Configura el límite de resultados

### Información del Usuario

1. Selecciona **User** como recurso
2. Selecciona **Get** como operación
3. Ingresa tu ID de usuario (puedes usar tu propio ID)

## Respuesta de la API

### Transcripción

```json
{
  "id": 4032,
  "user_id": 2,
  "transcription": "Texto transcrito del video...",
  "platform": "instagram",
  "url": "https://www.instagram.com/p/DM1P8q1MzaG/",
  "thumbnail_url": "https://...",
  "download_video_url": "https://...",
  "download_audio_url": "https://...",
  "duration": "0:30",
  "duration_seconds": 30.159864,
  "word_count": 91,
  "char_count": 515,
  "folder_id": null,
  "transcription_analysis": null,
  "original_transcription": "Texto original...",
  "transcription_segments": [...],
  "transcription_words": [...],
  "created_at": "2025-08-07T17:43:15.822Z",
  "updated_at": "2025-08-07T17:43:15.822Z"
}
```

## Ejemplos de Flujos de Trabajo

### Transcripción Automática desde Webhook

1. **Webhook Trigger** - Recibe URLs de videos
2. **GetTranscribe Node** - Transcribe el video
3. **Set Node** - Procesa el texto transcrito
4. **HTTP Request** - Envía la transcripción a otro servicio

### Procesamiento por Lotes

1. **Schedule Trigger** - Ejecuta periódicamente
2. **GetTranscribe Node** - Lista transcripciones pendientes
3. **If Node** - Verifica si hay nuevas transcripciones
4. **Loop** - Procesa cada transcripción

## Soporte

- **Documentación**: [https://docs.gettranscribe.ai](https://docs.gettranscribe.ai)
- **Soporte**: [support@gettranscribe.ai](mailto:support@gettranscribe.ai)
- **GitHub**: [https://github.com/gettranscribe/n8n-nodes-get-transcribe](https://github.com/gettranscribe/n8n-nodes-get-transcribe)

## Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Haz fork del repositorio
2. Crea una rama para tu feature
3. Realiza commit de tus cambios
4. Haz push a la rama
5. Abre un Pull Request

## Licencia

MIT

## Changelog

### v0.1.0
- Lanzamiento inicial
- Soporte para transcripciones (crear, obtener, listar)
- Soporte para carpetas (crear, listar, actualizar)
- Soporte para información de usuario
- Autenticación por API Key
