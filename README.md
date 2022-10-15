Create API Routes using apiHandler higher order function for consistency and clean code 🔥

## Features ⚡

- `res.json()` is called only when we need to send a success response.
- Error responses are handled by apiHandler when we throw an error.
- Controllers are divided into functions and plugged into the API Route by their respective `req.method` which is kind of reminiscent of how Express.js routes are defined.

## Technologies 🧪

- Next.js
- TypeScript
- [Yup](https://www.npmjs.com/package/yup)
- [http-errors](https://www.npmjs.com/package/http-errors)

## Installation 📦

````bash
First, run the development server:

```bash
npm run dev
# or
yarn dev
````

## Try it out! 🚀

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/16832202-de3b3f8e-f82b-403f-9530-836f4c5adc22?action=collection%2Ffork&collection-url=entityId%3D16832202-de3b3f8e-f82b-403f-9530-836f4c5adc22%26entityType%3Dcollection%26workspaceId%3D73ada041-1978-4536-b11c-a3bd606bd1b0)

## Checkout the related Post on Dev.to 📖
