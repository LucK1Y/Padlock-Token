
# Padlock Token Project

# Overview
see the app [App - Readme](app/README.md) 

# Important Notes

1. Install Python 3 and Node LTS on your system.
2. Clone this repository.
3. In the repository directory, run `npm i` or `yarn`.
4. Run `npm start` or `yarn start`.
5. Run `npm run migrate` or `yarn migrate`.
6. Run `npm test` or `yarn test`.

> A GUI version of [Ganache](https://www.trufflesuite.com/ganache) also can be
> downloaded.

### Frontend

1. Open a terminal in the project folder.
2. Run `npm i`. 
3. Run `npm run locksite`.
4. Open a terminal in the project folder.
5. Run `npm run chainsite` in the second terminal.

### Connect to frontend in browser

1. Open http://localhost:8080/
2. In a new Tab open Open http://localhost:4000/

### Instructions

1. On http://localhost:8080/ paste your public key and submit.
2. When you get a successfully registered id, copy the random string above the public key field.
3. On http://localhost:4000/ paste the copied id and submit.

Now the key is registered with the publik key as owner. 
To unlock the lock, enter a signed message on http://localhost:4000/ and submit.
To lock the key, press lock.

### Create a signed message
1. Open a terminal in the project folder.
2. Run `npm run cli`
3. Follow the termin instructions:  
    - Enter the complete path to the private key file. It probably can be found in the user space in the directory *.gnupg/*  
    - Enter the passphrase for the key pair
4. The singed message will be printed out in the console. From there it can be copied.

