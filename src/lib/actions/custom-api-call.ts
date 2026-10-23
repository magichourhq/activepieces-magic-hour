import { HttpMethod } from '@activepieces/pieces-common';
import { createAction, Property } from '@activepieces/pieces-framework';
import { magicHourAuth } from '../auth';
import { magicHourApi } from '../common/client';

export const customApiCallAction = createAction({
  auth: magicHourAuth,
  audience: 'human',
  name: 'custom_api_call',
  displayName: 'Custom API Call',
  description: 'Make a JSON request to a Magic Hour API endpoint.',
  props: {
    path: Property.ShortText({
      displayName: 'API Path',
      description:
        'Path relative to https://api.magichour.ai/v1, for example /account. Absolute URLs are not accepted.',
      required: true,
    }),
    method: Property.StaticDropdown({
      displayName: 'Method',
      required: true,
      defaultValue: HttpMethod.GET,
      options: {
        options: [
          HttpMethod.GET,
          HttpMethod.POST,
          HttpMethod.PUT,
          HttpMethod.PATCH,
          HttpMethod.DELETE,
        ].map((value) => ({ label: value, value })),
      },
    }),
    queryParams: Property.Object({
      displayName: 'Query Parameters',
      required: false,
    }),
    body: Property.Json({
      displayName: 'JSON Body',
      required: false,
    }),
  },
  async run(context) {
    return magicHourApi.call({
      apiKey: context.auth.secret_text,
      method: context.propsValue.method,
      path: context.propsValue.path,
      queryParams: context.propsValue.queryParams,
      body: context.propsValue.body,
    });
  },
});
