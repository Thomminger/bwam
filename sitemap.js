/**
 * BWAM Website Sitemap Configuration for Salesforce Interactions SDK
 * Optimized for BWAM's specific website structure and navigation
 *
 * This configuration aligns page views and click interactions with the
 * provided Salesforce Data Cloud schema, ensuring relevant data
 * is captured for 'catalog', 'identity', 'partyIdentification', and 'consentLog'
 * data streams, among others.
 */

console.log('BWAM Sitemap Configuration Loading...');

// --- Sitemap Configuration ---
const sitemapConfig = {
    global: {
        // onActionEvent is a global hook that allows you to modify any event
        // before it is sent to Salesforce Interactions.
        onActionEvent: (event) => {
            // Add language information and timestamp to all events
            event.user = {
                ...event.user,
                attributes: {
                    ...event.user?.attributes,
                    language: document.documentElement.lang || 'en', // Capture current page language
                    timestamp: new Date().toISOString() // Add a consistent timestamp
                }
            };
            console.log("Sitemap Global Action:", event.interaction.name, event.interaction.attributes);
            return event;
        }
    },

    // pageTypes define how different pages on your website are categorized
    // and what interactions are recorded when a user views them.
    pageTypes: [
        // Main Sections - These are general page views
        {
            name: "Homepage",
            isMatch: () => {
                const h = window.location.hash.substring(1);
                return h === "" || h === "home";
            },
            interaction: {
                name: "View Page" // Generic interaction for general page views
            },
            attributes: {
                pageCategory: "General Banking",
                section: "home"
            }
        },
        {
            name: "Private Clients",
            isMatch: () => window.location.hash === "#private-clients",
            interaction: {
                name: "View Page"
            },
            attributes: {
                pageCategory: "Private Banking",
                section: "private-clients"
            }
        },
        {
            name: "Business Clients",
            isMatch: () => window.location.hash === "#business-clients",
            interaction: {
                name: "View Page"
            },
            attributes: {
                pageCategory: "Business Banking",
                section: "business-clients"
            }
        },
        {
            name: "Institutional",
            isMatch: () => window.location.hash === "#institutional",
            interaction: {
                name: "View Page"
            },
            attributes: {
                pageCategory: "Institutional Banking",
                section: "institutional"
            }
        },
        {
            name: "About Us",
            isMatch: () => window.location.hash === "#about-us",
            interaction: {
                name: "View Page"
            },
            attributes: {
                pageCategory: "Company Information",
                section: "about-us"
            }
        },
        {
            name: "Events",
            isMatch: () => window.location.hash === "#events",
            interaction: {
                name: "View Page"
            },
            attributes: {
                pageCategory: "Events & Community",
                section: "events"
            }
        },
        {
            name: "News",
            isMatch: () => window.location.hash === "#news",
            interaction: {
                name: "View Page"
            },
            attributes: {
                pageCategory: "News & Insights",
                section: "news"
            }
        },

        // Service Detail Pages - These are specific "catalog items" (services)
        // and are mapped to the 'catalog' data stream in your schema.
        {
            name: "Service Detail - Accounts & Cards",
            isMatch: () => window.location.hash === "#accounts-cards",
            interaction: {
                name: "View Catalog", // Aligns with schema.json 'catalog' developerName interactionName field
                attributes: {
                    id: "accounts-cards", // Maps to catalog.id (unique ID for this service)
                    type: "Service", // Maps to catalog.type (e.g., "Service", "Product", "Article")
                    category: "Accounts & Cards", // Maps to catalog.category
                    interactionName: "View Service Detail - Accounts & Cards" // More descriptive for reporting
                }
            },
            attributes: { // Additional attributes for the pageType itself
                pageCategory: "Accounts & Cards",
                serviceKey: "accounts-cards",
                section: "services"
            }
        },
        {
            name: "Service Detail - Investing",
            isMatch: () => window.location.hash === "#investing",
            interaction: {
                name: "View Catalog",
                attributes: {
                    id: "investing",
                    type: "Service",
                    category: "Investing",
                    interactionName: "View Service Detail - Investing"
                }
            },
            attributes: {
                pageCategory: "Investing",
                serviceKey: "investing",
                section: "services"
            }
        },
        {
            name: "Service Detail - Pensions",
            isMatch: () => window.location.hash === "#pensions",
            interaction: {
                name: "View Catalog",
                attributes: {
                    id: "pensions",
                    type: "Service",
                    category: "Pensions",
                    interactionName: "View Service Detail - Pensions"
                }
            },
            attributes: {
                pageCategory: "Pensions",
                serviceKey: "pensions",
                section: "services"
            }
        },
        {
            name: "Service Detail - Financing",
            isMatch: () => window.location.hash === "#financing",
            interaction: {
                name: "View Catalog",
                attributes: {
                    id: "financing",
                    type: "Service",
                    category: "Financing",
                    interactionName: "View Service Detail - Financing"
                }
            },
            attributes: {
                pageCategory: "Financing",
                serviceKey: "financing",
                section: "services"
            }
        },
        // Business Client Service Detail Pages (also mapped to Catalog Data Stream)
        {
            name: "Service Detail - Corporate Accounts",
            isMatch: () => window.location.hash === "#corporate-accounts",
            interaction: {
                name: "View Catalog",
                attributes: {
                    id: "corporate-accounts",
                    type: "Service",
                    category: "Business Banking",
                    interactionName: "View Service Detail - Corporate Accounts"
                }
            },
            attributes: {
                pageCategory: "Business Banking",
                serviceKey: "corporate-accounts",
                section: "services"
            }
        },
        {
            name: "Service Detail - Business Financing",
            isMatch: () => window.location.hash === "#business-financing",
            interaction: {
                name: "View Catalog",
                attributes: {
                    id: "business-financing",
                    type: "Service",
                    category: "Business Banking",
                    interactionName: "View Service Detail - Business Financing"
                }
            },
            attributes: {
                pageCategory: "Business Banking",
                serviceKey: "business-financing",
                section: "services"
            }
        },
        {
            name: "Service Detail - Cash Management",
            isMatch: () => window.location.hash === "#cash-management",
            interaction: {
                name: "View Catalog",
                attributes: {
                    id: "cash-management",
                    type: "Service",
                    category: "Business Banking",
                    interactionName: "View Service Detail - Cash Management"
                }
            },
            attributes: {
                pageCategory: "Business Banking",
                serviceKey: "cash-management",
                section: "services"
            }
        },

        // Fallback for any other page not explicitly matched
        {
            name: "Other",
            isMatch: () => true,
            interaction: {
                name: "View Page"
            },
            attributes: {
                pageCategory: "General Banking",
                section: "other"
            }
        }
    ]
};

// --- Helper function to send Salesforce Interactions events ---
// This centralizes event sending and ensures consistency.
const sendInteractionEvent = (interactionName, attributes = {}, userAttributes = {}) => {
    if (typeof SalesforceInteractions !== 'undefined') {
        SalesforceInteractions.sendEvent({
            interaction: {
                name: interactionName,
                attributes: attributes
            },
            user: {
                attributes: userAttributes
            }
            // deviceId, eventId, sessionId, dateTime are typically handled by the SDK globally or automatically
        });
    } else {
        console.warn("SalesforceInteractions SDK not available for sending event:", interactionName);
    }
};

// --- Click Action Mappings ---
// Defines specific click interactions and their corresponding event data.
const actionMappingClicks = {
    // Navigation Actions
    "Clicked Private Clients": {
        selector: '[data-lang-key="nav.private_clients"]',
        callback: () => sendInteractionEvent("Clicked Navigation Link", {
            linkName: "Private Clients",
            category: "Navigation"
        })
    },
    "Clicked Business Clients": {
        selector: '[data-lang-key="nav.business_clients"]',
        callback: () => sendInteractionEvent("Clicked Navigation Link", {
            linkName: "Business Clients",
            category: "Navigation"
        })
    },
    "Clicked Institutional": {
        selector: '[data-lang-key="nav.institutional"]',
        callback: () => sendInteractionEvent("Clicked Navigation Link", {
            linkName: "Institutional",
            category: "Navigation"
        })
    },
    "Clicked About Us": {
        selector: '[data-lang-key="nav.about_us"]',
        callback: () => sendInteractionEvent("Clicked Navigation Link", {
            linkName: "About Us",
            category: "Navigation"
        })
    },
    "Clicked Events": {
        selector: '[data-lang-key="nav.events"]',
        callback: () => sendInteractionEvent("Clicked Navigation Link", {
            linkName: "Events",
            category: "Navigation"
        })
    },

    // Service Actions (direct links from navigation or service cards)
    "Clicked Accounts & Cards": {
        selector: '[data-lang-key="nav.accounts_cards"]',
        callback: () => sendInteractionEvent("Clicked Service Link", {
            serviceName: "Accounts & Cards",
            category: "Engagement",
            catalogObjectId: "accounts-cards", // Matches catalog.id for this service
            catalogObjectType: "Service" // Matches catalog.type
        })
    },
    "Clicked Investing": {
        selector: '[data-lang-key="nav.investing"]',
        callback: () => sendInteractionEvent("Clicked Service Link", {
            serviceName: "Investing",
            category: "Engagement",
            catalogObjectId: "investing",
            catalogObjectType: "Service"
        })
    },
    "Clicked Pensions": {
        selector: '[data-lang-key="nav.pensions"]',
        callback: () => sendInteractionEvent("Clicked Service Link", {
            serviceName: "Pensions",
            category: "Engagement",
            catalogObjectId: "pensions",
            catalogObjectType: "Service"
        })
    },
    "Clicked Financing": {
        selector: '[data-lang-key="nav.financing"]',
        callback: () => sendInteractionEvent("Clicked Service Link", {
            serviceName: "Financing",
            category: "Engagement",
            catalogObjectId: "financing",
            catalogObjectType: "Service"
        })
    },
    "Clicked Corporate Accounts Card": {
        selector: 'a[href="#corporate-accounts"].service-card', // Targeting the service card specifically
        callback: () => sendInteractionEvent("Clicked Service Link", {
            serviceName: "Corporate Accounts",
            category: "Engagement",
            catalogObjectId: "corporate-accounts",
            catalogObjectType: "Service"
        })
    },
    "Clicked Business Financing Card": {
        selector: 'a[href="#business-financing"].service-card',
        callback: () => sendInteractionEvent("Clicked Service Link", {
            serviceName: "Business Financing",
            category: "Engagement",
            catalogObjectId: "business-financing",
            catalogObjectType: "Service"
        })
    },
    "Clicked Cash Management Card": {
        selector: 'a[href="#cash-management"].service-card',
        callback: () => sendInteractionEvent("Clicked Service Link", {
            serviceName: "Cash Management",
            category: "Engagement",
            catalogObjectId: "cash-management",
            catalogObjectType: "Service"
        })
    },

    // CTA Actions (Call To Action buttons)
    "Clicked Hero CTA - Explore Services": {
        selector: '[data-lang-key="hero.button_services"]',
        callback: () => sendInteractionEvent("Clicked CTA", {
            ctaName: "Explore Services (Hero Section)",
            category: "Call To Action"
        })
    },
    "Clicked Hero CTA - Contact Us": {
        selector: '[data-lang-key="hero.button_contact"]',
        callback: () => sendInteractionEvent("Clicked CTA", {
            ctaName: "Contact Us (Hero Section)",
            category: "Call To Action",
            // This button opens the advisor modal, so we can also log that interaction
            interactionName: "Open Advisor Modal"
        })
    },
    "Clicked News Read More": {
        selector: '#news [data-lang-key="news.read_more"]',
        callback: (event) => {
            // Attempt to get the title of the news article from the parent element
            const articleTitleElement = event.target.closest('.flex-col')?.querySelector('h3');
            const articleTitle = articleTitleElement ? articleTitleElement.innerText : 'Unknown News Article';
            sendInteractionEvent("Clicked Read More", {
                articleTitle: articleTitle,
                category: "Content Interaction"
            });
        }
    },
    "Clicked Contact CTA - Find Advisor": {
        selector: '#contact [data-lang-key="contact_cta.button"]',
        callback: () => sendInteractionEvent("Clicked CTA", {
            ctaName: "Find Advisor (Contact CTA)",
            category: "Call To Action",
            interactionName: "Open Advisor Modal"
        })
    },
    "Clicked Events - Event Details": {
        selector: '[data-lang-key="events.future_wealth_button"]',
        callback: (event) => {
            const eventTitleElement = event.target.closest('.bg-white')?.querySelector('h4');
            const eventTitle = eventTitleElement ? eventTitleElement.innerText : 'Unknown Event';
            sendInteractionEvent("Clicked Event Details", {
                eventName: eventTitle,
                category: "Events",
                linkType: "External"
            });
        }
    },
    "Clicked Events - Register": {
        selector: '[data-lang-key="events.button_register"]',
        callback: (event) => {
            const eventTitleElement = event.target.closest('.bg-white')?.querySelector('h4');
            const eventTitle = eventTitleElement ? eventTitleElement.innerText : 'Unknown Event';
            sendInteractionEvent("Clicked Event Registration", {
                eventName: eventTitle,
                category: "Events",
                formType: "Registration"
            });
        }
    },
    "Clicked More News": {
        selector: '[data-lang-key="news.more_news"]',
        callback: () => sendInteractionEvent("Clicked More News", {
            category: "Content Interaction"
        })
    },
    "Clicked Open Account Button": {
        selector: '[data-lang-key="accounts.button_open"]',
        callback: () => sendInteractionEvent("Clicked CTA", {
            ctaName: "Open Account",
            category: "Application Start",
            service: "Accounts & Cards"
        })
    },
    "Clicked Learn More Pensions": {
        selector: '[data-lang-key="pensions.button_learn"]',
        callback: () => sendInteractionEvent("Clicked CTA", {
            ctaName: "Learn More Pensions",
            category: "Information Request",
            service: "Pensions"
        })
    },
    "Clicked Contact Sales Corporate Accounts": {
        selector: '[data-lang-key="corporate_accounts.button_contact"]',
        callback: () => sendInteractionEvent("Clicked CTA", {
            ctaName: "Contact Sales (Corporate Accounts)",
            category: "Information Request",
            service: "Corporate Accounts"
        })
    },
    "Clicked Explore Tools Cash Management": {
        selector: '[data-lang-key="cash_management.button_explore"]',
        callback: () => sendInteractionEvent("Clicked CTA", {
            ctaName: "Explore Tools (Cash Management)",
            category: "Information Request",
            service: "Cash Management"
        })
    },


    // Authentication Actions
    // The actual SalesforceInteractions.identify and sendEvent for Identity/PartyIdentification
    // are handled by the React component's login/logout logic, but we can still track the button clicks.
    "Clicked Login Button (Form)": {
        selector: '#login-form button[type="submit"]',
        callback: () => sendInteractionEvent("Clicked Login Button", {
            category: "Authentication",
            interactionType: "Form Submission"
        })
    },
    "Clicked Logout Button": {
        selector: '#logout-button',
        callback: (event) => {
            // Get the current user ID/email from local storage or React state if available
            const currentUser = localStorage.getItem('bwamUser') ? JSON.parse(localStorage.getItem('bwamUser')).email : null;
            if (currentUser) {
                // Call the global handler for logout event
                handleLogout(currentUser);
            }
            sendInteractionEvent("Clicked Logout Button", {
                category: "Authentication"
            });
        }
    },

    // Language Actions
    // These are handled by the React component's changeLanguage, but we can add a click listener for redundancy
    "Changed Language - EN": {
        selector: '.language-switcher button:first-child', // Assuming EN is the first button
        callback: () => sendInteractionEvent("Changed Language", {
            newLanguage: "en",
            category: "User Preference"
        })
    },
    "Changed Language - DE": {
        selector: '.language-switcher button:nth-child(3)', // Assuming DE is the second button
        callback: () => sendInteractionEvent("Changed Language", {
            newLanguage: "de",
            category: "User Preference"
        })
    },
    "Changed Language - FR": {
        selector: '.language-switcher button:last-child', // Assuming FR is the third button
        callback: () => sendInteractionEvent("Changed Language", {
            newLanguage: "fr",
            category: "User Preference"
        })
    },

    // Mobile Menu Actions
    "Opened Mobile Menu": {
        selector: '#mobile-menu-button',
        callback: () => sendInteractionEvent("Opened Mobile Menu", {
            category: "UI Interaction"
        })
    },
    "Closed Mobile Menu": {
        selector: '#mobile-menu-close',
        callback: () => sendInteractionEvent("Closed Mobile Menu", {
            category: "UI Interaction"
        })
    },

    // Consent Actions (newly added to map to 'consentLog' schema)
    "Consent Accepted": {
        selector: '#consent-accept',
        callback: () => sendInteractionEvent("Consent Action", {
            category: "Engagement", // From schema
            eventType: "Consent", // Custom eventType for context
            status: "Accepted", // Maps to consentLog.status
            provider: "BWAM Website", // Name of your consent management provider
            purpose: "All" // Purpose of consent (e.g., "All", "Marketing", "Analytics")
        })
    },
    "Consent Rejected": {
        selector: '#consent-reject',
        callback: () => sendInteractionEvent("Consent Action", {
            category: "Engagement", // From schema
            eventType: "Consent", // Custom eventType
            status: "Rejected", // Maps to consentLog.status
            provider: "BWAM Website",
            purpose: "All"
        })
    },
    "Clicked Cookie Settings Link": {
        selector: '#cookie-settings-link',
        callback: () => sendInteractionEvent("Clicked Link", {
            linkName: "Cookie Settings",
            category: "User Preference",
            interactionName: "Open Cookie Settings"
        })
    }
};

// --- User Identification Functions ---
// These functions are called by other parts of your application (e.g., React components)
// to trigger Salesforce Interactions SDK's identify and event sending.
const handleSuccessfulLogin = (userId, email) => {
    if (typeof SalesforceInteractions !== 'undefined') {
        // 1. Identify the user with Salesforce Interactions SDK
        // This links the current anonymous session to a known user profile.
        SalesforceInteractions.identify({
            userId: userId, // Primary identifier for the user
            email: email, // Email is also a strong identifier
            attributes: {
                lastLogin: new Date().toISOString(), // Custom attribute
                loginMethod: 'website' // Custom attribute
            }
        });

        // 2. Send an Identity event (maps to 'identity' record in schema)
        // This records the fact that a user has logged in.
        SalesforceInteractions.sendEvent({
            interaction: {
                name: "Login", // Interaction name
                attributes: {
                    category: "Profile", // Maps to identity.category
                    eventType: "Login", // Maps to identity.eventType
                    isAnonymous: "false" // User is no longer anonymous
                    // deviceId, eventId, sessionId, dateTime are handled by SDK or global onActionEvent
                }
            },
            user: {
                id: userId, // Ensure userId is passed with the event
                email: email // Ensure email is passed with the event
            }
        });

        // 3. Send a Party Identification event (maps to 'partyIdentification' record in schema)
        // This records the specific identifier used for login (e.g., email).
        SalesforceInteractions.sendEvent({
            interaction: {
                name: "User Identified", // Interaction name
                attributes: {
                    category: "Profile", // Maps to partyIdentification.category
                    eventType: "Identification", // Maps to partyIdentification.eventType
                    IDName: email, // Maps to partyIdentification.IDName (the email itself)
                    IDType: "Email" // Maps to partyIdentification.IDType (e.g., "Email", "CustomerID")
                    // deviceId, eventId, sessionId, dateTime are handled by SDK or global onActionEvent
                }
            },
            user: {
                id: userId // Ensure userId is passed with the event
            }
        });
        console.log(`User identified and login events sent for: ${email}`);
    } else {
        console.warn("SalesforceInteractions SDK not available for login tracking.");
    }
};

// Handle Logout Event (maps to 'identity' and 'partyIdentification' changes)
const handleLogout = (userId) => {
    if (typeof SalesforceInteractions !== 'undefined') {
        // Send a Logout event (maps to 'identity' record in schema)
        SalesforceInteractions.sendEvent({
            interaction: {
                name: "Logout", // Interaction name
                attributes: {
                    category: "Profile", // Maps to identity.category
                    eventType: "Logout", // Maps to identity.eventType
                    isAnonymous: "true" // User becomes anonymous after logout
                }
            },
            user: {
                id: userId // User who logged out
            }
        });

        // Anonymize the user in the SDK after logout.
        // This clears the user's profile context in the SDK.
        SalesforceInteractions.anonimizeUser();

        console.log(`User logged out and logout event sent for: ${userId}`);
    } else {
        console.warn("SalesforceInteractions SDK not available for logout tracking.");
    }
};


// --- Initialize Sitemap and Register Event Listeners ---
// This block ensures the sitemap is initialized and all defined click actions
// have their event listeners attached to the DOM elements.
if (typeof SalesforceInteractions !== 'undefined' && typeof SalesforceInteractions.initSitemap === 'function') {
    SalesforceInteractions.initSitemap(sitemapConfig);

    // Register click handlers for action mappings after sitemap is initialized
    // This loops through all defined actions and attaches event listeners.
    Object.entries(actionMappingClicks).forEach(([actionName, config]) => {
        const elements = document.querySelectorAll(config.selector);
        if (elements.length > 0) {
            elements.forEach(element => {
                element.addEventListener('click', (event) => {
                    console.log(`Action: "${actionName}" clicked! Selector: "${config.selector}"`);
                    if (config.callback) {
                        config.callback(event); // Execute the specific callback for this action
                    } else {
                        // Fallback: if no specific callback, send a generic interaction event
                        sendInteractionEvent(actionName, {
                            category: "UI Interaction",
                            selector: config.selector
                        });
                    }
                });
            });
        } else {
            console.warn(`No elements found for selector: "${config.selector}" for action: "${actionName}"`);
        }
    });

    console.log("BWAM Sitemap Initialized and Click Listeners Registered");
} else {
    console.error("SalesforceInteractions SDK not available. Retrying initialization...");
    // Retry initialization after a short delay if SDK is not immediately available
    setTimeout(() => {
        if (typeof SalesforceInteractions !== 'undefined' && typeof SalesforceInteractions.initSitemap === 'function') {
            SalesforceInteractions.initSitemap(sitemapConfig);
            // Re-register click handlers on successful retry
            Object.entries(actionMappingClicks).forEach(([actionName, config]) => {
                const elements = document.querySelectorAll(config.selector);
                if (elements.length > 0) {
                    elements.forEach(element => {
                        element.addEventListener('click', (event) => {
                            console.log(`Action: "${actionName}" clicked! (Retry) Selector: "${config.selector}"`);
                            if (config.callback) {
                                config.callback(event);
                            } else {
                                sendInteractionEvent(actionName, {
                                    category: "UI Interaction",
                                    selector: config.selector
                                });
                            }
                        });
                    });
                }
            });
            console.log("BWAM Sitemap Initialized (Retry) and Click Listeners Registered");
        } else {
            console.error("Failed to initialize BWAM Sitemap after retry. SalesforceInteractions SDK still not available.");
        }
    }, 2000); // Retry after 2 seconds
}

// --- Expose functions to the global window object for other scripts (e.g., React) to use ---
// This allows your React components to trigger specific tracking events.
window.bwamDataLayer = window.bwamDataLayer || {};
window.bwamDataLayer.trackLoginSuccess = handleSuccessfulLogin;
window.bwamDataLayer.trackLogout = handleLogout; // Expose logout handler as well

// Example of how to call from React:
// import { useContext, useEffect } from 'react';
// import { AppContext } from './AppContext'; // Assuming AppContext is defined
//
// const { user, logout } = useContext(AppContext);
//
// const handleLogoutClick = () => {
//   logout(); // Update React state
//   if (window.bwamDataLayer && typeof window.bwamDataLayer.trackLogout === 'function') {
//     window.bwamDataLayer.trackLogout(user.email); // Trigger Salesforce tracking
//   }
// };


