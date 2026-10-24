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
- Call Magic Hour JSON API endpoints through the custom API action, using a relative path, method, optional query parameters, and JSON body

Generation is asynchronous. Creation actions return a project ID. Use Get Project with the corresponding media type until the project reaches a terminal status, then use its download URLs.

## Authentication

Create an API key in the [Magic Hour Developer Hub](https://magichour.ai/developer). The key is stored as an Activepieces secret and sent only as a bearer token to `https://api.magichour.ai/v1`. Requests enforce TLS certificate verification and do not follow redirects. The custom action accepts JSON only; arbitrary destinations, custom authorization headers, raw/form-data bodies, binary responses, and proxy settings are not supported.

## Install

The v0.1.0 archive lacks the credential-handling and TLS fixes in current source. Do not use it for credentialed workflows.

On Activepieces editions with private-piece upload enabled, use the [v0.1.1 `.tgz` archive](https://github.com/magichourhq/activepieces-magic-hour/releases/download/v0.1.1/magichourhq-piece-magic-hour-0.1.1.tgz) from the [secure GitHub release](https://github.com/magichourhq/activepieces-magic-hour/releases/tag/v0.1.1) through **Platform Admin -> Pieces -> Install Piece -> Upload File**. Community Edition 0.92.3 does not enable archive upload; its supported installation option is **NPM Registry**, which requires a published package.

Public npm installation under `@magichourhq/piece-magic-hour` will be available after the package is published to npm. See the [Activepieces piece-management guide](https://www.activepieces.com/docs/admin-guide/guides/manage-pieces).

## Development

```bash
npm install
npm run build
```

Release archives require an Activepieces edition with private-piece upload enabled.

## License

MIT
