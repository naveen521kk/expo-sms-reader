import { useEvent } from "expo";
import ExpoSmsReader from "expo-sms-reader";
import { Sms } from "expo-sms-reader/ExpoSmsReaderModule";
import React from "react";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function App() {
  // React.useEffect(() => {
  //   async function requestPermissions() {
  //     const granted = await ExpoSmsReader.requestSmsPermissionsAsync();
  //     console.log("Permissions granted:", granted);
  //   }
  //   requestPermissions();
  // }, []);

  const [sms, setSms] = React.useState<Sms[]>([]);
  // React.useEffect(() => {
  //   async function readSms() {
  //     const sms = await ExpoSmsReader.readAllSmsAsync();
  //     console.log(sms.length);
  //     setSms(sms);
  //   }
  //   readSms();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <View style={styles.group}>
          <Text style={styles.groupHeader}>Permissions</Text>
          <Button
            title="Request Permissions"
            onPress={async () => {
              const granted = await ExpoSmsReader.requestSmsPermissionsAsync();
              console.log("Permissions granted:", granted);
            }}
          />
        </View>
        <View style={styles.group}>
          <Text style={styles.groupHeader}>Read SMS</Text>
          <Button
            title="Read SMS"
            onPress={async () => {
              const sms = await ExpoSmsReader.readSmsAsync(2, 2);
              console.log(sms.length);
              // setSms(sms);
              // only first 20
              setSms(sms.slice(0, 20));
            }}
          />
        </View>
        <ScrollView style={styles.group}>
          <Text style={styles.groupHeader}>SMS</Text>
          {sms.map((sms, index) => (
            <View key={index} style={styles.group}>
              <Text>Address: {sms.address}</Text>
              <Text>Body: {sms.body}</Text>
              <Text>Date: {new Date(sms.date).toString()}</Text>
              <Text>Type: {sms.type ? "Sent" : "Received"}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  view: {
    flex: 1,
    height: 200,
  },
};
