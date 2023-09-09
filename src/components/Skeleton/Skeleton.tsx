import s from "./Skeleton.module.scss"
import {FC} from "react";
interface ISkeleton {
    width?: number
    height?: number
}
const Skeleton: FC<ISkeleton> = ({width, height}) => {
    const style = {
        width: width,
        height: height
    }
    return (
        <div className={s.skeleton} style={style}></div>
    );
};

export default Skeleton;