# Psyche

![Workflow](https://github.com/ffimnsr/psyche/workflows/psyche/badge.svg)

## Development

To run this in development, first pull the node LTS (currently its fermium) docker images.

```bash
docker pull node:fermium-buster
```

Then run node container service:

```bash
docker-compose run --rm --service-ports node_docker
```

On the container terminal, run `pnpm start`.

## Typescript Basic Types

Listed below are basic types that can be use on typescript for reference.

- `boolean`
- `number`
- `string`
- `array` (e.g. number[] or Array<number>)
- `tuple` (e.g. [string, number])
- `enum`
- `any`
- `void`
- `null` and `undefined`
- `never` (e.g. exceptions throws)

## Extra Polyfill Package (Fallbacks)

- stream-browserify
- browserify-zlib
- util
- buffer
- assert
