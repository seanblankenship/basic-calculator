import "./ButtonBox.css";

type ChildrenProps = {
    children: React.ReactNode
}

const ButtonBox = ({ children }: ChildrenProps) => {
    return <div className="buttonBox" > {children} </div>;
};

export default ButtonBox;