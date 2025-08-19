import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { motion } from "framer-motion";
import "./App.css";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const markers = [
    { name: "Bogotá", coordinates: [-74.0721, 4.711] },
    { name: "New York", coordinates: [-74.006, 40.7128] },
    { name: "Madrid", coordinates: [-3.7038, 40.4168] },
    { name: "Tokyo", coordinates: [139.6917, 35.6895] },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-2">Bienvenido a mi mundo</h1>
      <p className="text-xl mb-6">Hora actual: {time}</p>

      <div className="w-full max-w-4xl">
        <ComposableMap projectionConfig={{ scale: 180 }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1E293B"
                  stroke="#334155"
                />
              ))
            }
          </Geographies>

          {markers.map(({ name, coordinates }, i) => (
            <Marker key={i} coordinates={coordinates}>
              <circle r={6} fill="#38bdf8" stroke="#fff" strokeWidth={2} />
              <text textAnchor="middle" y={-10} className="text-xs fill-white">
                {name}
              </text>
            </Marker>
          ))}

          {/* Conexiones */}
          {markers.map((m1, i) =>
            markers.slice(i + 1).map((m2, j) => (
              <motion.line
                key={`${i}-${j}`}
                x1={m1.coordinates[0]}
                y1={m1.coordinates[1]}
                x2={m2.coordinates[0]}
                y2={m2.coordinates[1]}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                stroke="#38bdf8"
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
              />
            ))
          )}
        </ComposableMap>
      </div>
    </div>
  );
}

export default App;
