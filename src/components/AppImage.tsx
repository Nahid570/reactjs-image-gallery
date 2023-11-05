import React from "react";
import placeholderimg from "@assets/images/placeholderImg.png";

function AppImage(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) {
  const [loading, setLoading] = React.useState(true);

  return (
    <img
      {...props}
      onLoad={(e) => {
        setLoading(false);
        props.onLoad?.(e);
      }}
      onError={(e) => {
        setLoading(false);
        props.onError?.(e);
      }}
      src={loading ? placeholderimg : props.src}
    />
  );
}

export default AppImage;
