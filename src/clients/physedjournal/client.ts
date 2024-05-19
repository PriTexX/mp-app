import { gql, SafeGraphQLClient } from 'src/pkg/graphql';

import { getStudentSchema } from './schemas';

export class PhysEdJournalClient {
  private client: SafeGraphQLClient;

  constructor() {
    this.client = new SafeGraphQLClient(
      'https://api.mospolytech.ru/physedjournal/graphql',
    );
  }

  async getStudent(guid: string) {
    const query = gql`
      query getStudent($guid: String!) {
        student(guid: $guid) {
          group {
            groupName
            visitValue
            curator {
              fullName
            }
          }

          visits
          pointsForStandards
          additionalPoints
          course
          hasDebtFromPreviousSemester
          archivedVisitValue

          visitsHistory {
            date
            teacher {
              fullName
            }
          }

          standardsHistory {
            date
            teacher {
              fullName
            }
            points
            standardType
          }

          pointsHistory {
            date
            teacher {
              fullName
            }
            points
            workType
          }
        }
      }
    `;

    const raw = await this.client.fetch(getStudentSchema, query, { guid });

    return raw;
  }
}

export const physEdJournalClient = new PhysEdJournalClient();
