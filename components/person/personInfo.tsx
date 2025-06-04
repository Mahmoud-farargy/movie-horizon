
import type { PersonItem } from "@/types"
import { useMemo } from "react";
import { IMDB_IMAGE_BASE_URL } from "@/helpers/constants";
import NextImage from "next/image";
import { useTranslations } from "next-intl";
import ExternalLinks from "@/components/ui/externalLinks";

interface PersonInfo {
  item: PersonItem
}
export default function PersonInfo({ item } : PersonInfo) {
  const $t = useTranslations();
  const externalIds = useMemo(() => ({...item.external_ids, homepage: item.homepage}), [item]);

  const infoData = useMemo(() => ([
    {title: $t('known_for'), value: item.known_for_department},
    {title: $t('place_of_birth'), value: item.place_of_birth},
    {title: $t('birthday') , value: item.birthday},

  ]), [$t, item]);
  return (
    <>
    {item && <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-8 p-4 p-md-8 items-center m-auto">
        {item.profile_path && <NextImage
            width={400}
            height={600}
            src={item.profile_path ? `${IMDB_IMAGE_BASE_URL}${item.profile_path}` : ''}
            alt={item.name}
            className="block border-4 border-gray-300/10 w-[70%] md:w-[90%] self-start mt-5 mx-auto transition-all duration-[400] object-cover aspect-[3/4]"
        />}
        <div className="p-1 gap-8">
          <div>
            {/* Person name */}
            <h2 className="text-3xl mb-4">
              { item.name}
            </h2>
            {/* Their Biography */}
            {item.biography ? <div className="font-sans whitespace-pre-wrap opacity-80 leading-relaxed" >
              {item.biography}
              </div> :
              <div className="opacity-50 italic">
                { $t('no_biography')}
              </div>
            }
          </div>
          <div className="text-sm opacity-80">
            <ul className="grid grid-cols-[max-content_1fr] gap-3">
              {
                infoData?.map((item, index) => (
                  item ? (
                    <div key={index}>
                      <div className="opacity-60 ">
                        { item.title }
                      </div>
                      <div>
                        { item.value}
                      </div>
                    </div>) : null
                ))
              }
            </ul>
          </div>
          {/* External Links */}
          <div>
            <ExternalLinks links={externalIds}/>
          </div>
        </div>
      </div>}
    </>
  )
}
