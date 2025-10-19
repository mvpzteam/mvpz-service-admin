import AccountsGridCards from '@/components/accounts/accounts-grid-card'
import AthleteHubGridCards from '@/components/athlete-hub/athlete-hub-grid-card'
import AthleteHubSectionTable from '@/components/athlete-hub/athlete-hub-section-table'
import { Button } from '@/components/ui/button'
import { TypographyH2, TypographyMuted } from '@/components/ui/typography'
import { PlusIcon } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-1 flex-col space-y-4">
    <div className="flex items-center justify-between space-y-2">
        <div className="flex flex-col  items-start">
        <TypographyH2>Athlete Hub</TypographyH2>
        <TypographyMuted>Manage your athlete hub here</TypographyMuted>
        </div>
    </div>
    <AthleteHubGridCards />

    <AthleteHubSectionTable view="Education Blogs" />
</div>
  )
}

export default page
