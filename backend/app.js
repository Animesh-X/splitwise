const express = require("express");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");
const createApolloGraphqlServer = require('./src/graphql/index');
const config = require("./src/utils/config");
const logger = require("./src/utils/logger");
const UserService = require("./src/services/user");
// Dataflow diagram

const init = async () => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get("/", (req, res) =>{
        res.json({ message: "server is up and running!!!" });
    });

    const gqlServer = await createApolloGraphqlServer();

    app.use("/graphql", expressMiddleware(gqlServer, {
        context: async ({ req }) => {
            const authorization = req.headers["authorization"];
            if (authorization && authorization.startsWith("Bearer ")) {
                const token = authorization.replace("Bearer ", "");
                try {
                    const decodedToken = await UserService.decodeJWTToken(token);
                    const user = await UserService.getUser(decodedToken);
                    return { user };
                } catch (error) {
                    // console.error(error);
                    logger.error(error);
                }
            }
            return {};
        }
    }));


    app.listen(config.PORT, () => {
        console.log(`Server listening on PORT ${config.PORT}`);
        logger.info(`Server listening on PORT ${config.PORT}`);
    });
    
}

init();
