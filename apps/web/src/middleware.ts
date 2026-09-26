import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { logPageVisit } from "./lib/log-page-visit";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/notes(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  logPageVisit(req);
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
