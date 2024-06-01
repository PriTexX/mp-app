import type {
  lessonSchema,
  newsSchema,
  studentScheduleSchema,
} from './schemas';
import type { z } from 'zod';

export type Lesson = z.infer<typeof lessonSchema>;
export type StudentSchedule = z.infer<typeof studentScheduleSchema>;

export type News = z.infer<typeof newsSchema>;
