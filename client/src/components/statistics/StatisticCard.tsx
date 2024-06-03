import React from "react";

type StatisticCardProps = {
  title: string;
  amount: string | number;
  img: string;
};

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  amount,
  img,
}) => {
  return (
    <div className="statistic-card bg-gray-800 p-8 rounded-lg">
      <div className="flex gap-x-4">
        <div className="rounded-full bg-white w-16 h-16 p-3">
          <img src={img} alt="" />
        </div>
        <div className="text-white">
          <p className="mb-2 text-lg font-medium text-gray-400 electrolize-regular">
            {title}
          </p>
          <p className="text-xl font-semibold text-gray-200 electrolize-regular">
            {amount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
