import prisma from '@/app/lib/prisma';

/**
 * Fetches a user by email from the database, including the associated profile.
 * @param email - The email of the user to retrieve.
 * @returns The user data, including profile, or null if not found.
 */
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
}

/**
 * Creates a new user in the database.
 * @param email - The email of the new user.
 * @param password - The hashed password of the new user.
 * @param role - The role of the new user (defaults to "user").
 * @returns The created user data.
 */
export async function createUser(email: string, password: string, role: string = 'user') {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        role,
      },
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Unable to create user');
  }
}

/**
 * Updates the refresh token for a user by their email.
 * @param email - The email of the user to update.
 * @param refreshToken - The new refresh token to set.
 * @returns The updated user data.
 */
export async function updateUserRefreshToken(email: string, refreshToken: string) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { refreshToken },
    });
    return user;
  } catch (error) {
    console.error('Error updating user refresh token:', error);
    throw new Error('Unable to update refresh token');
  }
}

/**
 * Fetches a user by their ID from the database, including the associated profile.
 * @param userId - The ID of the user to retrieve.
 * @returns The user data, including profile, or null if not found.
 */
export async function getUserById(userId: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
}

/**
 * Creates a profile for a specific user.
 * @param userId - The ID of the user to associate the profile with.
 * @param profileData - The profile data, including firstName, lastName, etc.
 * @returns The created profile data.
 */
export async function createUserProfile(userId: number, profileData: { 
  firstName: string; 
  lastName: string; 
  phoneNumber: string; 
  address?: string; 
  city?: string; 
  country?: string; 
}) {
  try {
    const profile = await prisma.profile.create({
      data: {
        userId,
        ...profileData,
      },
    });
    return profile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw new Error('Unable to create profile');
  }
}

/**
 * Deletes a user by their ID from the database.
 * @param userId - The ID of the user to delete.
 * @returns The deleted user data.
 */
export async function deleteUserById(userId: number) {
  try {
    const user = await prisma.user.delete({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Unable to delete user');
  }
}
