import { View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { lkClient } from 'src/clients/lk';
import { useQuery } from 'src/pkg/query';
import { useSecureStore } from 'src/store/useSecureStore';

function ContentBlock({
  blockTitle,
  childs,
}: {
  blockTitle: string;
  childs: { title: string; content: string; contentColor?: string }[];
}) {
  return (
    <View
      style={{ borderBottomWidth: 1, borderColor: 'grey', paddingBottom: 8 }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
        {blockTitle}
      </Text>
      {childs.map((c) => (
        <Text>
          {c.title}:{' '}
          <Text
            style={{ fontWeight: 'bold', fontSize: 15, color: c.contentColor }}
          >
            {c.content}
          </Text>
        </Text>
      ))}
    </View>
  );
}

export function Pd() {
  const token = useSecureStore((s) => s.tokens.token);

  const { data, status } = useQuery('pd-data', () => lkClient.getPdInfo(token));

  if (status != 'success') {
    return (
      <View>
        <Text>Нет данных</Text>
      </View>
    );
  }

  return (
    <Surface style={{ padding: 16, margin: 16, borderRadius: 12, gap: 24 }}>
      <ContentBlock
        blockTitle={data.project}
        childs={[
          { title: 'Тематика проекта', content: data.project_theme },
          {
            title: 'Подпроект',
            content: data.subproject == '' ? '-' : data.subproject,
          },
          { title: 'Куратор', content: data.curator },
        ]}
      />

      <ContentBlock
        blockTitle={'Результаты аттестации за текущий семестр'}
        childs={[
          { title: 'Первая аттестация', content: data.current_att1 },
          { title: 'Вторая аттестация', content: data.current_att2 },
          { title: 'Промежуточная аттестация', content: data.current_att_mid },
        ]}
      />

      <ContentBlock
        blockTitle={'Результаты аттестации за прошлый семестр'}
        childs={[
          {
            title: 'Набрано баллов',
            content: `${data.last_semestr_balls} (${data.last_semestr_result})`,
            contentColor:
              data.last_semestr_result == 'зачтено' ? 'green' : 'red',
          },
        ]}
      />

      <ContentBlock
        blockTitle={'Итог'}
        childs={[
          {
            title: 'За текущий семестр баллов',
            content: `${data.current_semestr_balls} (${data.current_semestr_result})`,
            contentColor:
              data.current_semestr_result == 'зачтено' ? 'green' : 'red',
          },
        ]}
      />
    </Surface>
  );
}
