import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/sidebar";
import CommitActivity from "../../components/githubAnalytics/CommitActivity";
import ContributionOverview from "../../components/githubAnalytics/ContributionOverview";
import LanguageDistribution from "../../components/githubAnalytics/LanguageDistribution";
import ProfileSummary from "../../components/githubAnalytics/ProfileSummary";
import RepositoryTable from "../../components/githubAnalytics/RepositoryTable";
import RepoStats from "../../components/githubAnalytics/RepoStats";
import TopRepositories from "../../components/githubAnalytics/TopRepositories";

const GitHubAnalytics = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111625] flex text-slate-800 dark:text-gray-100 font-sans transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Navbar />
        <main className="p-8 pt-24 max-w-7xl mx-auto space-y-8">
          <ProfileSummary />
          <RepoStats />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <LanguageDistribution />
            </div>
            <div className="lg:col-span-3">
              <ContributionOverview />
            </div>
          </div>
          <TopRepositories />
          <CommitActivity />
          <RepositoryTable />
        </main>
      </div>
    </div>
  );
};

export default GitHubAnalytics;
