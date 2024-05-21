interface TrashIconProps {
  fill: string
  width: string
  height: string
}
export const TrashIcon: React.FC<TrashIconProps> = ({
  fill,
  width,
  height,
}) => {
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 21 21"
        fill="none"
      >
        <path
          d="M10.1777 20.6055C15.7006 20.6055 20.1777 16.1283 20.1777 10.6055C20.1777 5.08262 15.7006 0.605469 10.1777 0.605469C4.65489 0.605469 0.177734 5.08262 0.177734 10.6055C0.177734 16.1283 4.65489 20.6055 10.1777 20.6055Z"
          fill={fill}
        />
        <path
          d="M13.7415 8.57118C13.7415 8.66614 13.7415 8.74518 13.7415 8.8237C13.7415 10.6937 13.7431 12.5638 13.7404 14.4338C13.7394 15.1919 13.2545 15.7935 12.5116 15.9632C12.4158 15.985 12.3141 15.9903 12.2151 15.9903C10.725 15.9919 9.23479 15.9929 7.74462 15.9908C6.89363 15.9897 6.214 15.3144 6.2124 14.4608C6.20868 12.5775 6.21081 10.6943 6.21081 8.81097C6.21081 8.73298 6.21081 8.655 6.21081 8.56694C6.12725 8.5558 6.06232 8.55155 5.99899 8.53829C5.78185 8.49266 5.65412 8.34041 5.65093 8.1176C5.6472 7.86561 5.64508 7.61362 5.65199 7.36163C5.66636 6.85288 6.13204 6.38603 6.64402 6.37383C7.04956 6.36428 7.45563 6.37012 7.86117 6.36959C8.03822 6.36959 8.12692 6.27816 8.12727 6.09532C8.12727 5.95633 8.12514 5.8168 8.12781 5.67781C8.13472 5.38391 8.29598 5.21999 8.58497 5.21946C9.50941 5.21786 10.4344 5.21786 11.3588 5.21946C11.651 5.21946 11.8154 5.38073 11.8234 5.67038C11.8277 5.8359 11.8335 6.00248 11.8218 6.16747C11.8112 6.32237 11.8607 6.37808 12.023 6.3733C12.4152 6.36269 12.808 6.36694 13.2002 6.37065C13.8501 6.37648 14.2971 6.82582 14.3019 7.47357C14.3035 7.66561 14.3035 7.85818 14.3019 8.05022C14.2998 8.37861 14.1763 8.5107 13.8405 8.54837C13.8149 8.55102 13.7899 8.55898 13.7404 8.57012L13.7415 8.57118ZM12.8889 11.6401C12.8889 10.6858 12.8846 9.73139 12.8926 8.77701C12.8942 8.59399 12.8378 8.54359 12.6553 8.54412C10.8734 8.55049 9.09109 8.55049 7.30928 8.54412C7.12247 8.54359 7.05808 8.58709 7.05914 8.78444C7.06606 10.647 7.07191 12.5091 7.05808 14.3717C7.05382 14.9165 7.44073 15.1712 7.8649 15.1691C9.26779 15.1616 10.6707 15.1606 12.0736 15.1696C12.502 15.1722 12.9054 14.9266 12.8937 14.3643C12.8745 13.4566 12.8884 12.5484 12.8889 11.6401ZM9.98999 7.19823C9.60414 7.19823 9.21882 7.19823 8.83297 7.19823C8.15495 7.19823 7.47692 7.19664 6.79889 7.1993C6.58016 7.20036 6.48117 7.31866 6.47691 7.53882C6.47212 7.78338 6.65573 7.68948 6.76111 7.69001C8.90855 7.69532 11.056 7.69373 13.2029 7.69373C13.2492 7.69373 13.3045 7.70858 13.3407 7.68948C13.3924 7.6619 13.4621 7.61309 13.4679 7.56587C13.4993 7.32609 13.3753 7.1993 13.1209 7.19877C12.0773 7.1977 11.0336 7.19877 9.98945 7.19823H9.98999ZM9.95752 6.37012C10.2428 6.37012 10.528 6.36587 10.8133 6.37224C10.9394 6.37489 10.9708 6.31866 10.9719 6.2046C10.9724 6.08736 10.9346 6.04174 10.8106 6.0428C10.2534 6.0481 9.69621 6.0481 9.13899 6.0428C9.01233 6.04174 8.98093 6.0932 8.9804 6.20778C8.9804 6.32449 9.01818 6.37542 9.14165 6.37277C9.41361 6.36694 9.68557 6.37065 9.95752 6.37065V6.37012Z"
          fill="white"
        />
        <path
          d="M7.93867 11.9733C7.93867 11.2449 7.9392 10.5165 7.93867 9.78813C7.93867 9.59503 8.0248 9.45498 8.20027 9.38177C8.36935 9.31068 8.53258 9.3441 8.65381 9.48097C8.71071 9.54569 8.75165 9.64065 8.76228 9.72606C8.78249 9.89636 8.78089 10.0693 8.78142 10.2412C8.78249 11.4693 8.78249 12.6879 8.78142 13.9165C8.78142 14.0221 8.77823 14.1287 8.76653 14.2338C8.74048 14.4714 8.5714 14.6173 8.33851 14.6094C8.1136 14.6019 7.94505 14.4348 7.94079 14.1982C7.93495 13.8475 7.93867 13.4964 7.93867 13.1452C7.93867 12.7404 7.93867 12.3781 7.93867 11.9733Z"
          fill="white"
        />
        <path
          d="M12.0115 12.0997C12.0115 12.828 12.0115 13.5564 12.0115 14.2848C12.0115 14.4684 11.9323 14.6052 11.7643 14.6806C11.6053 14.7522 11.4453 14.7347 11.3219 14.6127C11.2565 14.5479 11.2044 14.4487 11.19 14.3585C11.165 14.2031 11.1698 14.0418 11.1693 13.8832C11.1688 13.2286 11.1677 11.9904 11.1693 10.1681C11.1693 10.0556 11.173 9.94263 11.1847 9.83123C11.2076 9.61054 11.3852 9.45032 11.5957 9.45192C11.8132 9.45351 12.0035 9.6291 12.0083 9.8551C12.0168 10.2323 12.0115 10.61 12.0115 10.9872C12.0115 11.358 12.0115 11.7288 12.0115 12.0997Z"
          fill="white"
        />
        <path
          d="M9.50939 11.9674C9.50939 11.2591 9.52002 10.5504 9.50407 9.84215C9.49769 9.55091 9.67741 9.35197 9.92731 9.34772C10.1735 9.34348 10.3362 9.5403 10.3367 9.83101C10.3373 11.274 10.3373 12.6984 10.3367 14.1414C10.3367 14.4384 10.1799 14.6119 9.9188 14.6098C9.66039 14.6077 9.50992 14.4342 9.50939 14.1329C9.50832 13.4114 9.50939 12.6894 9.50939 11.9679V11.9674Z"
          fill="white"
        />
      </svg>
    </span>
  )
}