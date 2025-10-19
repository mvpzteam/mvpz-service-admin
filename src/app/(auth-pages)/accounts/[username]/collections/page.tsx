"use client";
import AccountDetailsCollectionsSectionTable from "@/components/accounts/account-details/account-details-collections/account-details-collections-section-table";
import { TypographyH4, TypographyMuted } from "@/components/ui/typography";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

const AccountCollections = () => {
  const isMobile = useIsMobile();
  return (
    <div className="space-y-4">
      {" "}
      <div className="flex flex-col">
        <div
          className={`flex space-x-2  ${
            isMobile ? "flex-col-reverse gap-2" : "items-center"
          }`}
        >
          <TypographyH4>Collections : Abhishek Yadav </TypographyH4>
          <span className="w-fit text-xs text-muted-foreground border rounded-md px-2 py-1">
            1fecd379-cd08-471d-bd31-f023e54c9e5d
          </span>
        </div>
        <TypographyMuted>
          View and manage @abhishek's collections.
        </TypographyMuted>
      </div>
      <AccountDetailsCollectionsSectionTable view="collections" />
    </div>
  );
};

export default AccountCollections;
