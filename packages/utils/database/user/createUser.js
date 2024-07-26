import prismaClient from "@nyxia/database";
import { ObjectId } from "mongodb";

/**
 * Create a user in the database
 *
 * @param {Object} user - The user object containing user details.
 * @param {string} user.id - The ID of the user.
 * @param {string} user.username - The username of the user.
 * @param {string} [user.globalName] - The global name of the user.
 * @param {string} user.discriminator - The discriminator of the user.
 * @param {string} user.avatar - The avatar of the user.
 * @returns {Promise<boolean>} - Whether the user was created
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function createUser(user) {
 try {
  const createdUser = await prismaClient.user.upsert({
   where: {ID: new ObjectId().toString(),
    discordId: user.id,
   },
   update: {
    name: user.username,
    global_name: user.globalName || user.username,
    avatar: user.avatar,
    discriminator: user.discriminator,
   },
   create: {
    ID: new ObjectId().toString(),
    discordId: user.id,
    name: user.username,
    global_name: user.globalName || user.username,
    avatar: user.avatar,
    discriminator: user.discriminator,
   },
  });
  return createdUser;
 } catch (e) {
  console.log("Failed to create user:", e);
  throw e;
 }
}
