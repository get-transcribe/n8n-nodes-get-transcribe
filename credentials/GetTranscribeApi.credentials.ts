import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GetTranscribeApi implements ICredentialType {
	name = 'getTranscribeApi';
	displayName = 'GetTranscribe API';

	documentationUrl = 'https://docs.gettranscribe.ai/api-documentation/authentication';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Your GetTranscribe API key. You can find this in your account settings.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{ $credentials.apiKey }}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.gettranscribe.ai',
			url: '/users',
			method: 'GET',
		},
	};
} 