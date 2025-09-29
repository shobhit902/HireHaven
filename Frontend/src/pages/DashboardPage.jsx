import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";

const DashboardPage = () => {
  const { user, logout, isLoading, isCheckingAuth } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  // Add loading state while checking auth or if user data isn't available yet
  if (isCheckingAuth || isLoading || !user) {
    return (
      <div className="h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-base-200 mb-0">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* Left sidebar area */}
            <div className="w-80 bg-gray-800 bg-opacity-50 border-r border-gray-700">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
                  Dashboard
                </h2>
                
                <motion.div
                  className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-green-400 mb-3">Profile Information</h3>
                  <p className="text-gray-300">Name: {user?.name || user?.username || 'Not provided'}</p>
                  <p className="text-gray-300">Email: {user?.email || 'Not provided'}</p>
                </motion.div>

                <motion.div
                  className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-semibold text-green-400 mb-3">Account Activity</h3>
                  <p className="text-gray-300">
                    <span className="font-bold">Joined: </span>
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }) : 'Unknown'}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-bold">Last Login: </span>
                    {user?.lastLogin ? formatDate(user.lastLogin) : 'Unknown'}
                  </p>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                  font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Logout
                </motion.button>
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 flex items-center justify-center bg-gray-900 bg-opacity-30">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="max-w-sm mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {(user?.name || user?.username || 'U')?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">
                    Welcome back, {user?.name || user?.username || 'User'}!
                  </h3>
                  <p className="text-gray-400">
                    Your dashboard is ready. All your account information is displayed in the sidebar.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;