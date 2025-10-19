import z from "zod";

export const globalelatedAccountSchema = z.object({
    id: z.string(),
    username: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    profileImage: z.string(),
    role: z.enum(["Athlete", "User"]),
    status: z.enum(["Active", "Inactive"]),
    isVerified: z.boolean(),
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  });
  