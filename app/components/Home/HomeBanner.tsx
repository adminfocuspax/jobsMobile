import { View, StyleSheet, ImageBackground } from 'react-native';
import { useState } from 'react';
import { Skeleton } from '@rneui/themed';
import { LinearGradient } from '@/components/ui/linear-gradient';
import { Button, ButtonText } from '@/components/ui/button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useResponsive } from '@/context/ResponsiveContext';
import { useTranslation } from 'react-i18next';

export const HomeBanner = () => {
  const [imageStatus, setImageStatus] = useState<
    'loading' | 'loaded' | 'error'
  >('loading');
  const { width, isLargeScreen } = useResponsive();
  const { t } = useTranslation();

  return (
    <ThemedView
      style={{ backgroundColor: '#fff', paddingTop: 0 }}
      className={`flex-1 justify-center items-center w-full`}
    >
      {imageStatus !== 'loaded' && (
        <Skeleton
          LinearGradientComponent={LinearGradient}
          width='100%'
          height={isLargeScreen ? 278 : 178}
          style={{ position: 'absolute', borderRadius: 8 }}
        />
      )}

      <ImageBackground
        source={{
          uri: 'https://media.istockphoto.com/id/1426460279/photo/female-worker-using-digital-tablet-while-working-at-supermarket.jpg?s=612x612&w=0&k=20&c=vElyunJfBvVJ_xWuAARlgrBwYl38uNPxsDIzeg5qtLc=',
        }}
        style={styles.backgroundImage}
        className={'rounded-lg'}
        onLoad={() => setImageStatus('loaded')}
        onError={() => setImageStatus('error')}
      >
        {/* Dark overlay */}
        <View style={styles.overlay}>
          {/* Banner content */}
          <View style={styles.bannerContent}>
            <ThemedText style={styles.bannerSubtitle}>
              {t('banner.description')}
            </ThemedText>
            <Button
              size={isLargeScreen ? 'lg' : 'sm'}
              variant='solid'
              action='positive'
            >
              <ButtonText>{t('banner.exploreJobs')}</ButtonText>
            </Button>
          </View>
        </View>
      </ImageBackground>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContent: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default HomeBanner;
