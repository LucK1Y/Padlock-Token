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

## Remote Development

If you don't want to install Python and/or Node.js you can use the following
method

### Requirements

- [Docker](https://www.docker.com/products/docker-desktop) (not Docker-Toolbox)
  - make sure its running
- [Visual Studio Code](https://code.visualstudio.com/)
  - Extension: [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

### Instructions

1. Clone repo
2. Open folder in VS Code
3. Open commands (CTRL/⌘ + SHIFT + P)
4. Select: Remote-Containers: Reopen in Container
5. Wait until the installation is finished
6. Open a terminal via Terminal -> New Terminal
7. Run `./run.sh`
8. In the open tmux session, run `truffle migrate`


The Block-Chain Seed is

```sh
come craft limit group stock hollow front fantasy scare river animal settle
```

