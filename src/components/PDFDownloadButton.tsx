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
    const data: any = {
      title: document.title || "Staff Dashboard Report",
      date: new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      sections: []
    }

    // Extract staff welcome info
    const welcomeSection = document.querySelector('[data-component="staff-welcome"]')
    if (welcomeSection) {
      const name = welcomeSection.querySelector('h1')?.textContent || "Staff Member"
      const subtitle = welcomeSection.querySelector('p')?.textContent || ""
      data.staffName = name
      data.subtitle = subtitle
    }

    // Extract stats cards
    const statsCards = document.querySelectorAll('[data-component="stats-card"]')
    if (statsCards.length > 0) {
      const stats: any[] = []
      statsCards.forEach(card => {
        const title = card.querySelector('h3, [class*="text-2xl"]')?.textContent?.trim()
        const value = card.querySelector('[class*="text-lg"], [class*="text-xl"]')?.textContent?.trim()
        if (title && value) {
          stats.push({ title, value })
        }
      })
      if (stats.length > 0) {
        data.sections.push({ type: 'stats', title: 'Statistics Overview', data: stats })
      }
    }

    // Extract payroll info
    const payrollCard = document.querySelector('[data-component="payroll-summary"]')
    if (payrollCard) {
      const payrollData: any = {}
      const salaryEl = payrollCard.querySelector('[class*="Monthly Salary"]')?.parentElement?.querySelector('[class*="RM"]')
      const allowanceEl = payrollCard.querySelector('[class*="Allowances"]')?.parentElement?.querySelector('[class*="RM"]')
      const statusEl = payrollCard.querySelector('[class*="Payroll"]')?.parentElement?.querySelector('[class*="font-semibold"]')
      
      if (salaryEl) payrollData.salary = salaryEl.textContent
      if (allowanceEl) payrollData.allowances = allowanceEl.textContent
      if (statusEl) payrollData.status = statusEl.textContent
      
      if (Object.keys(payrollData).length > 0) {
        data.sections.push({ type: 'payroll', title: 'Payroll Information', data: payrollData })
      }
    }

    // Extract attendance info
    const attendanceCard = document.querySelector('[data-component="attendance-summary"]')
    if (attendanceCard) {
      const attendanceData: any = {}
      const checkInEl = attendanceCard.querySelector('[class*="Check In"]')?.parentElement?.querySelector('div:last-child')
      const checkOutEl = attendanceCard.querySelector('[class*="Check Out"]')?.parentElement?.querySelector('div:last-child')
      
      if (checkInEl) attendanceData.checkIn = checkInEl.textContent
      if (checkOutEl) attendanceData.checkOut = checkOutEl.textContent
      
      if (Object.keys(attendanceData).length > 0) {
        data.sections.push({ type: 'attendance', title: 'Attendance Summary', data: attendanceData })
      }
    }

    // Extract leave info
    const leaveCard = document.querySelector('[data-component="leave-summary"]')
    if (leaveCard) {
      const leaveData: any = {}
      const entitledEl = leaveCard.querySelector('[class*="Entitled"]')?.parentElement?.querySelector('[class*="font-bold"]')
      const takenEl = leaveCard.querySelector('[class*="Taken"]')?.parentElement?.querySelector('[class*="font-bold"]')
      const balanceEl = leaveCard.querySelector('[class*="Balance"]')?.parentElement?.querySelector('[class*="font-bold"]')
      
      if (entitledEl) leaveData.entitled = entitledEl.textContent
      if (takenEl) leaveData.taken = takenEl.textContent
      if (balanceEl) leaveData.balance = balanceEl.textContent
      
      if (Object.keys(leaveData).length > 0) {
        data.sections.push({ type: 'leave', title: 'Leave Application Summary', data: leaveData })
      }
    }

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
      pdf.text('NADI Staff Dashboard Report', margin, 25)
      
      // Date
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Generated on: ${data.date}`, margin, 35)
      
      currentY = 55

      // Staff Information
      if (data.staffName) {
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(16)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Staff Information', margin, currentY)
        currentY += 10
        
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'normal')
        pdf.text(`Name: ${data.staffName}`, margin + 5, currentY)
        currentY += 8
        
        if (data.subtitle) {
          pdf.text(`Position: ${data.subtitle}`, margin + 5, currentY)
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
      pdf.text('NADI Staff Management System', margin, footerY + 3)
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