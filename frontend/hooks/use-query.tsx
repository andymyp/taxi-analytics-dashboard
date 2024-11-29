import { useQuery } from "@tanstack/react-query";
import { fetchTotals } from "@/services";
import { DateRange } from "react-day-picker";

export const useTotals = (key: string, date: DateRange | undefined) => {
  return useQuery({
    queryKey: [key, date?.from, date?.to],
    queryFn: () => fetchTotals(key, date),
  });
};
