import { View, Text, FlatList, Button, ScrollView } from 'react-native';
import React from 'react';
import Header from '../../Components/HeaderComponent';
import Card from '../../Components/CardComponent';
import { data } from '../../data/courses';

const ExploreScreen = ({ navigation }) => {
  const onPressHandler = null;

  const renderItem = ({ item }) => {
    return (
      <Card
        title={item.title}
        description={item.description}
        imageSource={item.image}
        onPress={onPressHandler}
      />
    );
  };

  return (
    <View>
      <View>
        <Header title="Mindful Modules" onPressBack={() => navigation.goBack()} />
        </View>
      
        <Button
          style={{ padding: 10 }}
          title="Book an appointment"
          onPress={() => navigation.push('BookAppointmentScreen')}
          color="pink"
        />
      
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        horizontal={false}
      />
      </View>
    
  );
};

export default ExploreScreen;
