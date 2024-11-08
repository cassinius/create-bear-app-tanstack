import PocketBase from "pocketbase";
import eventsource from "eventsource";

global.EventSource = eventsource;

export const pb = new PocketBase("http://localhost:2511");
