# DHBW Truffle Project

## Installation instructions

Download all dependencies in the root and app directory, e.g.

```sh
yarn
cd app
yarn
```

Download [Ganache](https://www.trufflesuite.com/ganache) and start it on your
device. Afterwards, run

```sh
cd ..
yarn run truffle migrate
cd app
yarn start
```

Now, the frontend should be running on `localhost:8080`.

Finally, install [Metamask](https://metamask.io/) in your browser.
