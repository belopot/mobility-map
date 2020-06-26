import along from '@turf/along';
import { lineString } from '@turf/helpers';
import length from '@turf/length';

const step = 0.05;
function interpolate(data) {
   return data.map((row) => {
      // const line = lineString(row.geometry.coordinates);

      const l = length(row, { units: 'kilometers' });

      let index = 0;
      const path = [];
      while (index * step < l) {
         const { coordinates } = along(row, index * step, {
            units: 'kilometers',
         }).geometry;
         index++;
         path.push(coordinates);
      }
      return {
         provider: row.properties.provider,
         path,
      };
   });
}

export default interpolate;
