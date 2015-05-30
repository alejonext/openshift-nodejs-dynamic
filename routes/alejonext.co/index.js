// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path'),
// ### Development **(default)**
    config = {
    // ### Production 
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: {
        url: 'https://alejonext.co',//+ process.env.OPENSHIFT_APP_DNS,
        compress: true,
        forceAdminSSL: true,
        mail: {
            transport: 'SMTP',
            from : process.env.SMTP_FROM,
            options: {
                service: process.env.SMTP_SERVICE,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            }
        },
        privacy: {
            useUpdateCheck: true,
            useGoogleFonts: true,
            useGravatar: true,
            useRpcPing: true,
            useStructuredData: true
        },
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(process.env.OPENSHIFT_DATA_DIR, 'content', 'data', 'ghost.db')
            },
            debug: false
        },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: process.env.OPENSHIFT_NODEJS_IP,
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: process.env.OPENSHIFT_NODEJS_PORT
        },
         paths: {
            contentPath: path.join(process.env.OPENSHIFT_DATA_DIR, 'content')
        },
        logging: false
    },
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        url: 'http://localhost:3000',

        // Example mail config
        // Visit http://support.ghost.org/mail for instructions
        // ```
        //  mail: {
        //      transport: 'SMTP',
        //      options: {
        //          service: 'Mailgun',
        //          auth: {
        //              user: '', // mailgun username
        //              pass: ''  // mailgun password
        //          }
        //      }
        //  },
        // ```

        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '..', '..', 'content', 'data', 'ghost-dev.db')
            },
            debug: false
        },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '3000'
        },
        paths: {
            contentPath: path.join(__dirname, '..', '..', 'content')
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, 'content', 'data', 'ghost-test.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing MySQL
    // Used by Travis - Automated testing run through GitHub
    'testing-mysql': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing pg
    // Used by Travis - Automated testing run through GitHub
    'testing-pg': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '127.0.0.1',
                user     : 'postgres',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    }

};

if (process.env.OPENSHIFT_MYSQL_DB_HOST) {
    config.production.database = {
        client: 'mysql',
        connection: {
            host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
            port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
            user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
            password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
            database : process.env.OPENSHIFT_APP_NAME,
            charset  : 'utf8'
        }
    };
} else if(process.env.OPENSHIFT_POSTGRESQL_DB_HOST){
    config.production.database = {
        client: 'pg',
        connection: {
            host     : process.env.OPENSHIFT_POSTGRESQL_DB_HOST,
            port     : process.env.OPENSHIFT_POSTGRESQL_DB_PORT,
            user     : process.env.OPENSHIFT_POSTGRESQL_DB_USERNAME,
            password : process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD,
            database : process.env.OPENSHIFT_APP_NAME,
            charset  : 'utf8'
        }
    };
}

// Export config
module.exports = config;