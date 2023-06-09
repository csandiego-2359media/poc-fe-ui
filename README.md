# POC FE UI
This is the proof-of-concept for the FE UI. It is a website where GoBiz Business Users will visit.

## Installation
Install all dependencies
```shell
yarn install
```

Create an `.env.local` file with the following variable
```shell
DIRECTUS_SERVER="<IP Address>"
```

Run the app locally
```shell
yarn dev
```

## Note
You will need the [POC Directus server](https://github.com/test487/poc-cms) running in the background for you to connect to the CMS UI which contains the DB data.
