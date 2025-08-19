import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"

export function StaffWelcomeHeader() {
  const currentDate = new Date().toLocaleDateString('en-GB', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <Card className="border-none bg-gradient-to-r from-primary/5 via-primary/3 to-transparent">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-foreground">
                Welcome Back!
              </h1>
              <p className="text-lg text-muted-foreground">Wan Ikhwan Syamirul</p>
              <p className="text-sm text-muted-foreground">{currentDate}</p>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-2xl font-bold text-primary">NADI</div>
            <p className="text-sm text-muted-foreground">Staff Portal</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}