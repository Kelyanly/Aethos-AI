import { useSprings, animated } from "react-spring";
import WidgetCard from "./WidgetCard.jsx";
import { integrationTags } from "./data.js";

export default function IntegrationCloud() {
  const [springs, api] = useSprings(integrationTags.length, (index) => ({ y: index % 2 === 0 ? 0 : -2 }));

  return (
    <WidgetCard title="Integration Cloud" subtitle="Architecture" badge="Connected" icon="◍">
      <div className="widget-cloud" onMouseLeave={() => api.start((index) => ({ y: index % 2 === 0 ? 0 : -2 }))}>
        {springs.map((style, index) => (
          <animated.button
            key={integrationTags[index]}
            type="button"
            className="chip-button"
            style={style}
            onMouseEnter={() => api.start((itemIndex) => ({ y: itemIndex === index ? -4 : 0 }))}
          >
            {integrationTags[index]}
          </animated.button>
        ))}
      </div>
    </WidgetCard>
  );
}
