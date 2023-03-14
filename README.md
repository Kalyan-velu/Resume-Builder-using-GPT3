# [Resume-Builder-using-GPT3](https://resume-builder-kamh.onrender.com)
[View Live Site](https://resume-builder-kamh.onrender.com)

This is a simple resume builder using GPT-3.
It is built using [React.js](https://react.org/), [Tailwind CSS](https://tailwindcss.com/),
and [Render](https://render.com/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [Render](https://render.com/) account
- [OpenAI](https://openai.com/) account
- [GPT-3](https://openai.com/blog/openai-api/) API key

### Installing

1. Clone the repository

```bash
git clone
```

2. Install dependencies

```bash
yarn install
```

3. Create a `.env` file in the root directory and add the following

```bash
OPENAI_API_KEY="your api key"
```

4. Run the app

```bash
yarn start
```

## Deployment

[![Deploy](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

1. Create a new [Render](https://render.com/) service
2. Add the following environment variables

```bash
OPENAI_API_KEY="your api key"
```

3. Add the following build command

```bash
yarn build
```

4. Add the following start command

```bash
node server/index.js
```

5. Deploy the service
6. Visit the URL to see the app running
7. Enjoy!
