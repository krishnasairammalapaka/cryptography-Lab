export function insertSidebar() {
    const sidebarHTML = `
    <!-- Student Sidebar Component -->
    <div class="fixed left-0 top-0 h-full w-64 bg-gray-800 p-4">
        <div class="mb-8 flex items-center space-x-3">
            <svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <div>
                <h1 class="text-lg font-bold text-white">Cryptography Lab</h1>
                <p class="text-xs text-gray-400">Security & Privacy</p>
            </div>
        </div>
        <nav class="flex flex-col h-[calc(100vh-8rem)] justify-between">
            <ul class="space-y-4">
                <!-- Dashboard -->
                <li>
                    <a href="/student/dashboard" class="flex items-center space-x-3 text-gray-400 hover:text-purple-500 px-4 py-3 rounded-lg" id="nav-dashboard">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                        <span>Dashboard</span>
                    </a>
                </li>

                <!-- Overview -->
                <li>
                    <a href="/student/overview" class="flex items-center space-x-3 text-gray-400 hover:text-purple-500 px-4 py-3 rounded-lg" id="nav-overview">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>Overview</span>
                    </a>
                </li>

                <!-- Resources -->
                <li>
                    <a href="/student/resources" class="flex items-center space-x-3 text-gray-400 hover:text-purple-500 px-4 py-3 rounded-lg" id="nav-resources">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                        <span>Resources</span>
                    </a>
                </li>

                <!-- Courses -->
                <li>
                    <a href="/student/courses" class="flex items-center space-x-3 text-gray-400 hover:text-purple-500 px-4 py-3 rounded-lg" id="nav-courses">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                        <span>Courses</span>
                    </a>
                </li>

                <!-- Assignments -->
                <li>
                    <a href="/student/assignments" class="flex items-center space-x-3 text-gray-400 hover:text-purple-500 px-4 py-3 rounded-lg" id="nav-assignments">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                        <span>Assignments</span>
                    </a>
                </li>

                <!-- Progress -->
                <li>
                    <a href="/student/progress" class="flex items-center space-x-3 text-gray-400 hover:text-purple-500 px-4 py-3 rounded-lg" id="nav-progress">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>Progress</span>
                    </a>
                </li>
            </ul>

            <!-- Logout Button -->
            <div class="mb-8">
                <button id="logout-btn" class="w-full flex items-center space-x-3 text-red-400 hover:text-red-500 hover:bg-red-500/10 px-4 py-3 rounded-lg transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    </div>
    `;

    // Insert the sidebar HTML
    document.getElementById('sidebar-container').innerHTML = sidebarHTML;

    // Highlight current page in navigation
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('nav a');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.remove('text-gray-400');
            item.classList.add('text-purple-500', 'bg-purple-500/10');
        }
    });

    // Add logout functionality
    document.getElementById('logout-btn').addEventListener('click', async () => {
        try {
            const response = await fetch('/auth/logout');
            if (response.ok) {
                window.location.href = '/login';
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
            alert('Failed to logout. Please try again.');
        }
    });
} 