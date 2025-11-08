import {
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

export class GetTranscribe implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GetTranscribe',
		name: 'getTranscribe',
		icon: 'file:gettranscribe.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with GetTranscribe API to transcribe videos from social media platforms',
		defaults: {
			name: 'GetTranscribe',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'getTranscribeApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Transcription',
						value: 'transcription',
					},
					{
						name: 'Folder',
						value: 'folder',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'transcription',
			},

			// Transcription Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['transcription'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new transcription from a video URL',
						action: 'Create a transcription',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a transcription by ID',
						action: 'Get a transcription',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List all transcriptions',
						action: 'List transcriptions',
					},
				],
				default: 'create',
			},

			// Folder Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['folder'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new folder',
						action: 'Create a folder',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List all folders',
						action: 'List folders',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a folder',
						action: 'Update a folder',
					},
				],
				default: 'create',
			},

			// User Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get user information',
						action: 'Get user info',
					},
				],
				default: 'get',
			},

			// Create Transcription Fields
			{
				displayName: 'Video URL',
				name: 'url',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['transcription'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: 'https://www.instagram.com/p/DM1P8q1MzaG/',
				description: 'The URL of the video to transcribe (Instagram, TikTok, YouTube, etc.)',
			},
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['transcription'],
						operation: ['create'],
					},
				},
				default: null,
				description: 'Optional folder ID to organize the transcription',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['transcription'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: 'en, es, fr',
				description: 'ISO-639-1 language code to improve transcription accuracy (optional)',
			},
			{
				displayName: 'Prompt',
				name: 'prompt',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				displayOptions: {
					show: {
						resource: ['transcription'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: 'Context, names, technical terms...',
				description: 'Context text to guide transcription accuracy (optional)',
			},

			// Get Transcription Fields
			{
				displayName: 'Transcription ID',
				name: 'transcriptionId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['transcription'],
						operation: ['get'],
					},
				},
				default: 0,
				description: 'The ID of the transcription to retrieve',
			},

			// List Transcriptions Fields
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				displayOptions: {
					show: {
						resource: ['transcription'],
						operation: ['list'],
					},
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Skip',
				name: 'skip',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['transcription'],
						operation: ['list'],
					},
				},
				default: 0,
				description: 'Number of transcriptions to skip',
			},
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['transcription'],
						operation: ['list'],
					},
				},
				default: null,
				description: 'Filter transcriptions by folder ID',
			},
			{
				displayName: 'Platform',
				name: 'platform',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['transcription'],
						operation: ['list'],
					},
				},
				options: [
					{
						name: 'All',
						value: '',
					},
					{
						name: 'Instagram',
						value: 'instagram',
					},
					{
						name: 'TikTok',
						value: 'tiktok',
					},
					{
						name: 'YouTube',
						value: 'youtube',
					},
				],
				default: '',
				description: 'Filter transcriptions by platform',
			},

			// Create Folder Fields
			{
				displayName: 'Folder Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The name of the folder',
			},
			{
				displayName: 'Parent Folder ID',
				name: 'parentId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['create'],
					},
				},
				default: null,
				description: 'ID of the parent folder (for subfolders)',
			},

			// Update Folder Fields
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['update'],
					},
				},
				default: 0,
				description: 'The ID of the folder to update',
			},
			{
				displayName: 'Folder Name',
				name: 'name',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['update'],
					},
				},
				default: '',
				description: 'New name for the folder',
			},
			{
				displayName: 'Parent Folder ID',
				name: 'parentId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['update'],
					},
				},
				default: null,
				description: 'New parent folder ID (use null to move to root level)',
			},

			// List Folders Fields
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['list'],
					},
				},
				default: 50,
				description: 'Max number of results to return',
			},

			// Get User Fields
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['get'],
					},
				},
				default: 0,
				description: 'The ID of the user to retrieve (use your own user ID)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const baseURL = 'https://api.gettranscribe.ai';

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let responseData: any;

				if (resource === 'transcription') {
					if (operation === 'create') {
						const url = this.getNodeParameter('url', i) as string;
						const folderId = this.getNodeParameter('folderId', i) as number | null;
						const language = this.getNodeParameter('language', i) as string;
						const prompt = this.getNodeParameter('prompt', i) as string;

						const body: any = { url, source: 'n8n' };
						if (folderId) {
							body.folder_id = folderId;
						}
						if (language) {
							body.language = language;
						}
						if (prompt) {
							body.prompt = prompt;
						}

						const options: IHttpRequestOptions = {
							method: 'POST' as IHttpRequestMethods,
							headers: {
								'Content-Type': 'application/json',
							},
							body,
							url: `${baseURL}/transcriptions`,
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'getTranscribeApi',
							options,
						);
					} else if (operation === 'get') {
						const transcriptionId = this.getNodeParameter('transcriptionId', i) as number;

						const options: IHttpRequestOptions = {
							method: 'GET' as IHttpRequestMethods,
							url: `${baseURL}/transcriptions/${transcriptionId}`,
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'getTranscribeApi',
							options,
						);
					} else if (operation === 'list') {
						const limit = this.getNodeParameter('limit', i) as number;
						const skip = this.getNodeParameter('skip', i) as number;
						const folderId = this.getNodeParameter('folderId', i) as number | null;
						const platform = this.getNodeParameter('platform', i) as string;

						const qs: any = {
							$limit: limit,
							$skip: skip,
							$sort: { created_at: -1 },
						};

						if (folderId) {
							qs.folder_id = folderId;
						}

						if (platform) {
							qs.platform = platform;
						}

						const options: IHttpRequestOptions = {
							method: 'GET' as IHttpRequestMethods,
							url: `${baseURL}/transcriptions`,
							qs,
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'getTranscribeApi',
							options,
						);
					}
				} else if (resource === 'folder') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const parentId = this.getNodeParameter('parentId', i) as number | null;

						const body: any = { name };
						if (parentId) {
							body.parent_id = parentId;
						}

						const options: IHttpRequestOptions = {
							method: 'POST' as IHttpRequestMethods,
							headers: {
								'Content-Type': 'application/json',
							},
							body,
							url: `${baseURL}/transcriptions-folders`,
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'getTranscribeApi',
							options,
						);
					} else if (operation === 'list') {
						const limit = this.getNodeParameter('limit', i) as number;

						const qs: any = {
							$limit: limit,
							$sort: { name: 1 },
						};

						const options: IHttpRequestOptions = {
							method: 'GET' as IHttpRequestMethods,
							url: `${baseURL}/transcriptions-folders`,
							qs,
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'getTranscribeApi',
							options,
						);
					} else if (operation === 'update') {
						const folderId = this.getNodeParameter('folderId', i) as number;
						const name = this.getNodeParameter('name', i) as string;
						const parentId = this.getNodeParameter('parentId', i) as number | null;

						const body: any = {};
						if (name) {
							body.name = name;
						}
						if (parentId !== null) {
							body.parent_id = parentId;
						}

						const options: IHttpRequestOptions = {
							method: 'PATCH' as IHttpRequestMethods,
							headers: {
								'Content-Type': 'application/json',
							},
							body,
							url: `${baseURL}/transcriptions-folders/${folderId}`,
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'getTranscribeApi',
							options,
						);
					}
				} else if (resource === 'user') {
					if (operation === 'get') {
						const userId = this.getNodeParameter('userId', i) as number;

						const options: IHttpRequestOptions = {
							method: 'GET' as IHttpRequestMethods,
							url: `${baseURL}/users/${userId}`,
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(
							this,
							'getTranscribeApi',
							options,
						);
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
} 