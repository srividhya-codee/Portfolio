import React, { useState } from 'react';
import { Car, CheckCircle, ShieldCheck, MapPin, Search, AlertCircle, RefreshCw, KeyRound } from 'lucide-react';

interface ParkingSpot {
  id: string;
  name: string;
  status: 'available' | 'occupied' | 'reserved';
  floor: string;
  type: 'Standard' | 'EV' | 'Accessible';
}

export const SmartParkDashboardMockup: React.FC = () => {
  const initialSpots: ParkingSpot[] = [
    { id: 'A1', name: 'Slot A-01', status: 'occupied', floor: 'Level 1', type: 'Standard' },
    { id: 'A2', name: 'Slot A-02', status: 'available', floor: 'Level 1', type: 'EV' },
    { id: 'A3', name: 'Slot A-03', status: 'available', floor: 'Level 1', type: 'Standard' },
    { id: 'A4', name: 'Slot A-04', status: 'occupied', floor: 'Level 1', type: 'Accessible' },
    { id: 'A5', name: 'Slot A-05', status: 'reserved', floor: 'Level 1', type: 'Standard' },
    { id: 'A6', name: 'Slot A-06', status: 'available', floor: 'Level 1', type: 'Standard' },
    { id: 'B1', name: 'Slot B-01', status: 'occupied', floor: 'Level 2', type: 'Standard' },
    { id: 'B2', name: 'Slot B-02', status: 'occupied', floor: 'Level 2', type: 'EV' },
    { id: 'B3', name: 'Slot B-03', status: 'available', floor: 'Level 2', type: 'Standard' },
    { id: 'B4', name: 'Slot B-04', status: 'available', floor: 'Level 2', type: 'Standard' },
    { id: 'B5', name: 'Slot B-05', status: 'occupied', floor: 'Level 2', type: 'Standard' },
    { id: 'B6', name: 'Slot B-06', status: 'available', floor: 'Level 2', type: 'EV' },
  ];

  const [spots, setSpots] = useState<ParkingSpot[]>(initialSpots);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(initialSpots[1]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const availableCount = spots.filter(s => s.status === 'available').length;
  const occupiedCount = spots.filter(s => s.status === 'occupied').length;
  const reservedCount = spots.filter(s => s.status === 'reserved').length;
  const occupancyRate = Math.round(((occupiedCount + reservedCount) / spots.length) * 100);

  const handleSpotClick = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    setBookingSuccess(null);
  };

  const handleReserve = (id: string) => {
    setSpots(prev => prev.map(s => {
      if (s.id === id && s.status === 'available') {
        return { ...s, status: 'reserved' };
      }
      return s;
    }));
    setBookingSuccess(`Slot ${id} successfully reserved! Confirmation code: PK-${id}78`);
  };

  const filteredSpots = spots.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-slate-950/80 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top Header Bar */}
      <div className="px-5 py-3.5 border-b border-slate-800/80 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Car className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white font-mono flex items-center gap-2">
              <span>SMART_PARK INTERACTIVE DASHBOARD</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>Chennai Hub — Sector 4 Multi-Deck Facility</span>
            </div>
          </div>
        </div>

        {/* Real-time Telemetry Metrics */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            <span className="text-slate-500">Available: </span>
            <span className="text-emerald-400 font-semibold">{availableCount} / {spots.length}</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            <span className="text-slate-500">Occupancy: </span>
            <span className="text-cyan-400 font-semibold">{occupancyRate}%</span>
          </div>
        </div>
      </div>

      {/* Main interactive area */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Parking Grid & Controls */}
        <div className="lg:col-span-7 space-y-4">
          {/* Search & Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search slot (e.g. A-02, EV, Level 1)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
              />
            </div>
            <button
              onClick={() => {
                setSpots(initialSpots);
                setBookingSuccess(null);
              }}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Reset simulation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Slots Visual Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {filteredSpots.map((spot) => {
              const isSelected = selectedSpot?.id === spot.id;
              let statusColor = 'border-slate-800 bg-slate-900/40 text-slate-400';
              if (spot.status === 'available') {
                statusColor = isSelected
                  ? 'border-emerald-400 bg-emerald-950/30 text-emerald-300 ring-1 ring-emerald-400/50'
                  : 'border-emerald-500/30 bg-emerald-950/15 text-emerald-300 hover:border-emerald-400';
              } else if (spot.status === 'occupied') {
                statusColor = isSelected
                  ? 'border-rose-400 bg-rose-950/30 text-rose-300 ring-1 ring-rose-400/50'
                  : 'border-rose-500/20 bg-rose-950/10 text-rose-400/80';
              } else if (spot.status === 'reserved') {
                statusColor = isSelected
                  ? 'border-amber-400 bg-amber-950/30 text-amber-300 ring-1 ring-amber-400/50'
                  : 'border-amber-500/30 bg-amber-950/15 text-amber-300';
              }

              return (
                <button
                  key={spot.id}
                  onClick={() => handleSpotClick(spot)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer relative overflow-hidden ${statusColor}`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="font-semibold text-white">{spot.name}</span>
                    <span className="text-[10px] text-slate-400">{spot.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="capitalize">{spot.status}</span>
                    <Car className="w-3 h-3 opacity-70" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-900">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400" /> Occupied
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Reserved
            </span>
          </div>
        </div>

        {/* Right: Slot Detail & Reservation Action */}
        <div className="lg:col-span-5 bg-slate-900/60 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="text-xs font-semibold text-white">Slot Intelligence Panel</div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                Live Sensor Feed
              </span>
            </div>

            {selectedSpot ? (
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Designation:</span>
                  <span className="font-mono text-white font-semibold">{selectedSpot.name}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Current Status:</span>
                  <span className={`font-mono font-medium capitalize ${
                    selectedSpot.status === 'available' ? 'text-emerald-400' :
                    selectedSpot.status === 'occupied' ? 'text-rose-400' : 'text-amber-400'
                  }`}>
                    {selectedSpot.status}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Bay Type:</span>
                  <span className="text-slate-200">{selectedSpot.type} Charging &amp; Parking</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Deck Location:</span>
                  <span className="text-slate-200">{selectedSpot.floor}</span>
                </div>

                {bookingSuccess && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-start gap-2 animate-in fade-in">
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span>{bookingSuccess}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Select any slot to inspect telemetry and reserve.</p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 space-y-2">
            {selectedSpot?.status === 'available' ? (
              <button
                onClick={() => handleReserve(selectedSpot.id)}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Simulate Slot Reservation</span>
              </button>
            ) : selectedSpot?.status === 'reserved' ? (
              <div className="text-[11px] text-amber-300 bg-amber-950/30 p-2 rounded border border-amber-800/40 text-center">
                Slot is currently held under active reservation.
              </div>
            ) : (
              <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800 text-center flex items-center justify-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Slot is currently occupied by a parked vehicle.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
