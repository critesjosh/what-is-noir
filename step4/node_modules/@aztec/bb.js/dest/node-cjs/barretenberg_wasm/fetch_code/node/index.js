"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCode = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const url_1 = require("url");
function getCurrentDir() {
    if (typeof __dirname !== 'undefined') {
        return __dirname;
    }
    else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return (0, path_1.dirname)((0, url_1.fileURLToPath)(""));
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchCode(multithreaded) {
    const path = getCurrentDir() + '/../../barretenberg-threads.wasm';
    return await (0, promises_1.readFile)(path);
}
exports.fetchCode = fetchCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vZmV0Y2hfY29kZS9ub2RlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBDQUF1QztBQUN2QywrQkFBK0I7QUFDL0IsNkJBQW9DO0FBRXBDLFNBQVMsYUFBYTtJQUNwQixJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7U0FBTSxDQUFDO1FBQ04sNkRBQTZEO1FBQzdELGFBQWE7UUFDYixPQUFPLElBQUEsY0FBTyxFQUFDLElBQUEsbUJBQWEsRUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztBQUNILENBQUM7QUFFRCw2REFBNkQ7QUFDdEQsS0FBSyxVQUFVLFNBQVMsQ0FBQyxhQUFzQjtJQUNwRCxNQUFNLElBQUksR0FBRyxhQUFhLEVBQUUsR0FBRyxrQ0FBa0MsQ0FBQztJQUNsRSxPQUFPLE1BQU0sSUFBQSxtQkFBUSxFQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFIRCw4QkFHQyJ9