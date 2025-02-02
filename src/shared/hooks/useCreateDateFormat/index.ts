import { IArticle } from "@/entities/Article/models/types";
import { useEffect, useMemo, useState } from "react";

export const useCreateDateFormat = (data: IArticle | null) => {
  const [dateFormat, setDateFormat] = useState("");

  useEffect(() => {
    if (data) {
      const date = new Date(data.createdAt);
      const formattedDate = date.toISOString().replace("T", " ").slice(0, 19);
      setDateFormat(formattedDate);
    }
  }, [data]);

  return useMemo(() => dateFormat, [dateFormat]);
};
