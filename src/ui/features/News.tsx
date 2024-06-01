import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
  ActivityIndicator,
  Modal,
  Portal,
  Surface,
  Text,
} from 'react-native-paper';
import { lkClient } from 'src/clients/lk';
import { useQuery } from 'src/pkg/query';
import { useSecureStore } from 'src/store/useSecureStore';

import type { News } from 'src/clients/lk';

function NewsBlock({ news }: { news: News }) {
  const [visible, setVisible] = useState(false);

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
            justifyContent: 'center',
          }}
        >
          <Text style={{ textAlign: 'center' }}>{news.title}</Text>
        </Surface>
      </TouchableOpacity>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            padding: 20,
            backgroundColor: 'white',
          }}
        >
          <Text style={{ color: 'black' }}>{news.content}</Text>
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
