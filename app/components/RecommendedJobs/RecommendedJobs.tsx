import React from 'react';
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface JobData {
  id: string;
  companyLogo: string;
  companyName: string;
  location: string;
  jobTitle: string;
  postedDate: string;
}

interface RecommendedJobsProps {
  jobs?: JobData[];
  title?: string;
}

const defaultJobs: JobData[] = [
  {
    id: '1',
    companyLogo:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2BpLryfOPE_W4zr2-grBJ5DCrv50dGAiaQ&s',
    companyName: 'Reliance Digital',
    location: 'Banglore, KA',
    jobTitle: 'Sales personal assistant',
    postedDate: '2 days ago',
  },
  {
    id: '2',
    companyLogo:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFNDuMGOi4Jtk04Gk78ZGmZ3_Zjcnz9_EjFg&s',
    companyName: 'Super Saravana Stores ',
    location: 'Chennai, TN',
    jobTitle: 'Floor Manager',
    postedDate: '1 day ago',
  },
  {
    id: '3',
    companyLogo:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlDVSE1ggAU0qm7V0mpumwYE8FP_Xse21LFw&s',
    companyName: 'Tata Tanisq',
    location: 'Trichy, TN',
    jobTitle: 'Receptionist',
    postedDate: '3 days ago',
  },
  {
    id: '4',
    companyLogo: 'https://via.placeholder.com/50x50/1877F2/FFFFFF?text=F',
    companyName: 'Meta',
    location: 'Menlo Park, CA',
    jobTitle: 'Data Scientist',
    postedDate: '5 days ago',
  },
  {
    id: '5',
    companyLogo: 'https://via.placeholder.com/50x50/0A66C2/FFFFFF?text=L',
    companyName: 'LinkedIn',
    location: 'San Francisco, CA',
    jobTitle: 'Frontend Developer',
    postedDate: '1 week ago',
  },
];

const JobCard: React.FC<{ job: JobData }> = ({ job }) => {
  console.log('JobCard rendering for:', job.jobTitle);

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={['#71c6eb', '#71c6eb', '#71c6eb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        {/* Content Box with White Background */}
        <View style={styles.contentBox}>
          {/* Company Logo and Info */}
          <View style={styles.companySection}>
            <Image
              source={{ uri: job.companyLogo }}
              style={styles.companyLogo}
            />
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{job.companyName}</Text>
              <Text style={styles.location}>{job.location}</Text>
            </View>
          </View>

          {/* Job Title - Highlighted */}
          <Text style={styles.jobTitle} numberOfLines={2}>
            {job.jobTitle}
          </Text>

          {/* Posted Date */}
          <Text style={styles.postedDate}>Posted {job.postedDate}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export const RecommendedJobs: React.FC<RecommendedJobsProps> = ({
  jobs = defaultJobs,
  title = 'Recommended Jobs',
}) => {
  return (
    <View style={styles.container}>
      {/* Section Title */}
      <Text style={styles.sectionTitle}>{title}</Text>

      {/* Debug info */}
      <Text style={styles.debugText}>Found {jobs?.length || 0} jobs</Text>

      {/* Horizontal Scrollable Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        {jobs && jobs.length > 0 ? (
          jobs.map(job => {
            console.log('Rendering job:', job.id, job.jobTitle);
            return <JobCard key={job.id} job={job} />;
          })
        ) : (
          <Text style={styles.noJobsText}>No jobs available</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  debugText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  scrollView: {
    minHeight: 200,
  },
  scrollContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  noJobsText: {
    fontSize: 14,
    color: '#6b7280',
    paddingHorizontal: 16,
  },
  cardContainer: {
    width: 280,
    height: 180,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradientBackground: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  contentBox: {
    backgroundColor: '#71c6eb',
    borderRadius: 8,
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  companySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: '#6b7280',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 24,
    marginBottom: 8,
  },
  postedDate: {
    fontSize: 12,
    color: '#000',
  },
});

export default RecommendedJobs;
