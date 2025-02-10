import { serve } from "bun";

serve({
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      return new Response("Hello World!");
    } else if (url.pathname === "/ronaldo") {
      return new Response("He is the just a baller");
    } else if (url.pathname === "/messi") {
      return new Response("He is the GOAT");
    } else {
      return new Response("Not Found", { status: 404 });
    }
  },
});
