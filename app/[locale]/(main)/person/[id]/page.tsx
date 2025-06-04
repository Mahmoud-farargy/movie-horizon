import { getPerson } from "@/helpers/tmdb";
import { PersonDetails } from "@/components";

export default async function Person({params} : { params: {id: string} }) {
  const { id } = await params;
  const person = await getPerson(id);
  
  return (
    <PersonDetails item={person} />
  )
}
