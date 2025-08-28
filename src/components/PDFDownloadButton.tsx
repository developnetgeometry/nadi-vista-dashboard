
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
      dashboardSubtitle: "Administrator"
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
            type: "stats",
            title: "Statistics", 
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
          const titleEl = section.querySelector('h3, .font-semibold, [data-title]');
          const items = section.querySelectorAll('.flex.justify-between.items-center');
          
          if (titleEl && items.length > 0) {
            const demographicItems: any[] = [];

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
                title: extractCleanText(titleEl),
                data: demographicItems
              });
            }
          }
        });
      }

      // Extract dashboard title and subtitle for proper PDF header
      const headerTitle = document.querySelector('h1')?.textContent?.trim();
      const headerSubtitle = document.querySelector('p.text-muted-foreground')?.textContent?.trim();
      
      if (headerTitle) {
        data.dashboardTitle = headerTitle;
        data.title = `${headerTitle} Report`;
      }
      if (headerSubtitle) {
        data.dashboardSubtitle = headerSubtitle;
      }

      // Capture filter information and add to title
      const filterTabContent = document.querySelector('[role="tabpanel"]:not([hidden])');
      
      // Check for TP filter in membership demographic tab
      if (window.location.pathname.includes('/membership')) {
        const tpSelectTrigger = document.querySelector('[data-state="active"] select, [data-state="active"] [role="combobox"]');
        if (tpSelectTrigger) {
          const selectedValue = tpSelectTrigger.getAttribute('value') || tpSelectTrigger.textContent?.trim();
          if (selectedValue && selectedValue !== 'all' && selectedValue !== 'All TPs' && !selectedValue.includes('Select')) {
            data.title += ` - ${selectedValue}`;
          }
        }
      }

      // Check for pillar filter in smart services
      if (window.location.pathname.includes('/smart-services')) {
        const pillarSelects = document.querySelectorAll('select');
        pillarSelects.forEach(select => {
          const selectedValue = select.value;
          if (selectedValue && selectedValue !== 'NADi x Entrepreneur' && selectedValue.includes('NADi x')) {
            data.title += ` - ${selectedValue}`;
          }
        });
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
              type: "stats",
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
      }

      // Operation page data capture
      if (window.location.pathname.includes('/operation')) {
        // Operation stats
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
              type: "stats",
              title: "Operation Statistics",
              data: stats
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

      // Header
      pdf.setFillColor(59, 130, 246) // Blue header
      pdf.rect(0, 0, pageWidth, 40, 'F')
      
      // Title
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      pdf.text(data.title || 'NADI Operation Dashboard Report', margin, 25)
      
      // Date
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Generated on: ${data.date}`, margin, 35)
      
      currentY = 55

      // Dashboard Information
      if (data.dashboardTitle || data.dashboardSubtitle) {
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(16)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Dashboard Overview', margin, currentY)
        currentY += 10
        
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'normal')
        if (data.dashboardTitle) {
          pdf.text(`Title: ${data.dashboardTitle}`, margin + 5, currentY)
          currentY += 8
        }
        
        if (data.dashboardSubtitle) {
          pdf.text(`Description: ${data.dashboardSubtitle}`, margin + 5, currentY)
          currentY += 15
        } else {
          currentY += 10
        }
      }

      // Chart screenshots removed - using structured text data only

      // Sections (for any remaining text data)
      data.sections.forEach((section: any) => {
        // Check if we need a new page
        if (currentY > pageHeight - 80) {
          pdf.addPage()
          currentY = margin
        }

        // Section title
        pdf.setFillColor(248, 250, 252) // Light gray background
        pdf.rect(margin, currentY - 5, contentWidth, 12, 'F')
        
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.text(section.title, margin + 2, currentY + 3)
        currentY += 20

        if (section.type === 'stats') {
          // Stats in a grid format
          const statsPerRow = 2
          const colWidth = contentWidth / statsPerRow
          let col = 0
          let row = 0

          section.data.forEach((stat: any) => {
            const x = margin + (col * colWidth)
            const y = currentY + (row * 25)

            // Stat box
            pdf.setFillColor(245, 245, 245)
            pdf.rect(x + 2, y - 3, colWidth - 8, 20, 'F')
            
            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.text(stat.title, x + 5, y + 5)
            
            pdf.setFontSize(12)
            pdf.setFont('helvetica', 'bold')
            pdf.text(stat.value, x + 5, y + 15)

            col++
            if (col >= statsPerRow) {
              col = 0
              row++
            }
          })
          
          currentY += Math.ceil(section.data.length / statsPerRow) * 25 + 10

        } else if (section.type === 'area') {
          // Area distribution with progress bars
          section.data.forEach((area: any) => {
            // Area label
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${area.area}`, margin + 5, currentY)
            pdf.text(`${area.count} centers (${area.percentage}%)`, margin + 80, currentY)
            
            // Progress bar background
            pdf.setFillColor(229, 231, 235) // gray-200
            pdf.rect(margin + 5, currentY + 3, 100, 4, 'F')
            
            // Progress bar fill
            const fillWidth = (area.percentage / 100) * 100
            pdf.setFillColor(59, 130, 246) // blue-500
            pdf.rect(margin + 5, currentY + 3, fillWidth, 4, 'F')
            
            currentY += 15
          })
          currentY += 10

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
          // Gender/Race with progress bars
          section.data.forEach((item: any) => {
            const key = section.type === 'gender' ? item.gender : item.race
            
            // Label
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${key}`, margin + 5, currentY)
            pdf.text(`${item.count} (${item.percentage}%)`, margin + 120, currentY)
            
            // Progress bar background
            pdf.setFillColor(229, 231, 235)
            pdf.rect(margin + 5, currentY + 3, 80, 3, 'F')
            
            // Progress bar fill
            const fillWidth = (item.percentage / 100) * 80
            pdf.setFillColor(16, 185, 129) // green-500
            pdf.rect(margin + 5, currentY + 3, fillWidth, 3, 'F')
            
            currentY += 12
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
          // Participant categories for Smart Services
          section.data.forEach((item: any) => {
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'bold')
            pdf.text(`${item.category}`, margin + 5, currentY)
            pdf.text(`${item.count}`, margin + 100, currentY)
            
            if (item.percentage) {
              pdf.text(`${item.percentage}`, margin + 140, currentY)
            }
            currentY += 10
          })
          currentY += 10

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
          // Smart Services programs (without icons)
          section.data.forEach((program: any) => {
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'bold')
            pdf.text(`${program.name}`, margin + 5, currentY)
            pdf.text(`${program.participants} participants`, margin + 100, currentY)
            currentY += 10
          })
          currentY += 10

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
          // Demographic data
          section.data.forEach((item: any) => {
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${item.label}`, margin + 5, currentY)
            pdf.text(`${item.count}`, margin + 80, currentY)
            if (item.percentage) {
              pdf.text(`(${item.percentage})`, margin + 140, currentY)
            }
            currentY += 10
          })
          currentY += 10

        } else if (section.type === 'category-breakdown') {
          // Category breakdown with progress bars
          section.data.forEach((category: any) => {
            // Category label
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${category.category}`, margin + 5, currentY)
            pdf.text(`${category.percentage}`, margin + 120, currentY)
            
            // Progress bar background
            pdf.setFillColor(229, 231, 235)
            pdf.rect(margin + 5, currentY + 3, 80, 3, 'F')
            
            // Progress bar fill
            const fillWidth = (parseInt(category.percentage) / 100) * 80
            pdf.setFillColor(59, 130, 246) // blue-500
            pdf.rect(margin + 5, currentY + 3, fillWidth, 3, 'F')
            
            currentY += 12
          })
          currentY += 10
        }
      })

      // Footer on all pages
      const totalPages = pdf.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        const footerY = pageHeight - 15
        pdf.setFillColor(59, 130, 246)
        pdf.rect(0, footerY - 5, pageWidth, 20, 'F')
        
        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(10)
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
