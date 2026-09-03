import { FarmHome } from "@/components/farm/FarmHome";
import { getFarmHomepageData } from "@/libs/farm-microcms";
import { DEFAULT_GOOGLE_CALENDAR_EMBED_URL, getUpcomingCalendarEvents } from "@/libs/google-calendar";

export const revalidate = 60;

export default async function Home() {
  const { siteGlobals, articles, projects, people } = await getFarmHomepageData();
  const calendarUrl =
    siteGlobals?.scheduleCalendarEmbedUrl ||
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_EMBED_URL ||
    DEFAULT_GOOGLE_CALENDAR_EMBED_URL;
  const upcomingEvents = await getUpcomingCalendarEvents(calendarUrl, 3);

  return <FarmHome globals={siteGlobals} articles={articles} projects={projects} people={people} upcomingEvents={upcomingEvents} />;
}
