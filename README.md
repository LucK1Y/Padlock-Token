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

If you don't want to install python and/or node you can use the following method

### Requirements

- [Docker](https://www.docker.com/products/docker-desktop) (not Docker-Toolbox)
  - make sure its running
- [VS Code insiders](https://code.visualstudio.com/insiders/)
  - Extension: [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

### Instructions

1. clone repo
2. open folder in vs code insiders
3. open commands (CTRL + SHIFT + P)
4. select: Remote-Containers: Open Folder in Container...
5. wait until the installation is finished
