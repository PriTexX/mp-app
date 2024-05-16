import { z } from 'zod';

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
    }),
  }),
});
