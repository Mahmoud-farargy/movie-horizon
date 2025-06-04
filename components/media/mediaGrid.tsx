
import { NotAvailableList } from "@/components";
export default function MediaGrid({children}: {children: React.ReactNode}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4 p-4 p-md-8">
      {children || <NotAvailableList />}
    </div>
  )
}
