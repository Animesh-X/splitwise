const db = require("../../models");
const logger = require("../utils/logger");
const { ErrorTypes, throwCustomError } = require("../utils/error");

class GroupService {

  static async createGroup(payload) {
    const { name, description, userId, imageURL } = payload;
    logger.info("About to create new Group");
    try {
      const group = await db.Group.create({
        name,
        description,
        createdBy: userId,
        imageURL
      });
      await db.UserGroup.create({
        userId,
        groupId: group.id
      });
      logger.info(`New Group Created ${group.id} - ${group.name} - ${group.createdBy}`);
      return group;
    } catch (error) {
      throwCustomError("Error Creating Group", ErrorTypes.BAD_REQUEST, error);
    }
  }

  static async getUser(group) {
    try {
      const user = await db.User.findOne({
        where: { id: group.createdBy }
      });
      return user;
    } catch (error) {
      throwCustomError("Error Fetching User", ErrorTypes.NOT_FOUND, error);
    }
  }

  static async getUsersByGroupId(groupId) {
    try {
      // const groupWithUsers = await db.Group.findByPk(groupId, {
      //   include: {
      //     model: db.User,
      //     through: { attributes: [] } // This ensures only the User fields are returned, not the UserGroup join table fields
      //   }
      // });
  
      // if (groupWithUsers) {
      //   return groupWithUsers.Users; // Returns the list of users associated with the group
      // } else {
      //   return null; // Group not found
      // }
      logger.info(`Fetching Users of Group`);
      // const data = [];
      // Todo.  Use sequelize model to query
      // const [results, metadata] = await db.sequelize.query(
      //   `
      //   SELECT u.id, u.first_name AS firstName, u.last_name AS lastName, u.email, u.image_url AS profileImageURL
      //   FROM users u
      //   INNER JOIN user_groups ug ON u.id = ug.userId
      //   INNER JOIN \`groups\` g ON g.id = ug.groupId
      //   WHERE g.id = ?
      //   `,
      //   {
      //     replacements: [groupId],
      //     type: db.Sequelize.QueryTypes.SELECT
      //   }
      // );
      // // console.log(results,Object.keys(results).length);
      // // return Object.keys(results).length ? results : [];
      // data.push(results);
      const group = await db.Group.findByPk(groupId);
      if (!group) {
        throw new Error('Group not found');
      }

      const users = await group.getUsers(); // Assuming you have defined this association properly

      // Optionally, format the result to match your expected output
      const formattedUsers = users.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImageURL: user.profileImageURL
      }));

      logger.info(`Fetched Users of Group successfully!`);
      return formattedUsers;
    } catch (error) {
      throwCustomError("Error fetching users for group", ErrorTypes.BAD_USER_INPUT, error);
    }
  }

  static async addMemberToGroup(payload){
      const { userId, groupId } = payload;
      logger.info(`Adding member - ${userId} to group - ${groupId}`);
      try {
        await db.UserGroup.create({
          userId,
          groupId
        });
        logger.info(`Member - ${userId} added successfully to group - ${groupId}`)
        return "Added member successfully!"
      } catch (error) {
        throwCustomError(`Failed to add user - ${userId} to group - ${groupId}`, ErrorTypes.BAD_USER_INPUT, error);
      }
  }

  static async getGroup(payload) {
    const { groupId } = payload;
    logger.info(`Fetching group with id - ${groupId}`);
    try {
      const group = await db.Group.findByPk(groupId);
      logger.info(`Fetching group with id - ${groupId} successfully!`);
      return group;
    } catch (error) {
      throwCustomError(`Failed to fetch group with id - ${groupId}`, ErrorTypes.BAD_REQUEST, error);
    }
  }

  static async getExpensesByGroupId(groupId) {
    logger.info(`Fetching expenses for group with id - ${groupId}`);
    try {
      const expenses = await db.Expense.findAll({
        where: { groupId },
        include: [
          {
              model: db.ExpenseItem,
              as: 'transactions', 
              include: [db.User]
          },
          {
              model: db.User,
              as: 'createdByUser',
          }
      ]
      });
      return expenses;
    } catch (error) {
      throwCustomError(`Failed to fetch expenses for group with id - ${groupId}`, ErrorTypes.BAD_REQUEST, error);
    }
  }

  static async getPaymentsGraphByGroupId (groupId) {
    logger.info(`Fetching payments graph for group with id - ${groupId}`);
    try {
      const paymentGraph = await db.PaymentGraph.findAll({
        where: { groupId },
        include: [
          {
            model: db.User,
            as: 'user'
          },
          {
            model: db.User,
            as: 'oweFrom'
          }
        ]
      });
      return paymentGraph;
    } catch (error) {
      logger.error(`Failed to fetch payments graph for group with id - ${groupId}`, ErrorTypes.BAD_REQUEST, error);
    }
  }

  static async isUserMemberOfGroup(userId, groupId) {
    const member = await db.UserGroup.findOne({
      where: {
          userId,
          groupId
      }
    });
    return !!member;
  }

}

module.exports = GroupService;
