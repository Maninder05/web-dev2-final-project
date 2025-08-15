import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  amount: number;
  color: string;
  route?: string; // Optional route for navigation
}

const DashboardCard = ({ title, amount, color, route }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => route && navigate(route)}
      className={`p-6 rounded-3xl shadow-lg text-white flex flex-col justify-between cursor-pointer transform transition-transform duration-200 hover:scale-105 ${color}`}
    >
      <span className="text-lg font-semibold">{title}</span>
      <span className="text-2xl font-bold mt-2">${amount}</span>
    </div>
  );
};

export default DashboardCard;

