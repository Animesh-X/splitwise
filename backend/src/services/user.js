const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../models");
const logger = require("../utils/logger");
const { ErrorTypes, throwCustomError } = require("../utils/error");

class UserService {
  static async #getUserById(id) {
      const user = await db.User.findByPk(id);
      return user;
  }

  static async getUserByEmail(email) {
    const user = await db.User.findOne({
      where: { email: email },
    });
    return user;
  }

  static async createUser(payload) {
    const { firstName, lastName, email, password, profileImageURL } = payload;

    logger.info(`About to create new User`);

    const user = await UserService.getUserByEmail(email);

    if (user) {
      throwCustomError("User already exists!", ErrorTypes.CONFLICT);
    }
    try {
      const newUser = await db.User.create({
        firstName,
        lastName,
        email,
        password,
        profileImageURL,
      });

      logger.info(
        `New User created successfully ${newUser.id} - ${newUser.firstName} - ${newUser.email}`
      );

      return newUser;
    } catch (error) {
      throwCustomError("Error creating User", ErrorTypes.BAD_REQUEST, error);
    }
  }

  static async getUserToken(payload) {
    const { email, password } = payload;

    const user = await UserService.getUserByEmail(email);

    if (!user) {
      throwCustomError("User not Found!", ErrorTypes.BAD_USER_INPUT);
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      throwCustomError("Invalid Password!", ErrorTypes.UNAUTHORIZED);
    }

    const userPayload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(userPayload, process.env.SECRET);

    return token;
  }

  static async addFriend(payload) {
    const { userId, friendId } = payload;
    logger.info(`Adding friend - ${friendId} to user - ${userId}`);
    const user = await UserService.#getUserById(userId);
    if(!user) {
        throwCustomError("User not Found!", ErrorTypes.BAD_USER_INPUT);
    }
    const friend = await UserService.#getUserById(friendId);
    if(!friend) {
        throwCustomError("Friend not Found!", ErrorTypes.BAD_USER_INPUT);
    }
    await db.UserFriend.create({
        userId,
        friendId
    });
    return "Added Friend successfully";
  }

  static async getFriends(payload) {
    const { userId } = payload;
    logger.info(`Getting friends of user - ${userId}`);
    try {
      const user = await UserService.#getUserById(userId);
      if (!user) {
        throwCustomError("User not Found!", ErrorTypes.BAD_USER_INPUT);
      }
      const friends = await user.getFriends(); // This is where the generated method is used
      return friends;
    } catch (error) {
      throwCustomError("Error fetching friends", ErrorTypes.INTERNAL_SERVER_ERROR, error);
    }
  }
}

module.exports = UserService;
