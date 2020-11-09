# Node - JS App

## Files:
├───src
│   │   etheriumT.js                    -- example interaction from JS with Contract
│   │   sign_example.js                 -- example interaction from JS with opgp
│   │
│   ├───client                          
│   │       client_test.js              -- example interaction with server
│   │
│   ├───resourcen
│   │       pgp_testVals.js             -- PGP test values private & Public key
│   │
│   └───server                          -- server as lock
│           lockApp.js                  -- main from server
│           lockEtherium.js             -- interaction with Contract
│           opgpHandler.js              -- check signature
│
└───templates                           -- old Resources from before fork
        index.html
        index.js