import React from "react";

function FacebookIcon({ color }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_156_823)">
        <path
          d="M10 0C4.47503 0 0 4.47503 0 10C0 15.525 4.47503 20 10 20C15.525 20 20 15.525 20 10C20 4.47503 15.5148 0 10 0ZM12.9256 5.69827C12.9256 5.79001 12.8542 5.86137 12.7625 5.86137H11.4883C11.1723 5.86137 10.9276 6.11621 10.9276 6.42202V7.75739H12.7319C12.8236 7.75739 12.895 7.83894 12.895 7.93068L12.7421 9.80632C12.7319 9.88787 12.6707 9.94903 12.579 9.94903H10.9276V16.1672C10.9276 16.2589 10.8563 16.3303 10.7645 16.3303H8.50153C8.40979 16.3303 8.33843 16.2589 8.33843 16.1672V10.051V9.94903H7.20693C7.11519 9.94903 7.04383 9.87768 7.04383 9.78593V7.9103C7.04383 7.81855 7.11519 7.7472 7.20693 7.7472H8.34862V5.94291C8.34862 4.6789 9.36799 3.65953 10.632 3.65953H12.7829C12.8746 3.65953 12.946 3.73089 12.946 3.82263V5.69827H12.9256Z"
          fill={color || "#001247"}
        />
      </g>
      <defs>
        <clipPath id="clip0_156_823">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default FacebookIcon;
