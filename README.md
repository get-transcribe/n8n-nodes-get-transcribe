# n8n-nodes-get-transcribe

This is an n8n node for integrating with the GetTranscribe API, which allows you to transcribe videos from social media platforms like Instagram, TikTok, YouTube, and more.

## Features

### Jobs (recommended)
- **Create**: Start an async transcription job from a video URL (returns immediately with `pending` status)
- **Get**: Poll a job by ID until `completed` or `failed`
- **List**: List jobs with optional status filter

When a job completes, use the returned `transcription_id` with the Transcription **Get** operation to fetch the full transcript.

### Transcriptions
- **Get**: Get a completed transcription by ID (use after a Job finishes)
- **List**: List all transcriptions with optional filters
- **Create (Deprecated)**: Synchronous create — still works for existing workflows, but prefer **Job → Create**

### Folders
- **Create**: Create new folders to organize transcriptions
- **List**: List all folders
- **Update**: Update properties of existing folders

### User
- **Get**: Get user information and account statistics

## Installation

### Installation on n8n Cloud

1. Go to **Settings** > **Community Nodes**
2. Search for `n8n-nodes-get-transcribe`
3. Click **Install**

### Installation on self-hosted n8n

1. Go to your n8n installation root directory
2. Run: `npm install n8n-nodes-get-transcribe`
3. Restart n8n

## Configuration

### Credentials

To use this node, you need to configure your GetTranscribe credentials:

1. In n8n, go to **Credentials** and create new credentials of type **GetTranscribe API**
2. Enter your **API Key** from GetTranscribe
   - You can find your API Key in your GetTranscribe account settings
   - The API Key should have the format: `gt_...`

### Credential test URL

The node will automatically verify your credentials by making a request to `/users/me` on the GetTranscribe API.

## Usage

### Create a Transcription Job (recommended)

1. Add the **GetTranscribe** node to your workflow
2. Select **Job** as resource
3. Select **Create** as operation
4. Enter the URL of the video you want to transcribe
5. Optionally set folder ID, language, prompt, or model

The node returns a job with `id` and `status: "pending"`. Poll with **Job → Get** until `status` is `completed` or `failed`. On success, `transcription_id` points to the finished transcript.

Typical n8n pattern:

1. **GetTranscribe** (Job → Create)
2. **Wait** a few seconds
3. **GetTranscribe** (Job → Get) using the job `id`
4. **IF** status is still pending/processing → loop back to Wait
5. When completed → **GetTranscribe** (Transcription → Get) with `transcription_id`

Supported URL examples:
- Instagram: `https://www.instagram.com/p/ABC123/`
- TikTok: `https://www.tiktok.com/@user/video/123456789`
- YouTube: `https://www.youtube.com/watch?v=ABC123`

### Get a Transcription Job

1. Select **Job** as resource
2. Select **Get** as operation
3. Enter the Job ID from the Create response

Statuses:
- `pending` / `processing`: not ready yet — wait and poll again
- `completed`: use `transcription_id` to fetch the transcript
- `failed`: check `error_message`

### List Jobs

1. Select **Job** as resource
2. Select **List** as operation
3. Optionally filter by status (`pending`, `processing`, `completed`, `failed`)

### Create a Transcription (deprecated)

> Deprecated. Use **Job → Create** instead. This sync path remains for existing workflows but can time out on long videos.

1. Select **Transcription** as resource
2. Select **Create (Deprecated)** as operation
3. Enter the URL of the video you want to transcribe

### List Transcriptions

1. Select **Transcription** as resource
2. Select **List** as operation
3. Configure optional filters:
   - **Limit**: Maximum number of results
   - **Skip**: Number of results to skip (for pagination)
   - **Folder ID**: Filter by specific folder
   - **Platform**: Filter by platform (Instagram, TikTok, YouTube)

### Folder Management

#### Create Folder
1. Select **Folder** as resource
2. Select **Create** as operation
3. Enter the folder name
4. Optionally, specify a parent folder ID to create subfolders

#### List Folders
1. Select **Folder** as resource
2. Select **List** as operation
3. Configure the result limit

### User Information

1. Select **User** as resource
2. Select **Get** as operation
3. Enter your user ID (you can use your own ID)

## API Response

### Transcription

```json
{
  "id": 4032,
  "user_id": 2,
  "transcription": "Transcribed text from the video...",
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
  "original_transcription": "Original text...",
  "transcription_segments": [...],
  "transcription_words": [...],
  "created_at": "2025-08-07T17:43:15.822Z",
  "updated_at": "2025-08-07T17:43:15.822Z"
}
```

## Workflow Examples

### Automatic Transcription from Webhook

1. **Webhook Trigger** - Receives video URLs
2. **GetTranscribe** (Job → Create) - Starts the job
3. **Wait** + **GetTranscribe** (Job → Get) - Poll until completed
4. **GetTranscribe** (Transcription → Get) - Fetch the transcript
5. **HTTP Request** - Sends the transcription to another service

### Batch Processing

1. **Schedule Trigger** - Runs periodically
2. **GetTranscribe** (Job → List or Transcription → List)
3. **If Node** - Checks for new/completed items
4. **Loop** - Processes each item

## Support

- **Documentation**: [https://www.gettranscribe.ai/n8n-transcription-instagram-tiktok-automation](https://www.gettranscribe.ai/n8n-transcription-instagram-tiktok-automation)
- **Support**: [support@gettranscribe.ai](mailto:daniel@gettranscribe.ai)
- **GitHub**: [https://github.com/get-transcribe/n8n-nodes-get-transcribe](https://github.com/get-transcribe/n8n-nodes-get-transcribe)

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Contributors

Thanks to all the people who have contributed to this project:

- [danielevz](https://github.com/emeagenciadigital) - Contributor

## License

MIT

## Changelog

### v0.2.1
- Mark Transcription → Create as **Deprecated** (favor Job → Create)
- Default Transcription operation is now Get
- Docs and node copy push the async Job workflow

### v0.2.0
- Add **Job** resource: create, get, and list async transcription jobs (`/transcription-jobs`)
- Job create supports optional model, language, prompt, and folder ID
- Default resource is now Job (recommended for n8n workflows)

### v0.1.4
- Bump package version and update request method in GetTranscribe node

### v0.1.1
- Updated GitHub repository URLs in package.json

### v0.1.0
- Initial release
- Support for transcriptions (create, get, list)
- Support for folders (create, list, update)
- Support for user information
- API Key authentication
