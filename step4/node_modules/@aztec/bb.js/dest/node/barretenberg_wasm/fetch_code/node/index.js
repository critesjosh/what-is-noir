import { readFile } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
function getCurrentDir() {
    if (typeof __dirname !== 'undefined') {
        return __dirname;
    }
    else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return dirname(fileURLToPath(import.meta.url));
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchCode(multithreaded) {
    const path = getCurrentDir() + '/../../barretenberg-threads.wasm';
    return await readFile(path);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vZmV0Y2hfY29kZS9ub2RlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRXBDLFNBQVMsYUFBYTtJQUNwQixJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7U0FBTSxDQUFDO1FBQ04sNkRBQTZEO1FBQzdELGFBQWE7UUFDYixPQUFPLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7QUFDSCxDQUFDO0FBRUQsNkRBQTZEO0FBQzdELE1BQU0sQ0FBQyxLQUFLLFVBQVUsU0FBUyxDQUFDLGFBQXNCO0lBQ3BELE1BQU0sSUFBSSxHQUFHLGFBQWEsRUFBRSxHQUFHLGtDQUFrQyxDQUFDO0lBQ2xFLE9BQU8sTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsQ0FBQyJ9