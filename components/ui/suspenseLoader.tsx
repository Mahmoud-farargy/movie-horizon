import { Suspense } from "react";


const SuspenseLoader = ({children}:{children: React.ReactNode}) => <Suspense fallback={<div className="mt-10 text-center">Loading...</div>}>{children}</Suspense>;
export default SuspenseLoader;