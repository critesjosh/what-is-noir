"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrumpkinCrs = exports.Crs = void 0;
const tslib_1 = require("tslib");
const net_crs_js_1 = require("../net_crs.js");
const ignition_files_crs_js_1 = require("./ignition_files_crs.js");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const debug_1 = tslib_1.__importDefault(require("debug"));
const os_1 = require("os");
const debug = (0, debug_1.default)('bb.js:crs');
/**
 * Generic CRS finder utility class.
 */
class Crs {
    constructor(numPoints, path) {
        this.numPoints = numPoints;
        this.path = path;
    }
    static async new(numPoints, crsPath = (0, os_1.homedir)() + '/.bb-crs') {
        const crs = new Crs(numPoints, crsPath);
        await crs.init();
        return crs;
    }
    async init() {
        (0, fs_1.mkdirSync)(this.path, { recursive: true });
        const g1FileSize = await (0, promises_1.stat)(this.path + '/bn254_g1.dat')
            .then(stats => stats.size)
            .catch(() => 0);
        const g2FileSize = await (0, promises_1.stat)(this.path + '/bn254_g2.dat')
            .then(stats => stats.size)
            .catch(() => 0);
        if (g1FileSize >= this.numPoints * 64 && g1FileSize % 64 == 0 && g2FileSize == 128) {
            debug(`using cached crs of size: ${g1FileSize / 64}`);
            return;
        }
        debug(`downloading crs of size: ${this.numPoints}`);
        const crs = new net_crs_js_1.NetCrs(this.numPoints);
        await crs.init();
        (0, fs_1.writeFileSync)(this.path + '/bn254_g1.dat', crs.getG1Data());
        (0, fs_1.writeFileSync)(this.path + '/bn254_g2.dat', crs.getG2Data());
    }
    /**
     * G1 points data for prover key.
     * @returns The points data.
     */
    getG1Data() {
        return (0, fs_1.readFileSync)(this.path + '/bn254_g1.dat');
    }
    /**
     * G2 points data for verification key.
     * @returns The points data.
     */
    getG2Data() {
        return (0, fs_1.readFileSync)(this.path + '/bn254_g2.dat');
    }
}
exports.Crs = Crs;
/**
 * Generic Grumpkin CRS finder utility class.
 */
class GrumpkinCrs {
    constructor(numPoints, path) {
        this.numPoints = numPoints;
        this.path = path;
    }
    static async new(numPoints, crsPath = './crs') {
        const crs = new GrumpkinCrs(numPoints, crsPath);
        await crs.init();
        return crs;
    }
    async downloadG1Data() {
        const g1Start = 28;
        const g1End = g1Start + this.numPoints * 64 - 1;
        const response = await fetch('https://aztec-ignition.s3.amazonaws.com/TEST%20GRUMPKIN/monomial/transcript00.dat', {
            headers: {
                Range: `bytes=${g1Start}-${g1End}`,
            },
            cache: 'force-cache',
        });
        return new Uint8Array(await response.arrayBuffer());
    }
    async init() {
        (0, fs_1.mkdirSync)(this.path, { recursive: true });
        const size = await (0, promises_1.readFile)(this.path + '/grumpkin_size', 'ascii').catch(() => undefined);
        if (size && +size >= this.numPoints) {
            debug(`using cached crs of size: ${size}`);
            return;
        }
        // TODO(https://github.com/AztecProtocol/barretenberg/issues/813): implement NetCrs for Grumpkin once SRS is uploaded.
        const ignitionCrs = new ignition_files_crs_js_1.IgnitionFilesCrs(this.numPoints, ignition_files_crs_js_1.GRUMPKIN_SRS_DEV_PATH);
        if (ignitionCrs.pathExists()) {
            await ignitionCrs.init();
        }
        const g1Data = ignitionCrs.pathExists() ? ignitionCrs.getG1Data() : await this.downloadG1Data();
        debug(`loading ignition file crs of size: ${this.numPoints}`);
        // await crs.init();
        (0, fs_1.writeFileSync)(this.path + '/grumpkin_size', this.numPoints.toString());
        (0, fs_1.writeFileSync)(this.path + '/grumpkin_g1.dat', g1Data);
    }
    /**
     * G1 points data for prover key.
     * @returns The points data.
     */
    getG1Data() {
        return (0, fs_1.readFileSync)(this.path + '/grumpkin_g1.dat');
    }
}
exports.GrumpkinCrs = GrumpkinCrs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY3JzL25vZGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDhDQUF1QztBQUN2QyxtRUFBa0Y7QUFDbEYsMkJBQTREO0FBQzVELDBDQUE2QztBQUM3QywwREFBZ0M7QUFDaEMsMkJBQTZCO0FBRTdCLE1BQU0sS0FBSyxHQUFHLElBQUEsZUFBVyxFQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXZDOztHQUVHO0FBQ0gsTUFBYSxHQUFHO0lBQ2QsWUFBNEIsU0FBaUIsRUFBa0IsSUFBWTtRQUEvQyxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQWtCLFNBQUksR0FBSixJQUFJLENBQVE7SUFBRyxDQUFDO0lBRS9FLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQWlCLEVBQUUsT0FBTyxHQUFHLElBQUEsWUFBTyxHQUFFLEdBQUcsVUFBVTtRQUNsRSxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDeEMsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakIsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUk7UUFDUixJQUFBLGNBQVMsRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFMUMsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFBLGVBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQzthQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ3pCLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUEsZUFBSSxFQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDO2FBQ3ZELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDekIsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxCLElBQUksVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxJQUFJLFVBQVUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLFVBQVUsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNuRixLQUFLLENBQUMsNkJBQTZCLFVBQVUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELE9BQU87UUFDVCxDQUFDO1FBRUQsS0FBSyxDQUFDLDRCQUE0QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNwRCxNQUFNLEdBQUcsR0FBRyxJQUFJLG1CQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLElBQUEsa0JBQWEsRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUM1RCxJQUFBLGtCQUFhLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLEVBQUUsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVM7UUFDUCxPQUFPLElBQUEsaUJBQVksRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7O09BR0c7SUFDSCxTQUFTO1FBQ1AsT0FBTyxJQUFBLGlCQUFZLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsQ0FBQztJQUNuRCxDQUFDO0NBQ0Y7QUE5Q0Qsa0JBOENDO0FBRUQ7O0dBRUc7QUFDSCxNQUFhLFdBQVc7SUFDdEIsWUFBNEIsU0FBaUIsRUFBa0IsSUFBWTtRQUEvQyxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQWtCLFNBQUksR0FBSixJQUFJLENBQVE7SUFBRyxDQUFDO0lBRS9FLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQWlCLEVBQUUsT0FBTyxHQUFHLE9BQU87UUFDbkQsTUFBTSxHQUFHLEdBQUcsSUFBSSxXQUFXLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjO1FBQ2xCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNuQixNQUFNLEtBQUssR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRWhELE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLG1GQUFtRixFQUFFO1lBQ2hILE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUUsU0FBUyxPQUFPLElBQUksS0FBSyxFQUFFO2FBQ25DO1lBQ0QsS0FBSyxFQUFFLGFBQWE7U0FDckIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLFVBQVUsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSTtRQUNSLElBQUEsY0FBUyxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMxQyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsbUJBQVEsRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRixJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEMsS0FBSyxDQUFDLDZCQUE2QixJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLE9BQU87UUFDVCxDQUFDO1FBRUQsc0hBQXNIO1FBQ3RILE1BQU0sV0FBVyxHQUFHLElBQUksd0NBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw2Q0FBcUIsQ0FBQyxDQUFDO1FBQ2hGLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7WUFDN0IsTUFBTSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUNELE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNoRyxLQUFLLENBQUMsc0NBQXNDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzlELG9CQUFvQjtRQUNwQixJQUFBLGtCQUFhLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBQSxrQkFBYSxFQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVM7UUFDUCxPQUFPLElBQUEsaUJBQVksRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUNGO0FBbERELGtDQWtEQyJ9