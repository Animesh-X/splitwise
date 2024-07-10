const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const createApolloGraphqlServer = require('./src/graphql/index');
const config = require("./src/utils/config");
const logger = require("./src/utils/logger");
// Dataflow diagram

const init = async () => {
    const app = express();
    app.use(express.json());

    app.get("/", (req, res) =>{
        res.json({ message: "server is up and running!!!" });
    });

    const gqlServer = await createApolloGraphqlServer();

    app.use("/graphql", expressMiddleware(gqlServer));

    app.listen(config.PORT, () => {
        console.log(`Server listening on PORT ${config.PORT}`);
        logger.info(`Server listening on PORT ${config.PORT}`);
    });
    
}

init();
