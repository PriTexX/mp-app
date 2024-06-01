import dayjs from 'dayjs';
import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import {
  ActivityIndicator,
  Modal,
  Portal,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import { lkClient } from 'src/clients/lk';
import { useQuery } from 'src/pkg/query';
import { useSecureStore } from 'src/store/useSecureStore';

import type { News } from 'src/clients/lk';

function NewsBlock({ news }: { news: News }) {
  const [visible, setVisible] = useState(false);

  const { colors } = useTheme();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <TouchableOpacity onPress={showModal}>
        <Surface
          style={{
            width: 140,
            height: 140,
            borderRadius: 8,
            marginBottom: 16,
            padding: 8,
          }}
        >
          <View style={{ flex: 4, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center' }}>{news.title}</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderTopWidth: 1,
              borderColor: 'grey',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{ fontSize: 12, fontStyle: 'italic', textAlign: 'center' }}
            >
              {dayjs(news.date).format('DD MMM YYYY')} {news.time}
            </Text>
          </View>
        </Surface>
      </TouchableOpacity>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            padding: 20,
            borderRadius: 8,
            marginHorizontal: 30,
            marginVertical: 80,
            backgroundColor: colors.tertiary,
          }}
        >
          <ScrollView>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: 'grey',
                gap: 4,
                paddingBottom: 8,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}
              >
                {news.title}
              </Text>
              <Text
                style={{ fontSize: 14, fontStyle: 'italic', color: 'black' }}
              >
                {dayjs(news.date).format('DD MMM YYYY')} {news.time}
              </Text>
            </View>
            <HTMLView value={news.content} />
          </ScrollView>
        </Modal>
      </Portal>
    </>
  );
}

function groupNewsByRow(newsList: News[]) {
  const groupedNewsList: News[][] = [];

  let counter = 1;
  let temp: News[] = [];

  newsList.forEach((n) => {
    temp.push(n);

    if (counter % 2 == 0) {
      groupedNewsList.push(temp);
      temp = [];
    }

    counter++;
  });

  if (newsList.length % 2 == 1) {
    groupedNewsList.push(temp);
  }

  return groupedNewsList;
}

export function NewsScreen() {
  const token = useSecureStore((t) => t.tokens.token);

  const { data, status } = useQuery('news', () => lkClient.getNews(token));

  if (status == 'success') {
    const groupedNews = groupNewsByRow(data);

    return (
      <ScrollView
        style={{
          padding: 16,
        }}
      >
        {groupedNews.map((group, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <NewsBlock key={group[0].id} news={group[0]} />
            {group[1] ? <NewsBlock key={group[1].id} news={group[1]} /> : null}
          </View>
        ))}
      </ScrollView>
    );
  }

  return (
    <View
      style={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
