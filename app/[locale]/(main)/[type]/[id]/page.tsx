import { CarouselRow, MediaCard, MediaDetails, MediaHero } from "@/components";
import { getMedia, getRecommendations } from "@/helpers/tmdb";
import type { MediaType } from "@/types";
import { getTranslations } from "next-intl/server";
import { APP_INFO } from "@/helpers/constants/appInfo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: MediaType; id: string }>;
}) {
  const { type } = await params;
  return {
     title: `Single ${type}: ${APP_INFO.name}`,
  };
}

export default async function SingleMedia({
  params,
}: {
  params: Promise<{ type: MediaType; id: string }>;
}) {
  const { id, type } = await params;
  const [item, recommendations] = await Promise.all([
    getMedia(type, id),
    getRecommendations(type, id),
  ]);
  const $t = await getTranslations();
  const titleNode = <div> {$t("more_like_this")}</div>;

  return (
    <div>
      {/* == Media Hero == */}
      <MediaHero item={item} />

      {/* == Media Details == */}
      <MediaDetails item={item} type={type}/>

      {/* == Media Recommendations == */}
      <CarouselRow titleNode={titleNode}>
        {recommendations?.results ? (
          recommendations.results.map((recommendation) => (
            <MediaCard
              key={recommendation.id}
              item={recommendation}
              type={type}
              className="flex-1 w-40 md:w-60"
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full w-full opacity-50">
            <strong>{$t("empty_list")}</strong>
          </div>
        )}
      </CarouselRow>
    </div>
  );
}
