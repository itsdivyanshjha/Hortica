'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package, TrendingDown, TrendingUp } from 'lucide-react';
import { StockAlert } from '@/types';

interface StockOverviewProps {
  className?: string;
}

export default function StockOverview({ className }: StockOverviewProps) {
  const [stockAlerts, setStockAlerts] = useState<StockAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStockAlerts();
  }, []);

  const fetchStockAlerts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stock-alerts?active=true');
      const data = await response.json();
      
      if (data.success) {
        setStockAlerts(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch stock alerts');
    } finally {
      setLoading(false);
    }
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'low':
        return <TrendingDown className="h-4 w-4 text-yellow-500" />;
      case 'out_of_stock':
        return <Package className="h-4 w-4 text-red-600" />;
      default:
        return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
  };

  const getAlertBadgeColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'destructive';
      case 'low':
        return 'secondary';
      case 'out_of_stock':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const groupedAlerts = stockAlerts.reduce((acc, alert) => {
    if (!acc[alert.itemType]) {
      acc[alert.itemType] = [];
    }
    acc[alert.itemType].push(alert);
    return acc;
  }, {} as Record<string, StockAlert[]>);

  const totalAlerts = stockAlerts.length;
  const criticalAlerts = stockAlerts.filter(alert => alert.alertLevel === 'critical').length;
  const outOfStockAlerts = stockAlerts.filter(alert => alert.alertLevel === 'out_of_stock').length;

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{totalAlerts}</p>
              </div>
              <Package className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-red-600">{criticalAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-700">{outOfStockAlerts}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Alerts by Category */}
      {Object.entries(groupedAlerts).map(([itemType, alerts]) => (
        <Card key={itemType}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="capitalize">{itemType} Stock Alerts</span>
              <Badge variant="outline">{alerts.length} alerts</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getAlertIcon(alert.alertLevel)}
                    <div>
                      <h4 className="font-medium text-gray-900">{alert.itemName}</h4>
                      <p className="text-sm text-gray-600">
                        Current: {alert.currentStock} | Minimum: {alert.minimumStock}
                      </p>
                    </div>
                  </div>
                  <Badge variant={getAlertBadgeColor(alert.alertLevel) as any}>
                    {alert.alertLevel.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Empty State */}
      {totalAlerts === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">All Stock Levels Good!</h3>
            <p className="text-gray-600">No stock alerts at this time. All inventory levels are above minimum thresholds.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 