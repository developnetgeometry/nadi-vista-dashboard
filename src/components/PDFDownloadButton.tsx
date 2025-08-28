
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
    console.log("Starting comprehensive PDF data extraction...")
    const data: any = {
      title: "Dashboard Report",
      date: new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      sections: []
    }

    // Extract dashboard header info
    const headerTitle = document.querySelector('h1')?.textContent?.trim()
    const headerSubtitle = document.querySelector('p.text-muted-foreground')?.textContent?.trim()
    
    if (headerTitle) {
      data.dashboardTitle = headerTitle
      data.title = `${headerTitle} Report`
    }
    if (headerSubtitle) {
      data.dashboardSubtitle = headerSubtitle
    }

    // 1. Extract Stats Cards (multiple possible selectors)
    const statsSelectors = [
      '[data-component="operation-stats"]',
      '[data-component="events-overview"]',
      '[data-component="stats-card"]'
    ]
    
    for (const selector of statsSelectors) {
      const statsContainer = document.querySelector(selector)
      if (statsContainer) {
        const statCards = statsContainer.querySelectorAll('[data-stat-title], .card, [class*="Card"]')
        const stats: any[] = []
        
        statCards.forEach((card) => {
          // Try multiple patterns for title and value
          const titleElement = card.querySelector('p.text-sm.font-medium.text-muted-foreground, .text-sm.font-medium, [class*="CardTitle"], .card-title')
          const valueElement = card.querySelector('p.text-2xl.font-bold, .text-2xl.font-bold, p.text-3xl.font-bold, .text-3xl.font-bold, .text-xl.font-bold')
          
          const title = titleElement?.textContent?.trim()
          const value = valueElement?.textContent?.trim()
          
          if (title && value) {
            stats.push({ title, value })
          }
        })
        
        if (stats.length > 0) {
          const sectionTitle = selector.includes('events') ? 'Event Statistics' : 
                             selector.includes('operation') ? 'Operation Statistics' : 'Statistics'
          data.sections.push({ type: 'stats', title: sectionTitle, data: stats })
        }
      }
    }

    // 2. Extract NADI by Area data
    const areaCards = document.querySelectorAll('[data-area-item]')
    if (areaCards.length > 0) {
      const areaData: any[] = []
      areaCards.forEach((card) => {
        const areaName = card.getAttribute('data-area-name')
        const areaCount = card.getAttribute('data-area-count')
        const areaPercentage = card.getAttribute('data-area-percentage')
        
        if (areaName && areaCount && areaPercentage) {
          areaData.push({
            area: areaName,
            count: areaCount,
            percentage: areaPercentage
          })
        }
      })
      
      if (areaData.length > 0) {
        data.sections.push({ type: 'area', title: 'NADI by Area Distribution', data: areaData })
      }
    }

    // 3. Extract NADI by DUSP data
    const duspCards = document.querySelectorAll('[data-dusp-item]')
    if (duspCards.length > 0) {
      const duspData: any[] = []
      duspCards.forEach((card) => {
        const duspName = card.getAttribute('data-dusp-name')
        const duspCount = card.getAttribute('data-dusp-count')
        
        if (duspName && duspCount) {
          duspData.push({
            dusp: duspName,
            count: duspCount
          })
        }
      })
      
      if (duspData.length > 0) {
        data.sections.push({ type: 'dusp', title: 'Total NADI by DUSP', data: duspData })
      }
    }

    // 4. Extract NADI by TP data
    const tpCards = document.querySelectorAll('[data-tp-item]')
    if (tpCards.length > 0) {
      const tpData: any[] = []
      tpCards.forEach((card) => {
        const tpName = card.getAttribute('data-tp-name')
        const tpCount = card.getAttribute('data-tp-count')
        
        if (tpName && tpCount) {
          tpData.push({
            tp: tpName,
            count: tpCount
          })
        }
      })
      
      if (tpData.length > 0) {
        data.sections.push({ type: 'tp', title: 'Total NADI by TP', data: tpData })
      }
    }

    // 5. Extract NADI by State data
    const stateItems = document.querySelectorAll('[data-state-item]')
    if (stateItems.length > 0) {
      const stateData: any[] = []
      stateItems.forEach((item) => {
        const stateName = item.getAttribute('data-state-name')
        const stateCount = item.getAttribute('data-state-count')
        
        if (stateName && stateCount) {
          stateData.push({
            state: stateName,
            count: stateCount
          })
        }
      })
      
      if (stateData.length > 0) {
        data.sections.push({ type: 'state', title: 'Total NADI by State', data: stateData })
      }
    }

    // 6. Extract Officer Statistics
    const officerCards = document.querySelectorAll('[data-officer-role]')
    if (officerCards.length > 0) {
      const officerData: any[] = []
      officerCards.forEach((card) => {
        const role = card.getAttribute('data-officer-role')
        const total = card.getAttribute('data-officer-total')
        
        if (role && total) {
          officerData.push({
            role: role,
            total: total
          })
        }
      })
      
      if (officerData.length > 0) {
        data.sections.push({ type: 'officers', title: 'Officer Statistics', data: officerData })
      }
    }

    // 7. Extract Staff Dashboard Data
    const staffCards = document.querySelectorAll('[data-component="staff-card"], [data-component="payroll-summary"], [data-component="leave-summary"]')
    if (staffCards.length > 0) {
      const staffData: any[] = []
      staffCards.forEach((card) => {
        const titleElement = card.querySelector('.card-title, [class*="CardTitle"], h3, h2')
        const valueElements = card.querySelectorAll('.text-xl.font-bold, .text-2xl.font-bold, .font-semibold')
        
        const title = titleElement?.textContent?.trim()
        if (title) {
          const values: string[] = []
          valueElements.forEach((el) => {
            const value = el.textContent?.trim()
            if (value) values.push(value)
          })
          
          staffData.push({
            title: title,
            values: values.join(', ')
          })
        }
      })
      
      if (staffData.length > 0) {
        data.sections.push({ type: 'staff', title: 'Staff Information', data: staffData })
      }
    }

    // 8. Extract Chart/Visualization Data
    const chartContainers = document.querySelectorAll('[data-component="events-by-type"], [data-component="events-by-location"], .recharts-wrapper, [class*="chart"]')
    if (chartContainers.length > 0) {
      const chartData: any[] = []
      chartContainers.forEach((container, index) => {
        const titleElement = container.closest('.card')?.querySelector('[class*="CardTitle"], .card-title, h3, h2')
        const title = titleElement?.textContent?.trim() || `Chart ${index + 1}`
        
        chartData.push({ title })
      })
      
      if (chartData.length > 0) {
        data.sections.push({ type: 'charts', title: 'Visualizations', data: chartData })
      }
    }

    // 9. Extract Tables
    const tables = document.querySelectorAll('table')
    if (tables.length > 0) {
      const tableData: any[] = []
      tables.forEach((table, index) => {
        const rows = table.querySelectorAll('tbody tr')
        const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent?.trim() || '')
        
        if (rows.length > 0) {
          const tableRows: any[] = []
          rows.forEach((row) => {
            const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent?.trim() || '')
            if (cells.length > 0) {
              tableRows.push(cells)
            }
          })
          
          if (tableRows.length > 0) {
            tableData.push({
              title: `Table ${index + 1}`,
              headers,
              rows: tableRows.slice(0, 10) // Limit to first 10 rows
            })
          }
        }
      })
      
      if (tableData.length > 0) {
        data.sections.push({ type: 'tables', title: 'Data Tables', data: tableData })
      }
    }

    // 7. Extract Gender and Race data (if visible)
    const genderItems = document.querySelectorAll('[data-gender-item]')
    if (genderItems.length > 0) {
      const genderData: any[] = []
      genderItems.forEach((item) => {
        const gender = item.getAttribute('data-gender-name')
        const count = item.getAttribute('data-gender-count')
        const percentage = item.getAttribute('data-gender-percentage')
        
        if (gender && count && percentage) {
          genderData.push({
            gender: gender,
            count: count,
            percentage: percentage
          })
        }
      })
      
      if (genderData.length > 0) {
        data.sections.push({ type: 'gender', title: 'Officers by Gender', data: genderData })
      }
    }

    const raceItems = document.querySelectorAll('[data-race-item]')
    if (raceItems.length > 0) {
      const raceData: any[] = []
      raceItems.forEach((item) => {
        const race = item.getAttribute('data-race-name')
        const count = item.getAttribute('data-race-count')
        const percentage = item.getAttribute('data-race-percentage')
        
        if (race && count && percentage) {
          raceData.push({
            race: race,
            count: count,
            percentage: percentage
          })
        }
      })
      
      if (raceData.length > 0) {
        data.sections.push({ type: 'race', title: 'Officers by Race', data: raceData })
      }
    }

    console.log("Final comprehensive extracted data:", data)
    return data
  }

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

        } else if (section.type === 'dusp' || section.type === 'tp' || section.type === 'state') {
          // DUSP, TP, State data in columns
          const itemsPerRow = 2
          const colWidth = contentWidth / itemsPerRow
          let col = 0
          let row = 0

          section.data.forEach((item: any) => {
            const x = margin + (col * colWidth)
            const y = currentY + (row * 12)

            const key = section.type === 'dusp' ? item.dusp : 
                       section.type === 'tp' ? item.tp : item.state
            
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
