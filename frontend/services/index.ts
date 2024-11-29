import axios from "@/lib/axios";
import { DateRange } from "react-day-picker";

export const fetchTotals = async (key: string, date: DateRange | undefined) => {
  let dateParams: Record<string, string> = {};

  if (date) {
    const start = new Date(date.from!);
    const to = new Date(date.to!);

    start.setHours(start.getHours() + 7);
    to.setHours(to.getHours() + 7);

    dateParams["start"] = start.toISOString().split("T")[0] as string;
    dateParams["end"] = to.toISOString().split("T")[0] as string;
  }

  const { data } = await axios.get(`/nyc/${key}`, {
    params: dateParams,
  });

  return data;
};
