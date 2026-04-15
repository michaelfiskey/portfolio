import React from "react";
import ButtonBase from "../primatives/ButtonBase";

type LinkButtonProps = Omit<React.ComponentProps<typeof ButtonBase>, "onClick" | "type"> & {
    href: string;
    openInNewTab?: boolean;
};

const LinkButton = ({ href, openInNewTab = false, children, ...buttonProps }: LinkButtonProps) => {
    
    const handleClick = () => {
        if (openInNewTab) {
            window.open(href, "_blank", "noopener,noreferrer");
            return;
        }

        window.location.href = href;
    };

    return (
        <ButtonBase {...buttonProps} type="button" onClick={handleClick}>
            {children}
        </ButtonBase>
    );
};

export default LinkButton;