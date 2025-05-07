import "./Nothing.css";

import React, {FC} from "react";

type NothingProps = {
    children?: React.ReactNode;
};

const Nothing: FC<NothingProps> = ({ children }) => {
    return (
        <div className="nothing">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="icon">
                <path d="M233.54-243.85 120-357.38l27.54-27.54 85 85 170-170 27.54 28.54-196.54 197.53Zm0-289.23L120-646.62l27.54-27.53 85 85 170-170 27.54 28.53-196.54 197.54Zm287.23 217.7v-40h320v40h-320Zm0-289.24v-40h320v40h-320Z" />
            </svg>
            <p>ここには何もありません...</p>
            {children}
        </div>
    );
};

export default Nothing;