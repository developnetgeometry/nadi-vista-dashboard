import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Plus, List, Clock } from "lucide-react";
export function ReplacementLeaveSummary() {
  return <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-primary" />
          Replacement Leave
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Balance */}
        <div className="text-center p-6 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Current Balance</div>
          <div className="text-3xl font-bold text-foreground">0.5</div>
          <div className="text-xs text-muted-foreground">Days Available</div>
        </div>

        {/* Request Status */}
        <div className="flex justify-center">
          <Badge variant="secondary">Total Requests: 1</Badge>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          
          
        </div>
      </CardContent>
    </Card>;
}