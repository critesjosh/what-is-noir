import { NetCrs } from '../net_crs.js';
import { get, set } from 'idb-keyval';
/**
 * Downloader for CRS from the web or local.
 */
export class CachedNetCrs {
    constructor(numPoints) {
        this.numPoints = numPoints;
    }
    static async new(numPoints) {
        const crs = new CachedNetCrs(numPoints);
        await crs.init();
        return crs;
    }
    /**
     * Download the data.
     */
    async init() {
        // Check if data is in IndexedDB
        const g1Data = await get('g1Data');
        const g2Data = await get('g2Data');
        const netCrs = new NetCrs(this.numPoints);
        const g1DataLength = this.numPoints * 64;
        if (!g1Data || g1Data.length < g1DataLength) {
            this.g1Data = await netCrs.downloadG1Data();
            await set('g1Data', this.g1Data);
        }
        else {
            this.g1Data = g1Data;
        }
        if (!g2Data) {
            this.g2Data = await netCrs.downloadG2Data();
            await set('g2Data', this.g2Data);
        }
        else {
            this.g2Data = g2Data;
        }
    }
    /**
     * G1 points data for prover key.
     * @returns The points data.
     */
    getG1Data() {
        return this.g1Data;
    }
    /**
     * G2 points data for verification key.
     * @returns The points data.
     */
    getG2Data() {
        return this.g2Data;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVkX25ldF9jcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY3JzL2Jyb3dzZXIvY2FjaGVkX25ldF9jcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUV0Qzs7R0FFRztBQUNILE1BQU0sT0FBTyxZQUFZO0lBSXZCLFlBQTRCLFNBQWlCO1FBQWpCLGNBQVMsR0FBVCxTQUFTLENBQVE7SUFBRyxDQUFDO0lBRWpELE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQWlCO1FBQ2hDLE1BQU0sR0FBRyxHQUFHLElBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUk7UUFDUixnQ0FBZ0M7UUFDaEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXpDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFZLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzVDLE1BQU0sR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN2QixDQUFDO1FBRUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUM1QyxNQUFNLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdkIsQ0FBQztJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Q0FDRiJ9