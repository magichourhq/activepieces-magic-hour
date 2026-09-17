# Magic Hour for Activepieces

An installable Activepieces piece for the [Magic Hour API](https://docs.magichour.ai/). It exposes Magic Hour image and video generation to visual workflows and Activepieces MCP agents.

## Actions

- Get the connected account and available credits
- Generate signed source-media upload URLs
- Create images from text
- Edit one or more images
- Create videos from an image or text prompt
- Swap faces in photos
- Create talking-photo videos
- Read image, video, or audio project status and download URLs
- Call any Magic Hour API endpoint through the custom API action

Generation is asynchronous. Creation actions return a project ID. Use Get Project with the corresponding media type until the project reaches a terminal status, then use its download URLs.

## Authentication

Create an API key in the [Magic Hour Developer Hub](https://magichour.ai/developer). The key is stored as an Activepieces secret and sent only as a bearer token to `https://api.magichour.ai/v1`.

## Install

Download the `.tgz` file from the [latest release](https://github.com/magichourhq/activepieces-magic-hour/releases/latest), then upload it from **Platform Admin -> Setup -> Pieces -> Install Piece -> Upload File**.

Public npm installation under `@magichourhq/piece-magic-hour` will be available after the package is published to npm.

## Development

```bash
npm install
npm run build
```

The release archive is designed for direct upload to an Activepieces instance.

## License

MIT
