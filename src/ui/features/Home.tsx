import { hideAsync } from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Avatar, Surface, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { err, ok } from 'resulto';
import { lkClient } from 'src/clients/lk';
import { useSecureStore } from 'src/store/useSecureStore';
import { useUserStore } from 'src/store/useUserStore';

async function loadUserData(token: string) {
  const [userData, userAvatar] = await Promise.all([
    lkClient.getUserData(token),
    lkClient.getUserAvatar(token),
  ]);

  if (userData.isErr()) {
    return err(userData.error);
  }

  if (userAvatar.isErr()) {
    return err(userAvatar.error);
  }

  return ok({ ...userData.value, avatar: userAvatar.value.user.avatar });
}

function DataRow({
  title,
  content,
}: {
  title: string;
  content: string | number;
}) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: colors.secondaryContainer,
        paddingBottom: 4,
      }}
    >
      <Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}: </Text>
        {content}
      </Text>
    </View>
  );
}

export function HomeScreen() {
  const { user, setUser } = useUserStore((s) => s);
  const token = useSecureStore((s) => s.tokens.token);

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await loadUserData(token);

      if (data.isErr()) {
        showMessage({ message: 'Ошибка при загрузке данных', type: 'warning' });
        return;
      }

      const {
        name,
        surname,
        patronymic,
        guid_person: guid,
        group,
        course,
        specialization,
        specialty,
        specialty_code: specialtyCode,
        avatar,
        learn_status: status,
        birthday,
        degreeLength,
        faculty,
        educationForm,
        finance,
        degreeLevel,
        enterYear,
        sex,
      } = data.value;

      setUser({
        fullName: `${surname} ${name} ${patronymic}`.trim(),
        guid,
        group,
        avatar,
        course,
        specialty,
        specialtyCode,
        specialization,
        status,
        birthday,
        degreeLength,
        faculty,
        educationForm,
        finance,
        degreeLevel,
        enterYear,
        sex,
      });
    };

    void getUserInfo();
  }, [token]);

  return (
    <SafeAreaView onLayout={hideAsync}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 24,
          justifyContent: 'space-between',
        }}
      >
        <Surface style={{ padding: 8, borderRadius: 12 }}>
          <Avatar.Image
            size={70}
            source={
              user.avatar ? { uri: user.avatar } : require('assets/user.png')
            }
          />
        </Surface>
        <Surface
          style={{ justifyContent: 'center', padding: 4, borderRadius: 12 }}
        >
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            {user.fullName}
          </Text>
          <Text
            style={{
              fontStyle: 'italic',
              fontSize: 12,
              fontWeight: '200',
              color: 'grey',
              alignSelf: 'center',
            }}
          >
            Студент - {user.status}
          </Text>
        </Surface>
      </View>
      <Surface
        style={{
          margin: 24,
          marginVertical: 12,
          padding: 8,
          gap: 10,
          borderRadius: 12,
        }}
      >
        <DataRow title="Статус" content={user.status} />
        <DataRow title="Пол" content={user.sex} />
        <DataRow title="Дата рождения" content={user.birthday} />
        <DataRow title="Факультет" content={user.faculty} />
        <DataRow title="Курс" content={user.course} />
        <DataRow title="Группа" content={user.group} />
        <DataRow title="Направление" content={user.specialty} />
        <DataRow title="Специализация" content={user.specialization} />
        <DataRow title="Срок обучения" content={user.degreeLength} />
        <DataRow title="Форма обучения" content={user.educationForm} />
        <DataRow title="Вид финансирования" content={user.finance} />
        <DataRow title="Уровень образования" content={user.degreeLevel} />
        <DataRow title="Год набора" content={user.enterYear} />
      </Surface>
    </SafeAreaView>
  );
}

export function TestScreen() {
  return (
    <View>
      <Text>Hello test</Text>
    </View>
  );
}
