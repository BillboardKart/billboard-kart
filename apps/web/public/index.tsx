import svgPaths from "./svg-oqrko3yzyk";
import imgMap from "./991f769c3915de6e31148d2af47bfeca4ac19477.png";
import imgImage1 from "./bbe2da8bf93ca0b1373387f3158256ee6dc136b6.png";
import imgImage5 from "./950883eebaf6bf714a744fded1d05a0a7d282faf.png";
import imgImage2 from "./26207b9e84fa5b49c2312417f250d1ea618c65b0.png";
import imgImage6 from "./b556b7b77bcf8d7a0fee50110626916aec4f55cb.png";
import imgBillboardPhoto from "./9035ecdbf24e66d8c17fb40d5c498d02f8aee0a1.png";
import Image from "next/image";
type ToggleButtonProps = {
  className?: string;
  children?: React.ReactNode | null;
  showIcon?: boolean;
  size?: "MD" | "LG";
  state?: "Default" | "Active";
};

function ToggleButton({
  className,
  children = null,
  showIcon = false,
  size = "MD",
  state = "Default",
}: ToggleButtonProps) {
  const isLg = size === "LG";
  const isLgAndActive = size === "LG" && state === "Active";
  const isLgAndDefault = size === "LG" && state === "Default";
  const isMdAndActive = size === "MD" && state === "Active";
  return (
    <div
      className={
        className ||
        `relative ${isLgAndActive ? "bg-[#fff0ea] h-[35px] rounded-[10px] w-[74px]" : isLgAndDefault ? "h-[35px] rounded-[10px] w-[74px]" : isMdAndActive ? "bg-[#fff0ea] h-[29px] rounded-[8px] w-[61px]" : "h-[29px] rounded-[8px] w-[61px]"}`
      }
    >
      <div
        aria-hidden
        className={`absolute border border-solid inset-0 pointer-events-none ${isLgAndActive ? "border-[#f54900] rounded-[10px]" : isLgAndDefault ? "border-[#e5e5e5] rounded-[10px]" : isMdAndActive ? "border-[#f54900] rounded-[8px]" : "border-[#e5e5e5] rounded-[8px]"}`}
      />
      <div className="flex flex-row items-center justify-center size-full">
        <div
          className={`content-stretch flex items-center justify-center relative size-full ${isLg ? "gap-[8px] px-[16px] py-[8px]" : "gap-[6px] px-[12px] py-[6px]"}`}
        >
          {size === "MD" && showIcon && (
            <div className="relative shrink-0 size-[16px]" data-name="check">
              <div
                className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]"
                data-name="Vector (Stroke)"
              >
                <svg
                  className="absolute block inset-0 size-full"
                  fill="none"
                  height="8.66657"
                  preserveAspectRatio="none"
                  viewBox="0 0 11.9999 8.66657"
                  width="11.9999"
                >
                  <path
                    d={svgPaths.p14557400}
                    fill="black"
                    id="Vector (Stroke)"
                  />
                </svg>
              </div>
            </div>
          )}
          {isLg && showIcon && (
            <div className="relative shrink-0 size-[20px]" data-name="check">
              <div
                className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]"
                data-name="Vector (Stroke)"
              >
                <svg
                  className="absolute block inset-0 size-full"
                  fill="none"
                  height="10.8332"
                  preserveAspectRatio="none"
                  viewBox="0 0 14.9999 10.8332"
                  width="14.9999"
                >
                  <path
                    d={svgPaths.p20125100}
                    fill="black"
                    id="Vector (Stroke)"
                  />
                </svg>
              </div>
            </div>
          )}
          {size === "MD" && state === "Default" && (
            <div
              className="content-stretch flex h-full items-center justify-center relative shrink-0"
              data-name="Toggle Content"
            >
              {children || (
                <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
                  Label
                </p>
              )}
            </div>
          )}
          {isMdAndActive && (
            <div
              className="content-stretch flex h-full items-center justify-center relative shrink-0"
              data-name="Toggle Content"
            >
              {children || (
                <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
                  Label
                </p>
              )}
            </div>
          )}
          {isLgAndDefault && (
            <div
              className="content-stretch flex h-full items-center justify-center relative shrink-0"
              data-name="Toggle Content"
            >
              {children || (
                <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] whitespace-nowrap">
                  Label
                </p>
              )}
            </div>
          )}
          {isLgAndActive && (
            <div
              className="content-stretch flex h-full items-center justify-center relative shrink-0"
              data-name="Toggle Content"
            >
              {children || (
                <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] whitespace-nowrap">
                  Label
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
type ToggleProps = {
  className?: string;
  children?: React.ReactNode | null;
};

function Toggle({ className, children = null }: ToggleProps) {
  return (
    <div
      className={className || "bg-[#f5f5f5] relative rounded-[12px]"}
      data-name="Toggle"
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[8px] py-[4px] relative size-full">
          <div
            className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0"
            data-name="Content"
          >
            {children || (
              <>
                <ToggleButton
                  className="bg-[#fff0ea] h-[30px] relative rounded-[8px] shrink-0 w-[61px]"
                  state="Active"
                />
                <ToggleButton className="h-[30px] relative rounded-[8px] shrink-0 w-[61px]" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="20"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
        width="20"
      >
        <g id="SVG">
          <path
            d="M12.5 15L7.5 10L12.5 5"
            id="Vector"
            stroke="#0A0A0A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div
      className="content-stretch flex items-center justify-center p-px relative rounded-[33554400px] shrink-0 size-[40px]"
      data-name="Button"
    >
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[33554400px]"
      />
      <Svg />
    </div>
  );
}

function Heading() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[-1px]"
      data-name="Heading 1"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[18px] whitespace-nowrap">
        <p className="leading-[22.5px]">Add Billboard</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[22.5px]"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Step 1 of 3</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div
      className="flex-[1_0_0] h-[42.5px] min-w-px relative"
      data-name="Container"
    >
      <Heading />
      <Container3 />
    </div>
  );
}

function Container1() {
  return (
    <div
      className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full"
      data-name="Container"
    >
      <Button />
      <div className="relative shrink-0 size-[40px]" data-name="Icon/Emogicon">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="40"
          preserveAspectRatio="none"
          viewBox="0 0 40 40"
          width="40"
        >
          <g id="Icon/Emogicon">
            <path d={svgPaths.p23427d00} fill="#FEFEFE" />
            <path d={svgPaths.p3f1f300} fill="#181818" />
            <path d={svgPaths.p1e22c200} fill="#F9A006" />
            <path d={svgPaths.p224c2c00} fill="#FEFEFE" />
            <path d={svgPaths.p1f244000} fill="#FEFEFE" />
            <path d={svgPaths.pca161f0} fill="#FEFEFE" />
            <path d={svgPaths.p27efe200} fill="#181818" />
            <path d={svgPaths.p253e8400} fill="#F9A006" />
            <path d={svgPaths.p1599b900} fill="#FE4401" />
            <path d={svgPaths.p255b1580} fill="#FEFEFE" />
            <path d={svgPaths.p310fa600} fill="#29A760" />
            <path d={svgPaths.p20b96900} fill="#FEFEFE" />
          </g>
        </svg>
      </div>
      <Container2 />
    </div>
  );
}

function Container4() {
  return (
    <div
      className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full"
      data-name="Container"
    >
      <div
        className="bg-[#f54900] flex-[1_0_0] h-[6px] min-w-px relative rounded-[33554400px]"
        data-name="Background"
      />
      <div
        className="bg-[#f5f5f5] flex-[1_0_0] h-[6px] min-w-px relative rounded-[33554400px]"
        data-name="Background"
      />
      <div
        className="bg-[#f5f5f5] flex-[1_0_0] h-[6px] min-w-px relative rounded-[33554400px]"
        data-name="Background"
      />
    </div>
  );
}

function Container() {
  return (
    <div
      className="max-w-[900px] relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start max-w-[inherit] pb-[16px] pt-[24px] px-[32px] relative size-full">
        <Container1 />
        <Container4 />
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div
      className="bg-white relative shrink-0 w-full z-[2]"
      data-name="Background+HorizontalBorder"
    >
      <div
        aria-hidden
        className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none"
      />
      <div className="content-stretch flex flex-col items-start pb-px px-[270px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

function Label() {
  return (
    <div
      className="content-stretch flex items-center relative shrink-0 w-full"
      data-name="Label"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Billboard name</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div
      className="absolute bottom-[15.5px] content-stretch flex flex-col items-start left-[13px] overflow-clip pr-[610.55px] top-[15.5px]"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">e.g. MG Road Digital Hoarding</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div
      className="bg-[#f5f5f5] h-[48px] relative rounded-[12px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container8 />
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
    </div>
  );
}

function Container7() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <Label />
      <Input />
    </div>
  );
}

function Label1() {
  return (
    <div
      className="content-stretch flex items-center relative shrink-0 w-full"
      data-name="Label"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">City</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div
      className="absolute bottom-[15.5px] content-stretch flex flex-col items-start left-[13px] overflow-clip pr-[723.69px] top-[15.5px]"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">Search a city</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div
      className="bg-[#f5f5f5] h-[48px] relative rounded-[12px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container10 />
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div
      className="bg-[#f54900] relative rounded-[33554400px] self-stretch shrink-0"
      data-name="Background+Border"
    >
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[13px] py-[9px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">
            <p className="leading-[16px]">Mumbai</p>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[33554400px]"
      />
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div
      className="bg-[#f5f5f5] relative rounded-[33554400px] self-stretch shrink-0"
      data-name="Background+Border"
    >
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[13px] py-[9px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[12px] text-center whitespace-nowrap">
            <p className="leading-[16px]">Pune</p>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[33554400px]"
      />
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div
      className="bg-[#f5f5f5] relative rounded-[33554400px] self-stretch shrink-0"
      data-name="Background+Border"
    >
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[13px] py-[9px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[12px] text-center whitespace-nowrap">
            <p className="leading-[16px]">Bangalore</p>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[33554400px]"
      />
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div
      className="bg-[#f5f5f5] relative rounded-[33554400px] self-stretch shrink-0"
      data-name="Background+Border"
    >
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[13px] py-[9px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[12px] text-center whitespace-nowrap">
            <p className="leading-[16px]">Delhi</p>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[33554400px]"
      />
    </div>
  );
}

function Container11() {
  return (
    <div
      className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <BackgroundBorder />
      <BackgroundBorder1 />
      <BackgroundBorder2 />
      <BackgroundBorder3 />
    </div>
  );
}

function Container9() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <Label1 />
      <Input1 />
      <Container11 />
    </div>
  );
}

function Label2() {
  return (
    <div
      className="content-stretch flex items-center relative shrink-0 w-full"
      data-name="Label"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Area / Locality</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div
      className="absolute bottom-[15.5px] content-stretch flex flex-col items-start left-[13px] overflow-clip pr-[646.75px] top-[15.5px]"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">e.g. Downtown, Sector 4</p>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div
      className="bg-[#f5f5f5] h-[48px] relative rounded-[12px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container13 />
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
    </div>
  );
}

function Container12() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative"
      data-name="Container"
    >
      <Label2 />
      <Input2 />
    </div>
  );
}

function Label3() {
  return (
    <div
      className="content-stretch flex items-center relative shrink-0 w-full"
      data-name="Label"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Landmark</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div
      className="absolute bottom-[15.5px] content-stretch flex flex-col items-start left-[13px] overflow-clip pr-[666.33px] top-[15.5px]"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">e.g. Near Central Mall</p>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div
      className="bg-[#f5f5f5] h-[48px] relative rounded-[12px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container15 />
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e7000b] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="14"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
        width="14"
      >
        <g clipPath="url(#clip0_0_191)" id="SVG">
          <path
            d={svgPaths.pc3ebf00}
            id="Vector"
            stroke="#E7000B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
          <path
            d="M7 4.66667V7"
            id="Vector_2"
            stroke="#E7000B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
          <path
            d="M7 9.33333H7.00583"
            id="Vector_3"
            stroke="#E7000B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
        </g>
        <defs>
          <clipPath id="clip0_0_191">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full"
      data-name="Container"
    >
      <Svg1 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#e7000b] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">
          Landmark is required to help renters locate the site.
        </p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[7.5px] items-start min-w-px relative"
      data-name="Container"
    >
      <Label3 />
      <Input3 />
      <Container16 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Container12 />
      <Container14 />
    </div>
  );
}

function Label4() {
  return (
    <div
      className="content-stretch flex gap-[8px] h-[20px] items-center overflow-clip relative shrink-0"
      data-name="Label"
    >
      <div className="relative shrink-0 size-[16px]" data-name="locate">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-7.5%]">
            <svg
              className="block size-full"
              fill="none"
              height="15.3333"
              preserveAspectRatio="none"
              viewBox="0 0 15.3333 15.3333"
              width="15.3333"
            >
              <path
                d={svgPaths.p35552c00}
                id="Vector"
                stroke="#737373"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        Latitude
      </p>
    </div>
  );
}

function Input4() {
  return (
    <div
      className="bg-[#f5f5f5] h-[48px] relative rounded-[12px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[13px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
            e.g. 28.6139
          </p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
    </div>
  );
}

function Container17() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px overflow-clip relative"
      data-name="Container"
    >
      <Label4 />
      <Input4 />
    </div>
  );
}

function Label5() {
  return (
    <div
      className="content-stretch flex gap-[8px] h-[20px] items-center overflow-clip relative shrink-0"
      data-name="Label"
    >
      <div className="relative shrink-0 size-[16px]" data-name="locate">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-7.5%]">
            <svg
              className="block size-full"
              fill="none"
              height="15.3333"
              preserveAspectRatio="none"
              viewBox="0 0 15.3333 15.3333"
              width="15.3333"
            >
              <path
                d={svgPaths.p35552c00}
                id="Vector"
                stroke="#737373"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        Longitude
      </p>
    </div>
  );
}

function Input5() {
  return (
    <div
      className="bg-[#f5f5f5] h-[48px] relative rounded-[12px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[13px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
            e.g. 77.2090
          </p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
    </div>
  );
}

function Container18() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px overflow-clip relative"
      data-name="Container"
    >
      <Label5 />
      <Input5 />
    </div>
  );
}

function LatLongRow() {
  return (
    <div
      className="content-stretch flex gap-[16px] items-start overflow-clip relative shrink-0 w-full"
      data-name="Lat Long Row"
    >
      <Container17 />
      <Container18 />
    </div>
  );
}

function Line() {
  return (
    <div
      className="bg-[#e5e5e5] flex-[1_0_0] h-px min-w-px relative"
      data-name="Line"
    />
  );
}

function Line1() {
  return (
    <div
      className="bg-[#e5e5e5] flex-[1_0_0] h-px min-w-px relative"
      data-name="Line"
    />
  );
}

function OrDivider() {
  return (
    <div
      className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full"
      data-name="Or Divider"
    >
      <Line />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        or
      </p>
      <Line1 />
    </div>
  );
}

function Label6() {
  return (
    <div
      className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0"
      data-name="Label"
    >
      <div className="relative shrink-0 size-[16px]" data-name="link">
        <div
          className="absolute inset-[4.44%_4.4%]"
          data-name="Vector (Stroke)"
        >
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="14.5784"
            preserveAspectRatio="none"
            viewBox="0 0 14.5914 14.5784"
            width="14.5914"
          >
            <path d={svgPaths.p2ba0e680} fill="#737373" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        Paste Google Maps link
      </p>
    </div>
  );
}

function Input6() {
  return (
    <div
      className="bg-[#f5f5f5] border border-[#e5e5e5] border-solid content-stretch flex h-[48px] items-center overflow-clip px-[13px] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">{`e.g. https://maps.google.com/...`}</p>
    </div>
  );
}

function Container19() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full"
      data-name="Container"
    >
      <Label6 />
      <Input6 />
    </div>
  );
}

function GoogleMapsLinkRow() {
  return (
    <div
      className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full"
      data-name="Google Maps Link Row"
    >
      <OrDivider />
      <Container19 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="16"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
        width="16"
      >
        <g id="SVG">
          <path
            d={svgPaths.p1e7a1b00}
            id="Vector"
            stroke="#737373"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d={svgPaths.pc915480}
            id="Vector_2"
            stroke="#737373"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
        </g>
      </svg>
    </div>
  );
}

function Label7() {
  return (
    <div
      className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
      data-name="Label"
    >
      <Svg2 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Pin location on map</p>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="20"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
        width="20"
      >
        <g id="SVG">
          <path
            d={svgPaths.p2020900}
            id="Vector"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
          <path
            d={svgPaths.pf4e3080}
            id="Vector_2"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div
      className="bg-[#f54900] content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[40px]"
      data-name="Background"
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[33554400px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[40px] top-1/2"
        data-name="Overlay+Shadow"
      />
      <Svg3 />
    </div>
  );
}

function Map() {
  return (
    <div
      className="content-stretch flex h-[256px] items-center justify-center relative rounded-[16px] shrink-0 w-full"
      data-name="Map"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <Image
          alt=""
          className="absolute h-[328.35%] left-0 max-w-none top-[-114.17%] w-full"
          src={imgMap}
        />
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]"
      />
      <Background />
    </div>
  );
}

function Container20() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <Label7 />
      <Map />
    </div>
  );
}

function Container6() {
  return (
    <div
      className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <Container7 />
      <Container9 />
      <Frame />
      <LatLongRow />
      <GoogleMapsLinkRow />
      <Container20 />
    </div>
  );
}

function Label8() {
  return (
    <div
      className="content-stretch flex items-center relative shrink-0 w-full"
      data-name="Label"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Billboard type</p>
      </div>
    </div>
  );
}

function ToggleContent() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] h-full items-start justify-between min-w-px relative"
      data-name="Toggle Content"
    >
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] whitespace-nowrap">
        Hoarding
      </p>
      <div className="h-full relative shrink-0 w-[205px]" data-name="image 1">
        <Image
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgImage1}
        />
      </div>
    </div>
  );
}

function ToggleContent1() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] h-full items-start justify-between min-w-px relative"
      data-name="Toggle Content"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] whitespace-nowrap">
        Unipole
      </p>
      <div
        className="aspect-[196/161] h-full relative shrink-0"
        data-name="image 5"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            alt=""
            className="absolute h-[121.72%] left-[0.01%] max-w-none top-0 w-[99.99%]"
            src={imgImage5}
          />
        </div>
      </div>
    </div>
  );
}

function ToggleContent2() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] h-full items-start justify-between min-w-px relative"
      data-name="Toggle Content"
    >
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] whitespace-nowrap">
        Gantry
      </p>
      <div
        className="aspect-[215/167] h-full relative shrink-0"
        data-name="image 2"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            alt=""
            className="absolute h-[112.57%] left-[0.05%] max-w-none top-[-12.57%] w-[99.91%]"
            src={imgImage2}
          />
        </div>
      </div>
    </div>
  );
}

function ToggleContent3() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] h-full items-start justify-between min-w-px relative"
      data-name="Toggle Content"
    >
      <div className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] whitespace-nowrap">
        <p className="leading-[normal] mb-0 whitespace-pre">{`Building Facade `}</p>
        <p className="leading-[normal] whitespace-pre">(Wall Branding)</p>
      </div>
      <div
        className="aspect-[188/153] h-full relative shrink-0"
        data-name="image 5"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            alt=""
            className="absolute h-[122.88%] left-0 max-w-none top-[-7.84%] w-full"
            src={imgImage6}
          />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div
      className="flex-[1_0_0] gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] h-full min-w-px overflow-clip relative"
      data-name="Content"
    >
      <div
        className="bg-[#fff0ea] col-1 justify-self-stretch relative rounded-[10px] row-1 self-stretch shrink-0"
        data-name=".Toggle Button"
      >
        <div
          aria-hidden
          className="absolute border border-[#f54900] border-solid inset-0 pointer-events-none rounded-[10px]"
        />
        <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[8px] relative size-full">
          <ToggleContent />
        </div>
      </div>
      <div
        className="col-2 justify-self-stretch relative rounded-[10px] row-1 self-stretch shrink-0"
        data-name=".Toggle Button"
      >
        <div
          aria-hidden
          className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]"
        />
        <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[8px] relative size-full">
          <ToggleContent1 />
        </div>
      </div>
      <div
        className="col-1 justify-self-stretch relative rounded-[10px] row-2 self-stretch shrink-0"
        data-name=".Toggle Button"
      >
        <div
          aria-hidden
          className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]"
        />
        <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[8px] relative size-full">
          <ToggleContent2 />
        </div>
      </div>
      <div
        className="col-2 justify-self-stretch relative rounded-[10px] row-2 self-stretch shrink-0"
        data-name=".Toggle Button"
      >
        <div
          aria-hidden
          className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]"
        />
        <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[8px] relative size-full">
          <ToggleContent3 />
        </div>
      </div>
    </div>
  );
}

function Toggle1() {
  return (
    <div
      className="bg-[#f5f5f5] h-[400px] relative rounded-[12px] shrink-0 w-full"
      data-name="Toggle"
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[8px] relative size-full">
          <Content />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div
      className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <Label8 />
      <Toggle1 />
    </div>
  );
}

function Label9() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Label"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] w-full">
        <p className="leading-[20px]">Width (ft)</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div
      className="content-stretch flex flex-col items-start overflow-auto pr-[127.78px] relative shrink-0"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">48</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Container"
    >
      <Container27 />
    </div>
  );
}

function RectangleAlignStretch() {
  return (
    <div
      className="content-stretch flex h-full items-start relative shrink-0"
      data-name="Rectangle:align-stretch"
    >
      <div
        className="h-full min-w-[15px] opacity-0 relative shrink-0 w-[15px]"
        data-name="Rectangle"
      />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-full relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container26 />
        <RectangleAlignStretch />
      </div>
    </div>
  );
}

function Input7() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] h-[36px] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[13px] py-[9.5px] relative size-full">
          <Container25 />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
    </div>
  );
}

function Container24() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative"
      data-name="Container"
    >
      <Label9 />
      <Input7 />
    </div>
  );
}

function Label10() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Label"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] w-full">
        <p className="leading-[20px]">Height (ft)</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div
      className="content-stretch flex flex-col items-start overflow-auto pr-[130.75px] relative shrink-0"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">14</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Container"
    >
      <Container31 />
    </div>
  );
}

function RectangleAlignStretch1() {
  return (
    <div
      className="content-stretch flex h-full items-start relative shrink-0"
      data-name="Rectangle:align-stretch"
    >
      <div
        className="h-full min-w-[15px] opacity-0 relative shrink-0 w-[15px]"
        data-name="Rectangle"
      />
    </div>
  );
}

function Container29() {
  return (
    <div className="h-full relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container30 />
        <RectangleAlignStretch1 />
      </div>
    </div>
  );
}

function Input8() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] h-[36px] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[13px] py-[9.5px] relative size-full">
          <Container29 />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
    </div>
  );
}

function Container28() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative"
      data-name="Container"
    >
      <Label10 />
      <Input8 />
    </div>
  );
}

function Container23() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] gap-[16px] items-start justify-center min-w-px relative"
      data-name="Container"
    >
      <Container24 />
      <Container28 />
    </div>
  );
}

function Container22() {
  return (
    <div
      className="content-stretch flex items-start justify-center relative shrink-0 w-full"
      data-name="Container"
    >
      <Container23 />
    </div>
  );
}

function Container33() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Illumination</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">
          Is this billboard illuminated at night?
        </p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container33 />
        <Container34 />
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Toggle className="bg-[#f5f5f5] relative rounded-[12px] shrink-0">
          <ToggleButton
            className="bg-[#fff0ea] h-[29px] relative rounded-[8px] shrink-0 w-[61px]"
            state="Active"
          >
            <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
              Yes
            </p>
          </ToggleButton>
          <ToggleButton className="h-[30px] relative rounded-[8px] shrink-0 w-[43px]">
            <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
              No
            </p>
          </ToggleButton>
        </Toggle>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative"
      data-name="HorizontalBorder"
    >
      <Container32 />
      <Margin />
    </div>
  );
}

function Container37() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Traffic Side</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">
          Which Side of Traffic is the billboard on?
        </p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div
      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container35() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative"
      data-name="Container"
    >
      <Container36 />
      <Toggle className="bg-[#f5f5f5] relative rounded-[12px] shrink-0">
        <ToggleButton
          className="bg-[#fff0ea] h-[29px] relative rounded-[8px] shrink-0 w-[61px]"
          state="Active"
        >
          <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
            Left
          </p>
        </ToggleButton>
        <ToggleButton className="h-[30px] relative rounded-[8px] shrink-0 w-[59px]">
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
            Right
          </p>
        </ToggleButton>
        <ToggleButton className="h-[30px] relative rounded-[8px] shrink-0 w-[123px]">
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
            Not Applicable
          </p>
        </ToggleButton>
      </Toggle>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full">
      <HorizontalBorder />
      <Container35 />
    </div>
  );
}

function Container40() {
  return (
    <div
      className="content-stretch flex flex-col items-start overflow-clip relative shrink-0"
      data-name="Container"
    >
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        Facing Direction
      </p>
    </div>
  );
}

function Container41() {
  return (
    <div
      className="content-stretch flex flex-col items-start overflow-clip relative shrink-0"
      data-name="Container"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        Which direction does the billboard face?
      </p>
    </div>
  );
}

function Container39() {
  return (
    <div
      className="content-stretch flex flex-col gap-[4px] items-start overflow-clip relative shrink-0 w-full"
      data-name="Container"
    >
      <Container40 />
      <Container41 />
    </div>
  );
}

function FacingDirection() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px overflow-clip relative"
      data-name="FacingDirection"
    >
      <Container39 />
      <Toggle className="bg-[#f5f5f5] relative rounded-[12px] shrink-0">
        <ToggleButton
          className="bg-[#fff0ea] h-[29px] relative rounded-[8px] shrink-0 w-[61px]"
          state="Active"
        >
          <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
            North
          </p>
        </ToggleButton>
        <ToggleButton className="h-[29px] relative rounded-[8px] shrink-0 w-[61px]">
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
            South
          </p>
        </ToggleButton>
        <ToggleButton className="h-[29px] relative rounded-[8px] shrink-0 w-[61px]">
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
            East
          </p>
        </ToggleButton>
        <ToggleButton className="h-[29px] relative rounded-[8px] shrink-0 w-[61px]">
          <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
            West
          </p>
        </ToggleButton>
      </Toggle>
    </div>
  );
}

function FacingDirectionRow() {
  return (
    <div
      className="content-stretch flex items-start overflow-clip relative shrink-0 w-full"
      data-name="Facing Direction Row"
    >
      <FacingDirection />
    </div>
  );
}

function Container43() {
  return (
    <div
      className="content-stretch flex flex-col items-start overflow-clip relative shrink-0"
      data-name="Container"
    >
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        Road / Junction Type
      </p>
    </div>
  );
}

function Container44() {
  return (
    <div
      className="content-stretch flex flex-col items-start overflow-clip relative shrink-0"
      data-name="Container"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        What type of road or junction is the billboard located on?
      </p>
    </div>
  );
}

function Container42() {
  return (
    <div
      className="content-stretch flex flex-col gap-[4px] items-start overflow-clip relative shrink-0 w-full"
      data-name="Container"
    >
      <Container43 />
      <Container44 />
    </div>
  );
}

function ToggleWrap() {
  return (
    <div
      className="bg-[#f5f5f5] content-start flex flex-wrap gap-[8px] items-start overflow-clip px-[8px] py-[4px] relative rounded-[12px] shrink-0"
      data-name="Toggle Wrap"
    >
      <ToggleButton
        className="bg-[#fff0ea] h-[29px] relative rounded-[8px] shrink-0"
        state="Active"
      >
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
          Highway
        </p>
      </ToggleButton>
      <ToggleButton className="h-[29px] relative rounded-[8px] shrink-0">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
          Arterial Road
        </p>
      </ToggleButton>
      <ToggleButton className="h-[29px] relative rounded-[8px] shrink-0">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
          Market Road
        </p>
      </ToggleButton>
      <ToggleButton className="h-[29px] relative rounded-[8px] shrink-0">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
          Residential Road
        </p>
      </ToggleButton>
      <ToggleButton className="h-[29px] relative rounded-[8px] shrink-0">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
          Signal/Junction
        </p>
      </ToggleButton>
      <ToggleButton className="h-[29px] relative rounded-[8px] shrink-0">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
          Flyover
        </p>
      </ToggleButton>
      <ToggleButton className="h-[29px] relative rounded-[8px] shrink-0">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
          Mall Frontage
        </p>
      </ToggleButton>
    </div>
  );
}

function RoadJunctionTypeRow() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full"
      data-name="Road Junction Type Row"
    >
      <Container42 />
      <ToggleWrap />
    </div>
  );
}

function Container46() {
  return (
    <div
      className="content-stretch flex flex-col items-start overflow-clip relative shrink-0"
      data-name="Container"
    >
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        Traffic Estimate
      </p>
    </div>
  );
}

function Badge() {
  return (
    <div
      className="bg-[#f2f2f2] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[6px] shrink-0"
      data-name="Badge"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#737373] text-[12px] whitespace-nowrap">
        Optional
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Container46 />
      <Badge />
    </div>
  );
}

function Container47() {
  return (
    <div
      className="content-stretch flex flex-col items-start overflow-clip relative shrink-0"
      data-name="Container"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        Provide traffic details if known. This Helps our Advertisers find your
        Billboard.
      </p>
    </div>
  );
}

function Container45() {
  return (
    <div
      className="content-stretch flex flex-col gap-[4px] items-start overflow-clip relative shrink-0 w-full"
      data-name="Container"
    >
      <Frame2 />
      <Container47 />
    </div>
  );
}

function Input9() {
  return (
    <div
      className="bg-[#f5f5f5] border border-[#e5e5e5] border-solid content-stretch flex h-[48px] items-center overflow-clip px-[13px] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        e.g. 50,000 vehicles/day
      </p>
    </div>
  );
}

function Container48() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px overflow-clip relative"
      data-name="Container"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#737373] text-[12px] whitespace-nowrap">
        Daily traffic
      </p>
      <Input9 />
    </div>
  );
}

function Input10() {
  return (
    <div
      className="bg-[#f5f5f5] border border-[#e5e5e5] border-solid content-stretch flex h-[48px] items-center overflow-clip px-[13px] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        e.g. 8AM–10AM, 5PM–8PM
      </p>
    </div>
  );
}

function Container49() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px overflow-clip relative"
      data-name="Container"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#737373] text-[12px] whitespace-nowrap">
        Peak hours
      </p>
      <Input10 />
    </div>
  );
}

function Input11() {
  return (
    <div
      className="bg-[#f5f5f5] border border-[#e5e5e5] border-solid content-stretch flex h-[48px] items-center overflow-clip px-[13px] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        e.g. 70% vehicles, 30% pedestrians
      </p>
    </div>
  );
}

function Container50() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px overflow-clip relative"
      data-name="Container"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#737373] text-[12px] whitespace-nowrap">
        Vehicle/Pedestrian mix
      </p>
      <Input11 />
    </div>
  );
}

function InputsRow() {
  return (
    <div
      className="content-stretch flex gap-[16px] items-start overflow-clip relative shrink-0 w-full"
      data-name="Inputs Row"
    >
      <Container48 />
      <Container49 />
      <Container50 />
    </div>
  );
}

function TrafficEstimateRow() {
  return (
    <div
      className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full"
      data-name="Traffic Estimate Row"
    >
      <Container45 />
      <InputsRow />
    </div>
  );
}

function Label11() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Label"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] w-full">
        <p className="leading-[20px]">Visibility notes</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div
      className="absolute bottom-[67px] content-stretch flex flex-col items-start left-[13px] pr-[417.81px] top-[9px]"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">
          Describe visibility, viewing distance, obstructions, etc.
        </p>
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] h-[96px] min-h-[96px] relative rounded-[8px] shrink-0 w-full"
      data-name="Textarea"
    >
      <div className="overflow-auto relative rounded-[inherit] size-full">
        <Container52 />
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
    </div>
  );
}

function Container51() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <Label11 />
      <Textarea />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="16"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
        width="16"
      >
        <g id="SVG">
          <path
            d={svgPaths.p2c7dae00}
            id="Vector"
            stroke="#737373"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d={svgPaths.p34986980}
            id="Vector_2"
            stroke="#737373"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
        </g>
      </svg>
    </div>
  );
}

function Label12() {
  return (
    <div
      className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full"
      data-name="Label"
    >
      <Svg4 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Photos</p>
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="20"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
        width="20"
      >
        <g id="SVG">
          <path
            d="M10 2.5V12.5"
            id="Vector"
            stroke="#737373"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
          <path
            d={svgPaths.p320a7e80}
            id="Vector_2"
            stroke="#737373"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
          <path
            d={svgPaths.p2f601280}
            id="Vector_3"
            stroke="#737373"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div
      className="bg-[#f5f5f5] relative rounded-[33554400px] shrink-0 size-[48px]"
      data-name="Background"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg5 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">Upload photos</p>
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[12px] whitespace-nowrap">
          <p className="leading-[16px]">Add at least 3 photos</p>
        </div>
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="Border">
      <div
        aria-hidden
        className="absolute border-2 border-[#e5e5e5] border-dashed inset-0 pointer-events-none rounded-[16px]"
      />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center justify-center p-[50px] relative size-full">
          <Background1 />
          <Container54 />
          <Container55 />
        </div>
      </div>
    </div>
  );
}

function BillboardPhoto() {
  return (
    <div
      className="h-[268.66px] relative shrink-0 w-full"
      data-name="Billboard photo"
    >
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <Image
          alt=""
          className="absolute h-full left-[-24.91%] max-w-none top-0 w-[149.81%]"
          src={imgBillboardPhoto}
        />
      </div>
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="14"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
        width="14"
      >
        <g id="SVG">
          <path
            d="M10.5 3.5L3.5 10.5"
            id="Vector"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
          <path
            d="M3.5 3.5L10.5 10.5"
            id="Vector_2"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div
      className="absolute bg-[rgba(10,10,10,0.7)] right-[7px] rounded-[33554400px] size-[24px] top-[7px]"
      data-name="Button"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg6 />
      </div>
    </div>
  );
}

function Border1() {
  return (
    <div
      className="aspect-square relative rounded-[12px] shrink-0"
      data-name="Border"
    >
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <BillboardPhoto />
        <Button1 />
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
    </div>
  );
}

function BillboardPhoto1() {
  return (
    <div
      className="h-[268.67px] relative shrink-0 w-full"
      data-name="Billboard photo"
    >
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <Image
          alt=""
          className="absolute h-full left-[-24.91%] max-w-none top-0 w-[149.81%]"
          src={imgBillboardPhoto}
        />
      </div>
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="14"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
        width="14"
      >
        <g id="SVG">
          <path
            d="M10.5 3.5L3.5 10.5"
            id="Vector"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
          <path
            d="M3.5 3.5L10.5 10.5"
            id="Vector_2"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div
      className="absolute bg-[rgba(10,10,10,0.7)] right-[7px] rounded-[33554400px] size-[24px] top-[7px]"
      data-name="Button"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg7 />
      </div>
    </div>
  );
}

function Border2() {
  return (
    <div
      className="aspect-square relative rounded-[12px] shrink-0"
      data-name="Border"
    >
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <BillboardPhoto1 />
        <Button2 />
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="24"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
        width="24"
      >
        <g id="SVG">
          <path
            d="M5 12H19"
            id="Vector"
            stroke="#737373"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M12 5V19"
            id="Vector_2"
            stroke="#737373"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div
      className="content-stretch flex items-center justify-center p-[123.33px] relative rounded-[12px] shrink-0"
      data-name="Button"
    >
      <div
        aria-hidden
        className="absolute border-2 border-[#e5e5e5] border-dashed inset-0 pointer-events-none rounded-[12px]"
      />
      <Svg8 />
    </div>
  );
}

function Container56() {
  return (
    <div
      className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <Border1 />
      <Border2 />
      <Button3 />
    </div>
  );
}

function Svg9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="14"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
        width="14"
      >
        <g clipPath="url(#clip0_0_191)" id="SVG">
          <path
            d={svgPaths.pc3ebf00}
            id="Vector"
            stroke="#E7000B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
          <path
            d="M7 4.66667V7"
            id="Vector_2"
            stroke="#E7000B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
          <path
            d="M7 9.33333H7.00583"
            id="Vector_3"
            stroke="#E7000B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
        </g>
        <defs>
          <clipPath id="clip0_0_191">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container57() {
  return (
    <div
      className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full"
      data-name="Container"
    >
      <Svg9 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#e7000b] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Add 1 more photo(s) to continue.</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div
      className="content-stretch flex flex-col gap-[11.5px] items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <Label12 />
      <Border />
      <Container56 />
      <Container57 />
    </div>
  );
}

function Container59() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] w-full">
        <p className="leading-[24px]">Pricing</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container59 />
      </div>
    </div>
  );
}

function Label13() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Label"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] w-full">
        <p className="leading-[20px]">Monthly rate</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#666] text-[14px] whitespace-nowrap">
          ₹
        </p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div
      className="flex-[1_0_0] h-full min-w-px relative"
      data-name="Container"
    >
      <div className="overflow-auto rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[308.61px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
            <p className="leading-[normal]">1,45,500</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input12() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] h-[36px] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[13px] py-[9px] relative size-full">
          <Container63 />
          <Container64 />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
    </div>
  );
}

function Container62() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <Input12 />
    </div>
  );
}

function Container61() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative"
      data-name="Container"
    >
      <Label13 />
      <Container62 />
    </div>
  );
}

function Container67() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Availability</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Mark as available for booking</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div
      className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0"
      data-name="Container"
    >
      <Container67 />
      <Container68 />
    </div>
  );
}

function Switch() {
  return (
    <div
      className="bg-[#171717] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex h-[18.39px] items-center pl-[15px] pr-px py-px relative rounded-[33554400px] shrink-0 w-[32px]"
      data-name="Switch"
    >
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[33554400px]"
      />
      <div
        className="bg-white relative rounded-[33554400px] shrink-0 size-[16px]"
        data-name="Background"
      />
    </div>
  );
}

function Container65() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px relative"
      data-name="Container"
    >
      <Container66 />
      <Switch />
    </div>
  );
}

function Container60() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-end justify-center relative size-full">
        <Container61 />
        <Container65 />
      </div>
    </div>
  );
}

function Label14() {
  return (
    <div
      className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
      data-name="Label"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#666] text-[14px] w-full">
        Minimum duration
      </p>
    </div>
  );
}

function Container72() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
      data-name="Container"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#333] text-[12px] w-full">
        1 month
      </p>
    </div>
  );
}

function Svg10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="16"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
        width="16"
      >
        <g id="SVG" opacity="0.5">
          <path
            d="M4 6L8 10L12 6"
            id="Vector"
            stroke="#0A0A0A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
        </g>
      </svg>
    </div>
  );
}

function Input13() {
  return (
    <div
      className="bg-white border border-[#d9d9d9] border-solid content-stretch flex items-start overflow-clip px-[12px] py-[9px] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <Container72 />
      <Svg10 />
    </div>
  );
}

function Container71() {
  return (
    <div
      className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
      data-name="Container"
    >
      <Input13 />
    </div>
  );
}

function Container70() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px overflow-clip relative"
      data-name="Container"
    >
      <Label14 />
      <Container71 />
    </div>
  );
}

function Label15() {
  return (
    <div
      className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
      data-name="Label"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#666] text-[14px] w-full">
        Printing/Mounting cost (If Any)
      </p>
    </div>
  );
}

function Container75() {
  return (
    <div
      className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0"
      data-name="Container"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#666] text-[14px] whitespace-nowrap">
        ₹
      </p>
    </div>
  );
}

function Container76() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative"
      data-name="Container"
    >
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#333] text-[12px] w-full">
        25,000
      </p>
    </div>
  );
}

function Input14() {
  return (
    <div
      className="bg-white border border-[#d9d9d9] border-solid content-stretch flex gap-[4px] items-center px-[12px] py-[8px] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <Container75 />
      <Container76 />
    </div>
  );
}

function Container74() {
  return (
    <div
      className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full"
      data-name="Container"
    >
      <Input14 />
    </div>
  );
}

function Container73() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px overflow-clip relative"
      data-name="Container"
    >
      <Label15 />
      <Container74 />
    </div>
  );
}

function Container69() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Container70 />
        <Container73 />
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div
      className="bg-white relative rounded-[16px] shrink-0 w-full"
      data-name="Background+Border"
    >
      <div
        aria-hidden
        className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]"
      />
      <div className="content-stretch flex flex-col gap-[16px] items-start px-[33px] py-[25px] relative size-full">
        <Container58 />
        <Container60 />
        <Container69 />
      </div>
    </div>
  );
}

function Svg11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="16"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
        width="16"
      >
        <g id="SVG">
          <path
            d="M3.33333 8H12.6667"
            id="Vector"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d={svgPaths.p1d405500}
            id="Vector_2"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div
      className="bg-[#f54900] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[48px] opacity-50 relative rounded-[12px] shrink-0"
      data-name="Button"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center pb-[14.5px] pt-[13.5px] px-[12px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
          <p className="leading-[20px]">Continue to Media Specs</p>
        </div>
        <Svg11 />
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div
      className="content-stretch flex items-center justify-end pt-[9px] relative shrink-0 w-full"
      data-name="HorizontalBorder"
    >
      <div
        aria-hidden
        className="absolute border-[#e5e5e5] border-solid border-t inset-0 pointer-events-none"
      />
      <Button4 />
    </div>
  );
}

function Container5() {
  return (
    <div
      className="content-stretch flex flex-col gap-[32px] items-start max-w-[900px] p-[32px] relative shrink-0 w-[900px] z-[1]"
      data-name="Container"
    >
      <Container6 />
      <Container21 />
      <Container22 />
      <Frame1 />
      <FacingDirectionRow />
      <RoadJunctionTypeRow />
      <TrafficEstimateRow />
      <Container51 />
      <Container53 />
      <BackgroundBorder4 />
      <HorizontalBorder1 />
    </div>
  );
}

export default function OwnersApp() {
  return (
    <div
      className="bg-white content-stretch flex flex-col isolate items-center relative size-full"
      data-name="Owners-App01"
    >
      <BackgroundHorizontalBorder />
      <Container5 />
    </div>
  );
}
