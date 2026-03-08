'use client';

import { Check, Clock, Package, Truck, X } from 'lucide-react';

export default function OrderTimeline({ currentStatus, createdAt, updatedAt }) {
    const steps = [
        { id: 'pending', label: 'Order Placed', icon: Clock },
        { id: 'confirmed', label: 'Processing', icon: Package },
        { id: 'shipped', label: 'Shipping', icon: Truck },
        { id: 'delivered', label: 'Delivered', icon: Check },
    ];

    const formatDate = (dateString) => {
        if (!dateString) return 'Pending';
        return new Date(dateString).toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    let currentStepIndex = steps.findIndex(step => step.id === currentStatus);
    
    if (currentStatus === 'cancelled') {
        currentStepIndex = -1;
    } else if (currentStepIndex === -1) {
        currentStepIndex = 0;
    }

    return (
        <div className="w-full">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-4 flex items-center gap-1">
                Order Tracking
            </h4>
            <div className="relative">
                {/* Background Track Line */}
                {currentStatus !== 'cancelled' && (
                    <div className="absolute top-2 bottom-6 left-[15px] w-[2px] bg-gray-200 rounded" />
                )}
                
                {/* Active Track Line */}
                {currentStatus !== 'cancelled' && currentStepIndex > 0 && (
                    <div 
                        className="absolute top-2 left-[15px] w-[2px] bg-[#52dd28ff] rounded transition-all duration-500 ease-in-out"
                        style={{ height: `calc(${(currentStepIndex / (steps.length - 1)) * 100}% - ${currentStepIndex === steps.length - 1 ? 24 : 16}px)` }}
                    />
                )}

                <div className="relative z-10 flex flex-col gap-6">
                    {currentStatus === 'cancelled' ? (
                        <>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-red-500 flex items-center justify-center flex-shrink-0 z-10">
                                    <Clock className="w-4 h-4 text-red-500" />
                                </div>
                                <div className="pt-1.5">
                                    <span className="block text-xs sm:text-sm font-semibold text-gray-900">Order Placed</span>
                                    <span className="block text-[10px] sm:text-xs text-gray-500 mt-0.5">{formatDate(createdAt)}</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-red-500 flex items-center justify-center flex-shrink-0 z-10">
                                    <X className="w-4 h-4 text-red-500" />
                                </div>
                                <div className="pt-1.5">
                                    <span className="block text-xs sm:text-sm font-semibold text-red-600">Cancelled</span>
                                    <span className="block text-[10px] sm:text-xs text-red-400 mt-0.5">{formatDate(updatedAt || createdAt)}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        steps.map((step, index) => {
                            const isCompleted = index <= currentStepIndex;
                            const isCurrent = index === currentStepIndex;
                            const Icon = step.icon;

                            let bgColor = 'bg-white';
                            let borderColor = 'border-gray-300';
                            let iconColor = 'text-gray-400';
                            let textClass = 'text-gray-500';

                            if (isCompleted) {
                                bgColor = isCurrent ? 'bg-[#52dd28ff]' : 'bg-[#52dd28ff]';
                                borderColor = 'border-[#52dd28ff]';
                                iconColor = 'text-white';
                                textClass = isCurrent ? 'text-[#52dd28ff] font-bold' : 'text-gray-800 font-semibold';
                            }

                            let dateToShow = '';
                            if (index === 0) {
                                dateToShow = formatDate(createdAt);
                            } else if (isCurrent && index > 0) {
                                dateToShow = formatDate(updatedAt || createdAt);
                            } else if (isCompleted) {
                                dateToShow = 'Completed';
                            } else {
                                dateToShow = 'Pending';
                            }

                            return (
                                <div key={step.id} className="flex items-start gap-4 relative">
                                    <div 
                                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${bgColor} ${borderColor} shadow-sm z-10`}
                                    >
                                        <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${iconColor}`} />
                                    </div>
                                    <div className="pt-1.5">
                                        <span className={`block text-[10px] sm:text-xs md:text-sm ${textClass}`}>
                                            {step.label}
                                        </span>
                                        {dateToShow && (
                                            <span className="block text-[8px] sm:text-[10px] text-gray-500 mt-0.5 whitespace-nowrap">
                                                {dateToShow}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
