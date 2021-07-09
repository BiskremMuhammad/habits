import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";

export const KetosisIcon = (props: SvgProps) => {
  return (
    <Svg width={32} height={32} viewBox="6 6 24 24" fill="none" {...props}>
      <G clipPath="url(#prefix__clip0)" fill={props.fill ? props.fill : "#fff"}>
        <Path d="M18.444 15.794c-.666-.621-1.353-1.266-2.048-2.028L16 13.334l-.389.433c-1.251 1.38-1.842 3.498-2.099 4.77a3.888 3.888 0 01-.431-1.09l-.236-.997-.683.706c-1.197 1.236-1.995 2.463-1.995 4.427a6.782 6.782 0 001.191 3.921c.784 1.125 1.886 1.929 3.133 2.285.376.1.76.162 1.145.184.12.017.242.025.364.026.064 0 .126-.006.188-.01 1.514-.05 2.95-.747 4.004-1.943 1.054-1.196 1.643-2.796 1.641-4.462 0-2.624-1.57-4.09-3.389-5.79zm-2.333 10.972c-.055 0-.111.006-.17.006a1.852 1.852 0 01-1.323-.641 2.236 2.236 0 01-.546-1.474c0-.774.378-1.16 1.233-1.961.216-.202.45-.421.697-.673.216.216.426.412.62.593.859.802 1.307 1.257 1.307 2.04-.001.54-.19 1.06-.528 1.452-.338.393-.8.628-1.29.658zm2.789-1.082l-.011.009c.1-.335.15-.684.151-1.036 0-1.384-.826-2.155-1.699-2.97-.31-.29-.629-.588-.948-.938L16 20.317l-.393.432c-.36.395-.712.725-1.023 1.016-.87.815-1.623 1.52-1.623 2.892 0 .367.057.731.166 1.078a5.133 5.133 0 01-1.367-1.838 5.636 5.636 0 01-.482-2.314c-.01-1.072.368-2.105 1.05-2.872.117.262.256.51.415.745.116.172.275.303.459.377a.914.914 0 00.572.039 1.01 1.01 0 00.51-.31c.138-.155.234-.35.275-.564a10.574 10.574 0 011.475-3.911c.587.61 1.167 1.152 1.691 1.641 1.74 1.626 3 2.8 3 4.859a5.593 5.593 0 01-.48 2.282 5.095 5.095 0 01-1.345 1.815z" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.667 14c.12 0 .276-.054.423-.236.324-.403.324-1.105 0-1.508l-.423-.526-.424.526c-.324.403-.324 1.105 0 1.508.147.182.304.236.424.236zm0-3.333l.519-.418.943 1.171c.717.892.717 2.288 0 3.18-.374.465-.9.734-1.462.734-.563 0-1.088-.27-1.463-.734-.717-.892-.717-2.288 0-3.18l.943-1.17.52.417zm0 0l-.52-.418.52-.646.519.646-.52.418zM9.333 14c.12 0 .277-.054.424-.236.324-.403.324-1.105 0-1.508l-.424-.526-.423.526c-.324.403-.324 1.105 0 1.508.146.182.303.236.423.236zm0-3.333l.52-.418.943 1.171c.717.892.717 2.288 0 3.18-.375.465-.9.734-1.463.734-.562 0-1.088-.27-1.462-.734-.717-.892-.717-2.288 0-3.18l.942-1.17.52.417zm0 0l-.52-.418.52-.646.52.646-.52.418zM16 10c.12 0 .277-.054.423-.236.325-.403.325-1.105 0-1.508L16 7.73l-.423.526c-.325.403-.325 1.105 0 1.508.146.182.303.236.423.236zm0-3.333l.52-.418.942 1.171c.717.892.717 2.288 0 3.18-.374.465-.9.734-1.462.734-.563 0-1.088-.27-1.462-.734-.717-.892-.717-2.288 0-3.18l.942-1.17.52.417zm0 0l-.52-.418.52-.646.52.646-.52.418z"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill={props.fill ? props.fill : "#fff"} d="M0 0h32v32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
