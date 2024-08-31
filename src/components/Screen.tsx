import { Textfit } from "react-textfit";
import "./Screen.css";

type ScreenProps = {
    value: string | number
}

const Screen = ({ value }: ScreenProps) => {
    return (
        <Textfit className="screen" mode="single" max={70} >
            {value}
        </Textfit>
    );
};

export default Screen;