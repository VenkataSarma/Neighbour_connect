import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const StyledView = styled(View);
const StyledText = styled(Text);

export const RegisterPage = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigation.navigate('Login');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white dark:bg-slate-950"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-10">
        <StyledView className="items-center mb-10">
          <StyledView className="w-16 h-16 bg-sky-500 rounded-2xl items-center justify-center mb-4">
            <StyledText className="text-white text-3xl font-bold">N</StyledText>
          </StyledView>
          <StyledText className="text-3xl font-bold text-slate-900 dark:text-white">Create Account</StyledText>
          <StyledText className="text-slate-500 dark:text-slate-400 text-center mt-2">
            Join your neighbourhood discovery platform
          </StyledText>
        </StyledView>

        <Input
          label="Full Name"
          placeholder="John Doe"
          value={formData.fullName}
          onChangeText={(text) => setFormData({...formData, fullName: text})}
        />
        <Input
          label="Username"
          placeholder="johndoe"
          value={formData.username}
          onChangeText={(text) => setFormData({...formData, username: text})}
          autoCapitalize="none"
        />
        <Input
          label="Email Address"
          placeholder="name@email.com"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          placeholder="••••••••"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          secureTextEntry
        />
        <Input
          label="Confirm Password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
          secureTextEntry
        />

        <Button
          title="Create Account"
          onPress={handleRegister}
          loading={loading}
          fullWidth
          className="mt-6"
        />

        <StyledView className="flex-row justify-center mt-8">
          <StyledText className="text-slate-500 dark:text-slate-400">
            Already have an account?
          </StyledText>
          <StyledText
            className="text-sky-500 font-bold ml-2"
            onPress={() => navigation.navigate('Login')}
          >
            Sign In
          </StyledText>
        </StyledView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
