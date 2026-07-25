import React from 'react';
import { AppNotification } from '../types';
import { Bell, CheckCheck, Info, CheckCircle, AlertTriangle } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead
}) => {
  if (!isOpen) return null;

  return (
    <div id="notifications-overlay" className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-end z-50 animate-fade-in">
      <div className="bg-white w-full max-w-sm h-full flex flex-col shadow-2xl border-l border-[#eeeef0]">
        
        {/* Header */}
        <div className="p-5 bg-[#eeeef0] border-b border-[#e2e2e4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#a04100]" />
            <h3 className="text-base font-extrabold text-[#1a1c1d]">Notificaciones</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onMarkAllAsRead}
              title="Marcar todas como leídas"
              className="text-xs text-[#a04100] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Leídas</span>
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-black font-bold cursor-pointer">✕</button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-xs text-[#8e7164]">
              No tienes notificaciones pendientes.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border text-xs space-y-1 transition-all ${
                  !n.read
                    ? 'bg-amber-50/60 border-amber-200'
                    : 'bg-[#f9f9fb] border-[#eeeef0]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1a1c1d] flex items-center gap-1.5">
                    {n.type === 'success' && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                    {n.type === 'info' && <Info className="w-3.5 h-3.5 text-blue-600" />}
                    {n.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                    {n.title}
                  </span>
                  <span className="text-[10px] text-[#8e7164]">{n.time}</span>
                </div>
                <p className="text-[#5a4136] leading-relaxed">{n.message}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
