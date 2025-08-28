
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
      title: "NADI Operation Dashboard Report",
      date: new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      sections: [],
      charts: []
    }

    // Extract dashboard header info
    const headerTitle = document.querySelector('h1')?.textContent?.trim()
    const headerSubtitle = document.querySelector('p.text-muted-foreground')?.textContent?.trim()
    
    if (headerTitle) {
      data.dashboardTitle = headerTitle
    }
    if (headerSubtitle) {
      data.dashboardSubtitle = headerSubtitle
    }

    // Capture chart sections as images
    const chartSections = [
      { selector: '[data-component="operation-stats"]', title: 'Operation Statistics' },
      { selector: '[data-area-item]', title: 'NADI by Area Progress Charts', parentSelector: '.space-y-4' },
      { selector: '[data-dusp-item]', title: 'NADI by DUSP Cards', parentSelector: '.grid.grid-cols-2' },
      { selector: '[data-tp-item]', title: 'NADI by TP Cards', parentSelector: '.grid.grid-cols-2' },
      { selector: '[data-gender-item]', title: 'Gender Demographics', parentSelector: '.space-y-4' },
      { selector: '[data-race-item]', title: 'Race Demographics', parentSelector: '.space-y-4' }
    ]

    for (const section of chartSections) {
      try {
        let element: HTMLElement | null = null
        
        if (section.parentSelector) {
          // Find the parent container for multiple items
          const firstItem = document.querySelector(section.selector)
          if (firstItem) {
            element = firstItem.closest(section.parentSelector) as HTMLElement
            if (!element) {
              // Fallback to the card container
              element = firstItem.closest('.card, [class*="Card"]') as HTMLElement
            }
          }
        } else {
          element = document.querySelector(section.selector) as HTMLElement
        }
        
        if (element && element.offsetWidth > 0 && element.offsetHeight > 0) {
          const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            logging: false,
            height: element.scrollHeight,
            windowHeight: element.scrollHeight
          })
          
          data.charts.push({
            title: section.title,
            imageData: canvas.toDataURL('image/png'),
            width: canvas.width,
            height: canvas.height
          })
          console.log(`Captured chart: ${section.title}`)
        } else {
          console.log(`Element not found or invalid for: ${section.title}`)
        }
      } catch (error) {
        console.log(`Failed to capture ${section.title}:`, error)
      }
    }

    // 1. Extract Operation Statistics
    const statsContainer = document.querySelector('[data-component="operation-stats"]')
    if (statsContainer) {
      const statCards = statsContainer.querySelectorAll('[data-stat-title]')
      const stats: any[] = []
      
      statCards.forEach((card) => {
        const titleElement = card.querySelector('p.text-sm.font-medium.text-muted-foreground')
        const valueElement = card.querySelector('p.text-2xl.font-bold')
        
        const title = titleElement?.textContent?.trim()
        const value = valueElement?.textContent?.trim()
        
        if (title && value) {
          stats.push({ title, value })
        }
      })
      
      if (stats.length > 0) {
        data.sections.push({ type: 'stats', title: 'Operation Statistics', data: stats })
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

    // 6. Extract NADI Officer Statistics (if on officer tab)
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
        data.sections.push({ type: 'officers', title: 'NADI Officer Statistics', data: officerData })
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

      // Add captured chart images in 2-column grid layout
      for (let i = 0; i < data.charts.length; i += 2) {
        const leftChart = data.charts[i]
        const rightChart = data.charts[i + 1]
        
        // Calculate dimensions for 2-column layout
        const columnWidth = (contentWidth - 10) / 2 // 10mm gap between columns
        const leftImageHeight = (leftChart.height * columnWidth) / leftChart.width
        const rightImageHeight = rightChart ? (rightChart.height * columnWidth) / rightChart.width : 0
        const maxRowHeight = Math.max(leftImageHeight, rightImageHeight)
        
        // Check if we need a new page for this row
        if (currentY + maxRowHeight + 40 > pageHeight - 40) {
          pdf.addPage()
          currentY = margin
        }

        // Left chart
        // Chart title
        pdf.setFillColor(248, 250, 252)
        pdf.rect(margin, currentY - 5, columnWidth, 12, 'F')
        
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.text(leftChart.title, margin + 2, currentY + 3)
        
        // Add the left chart image
        pdf.addImage(
          leftChart.imageData,
          'PNG',
          margin,
          currentY + 15,
          columnWidth,
          leftImageHeight
        )

        // Right chart (if exists)
        if (rightChart) {
          const rightX = margin + columnWidth + 10
          
          // Chart title
          pdf.setFillColor(248, 250, 252)
          pdf.rect(rightX, currentY - 5, columnWidth, 12, 'F')
          
          pdf.setTextColor(0, 0, 0)
          pdf.setFontSize(12)
          pdf.setFont('helvetica', 'bold')
          pdf.text(rightChart.title, rightX + 2, currentY + 3)
          
          // Add the right chart image
          pdf.addImage(
            rightChart.imageData,
            'PNG',
            rightX,
            currentY + 15,
            columnWidth,
            rightImageHeight
          )
        }
        
        currentY += maxRowHeight + 35
      }

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
