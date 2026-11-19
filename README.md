# Magic Hour for Activepieces

[![npm](https://img.shields.io/npm/v/@magichourhq/piece-magic-hour)](https://www.npmjs.com/package/@magichourhq/piece-magic-hour)

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

Install the [npm package](https://www.npmjs.com/package/@magichourhq/piece-magic-hour) through **Platform Admin -> Catalogue -> Pieces -> Install Piece -> NPM Registry**. Enter `@magichourhq/piece-magic-hour` as the package name and the current version from the npm badge above. This route works on Community Edition. See the [Activepieces piece-management guide](https://www.activepieces.com/docs/admin-guide/guides/manage-pieces).

On editions with private-piece upload enabled, you can instead upload the `.tgz` archive attached to the [latest GitHub release](https://github.com/magichourhq/activepieces-magic-hour/releases/latest) through **Platform Admin -> Pieces -> Install Piece -> Upload File**. Don't use the v0.1.0 archive: it lacks the credential-handling and TLS fixes.

## Development

```bash
yarn install
yarn build
```

To release, bump the version in `package.json` in a PR. Merging it to `main` publishes to npm and creates the GitHub release with the `.tgz` archive.

## License

MIT
