import { HttpMethod } from '@activepieces/pieces-common';
import { createAction, Property } from '@activepieces/pieces-framework';
import { magicHourAuth } from '../auth';
import { magicHourApi } from '../common/client';

export const talkingPhotoAction = createAction({
  auth: magicHourAuth,
  name: 'talking_photo',
  displayName: 'Create Talking Photo',
  description: 'Animate a photo to speak along with an audio track.',
  props: {
    image_file_path: Property.ShortText({
      displayName: 'Source Image',
      description:
        'Photo to animate. Use a direct image URL or Magic Hour file path.',
      required: true,
      placeholder: 'https://example.com/person.png',
    }),
    audio_file_path: Property.ShortText({
      displayName: 'Audio Track',
      description:
        'Speech audio to synchronize. Use a direct audio URL or Magic Hour file path.',
      required: true,
      placeholder: 'https://example.com/speech.mp3',
    }),
    start_seconds: Property.Number({
      displayName: 'Start Time',
      description: 'Start time in seconds within the audio track.',
      required: true,
      defaultValue: 0,
    }),
    end_seconds: Property.Number({
      displayName: 'End Time',
      description: 'End time in seconds. It must be after the start time.',
      required: true,
    }),
    generation_mode: Property.StaticDropdown({
      displayName: 'Motion Style',
      description:
        'Realistic preserves likeness. Prompted allows additional scene direction.',
      required: true,
      defaultValue: 'realistic',
      options: {
        options: [
          {
            label: 'Realistic',
            value: 'realistic',
          },
          {
            label: 'Prompted',
            value: 'prompted',
          },
        ],
      },
    }),
    prompt: Property.LongText({
      displayName: 'Motion Prompt',
      description:
        'Optional scene direction used only when Motion Style is Prompted.',
      required: false,
    }),
    max_resolution: Property.StaticDropdown({
      displayName: 'Maximum Resolution',
      description: 'Maximum output height in pixels.',
      required: false,
      options: {
        options: [
          { label: '480p', value: 480 },
          { label: '720p', value: 720 },
          { label: '1080p', value: 1080 },
        ],
      },
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
      path: '/ai-talking-photo',
      body: {
        start_seconds: context.propsValue.start_seconds,
        end_seconds: context.propsValue.end_seconds,
        assets: {
          image_file_path: context.propsValue.image_file_path,
          audio_file_path: context.propsValue.audio_file_path,
        },
        style: {
          generation_mode: context.propsValue.generation_mode,
          ...(context.propsValue.prompt
            ? { prompt: context.propsValue.prompt }
            : {}),
        },
        ...(context.propsValue.max_resolution
          ? { max_resolution: context.propsValue.max_resolution }
          : {}),
        ...(context.propsValue.name
          ? { name: context.propsValue.name }
          : {}),
      },
    });
  },
});
