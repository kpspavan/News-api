// utils/api/api.ts
import axios from "axios";

const apiKey = "b9ecd3502ebd47749cb969dd711ea0a4";
const baseUrl = "https://newsapi.org/v2/everything";

function adjustForTimezoneOffset(date: Date | null) {
  if (!date) return "";

  const userTimezoneOffset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - userTimezoneOffset * 60000);

  return adjustedDate.toISOString().split("T")[0];
}

export async function fetchArticles(
  searchKeyword: string = "news",
  fromDate: Date | null = null
) {
  const fromDateParam = fromDate
    ? `&from=${adjustForTimezoneOffset(fromDate)}`
    : "";

  const url = `${baseUrl}?q=${encodeURIComponent(
    searchKeyword
  )}${fromDateParam}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}
