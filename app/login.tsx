import { Stack, router } from 'expo-router';
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
import './i18n/i18n';
import { useTranslation } from 'react-i18next';

export default function LoginScreen() {
  const [hidePassword, setHidePassword] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { values, width, height } = useResponsive();
  const { t } = useTranslation();
  console.log('WIDTH WIDTH WIDTH +++++++++++=', width);

  const openTermsAndConditions = () => {
    Linking.openURL('https://example.com');
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
            <Text bold size={'xl'} className='text-center'>
              {t('auth.authMessage')}
            </Text>

            <FormControl className='mt-8'>
              {/* <FormControlLabel>
                <FormControlLabelText>{t('auth.email')}</FormControlLabelText>
              </FormControlLabel> */}
              <Text size={'md'} className='text-center'>
                {t('auth.emailMessage')}
              </Text>
              <Input
                variant={values.inputStyle as 'outline' | 'underlined'}
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
                onChange={setAcceptedTerms}
                value={'true'}
                size='sm'
                isInvalid={false}
                isDisabled={false}
              >
                <CheckboxIndicator>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel>
                  <Text size='sm'>
                    I accept the{' '}
                    <Text
                      size='sm'
                      className='text-primary-600'
                      onPress={openTermsAndConditions}
                      style={styles.link}
                    >
                      Terms and Conditions
                    </Text>
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
            onPress={() => {
              if (acceptedTerms) {
                router.replace('./userDetails/userInfo');
              } else {
                alert('Please accept the Terms and Conditions to continue');
              }
            }}
            disabled={false}
          />

          <View style={styles.infoDiv}>
            <Text size={'sm'} className='text-center'>
              {t('auth.allirightReserved')}
            </Text>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    minHeight: '100%',
    width: '100%',
    marginTop: 50,
  },
  logo: {
    width: '100%',
    marginBottom: 8,
    alignSelf: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
    padding: 0,
  },
  infoDiv: {
    marginTop: 'auto',
    marginBottom: 80,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  link: {
    textDecorationLine: 'underline',
  },
  // Button styles moved to GradientButton component
});
