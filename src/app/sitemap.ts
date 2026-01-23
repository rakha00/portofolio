import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://example.com", // Replace with actual domain later
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
    ];
}
