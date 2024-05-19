import { z } from 'zod';

const teacherSchema = z.object({
  teacher: z.object({
    fullName: z.string(),
  }),
});

export const visitHistorySchema = z
  .object({
    date: z.string(),
  })
  .and(teacherSchema);

export const standardHistorySchema = z
  .object({
    date: z.string(),
    points: z.number(),
    standardType: z.string(),
  })
  .and(teacherSchema);

export const otherHistorySchema = z
  .object({
    date: z.string(),
    points: z.number(),
    workType: z.string(),
  })
  .and(teacherSchema);

export const getStudentSchema = z.object({
  data: z.object({
    student: z.object({
      group: z.object({
        groupName: z.string(),
        visitValue: z.number(),
        curator: z.object({
          fullName: z.string(),
        }),
      }),
      visits: z.number(),
      pointsForStandards: z.number(),
      additionalPoints: z.number(),
      course: z.number(),
      hasDebtFromPreviousSemester: z.boolean(),
      archivedVisitValue: z.number(),

      visitsHistory: z.array(visitHistorySchema),
      standardsHistory: z.array(standardHistorySchema),
      pointsHistory: z.array(otherHistorySchema),
    }),
  }),
});
