const express = require("express");
const cors = require("cors");
const https = require("https");
const fetch = (url, options) =>
  import("node-fetch").then(({ default: fetch }) =>
    fetch(url, {
      agent: new https.Agent({ rejectUnauthorized: false }), // SSL bypass clearly applied here
      ...options,
    })
  );

const app = express();

app.use(express.json());
app.use(cors());

// GET request (initial restaurants)
app.get("/api/restaurants", async (req, res) => {
  try {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${req.query.lat}&lng=${req.query.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept: "application/json",
          Referer: "https://www.swiggy.com/",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Swiggy API error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(
      "Detailed error fetching initial restaurants:",
      error.message
    );
    res.status(500).json({ error: error.message });
  }
});

// POST request (infinite scroll update)
app.post("/api/restaurants/update", async (req, res) => {
  try {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept: "application/json",
          Referer: "https://www.swiggy.com/",
        },
        body: JSON.stringify(req.body),
      }
    );

    const text = await response.text();
    console.log("Swiggy response text:", text);

    const data = JSON.parse(text);
    res.json(data);
  } catch (error) {
    console.error("Detailed error fetching update:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Proxy server running on port 5000"));
