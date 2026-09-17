import { HttpMethod } from '@activepieces/pieces-common';
import { createAction, Property } from '@activepieces/pieces-framework';
import { magicHourAuth } from '../auth';
import { magicHourApi } from '../common/client';

export const faceSwapPhotoAction = createAction({
  auth: magicHourAuth,
  name: 'face_swap_photo',
  displayName: 'Face Swap Photo',
  description: 'Start a photo face-swap job using source and target images.',
  props: {
    target_file_path: Property.ShortText({
      displayName: 'Target Image',
      description:
        'Image whose detected faces will be replaced. Use a direct URL or Magic Hour file path.',
      required: true,
    }),
    source_file_path: Property.ShortText({
      displayName: 'Source Face Image',
      description:
        'Image containing the replacement face. Use a direct URL or Magic Hour file path.',
      required: true,
    }),
    name: Property.ShortText({
      displayName: 'Project Name',
      description: 'Optional name shown in the Magic Hour project list.',
      required: false,
    }),
  },
  async run(context) {
    return magicHourApi.call({
      apiKey: context.auth.secret_text,
      method: HttpMethod.POST,
      path: '/face-swap-photo',
      body: {
        assets: {
          face_swap_mode: 'all-faces',
          target_file_path: context.propsValue.target_file_path,
          source_file_path: context.propsValue.source_file_path,
        },
        ...(context.propsValue.name
          ? { name: context.propsValue.name }
          : {}),
      },
    });
  },
});
