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

  const generatePDF = async () => {
    setIsGenerating(true)
    
    try {
      // Hide elements that should be excluded
      const elementsToHide: HTMLElement[] = []
      excludeSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector)
        elements.forEach(el => {
          if (el instanceof HTMLElement) {
            elementsToHide.push(el)
            el.style.display = 'none'
          }
        })
      })

      // Get the main content area (exclude sidebars and navigation)
      const mainContent = document.querySelector('main') || 
                          document.querySelector('.main-content') || 
                          document.querySelector('[role="main"]') ||
                          document.body

      if (!mainContent) {
        throw new Error("Could not find main content area")
      }

      // Generate canvas from the main content
      const canvas = await html2canvas(mainContent as HTMLElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: mainContent.scrollWidth,
        height: mainContent.scrollHeight
      })

      // Restore hidden elements
      elementsToHide.forEach(el => {
        el.style.display = ''
      })

      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 0

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      
      // Add timestamp to filename
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:]/g, '-')
      const finalFilename = `${filename}-${timestamp}.pdf`
      
      pdf.save(finalFilename)
      
      toast({
        title: "PDF Downloaded",
        description: `Page has been saved as ${finalFilename}`,
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