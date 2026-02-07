import { toDot } from "../../engine";
import { standardNet } from "./net";

const dot = toDot(standardNet);
const proc = Bun.spawn(["dot", "-Tpng", "-o", import.meta.dir + "/net.png"], {
  stdin: new Response(dot),
});
await proc.exited;
console.log("Wrote net.png");
