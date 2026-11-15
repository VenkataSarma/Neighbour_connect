import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../store/authStore';

const StyledView = styled(View);
const StyledText = styled(Text);

export const LoginPage = ({ navigation }: any) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // This would be an actual API call
      // const { data } = await api.post('/auth/login', { email, password });
      // await login(data.accessToken, data.refreshToken, data.user);

      // Mock login for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Logged in with', email);
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 justify-center">
        <StyledView className="items-center mb-10">
          <StyledView className="w-16 h-16 bg-sky-500 rounded-2xl items-center justify-center mb-4">
            <StyledText className="text-white text-3xl font-bold">N</StyledText>
          </StyledView>
          <StyledText className="text-3xl font-bold text-slate-900 dark:text-white">Welcome Back</StyledText>
          <StyledText className="text-slate-500 dark:text-slate-400 text-center mt-2">
            Sign in to connect with your neighbourhood
          </StyledText>
        </StyledView>

        <Input
          label="Email Address"
          placeholder="name@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <StyledView className="flex-row justify-end mb-6">
          <StyledText
            className="text-sky-500 font-medium"
            onPress={() => {}}
          >
            Forgot Password?
          </StyledText>
        </StyledView>

        <Button
          title="Sign In"
          onPress={handleLogin}
          loading={loading}
          fullWidth
        />

        <StyledView className="flex-row justify-center mt-8">
          <StyledText className="text-slate-500 dark:text-slate-400">
            Don't have an account?
          </StyledText>
          <StyledText
            className="text-sky-500 font-bold ml-2"
            onPress={() => navigation.navigate('Register')}
          >
            Sign Up
          </StyledText>
        </StyledView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
