import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface PDFDownloadProps {
  filename?: string
  className?: string
}

export function PDFDownload({ filename = "page", className }: PDFDownloadProps) {
  const downloadPDF = async () => {
    try {
      // Get the main content area (excluding menu/sidebar)
      const mainContent = document.querySelector('main') || document.body
      
      // Create a print-friendly version
      const printWindow = window.open('', '_blank')
      if (!printWindow) {
        toast({
          title: "Error",
          description: "Please allow popups to download PDF",
          variant: "destructive"
        })
        return
      }

      // Clone the content
      const clonedContent = mainContent.cloneNode(true) as HTMLElement
      
      // Remove any buttons, dialogs, or interactive elements that shouldn't be in PDF
      const elementsToRemove = clonedContent.querySelectorAll(
        'button, .sidebar, [role="dialog"], .hover\\:shadow, .transition-'
      )
      elementsToRemove.forEach(el => el.remove())

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${filename}</title>
            <style>
              body { 
                font-family: system-ui, -apple-system, sans-serif; 
                margin: 20px; 
                color: #000;
                background: white;
              }
              * { 
                -webkit-print-color-adjust: exact !important; 
                color-adjust: exact !important; 
              }
              .space-y-6 > * + * { margin-top: 1.5rem; }
              .space-y-4 > * + * { margin-top: 1rem; }
              .grid { display: grid; gap: 1rem; }
              .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
              .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
              .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
              .text-3xl { font-size: 1.875rem; font-weight: bold; }
              .text-xl { font-size: 1.25rem; font-weight: 600; }
              .text-lg { font-size: 1.125rem; font-weight: 600; }
              .font-bold { font-weight: bold; }
              .font-semibold { font-weight: 600; }
              .text-muted-foreground { color: #6b7280; }
              .border { border: 1px solid #e5e7eb; }
              .rounded { border-radius: 0.375rem; }
              .p-6 { padding: 1.5rem; }
              .p-4 { padding: 1rem; }
              .mb-4 { margin-bottom: 1rem; }
              .mt-2 { margin-top: 0.5rem; }
              .flex { display: flex; }
              .justify-between { justify-content: space-between; }
              .items-center { align-items: center; }
              .gap-2 { gap: 0.5rem; }
              .bg-primary { background-color: #2563eb; color: white; }
              .bg-blue-50 { background-color: #eff6ff; }
              .bg-green-50 { background-color: #f0fdf4; }
              .bg-orange-50 { background-color: #fff7ed; }
              .bg-red-50 { background-color: #fef2f2; }
              .text-blue-600 { color: #2563eb; }
              .text-green-600 { color: #16a34a; }
              .text-orange-600 { color: #ea580c; }
              .text-red-600 { color: #dc2626; }
              table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
              th, td { border: 1px solid #e5e7eb; padding: 0.75rem; text-align: left; }
              th { background-color: #f9fafb; font-weight: 600; }
              @media print {
                body { margin: 0; }
                .no-print { display: none !important; }
              }
            </style>
          </head>
          <body>
            ${clonedContent.innerHTML}
          </body>
        </html>
      `)
      
      printWindow.document.close()
      
      // Trigger print dialog
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 250)

      toast({
        title: "PDF Download",
        description: "PDF download initiated successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive"
      })
    }
  }

  return (
    <Button 
      onClick={downloadPDF} 
      variant="outline" 
      className={className}
    >
      <Download className="h-4 w-4 mr-2" />
      Download PDF
    </Button>
  )
}