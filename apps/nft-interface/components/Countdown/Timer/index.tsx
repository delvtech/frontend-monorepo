import {
  StyledSemiColon,
  StyledTimer,
  TimerFlex,
} from "components/Countdown/styles";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";

interface TimerProps {
  targetDate: Moment;
  fontSize?: string;
}

export const Timer: React.FC<TimerProps> = ({ targetDate, fontSize }) => {
  const [days, setDays] = useState<string | number>("00");
  const [hours, setHours] = useState<string | number>("00");
  const [minutes, setMinutes] = useState<string | number>("00");
  const [seconds, setSeconds] = useState<string | number>("00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const duration = moment.duration(targetDate.diff(now));

      const days = Math.floor(duration.asDays());
      const hours = Math.floor(duration.asHours()) % 24;
      const minutes = Math.floor(duration.asMinutes()) % 60;
      const seconds = Math.floor(duration.asSeconds() % 60);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <TimerFlex>
      <StyledTimer fontSize={fontSize}>{days}</StyledTimer>
      <StyledSemiColon fontSize={fontSize}>:</StyledSemiColon>
      <StyledTimer fontSize={fontSize}>{hours}</StyledTimer>
      <StyledSemiColon fontSize={fontSize}>:</StyledSemiColon>
      <StyledTimer fontSize={fontSize}>{minutes}</StyledTimer>
      <StyledSemiColon fontSize={fontSize}>:</StyledSemiColon>
      <StyledTimer fontSize={fontSize}>{seconds}</StyledTimer>
    </TimerFlex>
  );
};
