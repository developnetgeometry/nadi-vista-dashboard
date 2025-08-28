import { Card, CardContent } from "@/components/ui/card";
import { User, Sparkles } from "lucide-react";
export function StaffWelcomeHeader() {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return <Card data-component="staff-welcome" className="border-none bg-gradient-to-r from-primary/10 via-primary/5 to-transparent relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
      <div className="absolute top-4 right-4 opacity-10">
        <Sparkles className="h-32 w-32 text-primary" />
      </div>
      <CardContent className="p-8 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-primary/15 rounded-2xl shadow-sm">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground tracking-tight">
                Welcome Back!
              </h1>
              <p className="text-xl text-primary font-medium">Wan Ikhwan Syamirul</p>
              <p className="text-sm text-muted-foreground font-medium">{currentDate}</p>
            </div>
          </div>
          
        </div>
      </CardContent>
    </Card>;
}