'use client';
import React from 'react';
import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';

interface JobsBreadcrumbProps {
  currentStep?: 'profile' | 'preferences' | 'jobs' | 'education' | 'experience';
  onItemPress?: (item: BreadcrumbItem) => void;
}

const JobsBreadcrumb: React.FC<JobsBreadcrumbProps> = ({
  currentStep = 'profile',
  onItemPress,
}) => {
  // Define paths as constants to ensure type safety
  const PROFILE_PATH = '/userInfo' as const;
  const PREFERENCES_PATH = '/preferences' as const;
  const JOBS_PATH = '/jobs' as const;

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'Profile',
      path: PROFILE_PATH,
      isActive: currentStep === 'profile',
    },
    {
      label: 'Education',
      path: currentStep === 'education' ? undefined : PREFERENCES_PATH,
      isActive: currentStep === 'education',
    },
    {
      label: 'Experience',
      path: currentStep === 'experience' ? undefined : PREFERENCES_PATH,
      isActive: currentStep === 'experience',
    },
    {
      label: 'Preferences',
      path:
        currentStep === 'profile' ||
        currentStep === 'education' ||
        currentStep === 'experience'
          ? undefined
          : PREFERENCES_PATH,
      isActive: currentStep === 'preferences',
    },
    {
      label: 'See Jobs',
      path:
        currentStep === 'jobs'
          ? undefined
          : currentStep === 'preferences'
            ? JOBS_PATH
            : undefined,
      isActive: currentStep === 'jobs',
      isJobsItem: true,
    },
  ];

  return <Breadcrumb items={breadcrumbItems} onItemPress={onItemPress} />;
};

export default JobsBreadcrumb;
