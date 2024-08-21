import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Entypo from '@expo/vector-icons/Entypo';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (

    <Tabs>
        <Tabs.Screen
        name="test"
        options={{
          title: 'test',
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="lab-flask" size={24} color="black" />
          ),
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint as string,
        }}
      />      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint as string,
        }}
      />
      </Tabs>
  );
}
