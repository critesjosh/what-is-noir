"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarretenbergWasmMain = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const index_js_1 = require("../helpers/index.js");
const index_js_2 = require("../barretenberg_wasm_thread/factory/node/index.js");
const index_js_3 = require("../barretenberg_wasm_base/index.js");
const heap_allocator_js_1 = require("./heap_allocator.js");
const debug = (0, debug_1.default)('bb.js:wasm');
/**
 * This is the "main thread" implementation of BarretenbergWasm.
 * It spawns a bunch of "child thread" implementations.
 * In a browser context, this still runs on a worker, as it will block waiting on child threads.
 */
class BarretenbergWasmMain extends index_js_3.BarretenbergWasmBase {
    constructor() {
        super(...arguments);
        this.workers = [];
        this.remoteWasms = [];
        this.nextWorker = 0;
        this.nextThreadId = 1;
    }
    getNumThreads() {
        return this.workers.length + 1;
    }
    /**
     * Init as main thread. Spawn child threads.
     */
    async init(module, threads = Math.min((0, index_js_1.getNumCpu)(), BarretenbergWasmMain.MAX_THREADS), logger = debug, initial = 28, maximum = 2 ** 16) {
        this.logger = logger;
        const initialMb = (initial * 2 ** 16) / (1024 * 1024);
        const maxMb = (maximum * 2 ** 16) / (1024 * 1024);
        const shared = (0, index_js_1.getSharedMemoryAvailable)();
        this.logger(`initial mem: ${initial} pages, ${initialMb}MiB. ` +
            `max mem: ${maximum} pages, ${maxMb}MiB. ` +
            `threads: ${threads}, shared: ${shared}`);
        this.memory = new WebAssembly.Memory({ initial, maximum, shared });
        const instance = await WebAssembly.instantiate(module, this.getImportObj(this.memory));
        this.instance = instance;
        // Init all global/static data.
        this.call('_initialize');
        // Create worker threads. Create 1 less than requested, as main thread counts as a thread.
        if (threads > 1) {
            this.logger(`creating ${threads} worker threads...`);
            this.workers = await Promise.all(Array.from({ length: threads - 1 }).map(index_js_2.createThreadWorker));
            this.remoteWasms = await Promise.all(this.workers.map((index_js_1.getRemoteBarretenbergWasm)));
            await Promise.all(this.remoteWasms.map(w => w.initThread(module, this.memory)));
        }
        this.logger('init complete.');
    }
    /**
     * Called on main thread. Signals child threads to gracefully exit.
     */
    async destroy() {
        await Promise.all(this.workers.map(w => w.terminate()));
    }
    getImportObj(memory) {
        const baseImports = super.getImportObj(memory);
        /* eslint-disable camelcase */
        return {
            ...baseImports,
            wasi: {
                'thread-spawn': (arg) => {
                    arg = arg >>> 0;
                    const id = this.nextThreadId++;
                    const worker = this.nextWorker++ % this.remoteWasms.length;
                    // this.logger(`spawning thread ${id} on worker ${worker} with arg ${arg >>> 0}`);
                    this.remoteWasms[worker].call('wasi_thread_start', id, arg).catch(this.logger);
                    // this.remoteWasms[worker].postMessage({ msg: 'thread', data: { id, arg } });
                    return id;
                },
            },
            env: {
                ...baseImports.env,
                env_hardware_concurrency: () => {
                    // If there are no workers (we're already running as a worker, or the main thread requested no workers)
                    // then we return 1, which should cause any algos using threading to just not create a thread.
                    return this.remoteWasms.length + 1;
                },
            },
        };
        /* eslint-enable camelcase */
    }
    callWasmExport(funcName, inArgs, outLens) {
        const alloc = new heap_allocator_js_1.HeapAllocator(this);
        const inPtrs = alloc.copyToMemory(inArgs);
        const outPtrs = alloc.getOutputPtrs(outLens);
        this.call(funcName, ...inPtrs, ...outPtrs);
        const outArgs = this.getOutputArgs(outLens, outPtrs, alloc);
        alloc.freeAll();
        return outArgs;
    }
    getOutputArgs(outLens, outPtrs, alloc) {
        return outLens.map((len, i) => {
            if (len) {
                return this.getMemorySlice(outPtrs[i], outPtrs[i] + len);
            }
            const slice = this.getMemorySlice(outPtrs[i], outPtrs[i] + 4);
            const ptr = new DataView(slice.buffer, slice.byteOffset, slice.byteLength).getUint32(0, true);
            // Add our heap buffer to the dealloc list.
            alloc.addOutputPtr(ptr);
            // The length will be found in the first 4 bytes of the buffer, big endian. See to_heap_buffer.
            const lslice = this.getMemorySlice(ptr, ptr + 4);
            const length = new DataView(lslice.buffer, lslice.byteOffset, lslice.byteLength).getUint32(0, false);
            return this.getMemorySlice(ptr + 4, ptr + 4 + length);
        });
    }
}
exports.BarretenbergWasmMain = BarretenbergWasmMain;
BarretenbergWasmMain.MAX_THREADS = 32;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc21fbWFpbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsMERBQWdDO0FBRWhDLGtEQUFxRztBQUNyRyxnRkFBdUY7QUFFdkYsaUVBQTBFO0FBQzFFLDJEQUFvRDtBQUVwRCxNQUFNLEtBQUssR0FBRyxJQUFBLGVBQVcsRUFBQyxZQUFZLENBQUMsQ0FBQztBQUV4Qzs7OztHQUlHO0FBQ0gsTUFBYSxvQkFBcUIsU0FBUSwrQkFBb0I7SUFBOUQ7O1FBRVUsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUN2QixnQkFBVyxHQUFtQyxFQUFFLENBQUM7UUFDakQsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO0lBK0czQixDQUFDO0lBN0dRLGFBQWE7UUFDbEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FDZixNQUEwQixFQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFBLG9CQUFTLEdBQUUsRUFBRSxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsRUFDakUsU0FBZ0MsS0FBSyxFQUNyQyxPQUFPLEdBQUcsRUFBRSxFQUNaLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRTtRQUVqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixNQUFNLFNBQVMsR0FBRyxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDdEQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFH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