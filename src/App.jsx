import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import QRCodeStyling from "qr-code-styling";
import Tilt from "react-parallax-tilt";
import Me from "./components/Me";
const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  data: "https://example.com",
  dotsOptions: { color: "#000000", type: "square" },
  backgroundOptions: { color: "#ffffff" },
  imageOptions: { crossOrigin: "anonymous", margin: 20 },
});

const gradientPresets = [
  {
    label: "Sunset",
    gradient: {
      type: "linear",
      rotation: 45,
      colorStops: [
        { offset: 0, color: "#ff7e5f" },
        { offset: 1, color: "#feb47b" },
      ],
    },
  },
  {
    label: "Purple Haze",
    gradient: {
      type: "linear",
      rotation: 45,
      colorStops: [
        { offset: 0, color: "#6a11cb" },
        { offset: 1, color: "#2575fc" },
      ],
    },
  },
  {
    label: "Aqua Chill",
    gradient: {
      type: "linear",
      rotation: 45,
      colorStops: [
        { offset: 0, color: "#00c6ff" },
        { offset: 1, color: "#0072ff" },
      ],
    },
  },
  {
    label: "Sun on the Horizon",
    gradient: {
      type: "linear",
      rotation: 45,
      colorStops: [
        { offset: 0, color: "#fceabb" },
        { offset: 1, color: "#f8b500" },
      ],
    },
  },
  {
    label: "Dusk",
    gradient: {
      type: "linear",
      rotation: 45,
      colorStops: [
        { offset: 0, color: "#2C3E50" },
        { offset: 1, color: "#FD746C" },
      ],
    },
  },
];

const App = () => {
  const qrRef = useRef(null);
  const [data, setData] = useState("https://example.com");
  const [dotType, setDotType] = useState("dots");
  const [dotColor, setDotColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logo, setLogo] = useState("");
  const [dotMode, setDotMode] = useState("solid");
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    const newOptions = {
      data,
      image: logo,
      dotsOptions: {
        type: dotType,
        color: dotMode === "solid" ? dotColor : undefined,
        gradient:
          dotMode === "gradient"
            ? gradient || gradientPresets[0].gradient
            : undefined,
      },
      backgroundOptions: {
        color: bgColor,
      },
    };

    // Clear and re-append to ensure fresh render
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.update(newOptions);
      qrCode.append(qrRef.current);
    }
  }, [data, dotType, dotColor, bgColor, logo, dotMode, gradient]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  const downloadQR = () =>
    qrCode.download({ name: "qr-code", extension: "png" });

  return (
    <>
      <div className="min-h-screen bg-zinc-950 text-white px-6 py-10 font-inter max-w-6xl mx-auto space-y-6 ">
        <div className="flex flex-col gap-4">
          <h1 className="text-7xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
            Qrious
          </h1>
          <p>Generate QR Codes PIX quickly and easily.</p>
        </div>

        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-5 border border-[#1e1e1e] rounded-lg p-12">
            <div>
              <label className="block text-sm mb-1">QR Content</label>
              <input
                className="w-full p-2 rounded outline-none border border-gray-700"
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Enter URL or Text"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Dot Type</label>
              <select
                className="w-full p-2 rounded bg-[#1e1e1e] border border-gray-700 cursor-pointer outline-none"
                value={dotType}
                onChange={(e) => setDotType(e.target.value)}
              >
                <option value="square">Square</option>
                <option value="dots">Dots</option>
                <option value="rounded">Rounded</option>
                <option value="classy">Classy</option>
                <option value="classy-rounded">Classy Rounded</option>
                <option value="extra-rounded">Extra Rounded</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Background</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Dot Color Mode
                </label>
                <button
                  onClick={() =>
                    setDotMode(dotMode === "solid" ? "gradient" : "solid")
                  }
                  className="w-full px-3 py-2 text-sm rounded bg-gray-800 hover:bg-gray-700 transition"
                >
                  {dotMode === "solid"
                    ? "Switch to Gradient"
                    : "Switch to Solid"}
                </button>
              </div>
            </div>

            {dotMode === "solid" && (
              <div className="mt-2">
                <label className="block text-sm mb-1">Dot Color</label>
                <input
                  type="color"
                  value={dotColor}
                  onChange={(e) => setDotColor(e.target.value)}
                  className="w-full h-10 rounded-xl"
                />
              </div>
            )}

            {dotMode === "gradient" && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gradient Dots
                </label>
                <div className="flex flex-wrap gap-3">
                  {gradientPresets.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setGradient(g.gradient)}
                      className="w-10 h-10 rounded-full border-2 border-white hover:scale-110 transition"
                      style={{
                        background: `linear-gradient(${
                          g.gradient.rotation
                        }deg, ${g.gradient.colorStops
                          .map((cs) => cs.color)
                          .join(", ")})`,
                      }}
                      title={g.label}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload Logo
              </label>
              <label className="flex items-center justify-center w-full px-4 py-2 bg-gray-800 text-white rounded-lg cursor-pointer hover:bg-gray-700 transition">
                <span className="text-sm">📁 Choose Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            </div>

            <button
              onClick={downloadQR}
              className="mt-4 px-4 py-2 rounded bg-white text-black font-medium hover:bg-gray-200 cursor-pointer"
            >
              Download QR Code
            </button>
          </div>

          <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.02}
              transitionSpeed={1000}
              className="rounded group"
            >
              <motion.div
                key={data + dotColor + dotType + bgColor + logo}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  backgroundColor: bgColor,
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  transition: "box-shadow 0.3s ease",
                }}
                className="group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <div ref={qrRef} />
              </motion.div>
            </Tilt>

            <p className="text-gray-400 mt-4 text-sm text-center break-all">
              {data}
            </p>
          </div>
        </div>
      <Me/>
      </div>
    </>
  );
};

export default App;
