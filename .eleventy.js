module.exports = function(eleventyConfig) {
  // Pass through assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Collections
  eleventyConfig.addCollection("reviews", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/reviews/*.md").filter(item => item.data.type === "review");
  });

  eleventyConfig.addCollection("vs", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/vs/*.md").filter(item => item.data.type === "vs");
  });

  eleventyConfig.addCollection("news", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/news/*.md").filter(item => item.data.type === "news");
  });

  eleventyConfig.addCollection("allPosts", function(collectionApi) {
    return [
      ...collectionApi.getFilteredByGlob("src/reviews/*.md"),
      ...collectionApi.getFilteredByGlob("src/vs/*.md"),
      ...collectionApi.getFilteredByGlob("src/news/*.md")
    ].sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  // Filters
  eleventyConfig.addFilter("readableDate", function(dateObj) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    }).format(dateObj);
  });

  eleventyConfig.addFilter("timeAgo", function(dateObj) {
    const now = new Date();
    const date = new Date(dateObj);
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 3600) return "Just now";
    if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    }
    if (seconds < 604800) {
      const days = Math.floor(seconds / 86400);
      return days === 1 ? "Yesterday" : `${days} days ago`;
    }
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit" }).format(date);
  });

  eleventyConfig.addFilter("stars", function(rating) {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const emptyStars = maxStars - fullStars;
    return "★".repeat(fullStars) + "☆".repeat(emptyStars);
  });

  // Shortcodes
  eleventyConfig.addShortcode("year", () => new Date().getFullYear());

  // Set input and output directories
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
