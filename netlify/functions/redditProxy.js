export const handler = async (event) => {
  const { mode, subreddit, query } = event.queryStringParameters;

  let apiUrl = "";

  if (mode === "search") {
    apiUrl = `https://www.reddit.com/search.json?q=${query}&sort=relevance&t=all&limit=10`;
  } else {
    apiUrl = `https://www.reddit.com/r/${
      subreddit || "webdev"
    }/hot.json?limit=10`;
  }

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Reddit API Error:", response.status, errorText);

      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `Reddit API Error: ${response.statusText}`,
          details: errorText,
        }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Function Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal Server Error",
        details: error.toString(),
      }),
    };
  }
};
