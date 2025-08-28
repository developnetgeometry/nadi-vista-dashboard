import React from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
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

  const extractDataFromPage = () => {
    console.log("Starting PDF data extraction...")
    const data: any = {
      title: "NADI Operation Dashboard Report",
      date: new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      sections: []
    }

    console.log("Initial data structure:", data)

    // Extract operation statistics
    console.log("Looking for operation stats...")
    const statsContainer = document.querySelector('[data-component="operation-stats"]')
    console.log("Found stats container:", !!statsContainer)
    
    if (statsContainer) {
      const statCards = statsContainer.querySelectorAll('[data-stat-title]')
      console.log("Found stat cards:", statCards.length)
      
      const stats: any[] = []
      statCards.forEach((card, index) => {
        console.log(`Processing card ${index}:`, card)
        
        const titleElement = card.querySelector('p.text-sm.font-medium.text-muted-foreground')
        const valueElement = card.querySelector('p.text-2xl.font-bold')
        
        const title = titleElement?.textContent?.trim()
        const value = valueElement?.textContent?.trim()
        
        console.log(`Card ${index} - Title: ${title}, Value: ${value}`)
        
        if (title && value) {
          stats.push({ title, value })
        }
      })
      
      console.log("Extracted stats:", stats)
      if (stats.length > 0) {
        data.sections.push({ type: 'stats', title: 'Operation Statistics', data: stats })
      }
    } else {
      console.log("Stats container not found, trying fallback method...")
      // Fallback: look for the grid structure
      const gridContainer = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-4')
      if (gridContainer) {
        console.log("Found grid container")
        const cards = gridContainer.querySelectorAll('div[class*="Card"]')
        console.log("Found cards in grid:", cards.length)
        
        const stats: any[] = []
        cards.forEach((card, index) => {
          const titleEl = card.querySelector('p.text-sm.font-medium.text-muted-foreground')
          const valueEl = card.querySelector('p.text-2xl.font-bold')
          
          if (titleEl && valueEl) {
            stats.push({
              title: titleEl.textContent?.trim(),
              value: valueEl.textContent?.trim()
            })
          }
        })
        
        if (stats.length > 0) {
          data.sections.push({ type: 'stats', title: 'Operation Statistics', data: stats })
        }
      }
    }

    // Extract dashboard header info
    const headerTitle = document.querySelector('h1.text-3xl.font-bold')?.textContent?.trim()
    const headerSubtitle = document.querySelector('p.text-muted-foreground')?.textContent?.trim()
    
    if (headerTitle) {
      data.dashboardTitle = headerTitle
    }
    if (headerSubtitle) {
      data.dashboardSubtitle = headerSubtitle
    }

    console.log("Final extracted data:", data)
    return data
  }

  const generatePDF = async () => {
    setIsGenerating(true)
    
    try {
      const data = extractDataFromPage()
      
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

      // Sections
      data.sections.forEach((section: any, index: number) => {
        // Check if we need a new page
        if (currentY > pageHeight - 60) {
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

          section.data.forEach((stat: any, statIndex: number) => {
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
        } else {
          // Other sections as key-value pairs
          Object.entries(section.data).forEach(([key, value]: [string, any]) => {
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'normal')
            pdf.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, margin + 5, currentY)
            currentY += 8
          })
          currentY += 10
        }
      })

      // Footer
      const footerY = pageHeight - 15
      pdf.setFillColor(59, 130, 246)
      pdf.rect(0, footerY - 5, pageWidth, 20, 'F')
      
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text('NADI Operation Management System', margin, footerY + 3)
      pdf.text(`Page 1 of ${pdf.getNumberOfPages()}`, pageWidth - margin - 30, footerY + 3)
      
      // Add timestamp to filename
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:]/g, '-')
      const finalFilename = `${filename}-${timestamp}.pdf`
      
      pdf.save(finalFilename)
      
      toast({
        title: "PDF Downloaded",
        description: `Professional report saved as ${finalFilename}`,
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