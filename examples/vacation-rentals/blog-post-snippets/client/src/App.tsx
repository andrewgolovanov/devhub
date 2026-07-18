import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@databricks/appkit-ui/react";

import { BookingManager } from "./BookingManager";
import { RevenueByDestination } from "./RevenueByDestination";
import { RevenueChart } from "./RevenueChart";
import { WanderbricksChat } from "./WanderbricksChat";

export default function App() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Wanderbricks Operations</h1>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Destination</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueByDestination />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Booking Manager</CardTitle>
          </CardHeader>
          <CardContent>
            <BookingManager />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ask about the data</CardTitle>
          </CardHeader>
          <CardContent>
            <WanderbricksChat />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
