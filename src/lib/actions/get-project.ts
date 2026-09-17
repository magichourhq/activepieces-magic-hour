import { HttpMethod } from '@activepieces/pieces-common';
import { createAction, Property } from '@activepieces/pieces-framework';
import { magicHourAuth } from '../auth';
import { magicHourApi } from '../common/client';

export const getProjectAction = createAction({
  auth: magicHourAuth,
  name: 'get_project',
  displayName: 'Get Project',
  description: 'Get status, errors, credit charge, and downloads for a project.',
  props: {
    project_type: Property.StaticDropdown({
      displayName: 'Project Type',
      description: 'Select the media type created by the earlier action.',
      required: true,
      options: {
        options: [
          { label: 'Image', value: 'image' },
          { label: 'Video', value: 'video' },
          { label: 'Audio', value: 'audio' },
        ],
      },
    }),
    project_id: Property.ShortText({
      displayName: 'Project ID',
      description: 'Project ID returned by a Magic Hour creation action.',
      required: true,
    }),
  },
  async run(context) {
    return magicHourApi.call({
      apiKey: context.auth.secret_text,
      method: HttpMethod.GET,
      path: `/${context.propsValue.project_type}-projects/${context.propsValue.project_id}`,
    });
  },
});
