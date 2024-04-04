# scan

## Getting Started

### Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Run with docker:

Build a Docker image

```bash
docker build -t scan .
```

Run the Docker image

```bash
docker run -p 8095:8095 --env-file .env.local -it scan
```

## License
[MIT](./LICENSE)
