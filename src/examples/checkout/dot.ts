import { toDot } from "../../engine";
import { checkoutNet } from "./net";

const dot = toDot(checkoutNet);
const proc = Bun.spawn(["dot", "-Tpng", "-o", import.meta.dir + "/net.png"], {
  stdin: new Response(dot),
});
await proc.exited;
console.log("Wrote net.png");
