  import SectionChartAreaInteractive from "@/components/overview/overview-chart-area";
import PlatformAccountsDataTable from "@/components/overview/overview-accounts-table";
import OverviewGridCards from "@/components/overview/overview-grid-cards";

import { TypographyH1 } from "@/components/ui/typography";
import OverviewOrderTable from "@/components/overview/overview-order-table";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col space-y-4">
    <div className="flex items-center justify-between space-y-2">
      <TypographyH1>Hi, Welcome back 👋</TypographyH1>
    </div>

    <OverviewGridCards />
    <SectionChartAreaInteractive />
    <OverviewOrderTable />
  </div>
  );
}




