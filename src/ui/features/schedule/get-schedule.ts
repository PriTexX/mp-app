import type { Dayjs } from 'dayjs';
import type { Lesson, StudentSchedule } from 'src/clients/lk';

const dayToDayNum = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
} as const;

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

function getDaySchedule(schedule: StudentSchedule, date: Date) {
  const dayOfWeek = schedule[dayToDayNum[date.getDay() as 1]];

  if (!dayOfWeek) {
    return [];
  }

  const lessons: Lesson[] = [];

  for (const lesson of dayOfWeek.lessons) {
    const [from, to] = lesson.dateInterval.split(' - ');

    const [fromDay, fromMonth] = from.split(' ');
    const fromMonthNumber = abbrvToMonths[fromMonth as AbbrvMonths];

    // Usually we get date intervals like 09 Сен - 10 Янв
    // but for some reason some 🤡 decided to send
    // one exam along with common schedule. Exams don't
    // have date intervals instead there is single date
    // like 27 Май. So for this i have this hack
    // thats sets to* vars equal to from* vars
    const [toDay, toMonth] = to ? to.split(' ') : [Number(fromDay), fromMonth];

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
      toMonthNumber < fromMonthNumber && date.getMonth() == 0
        ? date.getFullYear() - 1
        : date.getFullYear();
    const toYear =
      toMonthNumber < fromMonthNumber && date.getMonth() == 0
        ? date.getFullYear() + 1
        : date.getFullYear();

    const fromDate = new Date(fromYear, fromMonthNumber, Number(fromDay));

    const toDate = new Date(toYear, toMonthNumber, Number(toDay));

    if (date >= fromDate && date <= toDate) {
      lessons.push(lesson);
    }
  }

  return lessons;
}

export function getWeekSchedule(schedule: StudentSchedule, date: Dayjs) {
  let day = date.subtract(date.day() - 1, 'days');

  const week: Lesson[][] = [];

  for (let _ = 0; _ < 7; _++) {
    week.push(getDaySchedule(schedule, day.toDate()));
    day = day.add(1, 'day');
  }

  return week;
}
