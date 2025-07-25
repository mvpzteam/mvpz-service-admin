import AccountsGridCards from '@/components/accounts/accounts-grid-card'
import AccountsSectionTable from '@/components/accounts/accounts-section-table'
import { Button } from '@/components/ui/button'
import { TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyLarge, TypographyLead, TypographyMuted } from '@/components/ui/typography'
import { PlusIcon } from 'lucide-react'
import React from 'react'

const ApplicationAccounts = () => {
  return (
    <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-center justify-between space-y-2">
            <div className="flex flex-col  items-start">
            <TypographyH2>Accounts</TypographyH2>
            <TypographyMuted>Manage your accounts here</TypographyMuted>
            </div>
            <Button variant="outline">
                <PlusIcon className="h-4 w-4" />
                Add Account
            </Button>
        </div>
        <AccountsGridCards />

        <AccountsSectionTable view="athletes" />
    </div>
  )
}

export default ApplicationAccounts