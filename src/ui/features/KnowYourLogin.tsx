import { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import { lkClient } from 'src/clients/lk';

export function KnowYourLoginScreen() {
  const [fio, setFio] = useState('');
  const [pass, setPass] = useState('');

  const [login, setLogin] = useState('');

  const knowYourLogin = async () => {
    Keyboard.dismiss();
    const res = await lkClient.knowYourLogin(fio, pass);

    // It will never be ok...
    if (res.isOk()) {
      const idx = res.value.lastIndexOf('Логин');

      const loginValue = `${res.value.substring(0, idx)};${res.value.substring(idx)}`;
      setLogin(loginValue);

      return;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Surface
        style={{
          padding: 14,
          borderRadius: 12,
          width: '80%',
          gap: 16,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
          Узнать свой логин ЕУЗ
        </Text>
        <Surface elevation={5} style={{ borderRadius: 8, padding: 8 }}>
          <Text>
            Для того, чтобы узнать свой логин единой учетной записи, укажите
            ваши ФИО полностью (например, Иванов Петр Иванович) и 4 последние
            цифры номера паспорта
          </Text>
        </Surface>
        <TextInput label="ФИО полностью" value={fio} onChangeText={setFio} />
        <TextInput
          label="Последние 4 цифры паспорта"
          inputMode="numeric"
          secureTextEntry={true}
          value={pass}
          onChangeText={setPass}
        />
        <Button
          mode="contained"
          style={{ marginTop: 14 }}
          onPress={knowYourLogin}
        >
          Узнать логин ЕУЗ
        </Button>
        {login ? (
          <>
            <Text style={{ fontWeight: 'bold' }}>{login.split(';')[0]}</Text>
            <Text style={{ fontWeight: 'bold' }}>{login.split(';')[1]}</Text>
          </>
        ) : null}
      </Surface>
    </View>
  );
}
