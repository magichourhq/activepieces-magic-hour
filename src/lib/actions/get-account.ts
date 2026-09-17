import { HttpMethod } from '@activepieces/pieces-common';
import { createAction } from '@activepieces/pieces-framework';
import { magicHourAuth } from '../auth';
import { magicHourApi } from '../common/client';

export const getAccountAction = createAction({
  auth: magicHourAuth,
  name: 'get_account',
  displayName: 'Get Account',
  description: 'Get the connected Magic Hour account and credit balance.',
  props: {},
  async run(context) {
    return magicHourApi.call({
      apiKey: context.auth.secret_text,
      method: HttpMethod.GET,
      path: '/account',
    });
  },
});
