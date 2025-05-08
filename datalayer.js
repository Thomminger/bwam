<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BWAM</title>

    <script src="https://cdn.tailwindcss.com"></script>

    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏦</text></svg>">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <script src="https://cdn.jsdelivr.net/npm/lucide-static@latest/dist/lucide.min.js"></script>

    <link rel="stylesheet" href="style.css">

    <script src="datalayer.js"></script>
    <script src="translations.js"></script>

    <script type="text/javascript" src="https://cdn.pc-rnd.c360a.salesforce.com/beacon/c360a/d2799336-52d2-4f39-832b-d481cbc97fed/scripts/c360a.min.js" async></script>

    <script type="text/javascript">
        // Key for storing consent status in localStorage (used by script.js)
        window.CONSENT_STORAGE_KEY = 'bwam_consent_status';
        // Namespace for globally exposed functions from script.js
        window.bwamScripts = {};
        // Global translations object (populated by React component below)
        window.bwamTranslations = { en: {}, de: {} };
        // Global AppContext placeholder (optional, if script.js needs direct access)
        // window.AppContext = {};
    </script>

    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    </head>
<body class="pb-32 has-mountain-bg"> <header class="bg-white/90 shadow-lg sticky top-0 z-50 w-full backdrop-blur-md">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-3 h-20">
                <div class="flex-shrink-0">
                    <a href="#home" id="logo-link" class="nav-section-link flex items-center group" title="BWAM Home">
                        <img src="images/bwam-logo.jpg" alt="BWAM Logo" class="h-10 md:h-12 w-auto mr-2 transition-transform duration-300 group-hover:scale-105" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
                        <span class="font-bold text-xl text-[var(--brand-red)]" style="display: none;" aria-hidden="true">BWAM</span>
                         <script>
                             // Fallback logic for broken logo image
                             document.addEventListener('DOMContentLoaded', () => {
                                 const logoImg = document.querySelector('img[alt="BWAM Logo"]');
                                 const handleLogoError = () => {
                                     if (logoImg) logoImg.style.display = 'none';
                                     const textLogo = logoImg?.nextElementSibling;
                                     if (textLogo) textLogo.style.display = 'inline';
                                 };
                                 if (logoImg) {
                                     if (logoImg.complete) { // If already loaded (or failed)
                                         if (logoImg.naturalWidth === 0) handleLogoError();
                                     } else { // If still loading
                                         logoImg.addEventListener('error', handleLogoError);
                                     }
                                 }
                             });
                         </script>
                    </a>
                </div>

                <nav class="hidden md:flex items-center space-x-6 lg:space-x-8">
                    <div class="group relative">
                        <button class="nav-link text-base font-medium text-gray-600 hover:text-[var(--brand-red)] inline-flex items-center py-3 transition-colors duration-200" data-lang-key="nav.private_clients">
                            <i data-lucide="users" class="mr-1 h-4 w-4"></i>Private Clients <i data-lucide="chevron-down" class="ml-1 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition-transform duration-200 group-hover:rotate-180"></i>
                        </button>
                        <div class="dropdown-menu"> <div class="py-1" role="none">
                                <a href="#accounts-cards" class="nav-section-link text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[var(--brand-red)] rounded-md transition-colors duration-150" role="menuitem" data-lang-key="nav.accounts_cards"><i data-lucide="credit-card" class="mr-2 h-4 w-4 inline-block"></i>Accounts & Cards</a>
                                <a href="#investing" class="nav-section-link text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[var(--brand-red)] rounded-md transition-colors duration-150" role="menuitem" data-lang-key="nav.investing"><i data-lucide="trending-up" class="mr-2 h-4 w-4 inline-block"></i>Investing</a>
                                <a href="#pensions" class="nav-section-link text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[var(--brand-red)] rounded-md transition-colors duration-150" role="menuitem" data-lang-key="nav.pensions"><i data-lucide="umbrella" class="mr-2 h-4 w-4 inline-block"></i>Pensions</a>
                                <a href="#financing" class="nav-section-link text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[var(--brand-red)] rounded-md transition-colors duration-150" role="menuitem" data-lang-key="nav.financing"><i data-lucide="home" class="mr-2 h-4 w-4 inline-block"></i>Financing</a>
                            </div>
                        </div>
                    </div>
                    <a href="#business-clients" class="nav-section-link nav-link text-base font-medium text-gray-600 hover:text-[var(--brand-red)] py-3 inline-flex items-center transition-colors duration-200" data-lang-key="nav.business_clients"><i data-lucide="briefcase" class="mr-1 h-4 w-4"></i>Business Clients</a>
                    <a href="#institutional" class="nav-section-link nav-link text-base font-medium text-gray-600 hover:text-[var(--brand-red)] py-3 inline-flex items-center transition-colors duration-200" data-lang-key="nav.institutional"><i data-lucide="building-2" class="mr-1 h-4 w-4"></i>Institutional</a>
                    <a href="#about-us" class="nav-section-link nav-link text-base font-medium text-gray-600 hover:text-[var(--brand-red)] py-3 inline-flex items-center transition-colors duration-200" data-lang-key="nav.about_us"><i data-lucide="info" class="mr-1 h-4 w-4"></i>About Us</a>
                    <a href="#events" class="nav-section-link nav-link text-base font-medium text-gray-600 hover:text-[var(--brand-red)] py-3 inline-flex items-center transition-colors duration-200" data-lang-key="nav.events"><i data-lucide="calendar" class="mr-1 h-4 w-4"></i>Events</a>
                </nav>

                <div class="flex items-center space-x-3 sm:space-x-4">
                    <div class="flex items-center space-x-2">
                        <button data-lang-switch="en" class="p-2 text-gray-500 hover:text-[var(--brand-red)] rounded-full hover:bg-gray-100 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" aria-label="Switch to English">EN</button>
                        <button data-lang-switch="de" class="p-2 text-gray-500 hover:text-[var(--brand-red)] rounded-full hover:bg-gray-100 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" aria-label="Switch to German">DE</button>
                        <button data-lang-switch="fr" class="p-2 text-gray-500 hover:text-[var(--brand-red)] rounded-full hover:bg-gray-100 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" aria-label="Switch to French">FR</button>
                    </div>
                    <button aria-label="Search" class="p-2 text-gray-500 hover:text-[var(--brand-red)] rounded-full hover:bg-gray-100 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" data-lang-key-aria="aria.search" title="Search" data-lang-key-title="aria.search">
                        <i data-lucide="search" class="h-5 w-5"></i>
                    </button>
                    <div id="react-profile-header" class="flex items-center">
                        <form id="login-form" class="hidden">
                            <div class="flex items-center space-x-2">
                                <input type="text" name="username" placeholder="Username" class="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent" data-lang-key-placeholder="login.username">
                                <input type="password" name="password" placeholder="Password" class="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent" data-lang-key-placeholder="login.password">
                                <button type="submit" id="login-button" class="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-[var(--brand-red)] rounded-md hover:bg-[var(--brand-red-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand-red)]" data-lang-key="login.button">
                                    <i data-lucide="log-in" class="mr-2 h-4 w-4"></i>Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="md:hidden">
                         <button id="mobile-menu-button" aria-label="Open menu" aria-expanded="false" class="p-2 text-gray-500 hover:text-[var(--brand-red)] rounded-md hover:bg-gray-100 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" data-lang-key-aria="aria.open_menu">
                             <i data-lucide="menu" class="h-6 w-6"></i>
                         </button>
                    </div>
                </div>
            </div>
        </div>

        <div id="mobile-menu" class="hidden md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 z-40"> <div class="px-4 pt-4 pb-5 space-y-2">
                 <a href="#home" class="nav-section-link block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-[var(--brand-red)] transition-colors duration-150" data-lang-key="nav.private_clients"><i data-lucide="users" class="mr-2 h-5 w-5 inline-block"></i>Private Clients</a>
                 <a href="#business-clients" class="nav-section-link block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-[var(--brand-red)] transition-colors duration-150" data-lang-key="nav.business_clients"><i data-lucide="briefcase" class="mr-2 h-5 w-5 inline-block"></i>Business Clients</a>
                 <a href="#institutional" class="nav-section-link block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-[var(--brand-red)] transition-colors duration-150" data-lang-key="nav.institutional"><i data-lucide="building-2" class="mr-2 h-5 w-5 inline-block"></i>Institutional</a>
                 <a href="#about-us" class="nav-section-link block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-[var(--brand-red)] transition-colors duration-150" data-lang-key="nav.about_us"><i data-lucide="info" class="mr-2 h-5 w-5 inline-block"></i>About Us</a>
                 <a href="#events" class="nav-section-link block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-[var(--brand-red)] transition-colors duration-150" data-lang-key="nav.events"><i data-lucide="calendar" class="mr-2 h-5 w-5 inline-block"></i>Events</a>
             </div>
         </div>
    </header>

    <main id="main-content">
        <div id="static-content-wrapper">

            <section id="home" class="main-section relative min-h-[70vh] md:min-h-[80vh] flex items-center text-white overflow-hidden">
                <div class="absolute inset-0 z-0">
                     <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                          alt="Swiss Alps background"
                          class="w-full h-full object-cover"
                          onerror="this.onerror=null; this.src='https://placehold.co/1920x1080/6b7280/ffffff?text=BWAM+-+Swiss+Financial+Partner'">
                     <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent opacity-90"></div>
                 </div>
                 <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                     <div class="max-w-3xl text-left fade-in-element">
                         <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight text-shadow" data-lang-key="hero.title">Welcome to BWAM</h1>
                         <p class="text-lg sm:text-xl mb-10 text-gray-100 max-w-2xl" data-lang-key="hero.subtitle">Your trusted partner for comprehensive financial solutions in Zürich and beyond.</p>
                         <div class="flex flex-wrap gap-4">
                             <a href="#business-clients" class="nav-section-link inline-flex items-center bg-[var(--brand-red)] text-white font-semibold py-3 px-7 rounded-lg hover:bg-[var(--brand-red-dark)] transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-white" data-lang-key="hero.button_services">
                                 <i data-lucide="briefcase" class="mr-2 h-5 w-5"></i>Explore Services
                             </a>
                             <button id="contact-cta-button" class="inline-flex items-center bg-white text-[var(--brand-red)] font-semibold py-3 px-7 rounded-lg hover:bg-gray-100 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" data-lang-key="hero.button_contact">
                                 <i data-lucide="phone" class="mr-2 h-5 w-5"></i>Contact Us
                             </button>
                         </div>
                     </div>
                 </div>
            </section>

            <section id="about-us" class="main-section py-16 md:py-24 bg-white"> <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div class="grid md:grid-cols-2 gap-12 items-center">
                         <div class="fade-in-element">
                             <h2 class="text-3xl lg:text-4xl font-bold mb-6 inline-flex items-center"><i data-lucide="info" class="text-[var(--brand-red)] mr-3 h-8 w-8"></i><span data-lang-key="nav.about_us">About Us</span></h2>
                             <p class="text-lg text-gray-700 mb-4" data-lang-key="about.p1">Founded in Zurich with deep roots in Swiss banking tradition, BWAM (Banking & Wealth Asset Management) combines decades of financial expertise with a forward-thinking approach.</p>
                             <p class="text-gray-600 mb-4" data-lang-key="about.p2">Our mission is to provide personalized, transparent, and reliable financial services to private individuals, businesses, and institutions. We believe in building long-term relationships based on trust and mutual success.</p>
                             <p class="text-gray-600 mb-4" data-lang-key="about.p3">Located in the heart of Zurich's financial district, we are committed to upholding the highest standards of integrity and contributing positively to our community.</p>
                             <p class="text-gray-600" data-lang-key="about.p4">We leverage cutting-edge technology to enhance client experience while maintaining the personalized touch that defines Swiss private banking. Our diverse team brings global perspectives and local market insights.</p>
                         </div>
                         <div class="fade-in-element" style="transition-delay: 150ms;">
                             <img src="https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                                  alt="BWAM Office Building or Zurich Cityscape"
                                  class="rounded-xl shadow-xl w-full h-auto object-cover"
                                  loading="lazy" onerror="this.onerror=null; this.src='https://placehold.co/600x400/cccccc/ffffff?text=About+BWAM'">
                         </div>
                     </div>
                 </div>
            </section>

            <section id="events" class="main-section py-16 lg:py-24 bg-[var(--gray-light)]"> <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in-element">
                     <h2 class="text-3xl lg:text-4xl font-bold mb-6 inline-flex items-center justify-center w-full"><i data-lucide="calendar" class="text-[var(--brand-red)] mr-3 h-8 w-8"></i><span data-lang-key="events.title">Upcoming Events</span></h2>
                     <p class="text-lg text-gray-600 mb-10 max-w-2xl mx-auto" data-lang-key="events.subtitle">Join us for insightful seminars and workshops. Register your interest below.</p>
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                         <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-left hover:shadow-xl transition-shadow duration-300">
                             <h4 class="text-xl font-semibold mb-4" data-lang-key="events.future_wealth_title">Future Wealth Forum 2025: Navigating the Next Wave of Investment</h4>
                             <p class="text-gray-600 mb-2"><i data-lucide="calendar-days" class="inline-block w-4 h-4 mr-2 text-gray-500"></i><span data-lang-key="events.featured_date">Date: October 15, 2025</span></p>
                             <p class="text-gray-600 mb-4"><i data-lucide="map-pin" class="inline-block w-4 h-4 mr-2 text-gray-500"></i><span data-lang-key="events.featured_location">Location: BWAM Headquarters, Zurich</span></p>
                             <p class="text-sm text-gray-500 mb-6" data-lang-key="events.future_wealth_desc">Join BWAM's leading strategists and market analysts for an exclusive evening exploring the key economic trends shaping 2025 and beyond. Discover insights into innovative investment opportunities, sustainable finance growth areas, and strategies for building resilient portfolios in a dynamic global landscape. Includes networking apéro with peers and experts.</p>
                             <a href="https://events.blackthorn.io/en/KB1u1Ug7/future-wealth-forum-2025-navigating-the-next-wave-of-investment-4a9qKBXZql/overview" target="_blank" rel="noopener noreferrer" class="inline-flex items-center bg-[var(--brand-red)] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[var(--brand-red-dark)] transition duration-300 shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" data-lang-key="events.future_wealth_button">
                                 <i data-lucide="external-link" class="mr-2 h-5 w-5"></i>View Event Details
                             </a>
                         </div>
                         <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-left hover:shadow-xl transition-shadow duration-300">
                             <h4 class="text-xl font-semibold mb-4" data-lang-key="events.event2_title">Digital Banking Security Workshop</h4>
                             <p class="text-gray-600 mb-2"><i data-lucide="calendar-days" class="inline-block w-4 h-4 mr-2 text-gray-500"></i><span data-lang-key="events.event2_date">Date: November 5, 2025</span></p>
                             <p class="text-gray-600 mb-4"><i data-lucide="laptop" class="inline-block w-4 h-4 mr-2 text-gray-500"></i><span data-lang-key="events.event2_location">Location: Online Webinar</span></p>
                             <p class="text-sm text-gray-500 mb-6" data-lang-key="events.event2_desc">Learn best practices for protecting your accounts and data in the digital age. Q&A with cybersecurity experts.</p>
                             <button class="inline-flex items-center bg-[var(--brand-red)] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[var(--brand-red-dark)] transition duration-300 shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" data-lang-key="events.button_register">
                                 <i data-lucide="edit" class="mr-2 h-5 w-5"></i>Register Now
                             </button>
                         </div>
                     </div>
                 </div>
              </section>

            <section id="news" class="main-section py-16 lg:py-24 bg-white"> <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div class="text-center mb-14 lg:mb-20 fade-in-element">
                         <h2 class="text-3xl lg:text-4xl font-bold mb-4 inline-flex items-center"><i data-lucide="newspaper" class="text-[var(--brand-red)] mr-3 h-8 w-8"></i><span data-lang-key="news.title">News & Insights</span></h2>
                     </div>
                     <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <div class="flex flex-col bg-[var(--gray-light)] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 fade-in-element">
                             <img src="https://placehold.co/600x400/e5e7eb/4b5563?text=Market+Update" alt="News Image 1" class="w-full h-52 object-cover transition-transform duration-300 hover:scale-105" loading="lazy" onerror="this.onerror=null; this.src='https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found'">
                             <div class="p-6 flex flex-col flex-grow">
                                 <h3 class="text-lg font-semibold mb-2 text-gray-900" data-lang-key="news.card1_title">Market Outlook Q3 2025</h3>
                                 <p class="text-gray-600 text-sm mb-4 flex-grow" data-lang-key="news.card1_desc">Our analysis of current market trends and potential opportunities for investors.</p>
                                 <a href="#" class="mt-auto text-[var(--brand-red)] font-medium hover:underline text-sm self-start inline-flex items-center group focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-[var(--brand-red)] rounded" data-lang-key="news.read_more">Read More <i data-lucide="arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"></i></a>
                             </div>
                         </div>
                         <div class="flex flex-col bg-[var(--gray-light)] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 fade-in-element" style="transition-delay: 100ms;">
                             <img src="https://placehold.co/600x400/d1d5db/374151?text=Retirement+Planning" alt="News Image 2" class="w-full h-52 object-cover transition-transform duration-300 hover:scale-105" loading="lazy" onerror="this.onerror=null; this.src='https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found'">
                             <div class="p-6 flex flex-col flex-grow">
                                 <h3 class="text-lg font-semibold mb-2 text-gray-900" data-lang-key="news.card2_title">Planning for a Secure Retirement</h3>
                                 <p class="text-gray-600 text-sm mb-4 flex-grow" data-lang-key="news.card2_desc">Key considerations for building a robust pension plan in Switzerland.</p>
                                 <a href="#" class="mt-auto text-[var(--brand-red)] font-medium hover:underline text-sm self-start inline-flex items-center group focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-[var(--brand-red)] rounded" data-lang-key="news.read_more">Read More <i data-lucide="arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"></i></a>
                             </div>
                         </div>
                         <div class="flex flex-col bg-[var(--gray-light)] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 fade-in-element" style="transition-delay: 200ms;">
                             <img src="https://placehold.co/600x400/9ca3af/1f2937?text=Digital+Banking+Tips" alt="News Image 3" class="w-full h-52 object-cover transition-transform duration-300 hover:scale-105" loading="lazy" onerror="this.onerror=null; this.src='https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found'">
                             <div class="p-6 flex flex-col flex-grow">
                                 <h3 class="text-lg font-semibold mb-2 text-gray-900" data-lang-key="news.card3_title">Tips for Secure Digital Banking</h3>
                                 <p class="text-gray-600 text-sm mb-4 flex-grow" data-lang-key="news.card3_desc">How to protect yourself while managing your finances online with BWAM.</p>
                                 <a href="#" class="mt-auto text-[var(--brand-red)] font-medium hover:underline text-sm self-start inline-flex items-center group focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-[var(--brand-red)] rounded" data-lang-key="news.read_more">Read More <i data-lucide="arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"></i></a>
                             </div>
                         </div>
                     </div>
                     <div class="text-center mt-16 fade-in-element">
                         <a href="#" class="inline-flex items-center bg-[var(--brand-red)] text-white font-semibold py-3 px-7 rounded-lg hover:bg-[var(--brand-red-dark)] transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" data-lang-key="news.more_news">
                             <i data-lucide="plus-circle" class="mr-2 h-5 w-5"></i>More News
                         </a>
                     </div>
                 </div>
              </section>

            <section id="business-clients" class="main-section py-16 md:py-24 bg-[var(--gray-light)] hidden">
                 <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div class="text-center mb-14 lg:mb-20 fade-in-element">
                         <h2 class="text-3xl lg:text-4xl font-bold mb-4 inline-flex items-center"><i data-lucide="briefcase" class="text-[var(--brand-red)] mr-3 h-8 w-8"></i><span data-lang-key="nav.business_clients">Business Clients</span></h2>
                         <p class="text-lg text-gray-600 max-w-3xl mx-auto" data-lang-key="services.subtitle">Tailored financial solutions designed to help your business thrive, from startups to established corporations in the Zurich region.</p>
                     </div>
                     <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         <a href="#corporate-accounts" class="nav-section-link service-card group block bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 fade-in-element">
                             <i data-lucide="landmark" class="text-[var(--brand-red)] w-10 h-10 mb-4 block mx-auto service-icon"></i>
                             <h3 class="text-xl font-semibold mb-3 text-center group-hover:text-[var(--brand-red)] transition-colors" data-lang-key="services.business.card1_title">Corporate Accounts</h3>
                             <p class="text-gray-600 text-sm text-center" data-lang-key="services.business.card1_desc">Flexible business accounts with online banking, multi-currency options, and dedicated support.</p>
                         </a>
                         <a href="#business-financing" class="nav-section-link service-card group block bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 fade-in-element" style="transition-delay: 100ms;">
                             <i data-lucide="dollar-sign" class="text-[var(--brand-red)] w-10 h-10 mb-4 block mx-auto service-icon"></i>
                             <h3 class="text-xl font-semibold mb-3 text-center group-hover:text-[var(--brand-red)] transition-colors" data-lang-key="services.business.card2_title">Business Financing</h3>
                             <p class="text-gray-600 text-sm text-center" data-lang-key="services.business.card2_desc">Access capital for growth, equipment purchase, or operational needs with our competitive loan and credit line options.</p>
                         </a>
                         <a href="#cash-management" class="nav-section-link service-card group block bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 fade-in-element" style="transition-delay: 200ms;">
                             <i data-lucide="activity" class="text-[var(--brand-red)] w-10 h-10 mb-4 block mx-auto service-icon"></i>
                             <h3 class="text-xl font-semibold mb-3 text-center group-hover:text-[var(--brand-red)] transition-colors" data-lang-key="services.business.card3_title">Cash Management</h3>
                             <p class="text-gray-600 text-sm text-center" data-lang-key="services.business.card3_desc">Optimize your cash flow with our payment processing, collection, and liquidity management services.</p>
                         </a>
                     </div>
                 </div>
              </section>

            <section id="institutional" class="main-section py-16 md:py-24 bg-white hidden">
                 <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div class="text-center mb-14 lg:mb-20 fade-in-element">
                         <h2 class="text-3xl lg:text-4xl font-bold mb-4 inline-flex items-center"><i data-lucide="building-2" class="text-[var(--brand-red)] mr-3 h-8 w-8"></i><span data-lang-key="nav.institutional">Institutional Clients</span></h2>
                         <p class="text-lg text-gray-600 max-w-3xl mx-auto" data-lang-key="institutional.subtitle">Sophisticated investment management and advisory services for pension funds, foundations, family offices, and asset managers.</p>
                     </div>
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div class="bg-[var(--gray-light)] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 fade-in-element">
                             <i data-lucide="line-chart" class="text-[var(--brand-red)] w-10 h-10 mb-4"></i>
                             <h3 class="text-xl font-semibold mb-3" data-lang-key="institutional.card1_title">Asset Management</h3>
                             <p class="text-gray-600 text-sm" data-lang-key="institutional.card1_desc">Discretionary and advisory mandates across various asset classes, tailored to your institution's risk profile and objectives.</p>
                         </div>
                         <div class="bg-[var(--gray-light)] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 fade-in-element" style="transition-delay: 100ms;">
                              <i data-lucide="shield-check" class="text-[var(--brand-red)] w-10 h-10 mb-4"></i>
                             <h3 class="text-xl font-semibold mb-3" data-lang-key="institutional.card2_title">Custody & Execution</h3>
                             <p class="text-gray-600 text-sm" data-lang-key="institutional.card2_desc">Secure safekeeping of assets, efficient trade execution, and comprehensive reporting services.</p>
                         </div>
                     </div>
                 </div>
              </section>

            <section id="accounts-cards" class="main-section py-16 lg:py-24 bg-white hidden">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl fade-in-element">
                    <h2 class="text-3xl lg:text-4xl font-bold text-center mb-12 inline-flex items-center w-full justify-center"><i data-lucide="credit-card" class="text-[var(--brand-red)] mr-3 h-8 w-8"></i><span data-lang-key="nav.accounts_cards">Accounts & Cards</span></h2>
                    <p class="text-gray-700 mb-8 text-lg text-center" data-lang-key="accounts.intro">Manage your daily finances effortlessly...</p>
                    <ul class="list-none space-y-4 text-gray-600 mb-10">
                        <li class="flex items-start"><i data-lucide="check-circle" class="text-green-600 w-5 h-5 mr-3 mt-1 flex-shrink-0"></i><span data-lang-key="accounts.feature1">Competitive interest rates...</span></li>
                        <li class="flex items-start"><i data-lucide="check-circle" class="text-green-600 w-5 h-5 mr-3 mt-1 flex-shrink-0"></i><span data-lang-key="accounts.feature2">Various credit card options...</span></li>
                        <li class="flex items-start"><i data-lucide="check-circle" class="text-green-600 w-5 h-5 mr-3 mt-1 flex-shrink-0"></i><span data-lang-key="accounts.feature3">Easy international payments...</span></li>
                        <li class="flex items-start"><i data-lucide="check-circle" class="text-green-600 w-5 h-5 mr-3 mt-1 flex-shrink-0"></i><span data-lang-key="accounts.feature4">Dedicated support...</span></li>
                    </ul>
                    <div class="text-center">
                        <button class="inline-flex items-center bg-[var(--brand-red)] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[var(--brand-red-dark)] transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" data-lang-key="accounts.button_open">
                            <i data-lucide="edit-3" class="mr-2 h-5 w-5"></i>Open Account
                        </button>
                    </div>
                </div>
            </section>
            <section id="investing" class="main-section py-16 lg:py-24 bg-[var(--gray-light)] hidden">
                 <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl fade-in-element">
                     <h2 class="text-3xl lg:text-4xl font-bold text-center mb-12 inline-flex items-center w-full justify-center"><i data-lucide="trending-up" class="text-[var(--brand-red)] mr-3 h-8 w-8"></i><span data-lang-key="nav.investing">Investing</span></h2>
                     <p class="text-gray-700 mb-8 text-lg text-center" data-lang-key="investing.intro">Grow your wealth...</p>
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                         <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                             <i data-lucide="briefcase" class="text-[var(--brand-red)] w-8 h-8 mb-3"></i>
                             <h4 class="font-semibold text-lg mb-2" data-lang-key="investing.option1_title">Managed Portfolios</h4>
                             <p class="text-sm text-gray-600" data-lang-key="investing.option1_desc">Let our experts manage...</p>
                         </div>
                         <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                             <i data-lucide="message-circle" class="text-[var(--brand-red)] w-8 h-8 mb-3"></i>
                             <h4 class="font-semibold text-lg mb-2" data-lang-key="investing.option2_title">Advisory Services</h4>
                             <p class="text-sm text-gray-600" data-lang-key="investing.option2_desc">Receive personalized advice...</p>
                         </div>
                     </div>
                     <p class="text-xs text-gray-500 text-center italic" data-lang-key="investing.disclaimer">Investments involve risks...</p>
                 </div>
            </section>
             <section id="pensions" class="main-section py-16 lg:py-24 bg-white hidden">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl fade-in-element">
                    <h2 class="text-3xl lg:text-4xl font-bold text-center mb-12 inline-flex items-center w-full justify-center"><i data-lucide="umbrella" class="text-[var(--brand-red)] mr-3 h-8 w-8"></i><span data-lang-key="nav.pensions">Pensions</span></h2>
                    <p class="text-gray-700 mb-8 text-lg text-center" data-lang-key="pensions.intro">Secure your future...</p>
                    <ul class="list-none space-y-4 text-gray-600 mb-10">
                        <li class="flex items-start"><i data-lucide="check-circle" class="text-green-600 w-5 h-5 mr-3 mt-1 flex-shrink-0"></i><span data-lang-key="pensions.pillar3a">Tax-advantaged Pillar 3a...</span></li>
                        <li class="flex items-start"><i data-lucide="check-circle" class="text-green-600 w-5 h-5 mr-3 mt-1 flex-shrink-0"></i><span data-lang-key="pensions.vested_benefits">Vested benefits accounts...</span></li>
                        <li class="flex items-start"><i data-lucide="check-circle" class="text-green-600 w-5 h-5 mr-3 mt-1 flex-shrink-0"></i><span data-lang-key="pensions.planning">Comprehensive retirement planning...</span></li>
                    </ul>
                     <div class="text-center">
                         <button class="inline-flex items-center bg-[var(--brand-red)] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[var(--brand-red-dark)] transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" data-lang-key="pensions.button_learn">
                             <i data-lucide="info" class="mr-2 h-5 w-5"></i>Learn More
                         </button>
                     </div>
                </div>
             </section>
            <section id="financing" class="main-section py-16 lg:py-24 bg-[var(--gray-light)] hidden">
                 <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl fade-in-element">
                     <h2 class="text-3xl lg:text-4xl font-bold text-center mb-12 inline-flex items-center w-full justify-center"><i data-lucide="home" class="text-[var(--brand-red)] mr-3 h-8 w-8"></i><span data-lang-key="nav.financing">Financing</span></h2>
                     <p class="text-gray-700 mb-8 text-lg text-center" data-lang-key="financing.intro">Achieve your goals...</p>
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                             <i data-lucide="home" class="text-[var(--brand-red)] w-8 h-8 mb-3"></i>
                             <h4 class="font-semibold text-lg mb-2" data-lang-key="financing.option1_title">Mortgages</h4>
                             <p class="text-sm text-gray-600" data-lang-key="financing.option1_desc">Tailored mortgage solutions...</p>
                         </div>
                         <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                             <i data-lucide="user" class="text-[var(--brand-red)] w-8 h-8 mb-3"></i>
                             <h4 class="font-semibold text-lg mb-2" data-lang-key="financing.option2_title">Personal Loans</h4>
                             <p class="text-sm text-gray-600" data-lang-key="financing.option2_desc">Flexible personal credit options...</p>
                         </div>
                     </div>
                     <p class="text-xs text-gray-500 text-center italic" data-lang-key="financing.credit_check">Loan approval is subject to credit check...</p>
                 </div>
            </section>
            <section id="corporate-accounts" class="main-section py-16 lg:py-24 bg-white hidden">
                  <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl fade-in-element">
                      <h2 class="text-3xl lg:text-4xl font-bold text-center mb-12 inline-flex items-center w-full justify-center"><i data-lucide="landmark" class="text-[var(--brand-red)] mr-3 h-8 w-8"></i><span data-lang-key="services.business.card1_title">Corporate Accounts</span></h2>
                      <p class="text-gray-700 mb-8 text-lg text-center" data-lang-key="corporate_accounts.intro">Streamline your business operations...</p>
                      <ul class="list-none space-y-4 text-gray-600 mb-10">
                          <li class="flex items-start"><i data-lucide="check-circle" class="text-green-600 w-5 h-5 mr-3 mt-1 flex-shrink-0"></i><span data-lang-key="corporate_accounts.feature1">Multi-currency capabilities...</span></li>
                          <li class="flex items-start"><i data-lucide="check-circle" class="text-green-600 w-5 h-5 mr-3 mt-1 flex-shrink-0"></i><span data-lang-key="corporate_accounts.feature2">Advanced online and mobile banking...</span></li>
                          <li class="flex items-start"><i data-lucide="check-circle" class="text-green-600 w-5 h-5 mr-3 mt-1 flex-shrink-0"></i><span data-lang-key="corporate_accounts.feature3">Integration options...</span></li>
                          <li class="flex items-start"><i data-lucide="check-circle" class="text-green-600 w-5 h-5 mr-3 mt-1 flex-shrink-0"></i><span data-lang-key="corporate_accounts.feature4">Dedicated relationship manager...</span></li>
                      </ul>
                      <div class="text-center">
                          <button class="inline-flex items-center bg-[var(--brand-red)] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[var(--brand-red-dark)] transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" data-lang-key="corporate_accounts.button_contact">
                              <i data-lucide="phone" class="mr-2 h-5 w-5"></i>Contact Sales
                          </button>
                      </div>
                  </div>
            </section>
            <section id="business-financing" class="main-section py-16 lg:py-24 bg-[var(--gray-light)] hidden">
                   <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl fade-in-element">
                       <h2 class="text-3xl lg:text-4xl font-bold text-center mb-12 inline-flex items-center w-full justify-center"><i data-lucide="dollar-sign" class="text-[var(--brand-red)] mr-3 h-8 w-8"></i><span data-lang-key="services.business.card2_title">Business Financing</span></h2>
                       <p class="text-gray-700 mb-8 text-lg text-center" data-lang-key="business_financing.intro">Fuel your company's growth...</p>
                       <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                           <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                               <i data-lucide="building" class="text-[var(--brand-red)] w-8 h-8 mb-3"></i>
                               <h4 class="font-semibold text-lg mb-2" data-lang-key="business_financing.option1_title">Term Loans</h4>
                               <p class="text-sm text-gray-600" data-lang-key="business_financing.option1_desc">Structured loans...</p>
                           </div>
                           <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                               <i data-lucide="refresh-cw" class="text-[var(--brand-red)] w-8 h-8 mb-3"></i>
                               <h4 class="font-semibold text-lg mb-2" data-lang-key="business_financing.option2_title">Lines of Credit</h4>
                               <p class="text-sm text-gray-600" data-lang-key="business_financing.option2_desc">Flexible access to funds...</p>
                           </div>
                       </div>
                       <p class="text-xs text-gray-500 text-center italic" data-lang-key="financing.credit_check">Loan approval is subject to credit check...</p>
                   </div>
            </section>
            <section id="cash-management" class="main-section py-16 lg:py-24 bg-white hidden">
                    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl fade-in-element">
                        <h2 class="text-3xl lg:text-4xl font-bold text-center mb-12 inline-flex items-center w-full justify-center"><i data-lucide="activity" class="text-[var(--brand-red)] mr-3 h-8 w-8"></i><span data-lang-key="services.business.card3_title">Cash Management</span></h2>
                        <p class="text-gray-700 mb-8 text-lg text-center" data-lang-key="cash_management.intro">Optimize your company's liquidity...</p>
                         <ul class="list-none space-y-4 text-gray-600 mb-10">
                             <li class="flex items-start"><i data-lucide="check-circle" class="text-green-600 w-5 h-5 mr-3 mt-1 flex-shrink-0"></i><span data-lang-key="cash_management.feature1">Automated payment processing...</span></li>
                             <li class="flex items-start"><i data-lucide="check-circle" class="text-green-600 w-5 h-5 mr-3 mt-1 flex-shrink-0"></i><span data-lang-key="cash_management.feature2">Receivables management...</span></li>
                             <li class="flex items-start"><i data-lucide="check-circle" class="text-green-600 w-5 h-5 mr-3 mt-1 flex-shrink-0"></i><span data-lang-key="cash_management.feature3">Liquidity solutions...</span></li>
                             <li class="flex items-start"><i data-lucide="check-circle" class="text-green-600 w-5 h-5 mr-3 mt-1 flex-shrink-0"></i><span data-lang-key="cash_management.feature4">Real-time reporting...</span></li>
                         </ul>
                        <div class="text-center">
                            <button class="inline-flex items-center bg-[var(--brand-red)] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[var(--brand-red-dark)] transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" data-lang-key="cash_management.button_explore">
                                <i data-lucide="settings-2" class="mr-2 h-5 w-5"></i>Explore Tools
                            </button>
                        </div>
                    </div>
            </section>
             </div> <div id="react-profile-section">
            </div>

    </main>

    <footer class="bg-gray-900 text-gray-400 py-16">
         <div class="container mx-auto px-4 sm:px-6 lg:px-8">
             <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
                 <div>
                     <h4 class="text-lg font-semibold text-white mb-5">BWAM</h4>
                     <p class="text-sm mb-5" data-lang-key="footer.tagline">Your reliable financial partner.</p>
                     <div class="flex space-x-4">
                         <a href="#" aria-label="Facebook" class="text-gray-400 hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm"><i data-lucide="facebook" class="h-5 w-5"></i></a>
                         <a href="#" aria-label="LinkedIn" class="text-gray-400 hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm"><i data-lucide="linkedin" class="h-5 w-5"></i></a>
                         <a href="#" aria-label="Twitter" class="text-gray-400 hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm"><i data-lucide="twitter" class="h-5 w-5"></i></a>
                     </div>
                 </div>
                 <div>
                     <h4 class="text-lg font-semibold text-white mb-5" data-lang-key="footer.quicklinks">Quick Links</h4>
                     <ul class="space-y-3 text-sm">
                         <li><a href="#home" class="nav-section-link hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="nav.private_clients">Private Clients</a></li>
                         <li><a href="#business-clients" class="nav-section-link hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="nav.business_clients">Business Clients</a></li>
                         <li><a href="#institutional" class="nav-section-link hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="nav.institutional">Institutional</a></li>
                         <li><a href="#" class="hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="footer.careers">Careers</a></li>
                         <li><a href="#contact" id="footer-contact-link" class="hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="footer.contact">Contact Us</a></li>
                         <li><a href="#news" class="nav-section-link hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="footer.newsroom">Newsroom</a></li>
                     </ul>
                 </div>
                 <div>
                     <h4 class="text-lg font-semibold text-white mb-5" data-lang-key="footer.services">Services</h4>
                      <ul class="space-y-3 text-sm">
                          <li><a href="#accounts-cards" class="nav-section-link hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="nav.accounts_cards">Accounts</a></li>
                          <li><a href="#investing" class="nav-section-link hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="nav.investing">Investing</a></li>
                          <li><a href="#financing" class="nav-section-link hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="nav.financing">Financing</a></li>
                          <li><a href="#pensions" class="nav-section-link hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="nav.pensions">Pensions</a></li>
                          <li><a href="#" class="hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="footer.digital_banking">Digital Banking</a></li>
                      </ul>
                 </div>
                 <div>
                     <h4 class="text-lg font-semibold text-white mb-5" data-lang-key="footer.legal">Legal</h4>
                      <ul class="space-y-3 text-sm">
                          <li><a href="#" class="hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="footer.privacy">Privacy Policy</a></li>
                          <li><a href="#" class="hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="footer.terms">Terms of Use</a></li>
                          <li><a href="#" class="hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="footer.imprint">Imprint</a></li>
                          <li><a href="#" id="cookie-settings-link" class="hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="footer.cookies">Cookie Settings</a></li>
                          <li><a href="#" class="hover:text-white hover:underline transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-900 focus-visible:ring-white rounded-sm" data-lang-key="footer.accessibility">Accessibility</a></li>
                      </ul>
                 </div>
             </div>
             <div class="border-t border-gray-700 pt-8 mt-8 text-center text-sm text-gray-500">
                 &copy; <span id="current-year">{/* Year populated by script.js */}</span> BWAM. <span data-lang-key="footer.rights">All rights reserved.</span> <span data-lang-key="footer.location">Location: Zürich, Switzerland.</span>
             </div>
         </div>
      </footer>

    <div id="consent-banner" class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-5 shadow-2xl z-[100] transform translate-y-full hidden border-t border-gray-700" >
        <div class="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-sm text-gray-300 flex-grow sm:mr-4" data-lang-key="consent.message">
                We use cookies and similar technologies to enhance your experience and display relevant content. By clicking "Accept All," you agree to the use of these technologies. You can change your selection at any time.
            </p>
            <div class="flex-shrink-0 flex gap-3 w-full sm:w-auto">
                <button id="consent-reject" class="flex-1 sm:flex-none bg-gray-600 hover:bg-gray-500 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-white" data-lang-key="consent.reject">Reject All</button>
                <button id="consent-accept" class="flex-1 sm:flex-none bg-[var(--brand-red)] hover:bg-[var(--brand-red-dark)] text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-white" data-lang-key="consent.accept">Accept All</button>
            </div>
        </div>
    </div>

    <div id="advisor-modal" class="fixed inset-0 z-[110] flex items-center justify-center p-4 hidden modal"> <div id="modal-overlay" class="absolute inset-0 bg-black bg-opacity-70 modal-overlay backdrop-blur-sm"></div>
        <div id="modal-content" class="relative bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 md:p-8 modal-content overflow-hidden">
            <button id="modal-close-button" aria-label="Close modal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" data-lang-key-aria="modal.close">
                <i data-lucide="x" class="h-5 w-5"></i>
                <span class="sr-only" data-lang-key="modal.close">Close modal</span>
            </button>
            <h3 class="text-2xl font-semibold mb-8 text-center" data-lang-key="modal.title">Find Your Advisor</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div class="text-center border border-gray-200 p-5 rounded-lg hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80"
                         alt="Advisor Anna Müller"
                         class="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
                         loading="lazy"
                         onerror="this.onerror=null; this.src='https://placehold.co/120x120/e0e0e0/757575?text=AA';">
                    <h4 class="font-semibold text-lg" data-lang-key="modal.advisor1_name">Anna Müller</h4>
                    <p class="text-sm text-gray-500 mb-4" data-lang-key="modal.advisor1_title">Senior Wealth Manager</p>
                    <button class="w-full inline-flex items-center justify-center text-sm bg-[var(--brand-red)] text-white py-2 px-4 rounded-lg hover:bg-[var(--brand-red-dark)] transition duration-300 shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" data-lang-key="modal.button_connect"><i data-lucide="user-check" class="mr-2 h-4 w-4"></i>Connect</button>
                </div>
                 <div class="text-center border border-gray-200 p-5 rounded-lg hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                     <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80"
                          alt="Advisor Lukas Baumann"
                          class="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
                          loading="lazy"
                          onerror="this.onerror=null; this.src='https://placehold.co/120x120/d1d5db/4b5563?text=LB';">
                     <h4 class="font-semibold text-lg" data-lang-key="modal.advisor2_name">Lukas Baumann</h4>
                     <p class="text-sm text-gray-500 mb-4" data-lang-key="modal.advisor2_title">Investment Specialist</p>
                     <button class="w-full inline-flex items-center justify-center text-sm bg-[var(--brand-red)] text-white py-2 px-4 rounded-lg hover:bg-[var(--brand-red-dark)] transition duration-300 shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" data-lang-key="modal.button_connect"><i data-lucide="user-check" class="mr-2 h-4 w-4"></i>Connect</button>
                 </div>
                <div class="text-center border border-gray-200 p-5 rounded-lg hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                     <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80"
                          alt="Advisor Sophie Dubois"
                          class="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
                          loading="lazy"
                          onerror="this.onerror=null; this.src='https://placehold.co/120x120/f3f4f6/1f2937?text=SC';">
                     <h4 class="font-semibold text-lg" data-lang-key="modal.advisor3_name">Sophie Dubois</h4>
                     <p class="text-sm text-gray-500 mb-4" data-lang-key="modal.advisor3_title">Retirement Planning Expert</p>
                     <button class="w-full inline-flex items-center justify-center text-sm bg-[var(--brand-red)] text-white py-2 px-4 rounded-lg hover:bg-[var(--brand-red-dark)] transition duration-300 shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]" data-lang-key="modal.button_connect"><i data-lucide="user-check" class="mr-2 h-4 w-4"></i>Connect</button>
                 </div>
            </div>
            <p class="text-center text-gray-600 text-sm" data-lang-key="modal.schedule_message">Schedule an appointment with your advisor.</p>
        </div>
    </div>

    <div id="scroll-banker" class="hidden md:block"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase banker-svg">
            <title>Scrolling Banker Icon</title>
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" fill="var(--brand-red)" stroke="var(--brand-red-dark)"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="#6c757d" fill="#e9ecef"/>
        </svg>
    </div>

    <script src="script.js"></script>

    <script type="text/babel">
        const { useState, useEffect, useRef, useCallback, useContext } = React;

        // --- Embedded Translations ---
        const translations = {
             en: {
                 login: "Login", logout: "Logout", profile: "Profile", settings: "Settings", welcome: "Welcome", language: "Language", emailPlaceholder: "Enter email", loginError: "Please enter a valid email.",
                 dropdown: { myProfile: "My Profile", settings: "Settings", logout: "Logout" },
                 profilePage: { title: "My Profile", subtitle: "Manage your personal information and account details.", summaryTitle: "Account Summary", checkingLabel: "Checking Account", savingsLabel: "Savings Account", investmentLabel: "Investment Portfolio", totalLabel: "Total Assets", goalTitle: "Savings Goal: World Trip", goalDesc: "Progress towards your adventure fund.", goalComplete: "Complete", actionsTitle: "Quick Actions", actionTransfer: "Make a Transfer", actionStatement: "View Statements", actionAdvisor: "Contact Advisor", transactionsTitle: "Recent Transactions", thDate: "Date", thDescription: "Description", thAmount: "Amount (CHF)", txDesc1: "Grocery Store Coop", txDesc2: "Salary Deposit - Employer AG", txDesc3: "Online Purchase - Galaxus", txDesc4: "Restaurant Kronenhalle", txDesc5: "Rent Payment - Verwaltung GmbH", personalInfoTitle: "Personal Information", editButton: "Edit", nameLabel: "Name", emailLabel: "Email", phoneLabel: "Phone", addressLabel: "Address", memberSinceLabel: "Member Since" },
                 events: { // Merged event translations
                     future_wealth_title: "Future Wealth Forum 2025: Navigating the Next Wave of Investment",
                     featured_date: "Date: October 15, 2025", // Keeping placeholder
                     featured_location: "Location: BWAM Headquarters, Zurich", // Keeping placeholder
                     future_wealth_desc: "Join BWAM's leading strategists and market analysts for an exclusive evening exploring the key economic trends shaping 2025 and beyond. Discover insights into innovative investment opportunities, sustainable finance growth areas, and strategies for building resilient portfolios in a dynamic global landscape. Includes networking apéro with peers and experts.",
                     future_wealth_button: "View Event Details",
                     event2_title: "Digital Banking Security Workshop", // Assuming this was the original second event
                     event2_date: "Date: November 5, 2025",
                     event2_location: "Location: Online Webinar",
                     event2_desc: "Learn best practices for protecting your accounts and data in the digital age. Q&A with cybersecurity experts.",
                     button_register: "Register Now" // Original button text, kept for the second event
                 },
                 aria: { search: "Search", open_menu: "Open menu", set_lang_en: "Set language to English", set_lang_de: "Set language to German" },
                 modal: { close: "Close modal", title: "Find Your Advisor", advisor1_name: "Anna Müller", advisor1_title: "Senior Wealth Manager", advisor2_name: "Lukas Baumann", advisor2_title: "Investment Specialist", advisor3_name: "Sophie Dubois", advisor3_title: "Retirement Planning Expert", button_connect: "Connect", schedule_message: "Schedule an appointment with your advisor." }
             },
             de: {
                 login: "Anmelden", logout: "Ausloggen", profile: "Profil", settings: "Einstellungen", welcome: "Willkommen", language: "Sprache", emailPlaceholder: "E-Mail eingeben", loginError: "Bitte geben Sie eine gültige E-Mail ein.",
                 dropdown: { myProfile: "Mein Profil", settings: "Einstellungen", logout: "Ausloggen" },
                 profilePage: { title: "Mein Profil", subtitle: "Verwalten Sie Ihre persönlichen Daten und Kontodetails.", summaryTitle: "Kontoübersicht", checkingLabel: "Kontokorrent", savingsLabel: "Sparkonto", investmentLabel: "Anlageportfolio", totalLabel: "Gesamtvermögen", goalTitle: "Sparziel: Weltreise", goalDesc: "Fortschritt für Ihr Abenteuer.", goalComplete: "Vollständig", actionsTitle: "Schnellzugriff", actionTransfer: "Überweisung tätigen", actionStatement: "Kontoauszüge ansehen", actionAdvisor: "Berater kontaktieren", transactionsTitle: "Letzte Transaktionen", thDate: "Datum", thDescription: "Beschreibung", thAmount: "Betrag (CHF)", txDesc1: "Einkauf Coop", txDesc2: "Lohnzahlung - Arbeitgeber AG", txDesc3: "Online-Kauf - Galaxus", txDesc4: "Restaurant Kronenhalle", txDesc5: "Mietzahlung - Verwaltung GmbH", personalInfoTitle: "Persönliche Informationen", editButton: "Bearbeiten", nameLabel: "Name", emailLabel: "E-Mail", phoneLabel: "Telefon", addressLabel: "Adresse", memberSinceLabel: "Mitglied seit" },
                 events: { // Merged event translations
                     future_wealth_title: "Future Wealth Forum 2025: Die nächste Investitionswelle steuern",
                     featured_date: "Datum: 15. Oktober 2025", // Platzhalter beibehalten
                     featured_location: "Ort: BWAM Hauptsitz, Zürich", // Platzhalter beibehalten
                     future_wealth_desc: "Nehmen Sie an einem exklusiven Abend mit den führenden Strategen und Marktanalysten von BWAM teil und entdecken Sie die wichtigsten Wirtschaftstrends, die 2025 und darüber hinaus prägen werden. Erhalten Sie Einblicke in innovative Anlagemöglichkeiten, Wachstumsbereiche der nachhaltigen Finanzierung und Strategien zum Aufbau widerstandsfähiger Portfolios in einer dynamischen globalen Landschaft. Inklusive Networking-Apéro mit Kollegen und Experten.",
                     future_wealth_button: "Eventdetails anzeigen",
                     event2_title: "Workshop zur Sicherheit im Digital Banking", // Assuming this was the original second event
                     event2_date: "Datum: 5. November 2025",
                     event2_location: "Ort: Online-Webinar",
                     event2_desc: "Lernen Sie bewährte Methoden zum Schutz Ihrer Konten und Daten im digitalen Zeitalter. Fragen & Antworten mit Cybersicherheitsexperten.",
                     button_register: "Jetzt registrieren" // Original button text, kept for the second event
                 },
                 aria: { search: "Suche", open_menu: "Menü öffnen", set_lang_en: "Sprache auf Englisch setzen", set_lang_de: "Sprache auf Deutsch setzen" },
                 modal: { close: "Modal schließen", title: "Finden Sie Ihren Berater", advisor1_name: "Anna Müller", advisor1_title: "Senior Vermögensverwalterin", advisor2_name: "Lukas Baumann", advisor2_title: "Anlagespezialist", advisor3_name: "Sophie Dubois", advisor3_title: "Expertin für Vorsorgeplanung", button_connect: "Verbinden", schedule_message: "Vereinbaren Sie einen Termin mit Ihrem Berater." }
             }
        };
        // Make translations globally available for script.js
        window.bwamTranslations = translations;

        // --- Inline SVG Icons (Functional Components) ---
        // Provides fallbacks or specific icons if needed
        const UserCircleIcon = ({ size = 28 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg> );
        const LogOutIcon = ({ size = 16 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> );
        const SettingsIcon = ({ size = 16 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> );
        const GlobeIcon = ({ size = 16 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> );
        const UserIcon = ({ size = 16 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> );
        const LandmarkIcon = ({ size = 16 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="22" y2="22"></line><line x1="6" x2="6" y1="18" y2="11"></line><line x1="10" x2="10" y1="18" y2="11"></line><line x1="14" x2="14" y1="18" y2="11"></line><line x1="18" x2="18" y1="18" y2="11"></line><polygon points="12 2 20 7 4 7"></polygon></svg> );
        const TargetIcon = ({ size = 16 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg> );
        const ZapIcon = ({ size = 16 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> );
        const ListIcon = ({ size = 16 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"></line><line x1="8" x2="21" y1="12" y2="12"></line><line x1="8" x2="21" y1="18" y2="18"></line><line x1="3" x2="3.01" y1="6" y2="6"></line><line x1="3" x2="3.01" y1="12" y2="12"></line><line x1="3" x2="3.01" y1="18" y2="18"></line></svg> );
        const SendIcon = ({ size = 14 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> );
        const FileTextIcon = ({ size = 14 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" x2="8" y1="13" y2="13"></line><line x1="16" x2="8" y1="17" y2="17"></line><line x1="10" x2="8" y1="9" y2="9"></line></svg> );
        const MessageSquareIcon = ({ size = 14 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> );
        const EditIcon = ({ size = 12 }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> );

        // --- Authentication Hook ---
        const useAuth = () => {
          const initialUser = JSON.parse(localStorage.getItem('bwamUser'));
          const [user, setUser] = useState(initialUser);
          const [loading, setLoading] = useState(true);

          useEffect(() => {
            const timer = setTimeout(() => setLoading(false), 200); // Short delay simulation
            return () => clearTimeout(timer);
          }, []);

          useEffect(() => {
            if (user) {
              localStorage.setItem('bwamUser', JSON.stringify(user));
            } else {
              localStorage.removeItem('bwamUser');
            }
          }, [user]);

          const login = (email) => {
            if (typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // Basic Regex email validation
              setUser({ email });
              return true;
            }
            return false;
          };

          const logout = () => setUser(null);

          return { user, loading, login, logout };
        };

        // --- Main Application Context ---
        const AppContext = React.createContext();

        function AppProvider({ children }) {
            const auth = useAuth();
            // Default language from HTML tag, fallback to 'en'
            const [language, setLanguage] = useState(document.documentElement.lang || 'en');
            const [view, setView] = useState('main'); // 'main' or 'profile'

            const t = useCallback((key) => {
                 if (!key) return '';
                try {
                    return key.split('.').reduce((obj, k) => obj && obj[k], translations[language]) || key;
                } catch (e) {
                    console.warn(`Translation key error: ${key} [${language}]`);
                    return key;
                }
            }, [language]);

            const changeLanguage = (newLang) => {
                if (translations[newLang] && newLang !== language) {
                    setLanguage(newLang);
                    document.documentElement.lang = newLang;
                    // Trigger update for static content via exposed function
                    if (window.bwamScripts && typeof window.bwamScripts.updateStaticContentLanguage === 'function') {
                         // Use setTimeout to ensure React state update completes before DOM manipulation
                         setTimeout(() => window.bwamScripts.updateStaticContentLanguage(newLang), 0);
                    } else {
                        console.warn("bwamScripts.updateStaticContentLanguage function not found.");
                    }
                }
            };

            const changeView = (newView) => {
                const staticContent = document.getElementById('static-content-wrapper');
                const profileSection = document.getElementById('react-profile-section');
                const currentActualView = profileSection?.classList.contains('visible') ? 'profile' : 'main';

                // Only proceed if the view is actually changing
                if (newView === currentActualView) {
                    // If navigating to profile but already there, maybe scroll to top
                    if (newView === 'profile') window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }

                if (newView === 'profile') {
                    setView('profile');
                    staticContent?.classList.add('hidden-by-react');
                    profileSection?.classList.add('visible');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    // Track profile view
                     if (typeof window.bwamDataLayer?.trackProfileView === 'function' && auth.user) {
                         window.bwamDataLayer.trackProfileView(auth.user.email);
                     }
                } else { // newView === 'main'
                    setView('main');
                    profileSection?.classList.remove('visible');
                    staticContent?.classList.remove('hidden-by-react');
                    // Scrolling for 'main' view is handled by script.js handleNavigation or popstate
                }
            };

             // Effect to handle browser back/forward and initial load based on hash
             useEffect(() => {
                 const handlePopState = () => {
                     const hash = window.location.hash;
                     console.log("React Popstate Detected:", hash)
                     if (hash === '#profile' && auth.user) {
                         changeView('profile');
                     } else if (hash !== '#profile') {
                          changeView('main');
                         // Let script.js handle showing the correct static section based on the hash
                     } else { // hash is #profile but user not logged in
                          changeView('main');
                          history.replaceState(null, null, '#home'); // Redirect to home
                     }
                 };

                 window.addEventListener('popstate', handlePopState);

                 // Initial check on mount
                 const initialHash = window.location.hash;
                 if (initialHash === '#profile' && auth.user) {
                     changeView('profile');
                 } else if (initialHash === '#profile' && !auth.user) {
                     history.replaceState(null, null, '#home');
                     changeView('main'); // Ensure React state matches
                 } else {
                      changeView('main'); // Default to main view
                 }

                 return () => window.removeEventListener('popstate', handlePopState);
             }, [auth.user]); // Re-run if login status changes

             // Expose context pieces needed by script.js (use with caution)
              useEffect(() => {
                  window.AppContext = { view, changeView };
                  return () => { delete window.AppContext; }; // Cleanup
              }, [view, changeView]);


            const value = { ...auth, language, changeLanguage, t, view, changeView };
            return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
        }

        // --- Header Component (Login/Profile & Language) ---
        function HeaderApp() {
            const { user, loading, login, logout, language, changeLanguage, t, view, changeView } = useContext(AppContext);
            const [isProfileOpen, setIsProfileOpen] = useState(false);
            const [emailInput, setEmailInput] = useState('');
            const [loginError, setLoginError] = useState(false);
            const profileRef = useRef(null);

            useEffect(() => {
                const handleClickOutside = (event) => {
                    if (profileRef.current && !profileRef.current.contains(event.target)) {
                         const profileButton = document.getElementById('profile-button'); // Avoid closing if clicking the button itself
                         if (!profileButton || !profileButton.contains(event.target)) {
                            setIsProfileOpen(false);
                         }
                    }
                };
                document.addEventListener("mousedown", handleClickOutside);
                return () => document.removeEventListener("mousedown", handleClickOutside);
            }, []);

            const handleLogin = (e) => {
                e.preventDefault();
                setLoginError(false);
                const success = login(emailInput);
                if (!success) {
                    setLoginError(true);
                } else {
                    setEmailInput('');
                    // Track successful login
                     if (typeof window.bwamDataLayer?.trackLoginSuccess === 'function') {
                         window.bwamDataLayer.trackLoginSuccess(emailInput);
                     }
                }
            };

            const handleLogout = () => {
                const loggedOutEmail = user?.email;
                logout();
                setIsProfileOpen(false);
                // Track logout
                 if (typeof window.bwamDataLayer?.trackLogout === 'function') {
                      window.bwamDataLayer.trackLogout(loggedOutEmail);
                 }
                // If on profile page, navigate back to main view and update URL
                if (view === 'profile') {
                    changeView('main');
                    history.pushState(null, null, '#home'); // Update URL to reflect main view
                }
            };

            const handleViewProfile = (e) => {
                e.preventDefault();
                setIsProfileOpen(false);
                if (view !== 'profile') {
                     changeView('profile');
                     history.pushState(null, null, '#profile'); // Update URL hash
                } else {
                     window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top if already on profile
                }
            };

            const getUsername = (email) => {
                if (!email || !email.includes('@')) return 'User';
                const namePart = email.split('@')[0];
                return namePart.charAt(0).toUpperCase() + namePart.slice(1);
            };

            if (loading) {
                // Use the CSS loading indicator defined in style.css
                // The :empty pseudo-class handles this until React renders
                return null;
            }

            return (
                <div className="flex items-center space-x-4">
                    {/* Language Switcher */}
                    <div className="flex items-center space-x-1 border border-gray-300 rounded-full px-2 py-1">
                        <GlobeIcon size={16} />
                        <button
                            onClick={() => changeLanguage('en')}
                            className={`text-sm font-medium rounded-full px-2 py-0.5 transition-colors duration-150 ${language === 'en' ? 'bg-[var(--brand-red)] text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                            aria-label={t('aria.set_lang_en')}
                            title={t('aria.set_lang_en')}>
                            EN
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                            onClick={() => changeLanguage('de')}
                            className={`text-sm font-medium rounded-full px-2 py-0.5 transition-colors duration-150 ${language === 'de' ? 'bg-[var(--brand-red)] text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                            aria-label={t('aria.set_lang_de')}
                            title={t('aria.set_lang_de')}>
                            DE
                        </button>
                    </div>

                    {/* Conditional: Profile Dropdown or Login Form */}
                    {user ? (
                        <div className="profile-dropdown-container" ref={profileRef}>
                            <button id="profile-button" onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center text-gray-600 hover:text-[var(--brand-red)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)] rounded-full p-1" aria-haspopup="true" aria-expanded={isProfileOpen} title={t('profile')}>
                                <UserCircleIcon />
                            </button>
                            {isProfileOpen && (
                                <div className="profile-dropdown-menu"> {/* Styles in style.css */}
                                    <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                        <h3 className="font-semibold text-lg">{t('welcome')}, {getUsername(user.email)}</h3>
                                        <p className="text-sm opacity-90 truncate">{user.email}</p>
                                    </div>
                                    <nav className="border-t border-gray-100 py-1">
                                        <a href="#profile" onClick={handleViewProfile} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[var(--brand-red)] transition-colors duration-150">
                                            <UserIcon size={16} /> <span className="ml-2">{t('dropdown.myProfile')}</span>
                                        </a>
                                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[var(--brand-red)] transition-colors duration-150">
                                            <SettingsIcon /> <span className="ml-2">{t('dropdown.settings')}</span>
                                        </a>
                                        <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150">
                                            <LogOutIcon /> <span className="ml-2">{t('dropdown.logout')}</span>
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleLogin} className="login-form-container"> {/* Styles in style.css */}
                            <input
                                type="email"
                                value={emailInput}
                                onChange={(e) => { setEmailInput(e.target.value); setLoginError(false); }}
                                placeholder={t('emailPlaceholder')}
                                className={`${loginError ? 'error' : ''}`} // Use .error class for styling invalid state
                                required
                                aria-label={t('emailPlaceholder')}
                                aria-invalid={loginError} // Indicate invalid state for accessibility
                                aria-describedby={loginError ? 'login-error-desc' : undefined}
                            />
                            <button type="submit">{t('login')}</button>
                            {loginError && <p id="login-error-desc" className="login-error-message">{t('loginError')}</p>}
                        </form>
                    )}
                </div>
            );
        }

        // --- Profile Section Component ---
         function ProfileSection() {
            const { user, t, view } = useContext(AppContext);
            // Add state for loading profile data and potential errors
            const [profileData, setProfileData] = useState(null);
            const [isLoading, setIsLoading] = useState(true);
            const [error, setError] = useState(null);

            // Simulate data fetching (Replace with actual API call)
            useEffect(() => {
                // Only fetch if the view is 'profile' and user exists
                if (view === 'profile' && user) {
                    setIsLoading(true);
                    setError(null);
                    console.log("Fetching profile data..."); // Simulate API call start

                    // --- Start Simulation ---
                    const fetchTimeout = setTimeout(() => {
                        try {
                             // Helper function to get username
                             const getUsername = (email) => {
                                 if (!email || !email.includes('@')) return 'User';
                                 const namePart = email.split('@')[0];
                                 return namePart.replace('.', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                             };
                            // Generate mock data based on logged-in user
                             const fetchedData = {
                                 name: getUsername(user.email),
                                 phone: "+41 79 123 45 67", // Mock data
                                 address: "Bahnhofstrasse 1, 8001 Zürich", // Mock data
                                 memberSince: "2018-03-15", // Mock data
                                 checkingBalance: 12345.67,
                                 savingsBalance: 87654.32,
                                 investmentValue: 150250.80,
                                 savingsGoalTarget: 15000,
                                 savingsGoalCurrent: 11250,
                                 transactions: [
                                     { id: 1, date: "2025-05-04", descKey: "profilePage.txDesc1", amount: -85.50 },
                                     { id: 2, date: "2025-05-03", descKey: "profilePage.txDesc2", amount: 5200.00 },
                                     { id: 3, date: "2025-05-02", descKey: "profilePage.txDesc3", amount: -249.90 },
                                     { id: 4, date: "2025-05-01", descKey: "profilePage.txDesc4", amount: -120.00 },
                                     { id: 5, date: "2025-05-01", descKey: "profilePage.txDesc5", amount: -2100.00 }
                                 ]
                             };
                             setProfileData(fetchedData);
                             console.log("Profile data fetched successfully.");
                        } catch(err) {
                             console.error("Error fetching profile data:", err);
                             setError("Failed to load profile data.");
                        } finally {
                             setIsLoading(false);
                        }
                    }, 800); // Simulate network delay (800ms)
                    // --- End Simulation ---

                    // Cleanup function for timeout if component unmounts or user logs out
                    return () => clearTimeout(fetchTimeout);
                } else {
                     // Reset state if view changes or user logs out
                     setIsLoading(false);
                     setProfileData(null);
                     setError(null);
                }
            }, [view, user]); // Re-fetch if view becomes profile or user changes

            // Render nothing if not in profile view or no user
            if (view !== 'profile' || !user) return null;

             // Show loading state
             if (isLoading) {
                 return (
                     <div className="profile-section-content text-center py-20">
                         <div className="inline-block border-4 border-gray-300 border-t-[var(--brand-red)] rounded-full w-12 h-12 animate-spin"></div>
                         <p className="mt-4 text-gray-600">Loading profile...</p>
                     </div>
                 );
             }

             // Show error state
             if (error) {
                 return <div className="profile-section-content text-center py-20 text-red-600">{error}</div>;
             }

            // Show profile content if data loaded successfully
            if (!profileData) {
                 // Should ideally be covered by loading/error states, but as a fallback:
                 return <div className="profile-section-content text-center py-20 text-gray-600">Profile data not available.</div>;
            }

            // --- Calculations and Formatting ---
            const totalAssets = profileData.checkingBalance + profileData.savingsBalance + profileData.investmentValue;
            const goalProgress = Math.min(100, (profileData.savingsGoalCurrent / profileData.savingsGoalTarget) * 100);

            const formatCurrency = (value) => value.toLocaleString(document.documentElement.lang || 'en', { style: 'currency', currency: 'CHF' });
            const formatDate = (dateString) => new Date(dateString).toLocaleDateString(document.documentElement.lang || 'en', { year: 'numeric', month: 'long', day: 'numeric' });


            // --- Render Profile UI ---
            return (
                <div className="profile-section-content fade-in-element is-visible"> {/* Styles in style.css */}
                    {/* Header */}
                    <div className="text-center mb-14 lg:mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 inline-flex items-center">
                            <UserCircleIcon size={36} /> <span className="ml-3">{t('profilePage.title')}</span>
                        </h2>
                        <p className="text-lg text-gray-600">{t('profilePage.subtitle')}</p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* Col 1: Account Summary */}
                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-lg font-semibold mb-4 inline-flex items-center text-[var(--brand-red)]"><LandmarkIcon /><span className="ml-2">{t('profilePage.summaryTitle')}</span></h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between"><span className="text-gray-600">{t('profilePage.checkingLabel')}:</span><span className="font-medium text-gray-800">{formatCurrency(profileData.checkingBalance)}</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">{t('profilePage.savingsLabel')}:</span><span className="font-medium text-gray-800">{formatCurrency(profileData.savingsBalance)}</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">{t('profilePage.investmentLabel')}:</span><span className="font-medium text-gray-800">{formatCurrency(profileData.investmentValue)}</span></div>
                                <div className="flex justify-between border-t pt-3 mt-3"><span className="text-gray-600 font-semibold">{t('profilePage.totalLabel')}:</span><span className="font-semibold text-lg text-[var(--brand-red)]">{formatCurrency(totalAssets)}</span></div>
                            </div>
                        </div>

                        {/* Col 2: Savings Goal & Personal Info */}
                        <div className="space-y-8">
                             <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                 <h3 className="text-lg font-semibold mb-4 inline-flex items-center text-[var(--brand-red)]"><TargetIcon /><span className="ml-2">{t('profilePage.goalTitle')}</span></h3>
                                 <p className="text-sm text-gray-600 mb-3">{t('profilePage.goalDesc')}</p>
                                 <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                     <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full" style={{ width: `${goalProgress}%` }}></div>
                                 </div>
                                 <div className="flex justify-between text-xs text-gray-500">
                                     <span>{formatCurrency(profileData.savingsGoalCurrent)}</span>
                                     <span>{formatCurrency(profileData.savingsGoalTarget)}</span>
                                 </div>
                                 <p className="text-center text-sm font-medium mt-3 text-green-600">{goalProgress.toFixed(0)}% {t('profilePage.goalComplete')}</p>
                             </div>
                             <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                                 <div className="flex justify-between items-center mb-4">
                                     <h3 className="text-lg font-semibold inline-flex items-center text-[var(--brand-red)]"><UserIcon /><span className="ml-2">{t('profilePage.personalInfoTitle')}</span></h3>
                                     <button className="text-xs text-blue-600 hover:underline inline-flex items-center focus-visible:ring-1 focus-visible:ring-blue-500 rounded"><EditIcon size={12} /><span className="ml-1">{t('profilePage.editButton')}</span></button>
                                 </div>
                                 <div className="space-y-2 text-sm">
                                     <div className="flex"><span className="w-1/3 text-gray-500 font-medium">{t('profilePage.nameLabel')}:</span><span className="w-2/3 text-gray-800">{profileData.name}</span></div>
                                     <div className="flex"><span className="w-1/3 text-gray-500 font-medium">{t('profilePage.emailLabel')}:</span><span className="w-2/3 text-gray-800 break-all">{user.email}</span></div>
                                      <div className="flex"><span className="w-1/3 text-gray-500 font-medium">{t('profilePage.phoneLabel')}:</span><span className="w-2/3 text-gray-800">{profileData.phone}</span></div>
                                      <div className="flex"><span className="w-1/3 text-gray-500 font-medium">{t('profilePage.addressLabel')}:</span><span className="w-2/3 text-gray-800">{profileData.address}</span></div>
                                      <div className="flex"><span className="w-1/3 text-gray-500 font-medium">{t('profilePage.memberSinceLabel')}:</span><span className="w-2/3 text-gray-800">{formatDate(profileData.memberSince)}</span></div>
                                 </div>
                             </div>
                        </div>

                        {/* Col 3: Quick Actions */}
                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                             <h3 className="text-lg font-semibold mb-4 inline-flex items-center text-[var(--brand-red)]"><ZapIcon /><span className="ml-2">{t('profilePage.actionsTitle')}</span></h3>
                             <div className="space-y-3">
                                 <button className="w-full inline-flex items-center justify-center text-sm bg-[var(--brand-red)] text-white py-2.5 px-4 rounded-lg hover:bg-[var(--brand-red-dark)] transition duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]"><SendIcon /><span className="ml-2">{t('profilePage.actionTransfer')}</span></button>
                                 <button className="w-full inline-flex items-center justify-center text-sm bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-300 transition duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]"><FileTextIcon /><span className="ml-2">{t('profilePage.actionStatement')}</span></button>
                                  <button className="w-full inline-flex items-center justify-center text-sm bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-300 transition duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-red)]"><MessageSquareIcon /><span className="ml-2">{t('profilePage.actionAdvisor')}</span></button>
                             </div>
                         </div>
                    </div>

                    {/* Recent Transactions Table */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-6 inline-flex items-center"><ListIcon /><span className="ml-2">{t('profilePage.transactionsTitle')}</span></h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">{t('profilePage.thDate')}</th>
                                        <th scope="col" className="px-4 py-3">{t('profilePage.thDescription')}</th>
                                        <th scope="col" className="px-4 py-3 text-right">{t('profilePage.thAmount')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profileData.transactions.map((tx) => (
                                        <tr key={tx.id} className="bg-white border-b hover:bg-gray-50"> {/* Use unique tx.id as key */}
                                            <td className="px-4 py-3 whitespace-nowrap">{formatDate(tx.date)}</td>
                                            <td className="px-4 py-3 font-medium text-gray-900">{t(tx.descKey)}</td>
                                            <td className={`px-4 py-3 text-right font-medium ${tx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                {tx.amount < 0 ? '-' : '+'} {formatCurrency(Math.abs(tx.amount))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }

        // --- Render React Components into DOM ---
        ReactDOM.render( <AppProvider><HeaderApp /></AppProvider>, document.getElementById('react-profile-header') );
        ReactDOM.render( <AppProvider><ProfileSection /></AppProvider>, document.getElementById('react-profile-section') );

    </script>

    <script>
        // Add event listener for footer contact link if it opens the modal
        document.addEventListener('DOMContentLoaded', () => {
            const footerContact = document.getElementById('footer-contact-link');
            const contactModal = document.getElementById('advisor-modal');
            if (footerContact && contactModal && typeof openModal === 'function') { // Check if openModal exists from script.js
                footerContact.addEventListener('click', (e) => {
                    e.preventDefault();
                    openModal();
                });
            }
            // Add listener for Cookie Settings link if it opens the consent banner or a settings modal
             const cookieSettingsLink = document.getElementById('cookie-settings-link');
             const consentBanner = document.getElementById('consent-banner');
             if (cookieSettingsLink && consentBanner) {
                 cookieSettingsLink.addEventListener('click', (e) => {
                     e.preventDefault();
                     // Show the banner again if it's hidden
                     if (consentBanner.classList.contains('hidden')) {
                         consentBanner.classList.remove('hidden');
                         void consentBanner.offsetWidth; // Force reflow
                         consentBanner.classList.add('show');
                     }
                     // Optional: Scroll to the banner
                     // consentBanner.scrollIntoView({ behavior: 'smooth' });
                 });
             }
        });
    </script>

</body>
</html>
