import type { Dayjs } from 'dayjs';
import type { Lesson } from 'src/clients/lk';

export type LearningDay = {
  date: Dayjs;
  lessons: Lesson[];
};
