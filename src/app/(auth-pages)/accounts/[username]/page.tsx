"use client";

import AccountBasicDetailsSections from "@/components/accounts/account-details/account-details-basicInfo-sections";
import { TypographyH4, TypographyMuted } from "@/components/ui/typography";
import { useIsMobile } from "@/hooks/use-mobile";
import React, { useState } from "react";
import z from "zod";

export const FormSechma = z.object({
  bannerImage: z.string(),
  coverImage: z.string(),
  username: z.string().min(1).includes("@"),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["athlete", "user"]),
  accountType: z.enum(["default", "platformDefault", "mascot", "testing"]),
});

const AccountDetailPage = () => {
  const isMobile = useIsMobile();
  const [isEditable, setIsEditable] = useState(false);
  const [form, setForm] = useState<z.infer<typeof FormSechma>>({
    bannerImage: "",
    coverImage: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    role: "user",
    accountType: "default",
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <div
          className={`flex space-x-2  ${
            isMobile ? "flex-col-reverse gap-2" : "items-center"
          }`}
        >
          <TypographyH4>User Details : Abhishek Yadav </TypographyH4>
          <span className="w-fit text-xs text-muted-foreground border rounded-md px-2 py-1">
            1fecd379-cd08-471d-bd31-f023e54c9e5d
          </span>
        </div>
        <TypographyMuted>
          View and manage your account details, including your username, email,
          and password.
        </TypographyMuted>
      </div>
      <AccountBasicDetailsSections
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        form={form}
        setForm={setForm}
      />
    
    </div>
  );
};

export default AccountDetailPage;
