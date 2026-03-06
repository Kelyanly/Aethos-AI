import Din0Sprite from "../Din0Sprite.jsx";

export default function DinoAvatar({
  inViewport = true,
  ctaHovered = false,
  ctaClickSignal = 0,
  chatActive = false,
  activitySignal = 0,
  className = "",
}) {
  return (
    <Din0Sprite
      className={className}
      inViewport={inViewport}
      ctaHovered={ctaHovered}
      ctaClickSignal={ctaClickSignal}
      chatActive={chatActive}
      activitySignal={activitySignal}
      showBubble={false}
    />
  );
}
