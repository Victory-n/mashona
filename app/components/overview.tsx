import React from "react";
import Image from "next/image";

type OverviewDivProps = {
    image1: string;
    altText1: string;
    text1: string;
    value: number;
    image2: string;
    altText2: string;
    text2: string;
    text3: string;
    text4: string;
};

const OverviewDiv: React.FC<OverviewDivProps> = ({image1, altText1, text1, value, image2, altText2, text2, text3, text4,}) => {
    return (
        <div className={"bg-white rounded-lg px-4 py-8.25 space-y-4"}>
            <div className={"flex items-center gap-2"}>
                <Image src={image1} alt={altText1} />
                <p className={"text-[#525252] text-[12px]"}>{text1}</p>
            </div>
            <div className={"flex my-4 gap-2"}>
                <p className={"text-[#353535] font-medium text-[24px] leading-11"}>
                    {value}
                </p>
                <span className={"text-[#0A7D00] text-[12px] flex items-center"}>
          <Image src={image2} alt={altText2} /> {text2}
        </span>
            </div>
            <p className={"text-[8px] text-[#7B7B7B] leading-4 tracking-[0.5%]"}>
                {text3}{" "}
                <strong className={"font-medium text-[11px] leading-4"}>{text4}</strong>
            </p>
        </div>
    );
};

export default OverviewDiv;