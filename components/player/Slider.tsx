import { Song } from "@/types/global";
import { FC } from "react";

type SliderProps = {
  song: Song;
};

const Slider: FC<SliderProps> = ({ song }) => {
  return <div>Slider</div>;
};

export default Slider;
