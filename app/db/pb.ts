import PocketBase from "pocketbase";
import eventsource from "eventsource";

global.EventSource = eventsource;

let pb: PocketBase = null!;

export function getPb() {
  if (!pb) {
    pb = new PocketBase("http://localhost:2511");
  }
  return pb;
}
