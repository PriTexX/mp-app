import { useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { Text } from 'react-native-paper';
import { lkClient } from 'src/clients/lk';
import { useSecureStore } from 'src/store/useSecureStore';
import { useUserStore } from 'src/store/useUserStore';

const abbrvToMonths = {
  Янв: 0,
  Фев: 1,
  Мар: 2,
  Апр: 3,
  Май: 4,
  Июн: 5,
  Июл: 6,
  Авг: 7,
  Сен: 8,
  Окт: 9,
  Ноя: 10,
  Дек: 11,
} as const;

type AbbrvMonths = keyof typeof abbrvToMonths;

async function getAndProcessStudentSchedule(phpToken: string, group: string) {
  const scheduleResult = await lkClient.getSchedule(phpToken, group);

  return scheduleResult.map((schedule) => {
    const currentDate = new Date();

    for (const [day, { lessons }] of Object.entries(schedule)) {
      schedule[day as keyof typeof schedule].lessons = lessons.filter(
        (lesson) => {
          const [from, to] = lesson.dateInterval.split(' - ');

          const [fromDay, fromMonth] = from.split(' ');
          const fromMonthNumber = abbrvToMonths[fromMonth as AbbrvMonths];

          // Usually we get date intervals like 09 Сен - 10 Янв
          // but for some reason some 🤡 decided to send
          // one exam along with common schedule. Exams don't
          // have date intervals instead there is single date
          // like 27 Май. So for this i have this hack
          // thats sets to* vars only if there is date
          const [toDay, toMonth] = to
            ? to.split(' ')
            : [Number(fromDay) + 1, fromMonth];

          const toMonthNumber = abbrvToMonths[toMonth as AbbrvMonths];

          // We have few edge cases here with dates. Schedule is sent
          // without years like 09 Сен - 10 Янв. In order to filter
          // them properly we need to set Date's year to them, but we
          // can't just use currentDate's year as it won't work
          // with date intervals that pass the New Year date.
          //
          // For example 09 Сен - 10 Янв:
          // if i get schedule in 09.10.2023 then 2023 year
          // will be used for interval and its okay. But if i get
          // this schedule in 01.01.2024 then 2024 will be used
          // and it will fail the from check however lesson is still going.
          //
          // To handle this case we will increase or decrease current year
          // if date interval passes that New Year date. To determine
          // what we should do with current year we will check current
          // month. If it is January then we decrease year for from date
          // otherwise increase for to date.
          //
          // Yes, it's a hack and it only works as long as we get new
          // refreshed schedule every January for next semester.
          // But i couldn't figure out a better solution.
          const fromYear =
            toMonthNumber < fromMonthNumber && currentDate.getMonth() == 0
              ? currentDate.getFullYear() - 1
              : currentDate.getFullYear();
          const toYear =
            toMonthNumber < fromMonthNumber && currentDate.getMonth() == 0
              ? currentDate.getFullYear() + 1
              : currentDate.getFullYear();

          const fromDate = new Date(fromYear, fromMonthNumber, Number(fromDay));

          const toDate = new Date(toYear, toMonthNumber, Number(toDay));

          if (currentDate >= toDate || currentDate <= fromDate) {
            return false;
          }

          return true;
        },
      );
    }

    return schedule;
  });
}

export function ScheduleScreen() {
  const tokens = useSecureStore((s) => s.tokens);
  const user = useUserStore((s) => s.user);

  const [schedule, setSchedule] = useState('');

  useEffect(() => {
    if (!tokens || !user) {
      return;
    }

    const applySchedule = async () => {
      try {
        const scheduleRes = await getAndProcessStudentSchedule(
          tokens.token,
          user.group,
        );

        if (scheduleRes.isErr()) {
          showMessage({
            message: 'Не удалось загрузить расписание',
            type: 'danger',
          });
          return;
        }

        setSchedule(JSON.stringify(scheduleRes.value));
      } catch (error) {
        console.error(error);
      }
    };

    void applySchedule();
  }, [tokens, user]);

  return <Text>{schedule}</Text>;
}
