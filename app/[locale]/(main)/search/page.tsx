export const dynamic = 'force-dynamic';
import { getTranslations } from "next-intl/server";
import { SearchInput, MediaList } from "@/components";
import { fetchSearch } from "@/actions";
import type { MediaItem } from "@/types";
import { APP_INFO } from "@/helpers/constants/appInfo";

export async function generateMetadata( { searchParams } : {
  searchParams: { s?: string };
}) {
  const currentSearch = searchParams?.s?.trim() ?? '';
  return {
     title: currentSearch ? `Search for: ${currentSearch} : ${APP_INFO.name}` : 'Search',
  };
}

export default async function Search({ searchParams }: {
  searchParams: { s?: string };
}) {
  const $t = await getTranslations();
  const initialPage = 1;
  const currentSearch = searchParams?.s?.trim() ?? '';
  
  let error: unknown;
  let initialItems: MediaItem[] = [];

  try {
    if (currentSearch) {
      const data = await fetchSearch(initialPage, currentSearch);
      initialItems = data?.results || [];
    }
  } catch (e) {
    error = e;
  }

  return (
    <div>
      {/* Input */}
      <SearchInput />

      {/* Error */}
      {error ? (
        <div className="flex p-8 flex-col gap-3 items-start">
          <h1>{ $t('error_occurred_on_fetching') }</h1>
          <pre className="py-2 text-sm text-red-500">
            {JSON.stringify(error, null, 2)}
          </pre>
          <form method="GET">
            <button type="submit" className="border px-4 py-1 rounded cursor-pointer">
              { $t('retry') }
            </button>
          </form>
        </div>
      ) : currentSearch ? (
        <MediaList
          key={currentSearch}
          initialItems={initialItems}
          page={initialPage}
          type="movie"
          fetcherKey="search"
        >
          <div>{ $t('search_result_for', { currentSearch }) }</div>
        </MediaList>
      ) : (
        <div className="text-4xl p-10 opacity-50 text-center">
          { $t('type_something_to_search') }
        </div>
      )}
    </div>
  );
}
