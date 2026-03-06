import { useEffect } from "react";

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes.base || {}).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }
  Object.entries(attributes.values).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', {
      base: { name: "description" },
      values: { content: description },
    });

    upsertMeta('meta[property="og:title"]', {
      base: { property: "og:title" },
      values: { content: title },
    });

    upsertMeta('meta[property="og:description"]', {
      base: { property: "og:description" },
      values: { content: description },
    });
  }, [title, description]);

  return null;
}
