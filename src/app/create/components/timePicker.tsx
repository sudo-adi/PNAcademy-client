import { Input } from '@/components/ui/input';
import React from 'react';

const TimePicker: React.FC = () => {
  const [time, setTime] = React.useState<string>("00:00:00");

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  return (
    <div>
      <Input
        type="time"
        value={time}
        onChange={handleTimeChange}
        className="w-full max-w-none"

      />
    </div >
  );
};

export default TimePicker;
