import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Building2 } from "lucide-react"

// Sample NADI distribution data by Malaysian states
const stateData = [
  { state: "Selangor", nadi: 156, membership: 342850, color: "fill-blue-500", coordinates: "M320,180 L340,180 L340,200 L320,200 Z" },
  { state: "Kuala Lumpur", nadi: 89, membership: 189430, color: "fill-red-500", coordinates: "M330,185 L335,185 L335,195 L330,195 Z" },
  { state: "Johor", nadi: 98, membership: 287650, color: "fill-green-500", coordinates: "M320,220 L360,220 L360,260 L320,260 Z" },
  { state: "Perak", nadi: 87, membership: 198420, color: "fill-yellow-500", coordinates: "M300,140 L340,140 L340,180 L300,180 Z" },
  { state: "Kedah", nadi: 76, membership: 156780, color: "fill-purple-500", coordinates: "M280,100 L320,100 L320,140 L280,140 Z" },
  { state: "Penang", nadi: 54, membership: 124560, color: "fill-pink-500", coordinates: "M290,120 L310,120 L310,140 L290,140 Z" },
  { state: "Negeri Sembilan", nadi: 43, membership: 98340, color: "fill-orange-500", coordinates: "M300,200 L330,200 L330,220 L300,220 Z" },
  { state: "Melaka", nadi: 32, membership: 76890, color: "fill-cyan-500", coordinates: "M310,210 L330,210 L330,225 L310,225 Z" },
  { state: "Pahang", nadi: 67, membership: 145670, color: "fill-indigo-500", coordinates: "M340,160 L400,160 L400,220 L340,220 Z" },
  { state: "Kelantan", nadi: 45, membership: 89320, color: "fill-lime-500", coordinates: "M340,100 L400,100 L400,140 L340,140 Z" },
  { state: "Terengganu", nadi: 38, membership: 78450, color: "fill-emerald-500", coordinates: "M380,120 L420,120 L420,160 L380,160 Z" },
  { state: "Perlis", nadi: 18, membership: 34560, color: "fill-amber-500", coordinates: "M270,80 L300,80 L300,100 L270,100 Z" },
  { state: "Sabah", nadi: 72, membership: 167890, color: "fill-rose-500", coordinates: "M450,150 L520,150 L520,220 L450,220 Z" },
  { state: "Sarawak", nadi: 84, membership: 198760, color: "fill-violet-500", coordinates: "M420,180 L500,180 L500,250 L420,250 Z" }
]

export function NADIDistributionMap() {
  const [selectedState, setSelectedState] = useState<typeof stateData[0] | null>(null)
  const [viewMode, setViewMode] = useState<'nadi' | 'membership'>('nadi')

  const totalNADI = stateData.reduce((sum, state) => sum + state.nadi, 0)
  const totalMembership = stateData.reduce((sum, state) => sum + state.membership, 0)

  const getStateOpacity = (state: typeof stateData[0]) => {
    if (viewMode === 'nadi') {
      const maxNADI = Math.max(...stateData.map(s => s.nadi))
      return 0.3 + (state.nadi / maxNADI) * 0.7
    } else {
      const maxMembership = Math.max(...stateData.map(s => s.membership))
      return 0.3 + (state.membership / maxMembership) * 0.7
    }
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'nadi' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('nadi')}
          >
            <Building2 className="h-4 w-4 mr-2" />
            NADI Centers
          </Button>
          <Button
            variant={viewMode === 'membership' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('membership')}
          >
            <Users className="h-4 w-4 mr-2" />
            Membership
          </Button>
        </div>
        <Badge variant="secondary">
          Total: {viewMode === 'nadi' ? `${totalNADI} Centers` : `${totalMembership.toLocaleString()} Members`}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <svg viewBox="0 0 600 300" className="w-full h-64 border rounded-lg bg-muted/20">
                  {/* Simplified Malaysia map */}
                  {stateData.map((state) => (
                    <path
                      key={state.state}
                      d={state.coordinates}
                      className={`${state.color} hover:brightness-110 cursor-pointer transition-all duration-200 stroke-background stroke-2`}
                      style={{ opacity: getStateOpacity(state) }}
                      onClick={() => setSelectedState(state)}
                      onMouseEnter={() => setSelectedState(state)}
                    />
                  ))}
                  
                  {/* Labels for major states */}
                  <text x="330" y="190" className="fill-foreground text-xs font-medium" textAnchor="middle">KL</text>
                  <text x="340" y="200" className="fill-foreground text-xs font-medium" textAnchor="middle">SEL</text>
                  <text x="340" y="240" className="fill-foreground text-xs font-medium" textAnchor="middle">JHR</text>
                  <text x="320" y="160" className="fill-foreground text-xs font-medium" textAnchor="middle">PRK</text>
                  <text x="485" y="185" className="fill-foreground text-xs font-medium" textAnchor="middle">SBH</text>
                  <text x="460" y="215" className="fill-foreground text-xs font-medium" textAnchor="middle">SRW</text>
                </svg>
                
                {/* Legend */}
                <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur-sm p-2 rounded-lg text-xs">
                  <div className="font-medium mb-1">
                    {viewMode === 'nadi' ? 'NADI Centers' : 'Membership'}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary/30 rounded"></div>
                    <span>Low</span>
                    <div className="w-3 h-3 bg-primary/70 rounded"></div>
                    <span>High</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* State Details */}
        <div>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                State Details
              </h3>
              
              {selectedState ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-lg">{selectedState.state}</h4>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <Building2 className="h-5 w-5 text-primary mx-auto mb-1" />
                        <div className="text-xl font-bold">{selectedState.nadi}</div>
                        <div className="text-xs text-muted-foreground">NADI Centers</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                        <div className="text-xl font-bold">{selectedState.membership.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Members</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg. per Center:</span>
                      <span className="font-medium">
                        {Math.round(selectedState.membership / selectedState.nadi).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">% of Total NADI:</span>
                      <span className="font-medium">
                        {((selectedState.nadi / totalNADI) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Hover over a state to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Performing States */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">
            Top 5 States - {viewMode === 'nadi' ? 'NADI Centers' : 'Membership'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {stateData
              .sort((a, b) => viewMode === 'nadi' ? b.nadi - a.nadi : b.membership - a.membership)
              .slice(0, 5)
              .map((state, index) => (
                <div key={state.state} className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold text-primary">#{index + 1}</div>
                  <div className="font-medium text-sm">{state.state}</div>
                  <div className="text-xl font-bold">
                    {viewMode === 'nadi' ? state.nadi : state.membership.toLocaleString()}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}