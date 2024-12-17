import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

export interface LeaderboardData {
  user_id: string;
  correct_answers_count: number;
  marks_scored: number;
  correct_percentage: number;
  wrong_answers_count: number;
  createdAt: string;
  updatedAt: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface LeaderboardsProps {
  data: LeaderboardData[];
}

function LeaderboardSingleCard({
  rank,
  user,
  correct_answers_count,
  marks_scored,
  correct_percentage,
}: {
  rank: number;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  correct_answers_count: number;
  marks_scored: number;
  correct_percentage: number;
}) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary transition-colors">
      <div className="flex items-center space-x-2">
        <span className="text-xs font-semibold w-4">{rank}</span>
        <Avatar className="w-8 h-8">
          <AvatarFallback className="text-xs">
            {`${user.first_name[0]}${user.last_name[0]}`}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xs font-medium">{`${user.first_name} ${user.last_name}`}</h3>
          <p className="text-[10px] text-gray-500 truncate max-w-[100px]">
            {user.email}
          </p>
        </div>
      </div>
      <div className="flex space-x-2 text-[10px]">
        <div className="text-center">
          <p className="font-semibold">{correct_answers_count}</p>
          <p className="text-gray-500">Correct</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">{marks_scored}</p>
          <p className="text-gray-500">Score</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">{correct_percentage}%</p>
          <p className="text-gray-500">Accuracy</p>
        </div>
      </div>
    </div>
  );
}

const Leaderboards: React.FC<LeaderboardsProps> = ({ data }) => {
  return (
    <div className="flex flex-col w-full">
      {data.length === 0 ? (
        <p className="text-center text-sm text-gray-500">No data available</p>
      ) : (
        data.map((item, index) => (
          <LeaderboardSingleCard
            key={item.user_id}
            rank={index + 1}
            user={item.user}
            correct_answers_count={item.correct_answers_count}
            marks_scored={item.marks_scored}
            correct_percentage={parseFloat(item.correct_percentage.toFixed(2))}
          />
        ))
      )}
    </div>
  );
};

export default Leaderboards;
