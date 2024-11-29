"use client";

import CounterCard from "@/components/ui-customs/counter-card";
import { useTotals } from "@/hooks/use-query";
import { AppState } from "@/redux";
import { Car, DollarSign, Users, TrendingUp } from "lucide-react";
import { useSelector } from "react-redux";

export default function DashboardPage() {
  const date = useSelector((state: AppState) => state.app.date);

  const { data: totalTrips, isLoading: tripsLoading } = useTotals(
    "total-trips",
    date
  );

  const { data: totalPassengers, isLoading: passengersLoading } = useTotals(
    "total-passengers",
    date
  );

  const { data: totalFare, isLoading: fareLoading } = useTotals(
    "total-fare",
    date
  );

  const { data: avgFare, isLoading: avgFareLoading } = useTotals(
    "avg-fare",
    date
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CounterCard
          index={0}
          {...cards[0]}
          isLoading={tripsLoading}
          value={totalTrips}
        />
        <CounterCard
          index={1}
          {...cards[1]}
          isLoading={passengersLoading}
          value={totalPassengers}
        />
        <CounterCard
          index={2}
          {...cards[2]}
          isLoading={fareLoading}
          value={totalFare}
        />
        <CounterCard
          index={3}
          {...cards[3]}
          isLoading={avgFareLoading}
          value={avgFare}
        />
      </div>
      <div className="min-h-[100vh] w-full rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}

const cards = [
  {
    title: "Total Trips",
    value: "0",
    icon: Car,
    description: "Taxi trips",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    decimals: 2,
  },
  {
    title: "Total Passengers",
    value: "0",
    icon: Users,
    description: "Passengers transported",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    decimals: 2,
  },
  {
    title: "Total Fare",
    value: "0",
    icon: DollarSign,
    description: "Revenue generated",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    decimals: 2,
    isCurrency: true,
  },
  {
    title: "Average Fare",
    value: "0",
    icon: TrendingUp,
    description: "Per trip average",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    decimals: 2,
    isCurrency: true,
  },
];
