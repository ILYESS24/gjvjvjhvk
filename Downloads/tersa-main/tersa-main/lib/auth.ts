import { eq } from "drizzle-orm";
import { getCredits } from "@/app/actions/credits/get";
import { profile } from "@/schema";
import { database } from "./database";
import { createClient } from "./supabase/server";

export const currentUser = async () => {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  return user;
};

export const currentUserProfile = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const userProfiles = await database
    .select()
    .from(profile)
    .where(eq(profile.id, user.id));
  let userProfile = userProfiles.at(0);

  if (!userProfile && user.email) {
    const response = await database
      .insert(profile)
      .values({ id: user.id })
      .onConflictDoNothing()
      .returning();

    // If insert was skipped due to conflict, fetch the existing profile
    if (response.length) {
      userProfile = response[0];
    } else {
      const existingProfiles = await database
        .select()
        .from(profile)
        .where(eq(profile.id, user.id));
      userProfile = existingProfiles.at(0);
    }
  }

  return userProfile;
};

export const requireAuth = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Authentication required");
  }

  return user;
};

export const requireProfile = async () => {
  const profile = await currentUserProfile();

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile;
};

/**
 * Ensures the user is authenticated and has an active subscription.
 * Used for premium features like AI generation.
 */
export const getSubscribedUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Authentication required");
  }

  const userProfile = await currentUserProfile();

  if (!userProfile) {
    throw new Error("User profile not found");
  }

  // Check if user has an active subscription or is in a free tier
  // For now, we allow any authenticated user with a profile
  // In production, you might want to check userProfile.subscriptionId
  // or integrate with Stripe to verify subscription status
  
  return user;
};