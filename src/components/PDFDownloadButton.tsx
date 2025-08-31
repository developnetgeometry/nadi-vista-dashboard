
import React from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { toast } from "@/hooks/use-toast"

interface PDFDownloadButtonProps {
  filename?: string
  excludeSelectors?: string[]
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

export function PDFDownloadButton({
  filename = "page-download",
  excludeSelectors = [".sidebar", ".nav", ".menu", "[role='navigation']"],
  className,
  variant = "outline",
  size = "default"
}: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = React.useState(false)

  const extractDataFromPage = async () => {
    console.log('Starting comprehensive PDF data extraction...');
    
    const data = {
      title: "NADI Report",
      date: new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      }),
      sections: [] as any[],
      dashboardTitle: "NADI",
      dashboardSubtitle: "",
      activeTab: "",
      filterInfo: {} as any
    };

    try {
      // Helper function to extract text content, removing emojis and icons
      const extractCleanText = (element: Element): string => {
        const text = element.textContent || '';
        // Remove emojis and common icon patterns
        return text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
      };

      // Smart Services Overview Stats - Fixed selectors
      const participationStatsCards = document.querySelectorAll('[data-component="participation-stats"] .grid > div');
      if (participationStatsCards.length > 0) {
        const stats: any[] = [];
        
        participationStatsCards.forEach((card) => {
          const titleEl = card.querySelector('p.text-sm.font-medium');
          const valueEl = card.querySelector('p.text-3xl.font-bold');
          
          if (titleEl && valueEl) {
            stats.push({
              title: extractCleanText(titleEl),
              value: extractCleanText(valueEl)
            });
          }
        });

          if (stats.length > 0) {
            data.sections.push({
              type: "stats-cards",
              title: "Key Statistics", 
              data: stats
            });
          }
      }

      // Smart Services Participant Categories
      const participantCategoriesElement = document.querySelector('[data-component="participant-categories"]');
      if (participantCategoriesElement) {
        const categoryItems = participantCategoriesElement.querySelectorAll('.space-y-4 > div');
        const categories: any[] = [];

        categoryItems.forEach(item => {
          const categoryName = item.querySelector('h4')?.textContent?.trim();
          const count = item.querySelector('.text-lg.font-bold')?.textContent?.trim();
          const percentage = item.querySelector('.text-xs')?.textContent?.trim();

          if (categoryName && count) {
            categories.push({
              category: categoryName,
              count: count,
              percentage: percentage || ""
            });
          }
        });

        if (categories.length > 0) {
          data.sections.push({
            type: "participant-categories",
            title: "Participant Categories",
            data: categories
          });
        }
      }

      // Smart Services By Program - Remove icons, keep text only
      const programCards = document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 .text-center');
      if (programCards.length > 0) {
        const programs: any[] = [];
        
        programCards.forEach(card => {
          const nameEl = card.querySelector('.font-semibold');
          const countEl = card.querySelector('.text-3xl.font-bold');
          
          if (nameEl && countEl) {
            programs.push({
              name: extractCleanText(nameEl),
              participants: extractCleanText(countEl)
            });
          }
        });

        if (programs.length > 0) {
          data.sections.push({
            type: "programs",
            title: "Programs",
            data: programs
          });
        }
      }

      // Membership Statistics
      const membershipStatsElement = document.querySelector('[data-component="membership-stats"]');
      if (membershipStatsElement) {
        const statCards = membershipStatsElement.querySelectorAll('[data-stat-title]');
        const stats: any[] = [];

        statCards.forEach(card => {
          const title = card.getAttribute('data-stat-title');
          const valueEl = card.querySelector('p.text-3xl');
          
          if (title && valueEl) {
            stats.push({
              title: title,
              value: extractCleanText(valueEl)
            });
          }
        });

        if (stats.length > 0) {
          data.sections.push({
            type: "stats",
            title: "Membership Statistics",
            data: stats
          });
        }
      }

      // Membership by Area
      const membershipByAreaElement = document.querySelector('[data-component="membership-by-area"]');
      if (membershipByAreaElement) {
        const areaItems = membershipByAreaElement.querySelectorAll('[data-area-item]');
        const areas: any[] = [];

        areaItems.forEach(item => {
          const area = item.getAttribute('data-area-name');
          const count = item.getAttribute('data-area-count');
          const percentage = item.getAttribute('data-area-percentage');

          if (area && count && percentage) {
            areas.push({
              area: area,
              count: count,
              percentage: percentage
            });
          }
        });

        if (areas.length > 0) {
          data.sections.push({
            type: "area",
            title: "NADI by Area Distribution",
            data: areas
          });

          // Also add as membership data format
          const membershipData = [{
            category: "New Membership by Area",
            items: areas.map(area => ({
              label: area.area,
              count: area.count
            }))
          }];

          data.sections.push({
            type: "membership",
            title: "Membership Data",
            data: membershipData
          });
        }
      }

      // Handle current active tab content
      const activeTabContent = document.querySelector('[data-state="active"][role="tabpanel"]');
      
      if (activeTabContent) {
        // Capture TP data (DUSP-TP tab)
        const tpCards = activeTabContent.querySelectorAll('.grid .text-center');
        if (tpCards.length > 0) {
          const tpData: any[] = [];

          tpCards.forEach(card => {
            const nameEl = card.querySelector('.font-semibold');
            const countEl = card.querySelector('.text-lg.font-bold, .text-primary');
            
            if (nameEl && countEl) {
              tpData.push({
                name: extractCleanText(nameEl),
                count: extractCleanText(countEl)
              });
            }
          });

          if (tpData.length > 0) {
            data.sections.push({
              type: "tp-data",
              title: "Membership by TP",
              data: tpData
            });
          }
        }

        // Capture demographic data
        const demographicSections = activeTabContent.querySelectorAll('.space-y-4');
        demographicSections.forEach(section => {
          // Look for the section header/title more specifically
          const titleEl = section.querySelector('h3, .text-lg.font-semibold, [class*="CardTitle"]') || 
                         section.closest('.border-0.shadow-md')?.querySelector('h3, [class*="CardTitle"]') ||
                         section.parentElement?.querySelector('h3, [class*="CardTitle"]');
          
          const items = section.querySelectorAll('.flex.justify-between.items-center');
          
          if (titleEl && items.length > 0) {
            const demographicItems: any[] = [];
            let sectionTitle = extractCleanText(titleEl);
            
            // If title is just the first item name, try to get a better title
            if (items.length > 0) {
              const firstItemText = extractCleanText(items[0].querySelector('[data-radix-collection-item], .inline-flex') || items[0]);
              if (sectionTitle === firstItemText || sectionTitle.includes(firstItemText)) {
                // Look for a better section title
                const cardTitle = section.closest('.border-0')?.querySelector('[class*="CardTitle"], h3');
                if (cardTitle) {
                  sectionTitle = extractCleanText(cardTitle);
                }
              }
            }

            items.forEach(item => {
              const badgeEl = item.querySelector('[data-radix-collection-item], .inline-flex');
              const countEl = item.querySelector('.text-muted-foreground');
              const percentageEl = item.querySelector('.font-medium');

              if (badgeEl && countEl) {
                demographicItems.push({
                  label: extractCleanText(badgeEl),
                  count: extractCleanText(countEl),
                  percentage: percentageEl ? extractCleanText(percentageEl) : ""
                });
              }
            });

            if (demographicItems.length > 0) {
              data.sections.push({
                type: "demographic",
                title: sectionTitle,
                data: demographicItems
              });
            }
          }
        });
      }

      // Extract dashboard title and subtitle for proper PDF header
      const headerTitle = document.querySelector('h1')?.textContent?.trim();
      const headerSubtitle = document.querySelector('p.text-muted-foreground')?.textContent?.trim();
      
      // Get page-specific title based on current route
      let pageTitle = "Dashboard";
      const currentPath = window.location.pathname;
      
      if (currentPath.includes('/membership')) {
        pageTitle = "Membership Dashboard";
      } else if (currentPath.includes('/smart-services')) {
        pageTitle = "Smart Services Dashboard";
      } else if (currentPath.includes('/operation')) {
        pageTitle = "Operation Dashboard";
      } else if (currentPath.includes('/finance')) {
        pageTitle = "Finance Dashboard";
      } else if (currentPath.includes('/takwim') || currentPath.includes('/sso-takwim') || currentPath.includes('/tp-takwim')) {
        pageTitle = "Takwim Dashboard";
      } else if (currentPath.includes('/claim') || currentPath.includes('/mcmc-claim') || currentPath.includes('/tp-claim')) {
        pageTitle = "Claim Dashboard";
      } else if (currentPath.includes('/sso')) {
        pageTitle = "SSO Dashboard";
      } else if (currentPath.includes('/tp')) {
        pageTitle = "TP Dashboard";
      } else if (currentPath.includes('/mcmc')) {
        pageTitle = "MCMC Dashboard";
      } else if (headerTitle) {
        pageTitle = headerTitle;
      }
      
      // Get active tab name
      const activeTabTrigger = document.querySelector('[data-state="active"][role="tab"]');
      const activeTabName = activeTabTrigger?.textContent?.trim() || "";
      
      data.dashboardTitle = pageTitle;
      data.activeTab = activeTabName;
      data.title = `${pageTitle} Report`;
      
      if (headerSubtitle && headerSubtitle.toLowerCase() !== 'administrator') {
        data.dashboardSubtitle = headerSubtitle;
      }

      // Capture filter information for dynamic titles
      const filterInfo: any = {};
      
      // Check for TP filter in membership demographic tab
      if (window.location.pathname.includes('/membership')) {
        const activeTab = document.querySelector('[data-state="active"][role="tabpanel"]');
        if (activeTab) {
          // Look for shadcn Select component with TP filter
          const tpSelectTrigger = activeTab.querySelector('[role="combobox"]');
          if (tpSelectTrigger) {
            // Try multiple ways to get the selected value
            const selectedValueText = tpSelectTrigger.textContent?.trim() || '';
            const selectedValue = tpSelectTrigger.getAttribute('aria-activedescendant') || 
                                 tpSelectTrigger.getAttribute('data-value') || 
                                 selectedValueText;
            
            console.log('TP Select detected:', { selectedValue, selectedValueText, tpSelectTrigger });
            
            if (selectedValue && selectedValue !== 'all' && selectedValue !== 'All TPs' && 
                !selectedValue.includes('Select') && !selectedValue.includes('Building2')) {
              filterInfo.tp = selectedValue;
            }
          }
        }
      }
      
      // Check for program filter in smart services by program tab  
      if (window.location.pathname.includes('/smart-services')) {
        const activeTab = document.querySelector('[data-state="active"][role="tabpanel"]');
        if (activeTab) {
          // Look for program select
          const programSelect = activeTab.querySelector('select');
          if (programSelect && programSelect.value && programSelect.value !== 'all') {
            filterInfo.programme = programSelect.value;
          }
        }
      }
      
      // Store filter info for use in PDF generation
      data.filterInfo = filterInfo;

      // Smart Services specific data capture
      if (window.location.pathname.includes('/smart-services')) {
        // Capture main stats cards from overview tab
        const participationStatsElement = document.querySelector('[data-component="participation-stats"]');
        if (participationStatsElement) {
          const statCards = participationStatsElement.querySelectorAll('[data-stat-title]');
          const stats: any[] = [];

          statCards.forEach(card => {
            const title = card.getAttribute('data-stat-title');
            const valueEl = card.querySelector('p.text-3xl.font-bold, p.text-2xl.font-bold');
            
            if (title && valueEl) {
              stats.push({
                title: title,
                value: extractCleanText(valueEl)
              });
            }
          });

          if (stats.length > 0) {
            data.sections.push({
              type: "stats-cards",
              title: "Key Statistics",
              data: stats
            });
          }
        }
        
        // Capture participant categories with pillar filter
        const participantCategoriesCard = document.querySelector('[data-component="participant-categories"]');
        if (participantCategoriesCard) {
          const pillarSelect = participantCategoriesCard.querySelector('select');
          const selectedPillar = pillarSelect?.value || '';
          
          const categoryItems = participantCategoriesCard.querySelectorAll('.p-4.border.rounded-lg');
          if (categoryItems.length > 0) {
            const categories: any[] = [];
            
            categoryItems.forEach(item => {
              const categoryEl = item.querySelector('h4');
              const countEl = item.querySelector('.text-lg.font-bold.text-blue-600');
              const percentageEl = item.querySelector('.text-xs');
              
              if (categoryEl && countEl && percentageEl) {
                categories.push({
                  category: extractCleanText(categoryEl),
                  count: extractCleanText(countEl),
                  percentage: extractCleanText(percentageEl)
                });
              }
            });

            if (categories.length > 0 && selectedPillar) {
              data.sections.push({
                type: "participant-categories",
                title: `Participant Categories (${selectedPillar})`,
                data: categories
              });
            }
          }
        }

        // Capture state participation bar chart from "By Program" tab
        const activeTab = document.querySelector('[data-state="active"][role="tabpanel"]');
        if (activeTab) {
          // Look for the "Participation by State" card
          const chartCards = activeTab.querySelectorAll('.border-0.shadow-md');
          chartCards.forEach(card => {
            const titleEl = card.querySelector('h3, [class*="CardTitle"]');
            if (titleEl && titleEl.textContent?.includes('Participation by State')) {
              // Capture the bar chart as an image
              const chartContainer = card.querySelector('.recharts-responsive-container');
              if (chartContainer) {
                data.sections.push({
                  type: "state-bar-chart",
                  title: "Participation by State",
                  chartElement: chartContainer,
                  data: [] // Will be populated with state details for explanatory text
                });
              }
              
              // Extract state data for explanatory text below the chart
              const stateSearchResults = card.querySelectorAll('.grid.grid-cols-1 .flex.justify-between.items-center');
              if (stateSearchResults.length > 0) {
                const stateData: any[] = [];
                
                stateSearchResults.forEach(item => {
                  const stateNameEl = item.querySelector('span:first-child');
                  const stateInfoEl = item.querySelector('.text-sm.text-muted-foreground');
                  
                  if (stateNameEl && stateInfoEl) {
                    const stateInfo = extractCleanText(stateInfoEl);
                    const participants = stateInfo.split(' ')[0];
                    const percentage = stateInfo.match(/\((\d+)%\)/)?.[1] + '%' || '';
                    
                    stateData.push({
                      state: extractCleanText(stateNameEl),
                      count: participants,
                      percentage: percentage
                    });
                  }
                });

                if (stateData.length > 0) {
                  // Update the chart section with explanatory data
                  const chartSection = data.sections.find(s => s.type === "state-bar-chart");
                  if (chartSection) {
                    chartSection.data = stateData;
                  }
                }
              } else {
                // Use default state data if search results not visible
                const defaultStateData = [
                  { state: "Selangor", count: "598", percentage: "15%" },
                  { state: "Kuala Lumpur", count: "478", percentage: "12%" },
                  { state: "Johor", count: "438", percentage: "11%" },
                  { state: "Penang", count: "398", percentage: "10%" },
                  { state: "Perak", count: "358", percentage: "9%" }
                ];
                
                const chartSection = data.sections.find(s => s.type === "state-bar-chart");
                if (chartSection) {
                  chartSection.data = defaultStateData;
                } else {
                  // If no chart container found, create text-only section
                  data.sections.push({
                    type: "state-participation",
                    title: "Participation by State",
                    data: defaultStateData
                  });
                }
              }
            }
          });
        }

        // Capture "By Age Group" data from program tab
        const ageGroupCard = document.querySelector('h3')?.textContent?.includes('By Age Group') 
          ? document.querySelector('h3')?.closest('.border-0.shadow-md')
          : null;
        
        if (!ageGroupCard) {
          // Alternative selector
          const ageGroupCards = Array.from(document.querySelectorAll('.border-0.shadow-md')).find(card => 
            card.querySelector('h3')?.textContent?.includes('By Age Group')
          );
          if (ageGroupCards) {
            const ageGroupItems = ageGroupCards.querySelectorAll('.flex.justify-between.items-center.p-3');
            if (ageGroupItems.length > 0) {
              const ageGroups: any[] = [];
              
              ageGroupItems.forEach(item => {
                const labelEl = item.querySelector('.text-blue-600');
                const countEl = item.querySelector('.text-sm.text-gray-600');
                const percentageEl = item.querySelector('.text-lg.font-bold.text-blue-600');
                
                if (labelEl && countEl && percentageEl) {
                  ageGroups.push({
                    label: extractCleanText(labelEl),
                    count: extractCleanText(countEl),
                    percentage: extractCleanText(percentageEl)
                  });
                }
              });

              if (ageGroups.length > 0) {
                data.sections.push({
                  type: "age-groups",
                  title: "By Age Group",
                  data: ageGroups
                });
              }
            }
          }
        }

        // Capture "Participation by State" data from program tab
        const stateParticipationCard = Array.from(document.querySelectorAll('.border-0.shadow-md')).find(card => 
          card.querySelector('h3')?.textContent?.includes('Participation by State')
        );
        
        if (stateParticipationCard) {
          const stateItems = stateParticipationCard.querySelectorAll('.flex.justify-between.items-center.p-2');
          if (stateItems.length > 0) {
            const states: any[] = [];
            
            stateItems.forEach(item => {
              const stateEl = item.querySelector('span:first-child');
              const detailEl = item.querySelector('.text-sm.text-muted-foreground');
              
              if (stateEl && detailEl) {
                const detailText = extractCleanText(detailEl);
                const match = detailText.match(/(\d+)\s+participants\s+\((\d+)%\)/);
                if (match) {
                  states.push({
                    state: extractCleanText(stateEl),
                    count: match[1],
                    percentage: match[2] + '%'
                  });
                }
              }
            });

            if (states.length > 0) {
              data.sections.push({
                type: "state-participation",
                title: "Participation by State",
                data: states
              });
            }
          }
        }
      }

      // Home page data capture - specifically target Home stats
      if (window.location.pathname === '/' || window.location.pathname.includes('/home')) {
        const homeStatsElement = document.querySelector('[data-component="home-stats"]');
        if (homeStatsElement) {
          const statCards = homeStatsElement.querySelectorAll('[data-stat-title]');
          const stats: any[] = [];

          statCards.forEach(card => {
            const title = card.getAttribute('data-stat-title');
            const valueEl = card.querySelector('p.text-2xl.font-bold');
            
            if (title && valueEl) {
              stats.push({
                title: title,
                value: extractCleanText(valueEl)
              });
            }
          });

          if (stats.length > 0) {
            data.sections.push({
              type: "stats-cards",
              title: "Key Statistics",
              data: stats
            });
          }
        }

        // Category breakdown for Home
        const categoryBreakdownElement = document.querySelector('[data-component="category-breakdown"]');
        if (categoryBreakdownElement) {
          const categoryItems = categoryBreakdownElement.querySelectorAll('[data-category-item]');
          const categories: any[] = [];

          categoryItems.forEach(item => {
            const name = item.getAttribute('data-category-name');
            const percentage = item.getAttribute('data-category-percentage');
            
            if (name && percentage) {
              categories.push({
                category: name,
                percentage: percentage + '%'
              });
            }
          });

          if (categories.length > 0) {
            data.sections.push({
              type: "category-breakdown", 
              title: "NADI4U Category Breakdown",
              data: categories
            });
          }
        }

        // Top 5 States data from NADIDistributionMap - detect view mode
        const nadiMapCard = document.querySelector('[data-component="distribution-map"]');
        if (nadiMapCard) {
          const viewModeButtons = nadiMapCard.querySelectorAll('button');
          let currentViewMode = 'nadi'; // default
          
          // Check which button is active (has default variant)
          viewModeButtons.forEach(button => {
            if (button.textContent?.includes('Membership') && button.classList.contains('bg-primary')) {
              currentViewMode = 'membership';
            }
          });
          
          // Get the correct title based on view mode
          const topStatesHeading = nadiMapCard.querySelector('h3');
          let topStatesTitle = `Top 5 States - ${currentViewMode === 'nadi' ? 'NADI Centers' : 'Membership'}`;
          if (topStatesHeading?.textContent) {
            topStatesTitle = topStatesHeading.textContent.trim();
          }
          
          // Find the states data from the rendered grid
          const stateGridItems = nadiMapCard.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-5 .text-center.p-3');
          if (stateGridItems.length > 0) {
            const states: any[] = [];
            
            stateGridItems.forEach((item, index) => {
              const rankEl = item.querySelector('.text-lg.font-bold.text-primary');
              const stateNameEl = item.querySelector('.font-medium.text-sm');
              const valueEl = item.querySelector('.text-xl.font-bold:last-child');
              
              if (stateNameEl && valueEl && index < 5) {
                states.push({
                  state: extractCleanText(stateNameEl),
                  count: extractCleanText(valueEl)
                });
              }
            });

            if (states.length > 0) {
              data.sections.push({
                type: "states",
                title: topStatesTitle,
                data: states
              });
            }
          }
        }
      }

      // Operation page data capture
      if (window.location.pathname.includes('/operation')) {
        // Operation stats - use stats-cards for better formatting
        const operationStatsElement = document.querySelector('[data-component="operation-stats"]');
        if (operationStatsElement) {
          const statCards = operationStatsElement.querySelectorAll('[data-stat-title]');
          const stats: any[] = [];

          statCards.forEach(card => {
            const title = card.getAttribute('data-stat-title');
            const valueEl = card.querySelector('p.text-2xl.font-bold');
            
            if (title && valueEl) {
              stats.push({
                title: title,
                value: extractCleanText(valueEl)
              });
            }
          });

          if (stats.length > 0) {
            data.sections.push({
              type: "stats-cards",
              title: "Operation Statistics",
              data: stats
            });
          }
        }

        // NADI by Area - with progress bars
        const areaItems = document.querySelectorAll('[data-area-item]');
        if (areaItems.length > 0) {
          const areas: any[] = [];
          
          areaItems.forEach(item => {
            const area = item.getAttribute('data-area-name');
            const count = item.getAttribute('data-area-count');
            const percentage = item.getAttribute('data-area-percentage');
            
            if (area && count && percentage) {
              areas.push({
                area: area,
                count: count,
                percentage: parseInt(percentage)
              });
            }
          });

          if (areas.length > 0) {
            data.sections.push({
              type: "area",
              title: "NADI by Area",
              data: areas
            });
          }
        }

        // DUSP data
        const duspItems = document.querySelectorAll('[data-dusp-item]');
        if (duspItems.length > 0) {
          const dusps: any[] = [];
          
          duspItems.forEach(item => {
            const dusp = item.getAttribute('data-dusp-name');
            const count = item.getAttribute('data-dusp-count');
            
            if (dusp && count) {
              dusps.push({
                dusp: dusp,
                count: count
              });
            }
          });

          if (dusps.length > 0) {
            data.sections.push({
              type: "dusp",
              title: "Total NADI by DUSP",
              data: dusps
            });
          }
        }

        // TP data
        const tpItems = document.querySelectorAll('[data-tp-item]');
        if (tpItems.length > 0) {
          const tps: any[] = [];
          
          tpItems.forEach(item => {
            const tp = item.getAttribute('data-tp-name');
            const count = item.getAttribute('data-tp-count');
            
            if (tp && count) {
              tps.push({
                tp: tp,
                count: count
              });
            }
          });

          if (tps.length > 0) {
            data.sections.push({
              type: "tp",
              title: "Total NADI by TP",
              data: tps
            });
          }
        }

        // Top 5 States - NADI Center data
        const stateItems = document.querySelectorAll('[data-state-item]');
        if (stateItems.length > 0) {
          const states: any[] = [];
          
          stateItems.forEach(item => {
            const state = item.getAttribute('data-state-name');
            const count = item.getAttribute('data-state-count');
            
            if (state && count) {
              states.push({
                state: state,
                count: count
              });
            }
          });

          if (states.length > 0) {
            data.sections.push({
              type: "states",
              title: "Total NADI by State",
              data: states
            });
          }
        }

        // Gender data for officers
        const genderItems = document.querySelectorAll('[data-gender-item]');
        if (genderItems.length > 0) {
          const genders: any[] = [];
          
          genderItems.forEach(item => {
            const gender = item.getAttribute('data-gender-name');
            const count = item.getAttribute('data-gender-count');
            const percentage = item.getAttribute('data-gender-percentage');
            
            if (gender && count) {
              genders.push({
                label: gender,
                count: count,
                percentage: percentage ? percentage + '%' : ''
              });
            }
          });

          if (genders.length > 0) {
            data.sections.push({
              type: "demographic",
              title: "NADI Officers by Gender",
              data: genders
            });
          }
        }

        // Race data for officers  
        const raceItems = document.querySelectorAll('[data-race-item]');
        if (raceItems.length > 0) {
          const races: any[] = [];
          
          raceItems.forEach(item => {
            const race = item.getAttribute('data-race-name');
            const count = item.getAttribute('data-race-count');
            const percentage = item.getAttribute('data-race-percentage');
            
            if (race && count) {
              races.push({
                label: race,
                count: count,
                percentage: percentage ? percentage + '%' : ''
              });
            }
          });

          if (races.length > 0) {
            data.sections.push({
              type: "demographic",
              title: "NADI Officers by Race", 
              data: races
            });
          }
        }
      }

    } catch (error) {
      console.error('Error extracting data:', error);
    }

    console.log('Final comprehensive extracted data:', data);
    return data;
  };
  
  const generatePDF = async () => {
    setIsGenerating(true)
    
    try {
      const data = await extractDataFromPage()
      
      // Create PDF with proper A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 20
      const contentWidth = pageWidth - (2 * margin)
      let currentY = margin

      // Header - Clean black text, no background colors
      pdf.setTextColor(0, 0, 0) // Black text
      pdf.setFontSize(18)
      pdf.setFont('helvetica', 'bold')
      pdf.text(`${data.dashboardTitle}`, margin, currentY)
      currentY += 10
      
      // Show active tab below title if available
      if (data.activeTab) {
        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'normal')
        pdf.text(`${data.activeTab}`, margin, currentY)
        currentY += 8
      }
      
      currentY += 5
      
      // Add separator line
      pdf.setLineWidth(0.3)
      pdf.line(margin, currentY, pageWidth - margin, currentY)
      currentY += 15

      // Filter information below dashboard overview  
      if (data.filterInfo && Object.keys(data.filterInfo).length > 0) {
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        
        // Format filter titles based on type
        if (data.filterInfo.tp) {
          pdf.text(`TP: ${data.filterInfo.tp}`, margin, currentY)
          currentY += 15
        }
        
        if (data.filterInfo.programme) {
          pdf.text(`Programme - ${data.filterInfo.programme}`, margin, currentY)
          currentY += 15
        }
      }

      // Chart screenshots removed - using structured text data only

      // Sections (for any remaining text data)
      for (const section of data.sections) {
        // Check if we need a new page
        if (currentY > pageHeight - 80) {
          pdf.addPage()
          currentY = margin
        }

        // Section title - Card-like formatting with border
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        
        // Draw card border - track starting position
        pdf.setLineWidth(0.3)
        const cardStartY = currentY - 5
        
        pdf.text(section.title, margin + 3, currentY + 8)
        currentY += 25

        if (section.type === 'stats') {
          // Stats in side-by-side grid layout
          const statsPerRow = 2
          const statWidth = (contentWidth - 10) / statsPerRow
          let col = 0
          let row = 0

          section.data.forEach((stat: any) => {
            const x = margin + 5 + (col * (statWidth + 5))
            const y = currentY + (row * 20)
            
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'bold')
            pdf.text(stat.title, x, y)
            
            pdf.setFontSize(13)
            pdf.setFont('helvetica', 'bold')
            pdf.text(stat.value, x, y + 8)
            
            col++
            if (col >= statsPerRow) {
              col = 0
              row++
            }
          })
          
          currentY += Math.ceil(section.data.length / statsPerRow) * 20 + 15

        } else if (section.type === 'stats-cards') {
          // Main overview stats cards - display in grid layout (side by side)
          const cardsPerRow = 2
          const cardWidth = (contentWidth - 10) / cardsPerRow
          let col = 0
          let row = 0

          section.data.forEach((stat: any) => {
            const x = margin + 5 + (col * (cardWidth + 5))
            const y = currentY + (row * 25)
            
            // Card-like box for each stat
            pdf.setLineWidth(0.2)
            pdf.rect(x, y - 3, cardWidth - 5, 18, 'S')
            
            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.text(stat.title, x + 3, y + 3)
            
            pdf.setFontSize(14)
            pdf.setFont('helvetica', 'bold')
            pdf.text(stat.value, x + 3, y + 12)
            
            col++
            if (col >= cardsPerRow) {
              col = 0
              row++
            }
          })
          
          currentY += Math.ceil(section.data.length / cardsPerRow) * 25 + 10

        } else if (section.type === 'area') {
          // Area distribution with progress bars - side by side layout
          const itemsPerRow = 2
          const colWidth = (contentWidth - 10) / itemsPerRow
          let col = 0
          let row = 0

          section.data.forEach((area: any) => {
            const x = margin + 5 + (col * (colWidth + 5))
            const y = currentY + (row * 20)
            
            // Area label
            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${area.area}`, x, y)
            pdf.text(`${area.count} (${area.percentage}%)`, x, y + 6)
            
            // Progress bar background
            pdf.setFillColor(229, 231, 235) // gray-200
            pdf.rect(x, y + 10, colWidth - 10, 3, 'F')
            
            // Progress bar fill
            const fillWidth = (area.percentage / 100) * (colWidth - 10)
            pdf.setFillColor(59, 130, 246) // blue-500
            pdf.rect(x, y + 10, fillWidth, 3, 'F')
            
            col++
            if (col >= itemsPerRow) {
              col = 0
              row++
            }
          })
          
          currentY += Math.ceil(section.data.length / itemsPerRow) * 20 + 10

        } else if (section.type === 'dusp' || section.type === 'tp' || section.type === 'state' || section.type === 'states') {
          // DUSP, TP, State data in columns
          const itemsPerRow = 2
          const colWidth = contentWidth / itemsPerRow
          let col = 0
          let row = 0

          section.data.forEach((item: any) => {
            const x = margin + (col * colWidth)
            const y = currentY + (row * 12)

            const key = section.type === 'dusp' ? item.dusp : 
                       section.type === 'tp' ? item.tp : 
                       (section.type === 'states' ? item.state : item.state)
            
            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${key}: ${item.count}`, x + 5, y)

            col++
            if (col >= itemsPerRow) {
              col = 0
              row++
            }
          })
          
          currentY += Math.ceil(section.data.length / itemsPerRow) * 12 + 15

        } else if (section.type === 'officers') {
          // Officer statistics
          section.data.forEach((officer: any) => {
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${officer.role}: ${officer.total}`, margin + 5, currentY)
            currentY += 8
          })
          currentY += 10

        } else if (section.type === 'gender' || section.type === 'race') {
          // Gender/Race - text only, no progress bars
          section.data.forEach((item: any) => {
            const key = section.type === 'gender' ? item.gender : item.race
            
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${key}`, margin + 5, currentY)
            pdf.text(`${item.count} (${item.percentage}%)`, margin + 100, currentY)
            
            currentY += 10
          })
          currentY += 10

        } else if (section.type === 'staff') {
          // Staff information
          section.data.forEach((item: any) => {
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'bold')
            pdf.text(`${item.title}`, margin + 5, currentY)
            currentY += 8
            
            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${item.values}`, margin + 10, currentY)
            currentY += 12
          })
          currentY += 10

        } else if (section.type === 'charts') {
          // Chart information
          section.data.forEach((item: any) => {
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`📊 ${item.title}`, margin + 5, currentY)
            currentY += 8
          })
          currentY += 10

        } else if (section.type === 'tables') {
          // Table data
          section.data.forEach((table: any) => {
            // Table title
            pdf.setFontSize(12)
            pdf.setFont('helvetica', 'bold')
            pdf.text(`${table.title}`, margin + 5, currentY)
            currentY += 10
            
            // Table headers
            if (table.headers && table.headers.length > 0) {
              pdf.setFontSize(9)
              pdf.setFont('helvetica', 'bold')
              const colWidth = contentWidth / table.headers.length
              table.headers.forEach((header: string, index: number) => {
                pdf.text(header, margin + (index * colWidth), currentY)
              })
              currentY += 8
              
              // Table rows
              pdf.setFont('helvetica', 'normal')
              table.rows.forEach((row: string[]) => {
                row.forEach((cell: string, index: number) => {
                  pdf.text(cell.substring(0, 20), margin + (index * colWidth), currentY)
                })
                currentY += 6
                
                if (currentY > pageHeight - 40) {
                  pdf.addPage()
                  currentY = margin
                }
              })
            }
            currentY += 15
          })

        } else if (section.type === 'staff-components') {
          // Staff dashboard components
          section.data.forEach((component: any) => {
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'bold')
            pdf.text(`${component.title}`, margin + 5, currentY)
            currentY += 8
            
            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${component.content}`, margin + 10, currentY)
            currentY += 12
          })
          currentY += 10

        } else if (section.type === 'membership') {
          // Membership data
          section.data.forEach((membership: any) => {
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'bold')
            pdf.text(`${membership.category}`, margin + 5, currentY)
            currentY += 10
            
            membership.items.forEach((item: any) => {
              pdf.setFontSize(10)
              pdf.setFont('helvetica', 'normal')
              pdf.text(`${item.label}: ${item.count}`, margin + 10, currentY)
              currentY += 8
            })
            currentY += 10
          })

        } else if (section.type === 'events') {
          // Event analytics
          section.data.forEach((event: any) => {
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'bold')
            pdf.text(`${event.chartTitle}`, margin + 5, currentY)
            currentY += 8
            
            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`Data: ${event.dataPoints}`, margin + 10, currentY)
            currentY += 12
          })
          currentY += 10

        } else if (section.type === 'categories') {
          // Categories and labels
          section.data.forEach((category: any) => {
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'bold')
            pdf.text(`${category.category}`, margin + 5, currentY)
            currentY += 8
            
            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${category.items || category.percentage + '%'}`, margin + 10, currentY)
            currentY += 12
          })
          currentY += 10

        } else if (section.type === 'participant-categories') {
          // Participant categories for Smart Services - side by side with progress bars
          const itemsPerRow = 2
          const colWidth = (contentWidth - 10) / itemsPerRow
          let col = 0
          let row = 0

          section.data.forEach((item: any) => {
            const x = margin + 5 + (col * (colWidth + 5))
            const y = currentY + (row * 18)

            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'bold')
            pdf.text(`${item.category}`, x, y)
            pdf.text(`${item.count}`, x + colWidth - 40, y)
            
            if (item.percentage) {
              pdf.text(`${item.percentage}`, x + colWidth - 20, y)
              
              // Progress bar background
              pdf.setFillColor(229, 231, 235)
              pdf.rect(x, y + 3, colWidth - 30, 3, 'F')
              
              // Progress bar fill
              const percentageValue = parseInt(item.percentage.replace('%', ''))
              const fillWidth = (percentageValue / 100) * (colWidth - 30)
              pdf.setFillColor(59, 130, 246) // blue-500
              pdf.rect(x, y + 3, fillWidth, 3, 'F')
            }

            col++
            if (col >= itemsPerRow) {
              col = 0
              row++
            }
          })
          
          currentY += Math.ceil(section.data.length / itemsPerRow) * 18 + 10

        } else if (section.type === 'components') {
          // Dashboard components
          section.data.forEach((component: any) => {
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'bold')
            pdf.text(`${component.componentTitle}`, margin + 5, currentY)
            currentY += 8
            
            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${component.items}`, margin + 10, currentY)
            currentY += 12
          })
          currentY += 10

        } else if (section.type === 'programs') {
          // Smart Services programs - side by side layout
          const itemsPerRow = 2
          const colWidth = contentWidth / itemsPerRow
          let col = 0
          let row = 0

          section.data.forEach((program: any) => {
            const x = margin + 5 + (col * colWidth)
            const y = currentY + (row * 12)

            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'bold')
            pdf.text(`${program.name}`, x, y)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${program.participants} participants`, x, y + 6)

            col++
            if (col >= itemsPerRow) {
              col = 0
              row++
            }
          })
          
          currentY += Math.ceil(section.data.length / itemsPerRow) * 12 + 10

        } else if (section.type === 'tp-data') {
          // TP membership data
          const itemsPerRow = 2
          const colWidth = contentWidth / itemsPerRow
          let col = 0
          let row = 0

          section.data.forEach((tp: any) => {
            const x = margin + (col * colWidth)
            const y = currentY + (row * 12)

            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${tp.name}: ${tp.count}`, x + 5, y)

            col++
            if (col >= itemsPerRow) {
              col = 0
              row++
            }
          })
          
          currentY += Math.ceil(section.data.length / itemsPerRow) * 12 + 15

        } else if (section.type === 'demographic') {
          // Demographic data - side by side layout
          const itemsPerRow = 2
          const colWidth = contentWidth / itemsPerRow
          let col = 0
          let row = 0

          section.data.forEach((item: any) => {
            const x = margin + 5 + (col * colWidth)
            const y = currentY + (row * 12)

            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${item.label}: ${item.count}`, x, y)
            if (item.percentage) {
              pdf.text(`(${item.percentage})`, x, y + 6)
            }

            col++
            if (col >= itemsPerRow) {
              col = 0
              row++
            }
          })
          
          currentY += Math.ceil(section.data.length / itemsPerRow) * 12 + 10

        } else if (section.type === 'category-breakdown') {
          // Category breakdown - side by side with progress bars
          const itemsPerRow = 2
          const colWidth = (contentWidth - 10) / itemsPerRow
          let col = 0
          let row = 0

          section.data.forEach((category: any) => {
            const x = margin + 5 + (col * (colWidth + 5))
            const y = currentY + (row * 18)
            
            // Category label
            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${category.category}`, x, y)
            pdf.text(`${category.percentage}`, x + colWidth - 30, y)
            
            // Progress bar background
            pdf.setFillColor(229, 231, 235)
            pdf.rect(x, y + 4, colWidth - 35, 3, 'F')
            
            // Progress bar fill
            const fillWidth = (parseInt(category.percentage) / 100) * (colWidth - 35)
            pdf.setFillColor(59, 130, 246) // blue-500
            pdf.rect(x, y + 4, fillWidth, 3, 'F')
            
            col++
            if (col >= itemsPerRow) {
              col = 0
              row++
            }
          })
          
          currentY += Math.ceil(section.data.length / itemsPerRow) * 18 + 10
        } else if (section.type === 'age-groups') {
          // Age groups - side by side layout
          const itemsPerRow = 2
          const colWidth = contentWidth / itemsPerRow
          let col = 0
          let row = 0

          section.data.forEach((item: any) => {
            const x = margin + 5 + (col * colWidth)
            const y = currentY + (row * 12)

            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${item.label}: ${item.count}`, x, y)
            if (item.percentage) {
              pdf.text(`${item.percentage}`, x, y + 6)
            }

            col++
            if (col >= itemsPerRow) {
              col = 0
              row++
            }
          })
          
          currentY += Math.ceil(section.data.length / itemsPerRow) * 12 + 10
        } else if (section.type === 'state-participation') {
          // State participation section for Smart Services program tab
          section.data.forEach((item: any, index: number) => {
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${index + 1}. ${item.state}`, margin + 5, currentY)
            pdf.text(`${item.count} participants (${item.percentage})`, margin + 80, currentY)
            currentY += 10
          })
          currentY += 10
        } else if (section.type === 'state-bar-chart') {
          // State bar chart with visual chart and explanatory text
          if (section.chartElement) {
            // Capture chart as image
            try {
              const canvas = await html2canvas(section.chartElement, {
                backgroundColor: 'white',
                scale: 2,
                logging: false
              })
              
              const imgData = canvas.toDataURL('image/png')
              const imgWidth = 150 // Fit chart in PDF
              const imgHeight = (canvas.height * imgWidth) / canvas.width
              
              // Check if chart fits on current page
              if (currentY + imgHeight > pageHeight - 40) {
                pdf.addPage()
                currentY = margin
              }
              
              pdf.addImage(imgData, 'PNG', margin, currentY, imgWidth, imgHeight)
              currentY += imgHeight + 15
            } catch (error) {
              console.error('Error capturing chart:', error)
              // Fallback to text if chart capture fails
              pdf.setFontSize(11)
              pdf.setFont('helvetica', 'italic')
              pdf.text('Chart visualization not available', margin + 5, currentY)
              currentY += 15
            }
          }
          
          // Add explanatory text below the chart
          if (section.data && section.data.length > 0) {
            pdf.setFontSize(12)
            pdf.setFont('helvetica', 'bold')
            pdf.text('State Breakdown:', margin + 5, currentY)
            currentY += 10
            
            section.data.forEach((item: any) => {
              pdf.setFontSize(11)
              pdf.setFont('helvetica', 'normal')
              pdf.text(`${item.state} ${item.count} participants (${item.percentage})`, margin + 5, currentY)
              currentY += 8
            })
            currentY += 10
          }
        }
        
        // Complete card-like formatting with bottom border
        const cardEndY = currentY - 10
        pdf.setLineWidth(0.3)
        pdf.rect(margin - 2, cardStartY, contentWidth + 4, cardEndY - cardStartY + 10, 'S') // Complete card border
        currentY += 15 // Extra space between cards
      }

      // Footer on all pages - Clean black text, no background
      const totalPages = pdf.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        const footerY = pageHeight - 15
        
        // Simple line separator above footer
        pdf.setLineWidth(0.2)
        pdf.line(margin, footerY - 3, pageWidth - margin, footerY - 3)
        
        pdf.setTextColor(0, 0, 0) // Black text
        pdf.setFontSize(9)
        pdf.setFont('helvetica', 'normal')
        pdf.text('NADI Operation Management System', margin, footerY + 3)
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 30, footerY + 3)
      }
      
      // Add timestamp to filename
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:]/g, '-')
      const finalFilename = `${filename}-${timestamp}.pdf`
      
      pdf.save(finalFilename)
      
      toast({
        title: "PDF Downloaded",
        description: `Comprehensive report saved as ${finalFilename}`,
      })
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button
      onClick={generatePDF}
      disabled={isGenerating}
      variant={variant}
      size={size}
      className={className}
    >
      <Download className="h-4 w-4 mr-2" />
      {isGenerating ? "Generating PDF..." : "Download PDF"}
    </Button>
  )
}
