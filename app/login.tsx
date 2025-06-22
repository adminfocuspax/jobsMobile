import { Href, Stack, router } from 'expo-router';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Linking,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Icon, EyeIcon, EyeOffIcon, CheckIcon } from '@/components/ui/icon';
import { Button, ButtonText } from '@/components/ui/button';
import { useState } from 'react';
import { useResponsive } from '@/context/ResponsiveContext';
import { GradientButton } from '@/components/ui/GradientButton';
import { Text } from '@/components/ui/text';
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/ui/checkbox';
import '../i18n/i18n';
import { useTranslation } from 'react-i18next';
import { useNavigationGuard } from '../hooks/useNavigationGuard';

export default function LoginScreen() {
  const [hidePassword, setHidePassword] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { values, width, height } = useResponsive();
  const { t } = useTranslation();
  const { safeReplace } = useNavigationGuard({ debounceTime: 1000 });


  const openTermsAndConditions = () => {
    Linking.openURL('https://example.com');
  };


  const handleLogin = () => {

    if (acceptedTerms) {
      safeReplace({ pathname: './userDetails/userInfo' });
    } else {
      alert('Please accept the Terms and Conditions to continue');
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -height * 0.1 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <ThemedView
          style={[
            styles.container,
            {
              padding: values.padding,
              maxWidth: values.maxWidth,
              alignSelf: 'center',
            },
          ]}
        >
          <View style={styles.inputContainer}>
            <Image
              source={require('../assets/images/login.png')}
              style={[styles.logo, { height: 160, width: 160 }]}
              resizeMode='contain'
            />
            <Text bold size='xl' className='text-center'>
              {t('auth.authMessage')}
            </Text>

            <FormControl className='mt-8'>
              {/* <FormControlLabel>
                <FormControlLabelText>{t('auth.email')}</FormControlLabelText>
              </FormControlLabel> */}
              <Text size='md' className='text-center'>
                {t('auth.emailMessage')}
              </Text>
              <Input
                variant={values.inputStyle}
                size='md'
                className='w-full mb-4 px-3 py-2 mt-4'
                style={{ height: values.inputHeight }}
              >
                <InputField
                  placeholder={t('auth.email')}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  className='text-typography-900 h-full'
                  style={{ fontSize: values.fontSize - 2 }}
                />
              </Input>
            </FormControl>

            {/* <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Input
                variant={values.inputStyle as "outline" | "underlined"}
                size="md"
                className="w-full mb-4 px-3 py-2"
                style={{ height: values.inputHeight }}
              >
                <InputField
                  placeholder="Enter your password"
                  secureTextEntry={hidePassword}
                  autoCapitalize="none"
                  className="text-typography-900 h-full"
                  style={{ fontSize: values.fontSize - 2 }}
                />
                <InputSlot onPress={() => setHidePassword(!hidePassword)}>
                  <InputIcon as={hidePassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            </FormControl> */}

            <View style={styles.termsContainer}>
              <Checkbox
                isChecked={acceptedTerms}
                onChange={setAcceptedTerms}
                size='sm'
                isInvalid={false}
                isDisabled={false} value={''}              >
                <CheckboxIndicator>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel>
                  <Text size='sm'>
                    I accept the{' '}
                    <TouchableOpacity onPress={openTermsAndConditions}>
                      <Text
                        size='sm'
                        className='text-primary-600'
                        style={styles.link}
                      >
                        Terms and Conditions
                      </Text>
                    </TouchableOpacity>
                  </Text>
                </CheckboxLabel>
              </Checkbox>
            </View>
          </View>

          <GradientButton
            width={values.buttonWidth}
            padding={values.buttonPadding}
            fontSize={values.fontSize}
            text={t('auth.login')}
            onPress={handleLogin}
            disabled={false}
          />

          <View style={styles.infoDiv}>
            <Text size='sm' className='text-center'>
              {t('auth.allirightReserved')}
            </Text>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 50,
    minHeight: '100%',
    width: '100%',
  },
  infoDiv: {
    marginBottom: 80,
    marginTop: 'auto',
  },
  inputContainer: {
    marginBottom: 30,
    padding: 0,
    width: '100%',
  },
  link: {
    textDecorationLine: 'underline',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 8,
    width: '100%',
  },
  scrollContent: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    justifyContent: 'center',
  },
  termsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 5,
  },
  // Button styles moved to GradientButton component
});
