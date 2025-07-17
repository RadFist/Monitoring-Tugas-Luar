import { useEffect, useState } from "react";

const GoogleMaps = ({ locationParam = "", display = true, children }) => {
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    if (locationParam && display) {
      const encoded = encodeURIComponent(locationParam);
      const url = `https://www.google.com/maps?q=${encoded}&output=embed`;
      setMapUrl(url);
    }
  }, [locationParam, display]);

  return (
    <div style={{ maxWidth: "600px" }}>
      {children}

      {mapUrl && display && (
        <div style={{ marginTop: "20px" }}>
          <iframe
            src={mapUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default GoogleMaps;
