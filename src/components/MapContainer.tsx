import React, { forwardRef } from 'react';

export const MapContainer = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="w-full h-full rounded-lg shadow-lg" {...props} />
));