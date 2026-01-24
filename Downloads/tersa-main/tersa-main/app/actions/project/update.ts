"use server";

import { and, eq } from "drizzle-orm";
import { currentUser } from "@/lib/auth";
import { database } from "@/lib/database";
import { parseError } from "@/lib/error/parse";
import { projects } from "@/schema";

/**
 * Updates a project with the given data.
 * Validates that the user owns the project before updating.
 */
export const updateProjectAction = async (
  projectId: string,
  data: Partial<typeof projects.$inferInsert>
): Promise<
  | {
      success: true;
    }
  | {
      error: string;
    }
> => {
  try {
    // Validate projectId format (should be a valid UUID or nanoid)
    if (!projectId || typeof projectId !== "string" || projectId.length < 10) {
      throw new Error("Invalid project ID");
    }

    const user = await currentUser();

    if (!user) {
      throw new Error("You need to be logged in to update a project!");
    }

    // Use .returning() to verify the update was successful
    const [updatedProject] = await database
      .update(projects)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(and(eq(projects.id, projectId), eq(projects.userId, user.id)))
      .returning({ id: projects.id });

    // Check if any row was actually updated
    if (!updatedProject) {
      throw new Error("Project not found or you don't have permission to update it");
    }

    return { success: true };
  } catch (error) {
    const message = parseError(error);

    return { error: message };
  }
};
