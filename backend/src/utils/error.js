const { ApolloServerErrorCode } = require("@apollo/server/errors");
const { GraphQLError } = require("graphql");
const logger = require("./logger");

const ErrorTypes = {
    BAD_USER_INPUT: {
        errorCode: ApolloServerErrorCode.BAD_USER_INPUT,
        errorStatus: 400
    },
    BAD_REQUEST: {
        errorCode: ApolloServerErrorCode.BAD_REQUEST,
        errorStatus: 400
    },
    UNAUTHORIZED: {
        errorCode: "UNAUTHORIZED",
        errorStatus: 401
    },
    FORBIDDEN: {
        errorCode: "FORBIDDEN",
        errorStatus: 403
    },
    NOT_FOUND: {
        errorCode: "NOT_FOUND",
        errorStatus: 404
    },
    CONFLICT: {
        errorCode: "CONFLICT",
        errorStatus: 409
    },
    INTERNAL_SERVER_ERROR: {
        errorCode: "INTERNAL_SERVER_ERROR",
        errorStatus: 500
    },
};

const throwCustomError = (errorMessage, errorType, error) => {
    logger.error(`${errorMessage} - ${error}`);
    throw new GraphQLError(errorMessage, {
        extensions: {
            code: errorType.errorCode,
            http: {
                status: errorType.errorStatus
            }
        }
    })
};

module.exports = { ErrorTypes, throwCustomError };