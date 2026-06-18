import { useMemo, useRef, useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";
import Sidebar from "../../components/dashboard/sidebar";
import Navbar from "../../components/dashboard/Navbar";

// Subcomponents
import ProfileStrengthCard from "../../components/Settings/ProfileStrengthCard";
import SettingsNavigation from "../../components/Settings/SettingsNavigation";
import AccountSettings from "../../components/Settings/AccountSettings";
import ProfileSettings from "../../components/Settings/ProfileSettings";
import SecuritySettings from "../../components/Settings/SecuritySettings";
import AppearanceSettings from "../../components/Settings/AppearanceSettings";
import NotificationSettings from "../../components/Settings/NotificationSettings";
import DangerZone from "../../components/Settings/DangerZone";

const Settings = () => {
  const { theme, setTheme, accentColor, setAccentColor, getAccentClass } =
    useTheme();
  const { setUser } = useAuth();

  // Active Tab state
  const [activeTab, setActiveTab] = useState("account");

  // Success/Error Toast Notification State
  const [toast, setToast] = useState(null);

  // References for focusing input fields
  const linkedinRef = useRef(null);
  const resumeRef = useRef(null);

  // Account Settings state
  const [account, setAccount] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Profile Settings state
  const [profile, setProfile] = useState({
    github: "",
    bio: "",
    location: "",
    portfolio: "",
    linkedin: "",
  });

  // Fetch initial profile values on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await API.get("/user/me");
        const data = res.data;
        setAccount({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
        });
        setProfile({
          github: data.githubUsername || "",
          bio: data.bio || "",
          location: data.location || "",
          portfolio: data.website || "",
          linkedin: data.linkedin || "",
        });
      } catch (err) {
        console.error("Failed to load user settings:", err);
      }
    };
    fetchUserData();
  }, []);

  // Resume file state
  const [resumeFile, setResumeFile] = useState(null);

  // Security Settings state
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 2FA state
  const [twoFactor] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState({
    weeklyReport: true,
    githubSummary: true,
    careerRecs: true,
    resumeUpdates: false,
  });

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Toast trigger helper
  const triggerToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Profile strength calculation
  // Total 9 items: firstName (10%), lastName (10%), email (15%), github (15%), bio (10%), location (10%), portfolio (10%), linkedin (10%), resume (10%)
  const { strength, missingItems } = useMemo(() => {
    let score = 0;
    const missing = [];

    if (account.firstName && account.firstName.trim()) score += 10;
    else
      missing.push({
        label: "First Name",
        tab: "account",
        field: "firstName",
      });

    if (account.lastName && account.lastName.trim()) score += 10;
    else
      missing.push({ label: "Last Name", tab: "account", field: "lastName" });

    if (account.email && account.email.trim()) score += 15;
    else missing.push({ label: "Email", tab: "account", field: "email" });

    if (profile.github && profile.github.trim()) score += 15;
    else
      missing.push({
        label: "GitHub Username",
        tab: "profile",
        field: "github",
      });

    if (profile.bio && profile.bio.trim()) score += 10;
    else missing.push({ label: "Bio", tab: "profile", field: "bio" });

    if (profile.location && profile.location.trim()) score += 10;
    else
      missing.push({ label: "Location", tab: "profile", field: "location" });

    if (profile.portfolio && profile.portfolio.trim()) score += 10;
    else
      missing.push({
        label: "Portfolio URL",
        tab: "profile",
        field: "portfolio",
      });

    if (profile.linkedin && profile.linkedin.trim()) score += 10;
    else
      missing.push({
        label: "LinkedIn URL",
        tab: "profile",
        field: "linkedin",
      });

    if (resumeFile) score += 10;
    else missing.push({ label: "Resume", tab: "profile", field: "resume" });

    return { strength: score, missingItems: missing };
  }, [account, profile, resumeFile]);

  // Form submit handlers
  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    if (!account.firstName || !account.lastName || !account.email) {
      triggerToast("Please fill in all required account fields.", "error");
      return;
    }
    try {
      const res = await API.put("/user/profile", {
        firstName: account.firstName,
        lastName: account.lastName,
      });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      triggerToast("Account information saved successfully!");
    } catch (err) {
      console.error(err);
      triggerToast(err.response?.data?.message || "Failed to save account settings.", "error");
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/user/profile", {
        githubUsername: profile.github,
        bio: profile.bio,
        location: profile.location,
        website: profile.portfolio,
        linkedin: profile.linkedin,
      });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      triggerToast("Profile settings updated successfully!");
    } catch (err) {
      console.error(err);
      triggerToast(err.response?.data?.message || "Failed to update profile settings.", "error");
    }
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    if (!security.currentPassword) {
      triggerToast("Current password is required.", "error");
      return;
    }
    if (security.newPassword !== security.confirmPassword) {
      triggerToast("New password and confirm password do not match.", "error");
      return;
    }
    if (security.newPassword.length < 6) {
      triggerToast("New password must be at least 6 characters.", "error");
      return;
    }
    try {
      await API.put("/user/change-password", {
        currentPassword: security.currentPassword,
        newPassword: security.newPassword,
      });
      triggerToast("Password changed successfully!");
      setSecurity({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      triggerToast(err.response?.data?.message || "Failed to change password.", "error");
    }
  };

  const handleDeleteAccount = () => {
    triggerToast("Account successfully deleted (Simulation).", "error");
    setShowDeleteModal(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      triggerToast(`Resume "${file.name}" uploaded successfully!`);
    }
  };

  // Navigation click helper for missing items
  const navigateToMissing = (item) => {
    setActiveTab(item.tab);
    setTimeout(() => {
      if (item.field === "linkedin" && linkedinRef.current) {
        linkedinRef.current.focus();
      } else if (item.field === "resume" && resumeRef.current) {
        resumeRef.current.click();
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111625] flex text-slate-800 dark:text-gray-100 font-sans transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 pl-64">
        <Navbar />

        <main className="p-8 pt-24 max-w-7xl mx-auto space-y-8 animate-fadeUp">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Settings
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Manage your account parameters, preferences, profile
                customizations, and notification styles.
              </p>
            </div>
            <div
              className={`text-xs px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-medium flex items-center gap-1.5`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  getAccentClass("bg").split(" ")[0]
                }`}
              ></span>
              Accent:{" "}
              <span className="capitalize font-semibold">{accentColor}</span>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Navigation & Strength */}
            <div className="lg:col-span-1 space-y-6">
              <SettingsNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                getAccentClass={getAccentClass}
              />

              <ProfileStrengthCard
                strength={strength}
                missingItems={missingItems}
                accentColor={accentColor}
                getAccentClass={getAccentClass}
                navigateToMissing={navigateToMissing}
              />
            </div>

            {/* Right Pane - Content Cards */}
            <div className="lg:col-span-3 space-y-6">
              {activeTab === "account" && (
                <AccountSettings
                  account={account}
                  setAccount={setAccount}
                  handleAccountSubmit={handleAccountSubmit}
                  getAccentClass={getAccentClass}
                />
              )}

              {activeTab === "profile" && (
                <ProfileSettings
                  profile={profile}
                  setProfile={setProfile}
                  handleProfileSubmit={handleProfileSubmit}
                  linkedinRef={linkedinRef}
                  resumeRef={resumeRef}
                  resumeFile={resumeFile}
                  handleFileChange={handleFileChange}
                  getAccentClass={getAccentClass}
                />
              )}

              {activeTab === "security" && (
                <SecuritySettings
                  security={security}
                  setSecurity={setSecurity}
                  handleSecuritySubmit={handleSecuritySubmit}
                  twoFactor={twoFactor}
                  getAccentClass={getAccentClass}
                />
              )}

              {activeTab === "appearance" && (
                <AppearanceSettings
                  theme={theme}
                  setTheme={setTheme}
                  accentColor={accentColor}
                  setAccentColor={setAccentColor}
                  getAccentClass={getAccentClass}
                  triggerToast={triggerToast}
                />
              )}

              {activeTab === "notifications" && (
                <NotificationSettings
                  notifications={notifications}
                  setNotifications={setNotifications}
                  getAccentClass={getAccentClass}
                  triggerToast={triggerToast}
                />
              )}

              {activeTab === "danger" && (
                <DangerZone
                  showDeleteModal={showDeleteModal}
                  setShowDeleteModal={setShowDeleteModal}
                  handleDeleteAccount={handleDeleteAccount}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4.5 py-3 rounded-xl shadow-2xl border text-sm font-medium animate-slideLeft bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
          <div
            className={`w-2 h-2 rounded-full ${
              toast.type === "error" ? "bg-rose-500" : "bg-emerald-500"
            }`}
          />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default Settings;
