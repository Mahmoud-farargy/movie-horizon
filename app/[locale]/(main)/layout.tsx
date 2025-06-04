import { NavBar, Footer, LazyLoadedModals } from "@/components";
import { Fragment } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <Fragment>
      <div className="grid grid-rows-[1fr_max-content] lg:grid-cols-[max-content_1fr] transition-colors w-full h-full overflow-hidden">
        {/* === Scroll Container === */}
        <div className="relative overflow-x-hidden overflow-y-auto w-full">
          <main className="min-h-svh">{children}</main>
          {/* == Footer == */}
          <Footer />
        </div>
        {/* === Navbar === */}
        <NavBar />
        {/* === Modals === */}
        <LazyLoadedModals />
      </div>
    </Fragment>
  );
}
